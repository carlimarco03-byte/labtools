/* ===================================
   LABISTRY STATISTICAL TOOLS
   =================================== */


/* ===================================
   PARSE DATA
   =================================== */

function parseData() {

    const input =
        document.getElementById("dataInput").value.trim();


    if (!input) {

        return {
            data: [],
            invalid: []
        };

    }


    /*
       Accept:
       - commas
       - spaces
       - line breaks
       - semicolons
    */

    const values =
        input.split(/[\s,;]+/);


    const data = [];
    const invalid = [];


    values.forEach(value => {

        if (value === "") {
            return;
        }


        const number = Number(value);


        if (Number.isFinite(number)) {

            data.push(number);

        } else {

            invalid.push(value);

        }

    });


    return {
        data: data,
        invalid: invalid
    };

}


/* ===================================
   MEAN
   =================================== */

function calculateMean(data) {

    if (data.length === 0) {
        return NaN;
    }


    const sum =
        data.reduce(
            (total, value) => total + value,
            0
        );


    return sum / data.length;

}


/* ===================================
   MEDIAN
   =================================== */

function calculateMedian(data) {

    if (data.length === 0) {
        return NaN;
    }


    const sorted =
        [...data].sort(
            (a, b) => a - b
        );


    const middle =
        Math.floor(sorted.length / 2);


    if (sorted.length % 2 === 0) {

        return (
            sorted[middle - 1] +
            sorted[middle]
        ) / 2;

    }


    return sorted[middle];

}


/* ===================================
   QUARTILE
   =================================== */

function calculateQuartile(data, percentile) {

    if (data.length === 0) {
        return NaN;
    }


    const sorted =
        [...data].sort(
            (a, b) => a - b
        );


    const position =
        (sorted.length - 1) * percentile;


    const lower =
        Math.floor(position);


    const upper =
        Math.ceil(position);


    if (lower === upper) {

        return sorted[lower];

    }


    const weight =
        position - lower;


    return (
        sorted[lower] +
        weight *
        (sorted[upper] - sorted[lower])
    );

}


/* ===================================
   VARIANCE
   =================================== */

function calculateVariance(
    data,
    sample = false
) {

    if (
        data.length === 0 ||
        (sample && data.length < 2)
    ) {

        return NaN;

    }


    const mean =
        calculateMean(data);


    const squaredDifferences =
        data.map(
            value =>
                Math.pow(value - mean, 2)
        );


    const sum =
        squaredDifferences.reduce(
            (total, value) => total + value,
            0
        );


    const divisor =
        sample
            ? data.length - 1
            : data.length;


    return sum / divisor;

}


/* ===================================
   STANDARD DEVIATION
   =================================== */

function calculateStandardDeviation(
    data,
    sample = false
) {

    const variance =
        calculateVariance(
            data,
            sample
        );


    return Math.sqrt(variance);

}


/* ===================================
   STANDARD ERROR OF THE MEAN
   =================================== */

function calculateSEM(data) {

    if (data.length < 2) {
        return NaN;
    }


    const sampleSD =
        calculateStandardDeviation(
            data,
            true
        );


    return sampleSD /
        Math.sqrt(data.length);

}


/* ===================================
   COEFFICIENT OF VARIATION
   =================================== */

function calculateCV(data) {

    if (data.length < 2) {
        return NaN;
    }


    const mean =
        calculateMean(data);


    if (mean === 0) {
        return NaN;
    }


    const sampleSD =
        calculateStandardDeviation(
            data,
            true
        );


    return (
        sampleSD /
        Math.abs(mean)
    ) * 100;

}


/* ===================================
   T CRITICAL VALUE
   =================================== */

function getTValue95(df) {

    /*
       Approximate two-tailed t critical
       values for a 95% confidence interval.
    */

    const tTable = {

        1: 12.706,
        2: 4.303,
        3: 3.182,
        4: 2.776,
        5: 2.571,
        6: 2.447,
        7: 2.365,
        8: 2.306,
        9: 2.262,
        10: 2.228,
        11: 2.201,
        12: 2.179,
        13: 2.160,
        14: 2.145,
        15: 2.131,
        16: 2.120,
        17: 2.110,
        18: 2.101,
        19: 2.093,
        20: 2.086,
        21: 2.080,
        22: 2.074,
        23: 2.069,
        24: 2.064,
        25: 2.060,
        26: 2.056,
        27: 2.052,
        28: 2.048,
        29: 2.045,
        30: 2.042
    };


    if (tTable[df]) {

        return tTable[df];

    }


    /*
       For larger degrees of freedom,
       t approaches the normal critical
       value of 1.96.
    */

    return 1.96;

}


/* ===================================
   95% CONFIDENCE INTERVAL
   =================================== */

function calculateConfidenceInterval95(data) {

    if (data.length < 2) {

        return {
            lower: NaN,
            upper: NaN
        };

    }


    const mean =
        calculateMean(data);


    const sem =
        calculateSEM(data);


    const df =
        data.length - 1;


    const t =
        getTValue95(df);


    const margin =
        t * sem;


    return {

        lower: mean - margin,

        upper: mean + margin

    };

}


/* ===================================
   CALCULATE STATISTICS
   =================================== */

