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
   CALCULATE STATISTICS
   =================================== */

function calculateStatistics() {

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

    if (data.length === 0 && invalid.length === 0) {

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
                    to calculate variability.
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


    const minimum =
        Math.min(...data);


    const maximum =
        Math.max(...data);


    const range =
        maximum - minimum;


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


            <!-- RANGE -->

            <div class="statistics-section">

                <h4>
                    Range
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
