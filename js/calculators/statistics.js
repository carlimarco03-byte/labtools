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

function calculateDescriptiveStatistics() {
   
  
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
   STANDARD NORMAL CDF
   =================================== */

function normalCDF(x) {

    const sign =
        x < 0 ? -1 : 1;

    x = Math.abs(x) / Math.sqrt(2);


    const t =
        1 / (
            1 +
            0.3275911 * x
        );


    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;


    const erf =
        1 -
        (
            (
                (
                    (
                        (
                            a5 * t +
                            a4
                        ) * t +
                        a3
                    ) * t +
                    a2
                ) * t +
                a1
            ) * t
        ) *
        Math.exp(-x * x);


    return (
        1 +
        sign * erf
    ) / 2;

}

/* ===================================
   SKEWNESS
   =================================== */

function calculateSkewness(data) {

    const n =
        data.length;

    const mean =
        calculateMean(data);


    const sd =
        calculateStandardDeviation(
            data,
            true
        );


    if (
        n < 3 ||
        !Number.isFinite(sd) ||
        sd === 0
    ) {

        return NaN;

    }


    const sum =
        data.reduce(
            (total, value) => {

                return total +
                    Math.pow(
                        (value - mean) / sd,
                        3
                    );

            },
            0
        );


    return (
        n /
        ((n - 1) * (n - 2))
    ) * sum;

}

/* ===================================
   KURTOSIS
   =================================== */

function calculateKurtosis(data) {

    const n =
        data.length;

    const mean =
        calculateMean(data);


    const sd =
        calculateStandardDeviation(
            data,
            true
        );


    if (
        n < 4 ||
        !Number.isFinite(sd) ||
        sd === 0
    ) {

        return NaN;

    }


    const sum =
        data.reduce(
            (total, value) => {

                return total +
                    Math.pow(
                        (value - mean) / sd,
                        4
                    );

            },
            0
        );


    const term1 =
        (
            n * (n + 1)
        ) /
        (
            (n - 1) *
            (n - 2) *
            (n - 3)
        );


    const term2 =
        (
            3 *
            (n - 1) *
            (n - 1)
        ) /
        (
            (n - 2) *
            (n - 3)
        );


    return (
        term1 * sum
    ) - term2;

}

/* ===================================
   LOG GAMMA
   =================================== */

function logGamma(z) {

    const coefficients = [
        676.5203681218851,
        -1259.1392167224028,
        771.32342877765313,
        -176.61502916214059,
        12.507343278686905,
        -0.13857109526572012,
        9.9843695780195716e-6,
        1.5056327351493116e-7
    ];

    if (z < 0.5) {

        return Math.log(Math.PI) -
            Math.log(Math.sin(Math.PI * z)) -
            logGamma(1 - z);

    }

    z -= 1;

    let x = 0.99999999999980993;

    for (let i = 0; i < coefficients.length; i++) {

        x +=
            coefficients[i] /
            (z + i + 1);

    }

    const t =
        z +
        coefficients.length -
        0.5;

    return (
        0.5 * Math.log(2 * Math.PI) +
        (z + 0.5) * Math.log(t) -
        t +
        Math.log(x)
    );

}


/* ===================================
   SHAPIRO-WILK
   =================================== */

function calculateShapiroWilk(data) {

    const n = data.length;

    if (n < 3) {

        return {
            W: NaN,
            pValue: NaN
        };

    }


    const sorted =
        [...data].sort(
            (a, b) => a - b
        );


    const mean =
        calculateMean(sorted);


    const denominator =
        sorted.reduce(
            (sum, value) =>
                sum +
                Math.pow(value - mean, 2),
            0
        );


    if (denominator === 0) {

        return {
            W: 1,
            pValue: 1
        };

    }


    /*
     * Approximation of Shapiro-Wilk W.
     *
     * The calculation uses expected normal
     * order statistics to construct the weights.
     */

    const m = [];

    for (let i = 1; i <= n; i++) {

        const p =
            (i - 0.375) /
            (n + 0.25);

        /*
         * Blom approximation of expected
         * normal order statistics.
         */

        const z =
            inverseNormalCDF(p);

        m.push(z);

    }


    const mSquared =
        m.reduce(
            (sum, value) =>
                sum + value * value,
            0
        );


    const weights =
        m.map(
            value =>
                value /
                Math.sqrt(mSquared)
        );


    let numerator = 0;

    for (let i = 0; i < n; i++) {

        numerator +=
            weights[i] *
            sorted[i];

    }


    const W =
        Math.pow(numerator, 2) /
        denominator;


    /*
     * Approximate p-value.
     */

    const pValue =
        shapiroPValue(W, n);


    return {
        W: W,
        pValue: pValue
    };

}

/* ===================================
   INVERSE NORMAL CDF
   =================================== */

function inverseNormalCDF(p) {

    const a = [
        -39.6968302866538,
        220.946098424521,
        -275.928510446969,
        138.357751867269,
        -30.6647980661472,
        2.50662827745924
    ];

    const b = [
        -54.4760987982241,
        161.585836858041,
        -155.698979859887,
        66.8013118877197,
        -13.2806815528857
    ];

    const c = [
        -0.00778489400243029,
        -0.322396458041136,
        -2.40075827716184,
        -2.54973253934373,
        4.37466414146497,
        2.93816398269878
    ];

    const d = [
        0.00778469570904146,
        0.32246712907004,
        2.445134137143,
        3.75440866190742
    ];


    const pLow = 0.02425;
    const pHigh = 1 - pLow;


    if (p < pLow) {

        const q =
            Math.sqrt(
                -2 * Math.log(p)
            );

        return (
            ((((
                c[0] * q +
                c[1]
            ) * q +
                c[2]
            ) * q +
                c[3]
            ) * q +
                c[4]
            ) * q +
                c[5]
        ) /
        ((((d[0] * q +
            d[1]
        ) * q +
            d[2]
        ) * q +
            d[3]
        ) * q + 1);

    }


    if (p <= pHigh) {

        const q =
            p - 0.5;

        const r =
            q * q;

        return (
            ((((
                a[0] * r +
                a[1]
            ) * r +
                a[2]
            ) * r +
                a[3]
            ) * r +
                a[4]
            ) * r +
                a[5]
        ) * q /
        ((((
            b[0] * r +
            b[1]
        ) * r +
            b[2]
        ) * r +
            b[3]
        ) * r +
            b[4]
        ) * r + 1);

    }


    const q =
        Math.sqrt(
            -2 * Math.log(1 - p)
        );


    return -(
        ((((
            c[0] * q +
            c[1]
        ) * q +
            c[2]
        ) * q +
            c[3]
        ) * q +
            c[4]
        ) * q +
            c[5]
        ) /
        ((((d[0] * q +
            d[1]
        ) * q +
            d[2]
        ) * q +
            d[3]
        ) * q + 1);

}