function calculateStatistics() {

   const analysisType =
    document.getElementById("analysisType").value;

    const parsed =
        parseData();


    const data =
        parsed.data;


    const invalid =
        parsed.invalid;


    const result =
        document.getElementById("result");


    /* =================================
       EMPTY INPUT
       ================================= */

    if (
        data.length === 0 &&
        invalid.length === 0
    ) {

        result.innerHTML = `

            <div class="statistics-error">

                <strong>
                    Please enter valid numerical data.
                </strong>

            </div>

        `;

        return;

    }


    /* =================================
       INVALID VALUES
       ================================= */

    if (invalid.length > 0) {

        const uniqueInvalid =
            [...new Set(invalid)];


        result.innerHTML = `

            <div class="statistics-error">

                <strong>
                    Invalid data detected.
                </strong>

                <br><br>

                The following value(s) are not valid
                numerical values:

                <br><br>

                <strong>
                    ${uniqueInvalid.join(", ")}
                </strong>

                <br><br>

                Please enter numerical values only.

            </div>

        `;

        return;

    }


    /* =================================
       MINIMUM DATA
       ================================= */

    if (data.length === 1) {

        result.innerHTML = `

            <div class="statistics-error">

                <strong>
                    Please enter at least two values
                    to calculate statistics.
                </strong>

            </div>

        `;

        return;

    }


    /* =================================
       CALCULATIONS
       ================================= */

    const n =
        data.length;


    const mean =
        calculateMean(data);


    const median =
        calculateMedian(data);


    const minimum =
        Math.min(...data);


    const maximum =
        Math.max(...data);


    const range =
        maximum - minimum;


    const q1 =
        calculateQuartile(
            data,
            0.25
        );


    const q3 =
        calculateQuartile(
            data,
            0.75
        );


    const iqr =
        q3 - q1;


    const populationVariance =
        calculateVariance(
            data,
            false
        );


    const sampleVariance =
        calculateVariance(
            data,
            true
        );


    const populationSD =
        calculateStandardDeviation(
            data,
            false
        );


    const sampleSD =
        calculateStandardDeviation(
            data,
            true
        );


    const sem =
        calculateSEM(data);


    const cv =
        calculateCV(data);


    const confidenceInterval =
        calculateConfidenceInterval95(data);


    /* =================================
       RESULTS
       ================================= */

    result.innerHTML = `

        <div class="statistics-result">


            <h3>
                Descriptive Statistics
            </h3>


            <!-- BASIC STATISTICS -->

            <div class="statistics-section">

                <h4>
                    Basic Statistics
                </h4>


                <div class="statistics-grid">

                    <div>

                        <span>
                            Observations (n)
                        </span>

                        <strong>
                            ${n}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Mean
                        </span>

                        <strong>
                            ${formatStatistic(mean)}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Median
                        </span>

                        <strong>
                            ${formatStatistic(median)}
                        </strong>

                    </div>

                </div>

            </div>


            <!-- POSITION & RANGE -->

            <div class="statistics-section">

                <h4>
                    Position & Range
                </h4>


                <div class="statistics-grid">

                    <div>

                        <span>
                            Minimum
                        </span>

                        <strong>
                            ${formatStatistic(minimum)}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Q1
                        </span>

                        <strong>
                            ${formatStatistic(q1)}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Q3
                        </span>

                        <strong>
                            ${formatStatistic(q3)}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Maximum
                        </span>

                        <strong>
                            ${formatStatistic(maximum)}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Range
                        </span>

                        <strong>
                            ${formatStatistic(range)}
                        </strong>

                    </div>


                    <div>

                        <span>
                            IQR
                        </span>

                        <strong>
                            ${formatStatistic(iqr)}
                        </strong>

                    </div>

                </div>

            </div>


            <!-- VARIABILITY -->

            <div class="statistics-section">

                <h4>
                    Variability
                </h4>


                <div class="statistics-grid">

                    <div>

                        <span>
                            Population SD
                        </span>

                        <strong>
                            ${formatStatistic(populationSD)}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Sample SD
                        </span>

                        <strong>
                            ${formatStatistic(sampleSD)}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Population variance
                        </span>

                        <strong>
                            ${formatStatistic(populationVariance)}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Sample variance
                        </span>

                        <strong>
                            ${formatStatistic(sampleVariance)}
                        </strong>

                    </div>


                    <div>

                        <span>
                            SEM
                        </span>

                        <strong>
                            ${formatStatistic(sem)}
                        </strong>

                    </div>


                    <div>

                        <span>
                            CV%
                        </span>

                        <strong>
                            ${formatStatistic(cv)}%
                        </strong>

                    </div>

                </div>

            </div>


            <!-- CONFIDENCE INTERVAL -->

            <div class="statistics-section">

                <h4>
                    95% Confidence Interval
                </h4>


                <div class="statistics-grid">

                    <div>

                        <span>
                            Lower limit
                        </span>

                        <strong>
                            ${formatStatistic(
                                confidenceInterval.lower
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Upper limit
                        </span>

                        <strong>
                            ${formatStatistic(
                                confidenceInterval.upper
                            )}
                        </strong>

                    </div>

                </div>

            </div>


        </div>

    `;

}


/* ===================================
   FORMAT RESULTS
   =================================== */

function formatStatistic(value) {

    if (!Number.isFinite(value)) {

        return "—";

    }


    return Number(
        value.toFixed(6)
    ).toString();

}


/* ===================================
   RESET
   =================================== */

function resetStatistics() {

    const input =
        document.getElementById("dataInput");


    const result =
        document.getElementById("result");


    if (input) {

        input.value = "";

    }


    if (result) {

        result.innerHTML = `
            Result will appear here
        `;

    }

}


/* ===================================
   INITIALIZATION
   =================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const input =
            document.getElementById("dataInput");


        if (!input) {

            return;

        }


        input.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.ctrlKey &&
                    event.key === "Enter"
                ) {

                    calculateStatistics();

                }

            }
        );

    }
);