/* ===================================
   SHAPIRO-WILK P-VALUE
   =================================== */

function shapiroPValue(W, n) {

    if (
        !Number.isFinite(W) ||
        n < 3
    ) {

        return NaN;

    }


    if (W >= 1) {

        return 1;

    }


    if (W <= 0) {

        return 0;

    }


    /*
     * Approximation based on the distribution
     * of the Shapiro-Wilk statistic.
     */

    const y =
        Math.log(1 - W);


    const lnN =
        Math.log(n);


    const mu =
        -1.5861 -
        0.31082 * lnN -
        0.083751 * lnN * lnN;


    const sigma =
        Math.exp(
            -0.4803 -
            0.082676 * lnN +
            0.0030302 * lnN * lnN
        );


    const z =
        (y - mu) /
        sigma;


    /*
     * Two-tailed interpretation:
     * small W -> small p-value.
     */

    let p =
        1 -
        normalCDF(z);


    p =
        Math.max(
            0,
            Math.min(1, p)
        );


    return p;

}

/* ===================================
   NORMALITY TEST
   =================================== */

function calculateNormality() {

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
       SAMPLE SIZE
       ================================= */

    if (data.length < 3) {

        result.innerHTML = `

            <div class="statistics-error">

                <strong>
                    Not enough data for the normality test.
                </strong>

                <br><br>

                Please enter at least 3 observations.

            </div>

        `;

        return;

    }


  const shapiro =
    calculateShapiroWilk(data);


const W =
    shapiro.W;


const pValue =
    shapiro.pValue;


let interpretation;


if (pValue < 0.05) {

    interpretation =
        "The data show significant evidence of deviation from normality (p < 0.05).";

} else {

    interpretation =
        "The data do not show significant evidence of deviation from normality (p ≥ 0.05).";

}


result.innerHTML = `

    <div class="statistics-result">

        <h3>
            Normality Test
        </h3>


        <div class="statistics-section">

            <h4>
                Shapiro–Wilk Test
            </h4>


            <div class="statistics-grid">

                <div>

                    <span>
                        Observations (n)
                    </span>

                    <strong>
                        ${data.length}
                    </strong>

                </div>


                <div>

                    <span>
                        W statistic
                    </span>

                    <strong>
                        ${formatStatistic(W)}
                    </strong>

                </div>


                <div>

                    <span>
                        p-value
                    </span>

                    <strong>
                        ${formatStatistic(pValue)}
                    </strong>

                </div>

            </div>

        </div>


        <div class="statistics-section">

            <h4>
                Interpretation
            </h4>

            <p>
                ${interpretation}
            </p>

            <small>
                A p-value below 0.05 indicates significant
                evidence against the assumption of normality.
            </small>

        </div>


    </div>

`;

}

/* ===================================
   ANALYSIS SELECTOR
   =================================== */

function calculateStatistics() {

    const analysisType =
        document.getElementById("analysisType").value;


    if (analysisType === "descriptive") {

        calculateDescriptiveStatistics();

        return;

    }


    if (analysisType === "normality") {

        calculateNormality();

        return;

    }

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
