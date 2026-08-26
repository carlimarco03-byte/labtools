/* ===================================
   LABISTRY STATISTICAL TOOLS
   =================================== */


/* ===================================
   PARSE DATA
   =================================== */

function parseData() {

    const input = document.getElementById("dataInput").value.trim();

    if (!input) {
        return [];
    }

    /*
       Accept:
       - commas
       - spaces
       - line breaks
       - semicolons
    */

    return input
        .split(/[\s,;]+/)
        .map(value => Number(value))
        .filter(value => Number.isFinite(value));

}


/* ===================================
   MEAN
   =================================== */

function calculateMean(data) {

    if (data.length === 0) {
        return NaN;
    }

    const sum = data.reduce(
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

    const sorted = [...data].sort(
        (a, b) => a - b
    );

    const middle = Math.floor(
        sorted.length / 2
    );

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

function calculateVariance(data, sample = false) {

    if (
        data.length === 0 ||
        (sample && data.length < 2)
    ) {
        return NaN;
    }

    const mean = calculateMean(data);

    const squaredDifferences = data.map(
        value => Math.pow(value - mean, 2)
    );


   
    const sum = squaredDifferences.reduce(
        (total, value) => total + value,
        0
    );

    const divisor = sample
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

    const variance = calculateVariance(
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
        calculateStandardDeviation(data, true);

    return sampleSD / Math.sqrt(data.length);

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

    const sampleSD =
        calculateStandardDeviation(data, true);

    if (mean === 0) {
        return NaN;
    }

    return (sampleSD / Math.abs(mean)) * 100;

}


/* ===================================
   QUARTILES
   =================================== */

function calculateQuartiles(data) {

    if (data.length === 0) {
        return {
            q1: NaN,
            q3: NaN
        };
    }

    const sorted =
        [...data].sort((a, b) => a - b);

    const middle =
        Math.floor(sorted.length / 2);

    const lower =
        sorted.slice(0, middle);

    const upper =
        sorted.length % 2 === 0
            ? sorted.slice(middle)
            : sorted.slice(middle + 1);


    const q1 =
        calculateMedian(lower);

    const q3 =
        calculateMedian(upper);


    return {
        q1: q1,
        q3: q3
    };

}


/* ===================================
   INTERQUARTILE RANGE
   =================================== */

function calculateIQR(data) {

    const quartiles =
        calculateQuartiles(data);

    if (
        !Number.isFinite(quartiles.q1) ||
        !Number.isFinite(quartiles.q3)
    ) {
        return NaN;
    }

    return quartiles.q3 - quartiles.q1;

}


/* ===================================
   95% CONFIDENCE INTERVAL
   =================================== */

function calculateConfidenceInterval(data) {

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


    /*
     * Approximation using z = 1.96.
     *
     * Suitable for a simple descriptive
     * calculator. We can later implement
     * the exact Student's t distribution.
     */

    const margin =
        1.96 * sem;


    return {

        lower: mean - margin,

        upper: mean + margin

    };

}

/* ===================================
   CALCULATE STATISTICS
   =================================== */

function calculateStatistics() {

    const data = parseData();

 

    const result = document.getElementById("result");

    if (data.length === 0) {

        result.innerHTML = `
            <strong>Please enter valid numerical data.</strong>
        `;

        return;

    }

    if (data.length === 1) {

        result.innerHTML = `
            <strong>
                Please enter at least two values
                to calculate variability.
            </strong>
        `;

        return;

    }


    const n = data.length;

    const mean = calculateMean(data);

    const median = calculateMedian(data);

    const populationVariance =
        calculateVariance(data, false);

    const sampleVariance =
        calculateVariance(data, true);

    const populationSD =
        calculateStandardDeviation(data, false);


    const sampleSD =
        calculateStandardDeviation(data, true);

    const minimum =
        Math.min(...data);

    const maximum =
        Math.max(...data);

    const range =
        maximum - minimum;

const sem =
    calculateSEM(data);

const cv =
    calculateCV(data);

const quartiles =
    calculateQuartiles(data);

const iqr =
    calculateIQR(data);

const confidenceInterval =
    calculateConfidenceInterval(data);
   
   
    result.innerHTML = `

        <div class="statistics-result">

            <h3>
                Descriptive Statistics
            </h3>

            <div class="statistics-grid">

                <div>
                    <span>Observations (n)</span>
                    <strong>${n}</strong>
                </div>

                <div>
                    <span>Mean</span>
                    <strong>${formatStatistic(mean)}</strong>
                </div>

                <div>
                    <span>Median</span>
                    <strong>${formatStatistic(median)}</strong>
                </div>

                <div>
                    <span>Minimum</span>
                    <strong>${formatStatistic(minimum)}</strong>
                </div>

                <div>
                    <span>Maximum</span>
                    <strong>${formatStatistic(maximum)}</strong>
                </div>

                <div>
                    <span>Range</span>
                    <strong>${formatStatistic(range)}</strong>
                </div>

                <div>
                    <span>Population SD</span>
                    <strong>${formatStatistic(populationSD)}</strong>
                </div>

                <div>
                    <span>Sample SD</span>
                    <strong>${formatStatistic(sampleSD)}</strong>
                </div>

                <div>
                    <span>Population variance</span>
                    <strong>${formatStatistic(populationVariance)}</strong>
                </div>

                <div>
                    <span>Sample variance</span>
                    <strong>${formatStatistic(sampleVariance)}</strong>
                </div>

                <div>
    <span>SEM</span>
    <strong>${formatStatistic(sem)}</strong>
</div>

<div>
    <span>CV</span>
    <strong>${formatStatistic(cv)}%</strong>
</div>

<div>
    <span>Q1</span>
    <strong>${formatStatistic(quartiles.q1)}</strong>
</div>

<div>
    <span>Q3</span>
    <strong>${formatStatistic(quartiles.q3)}</strong>
</div>

<div>
    <span>IQR</span>
    <strong>${formatStatistic(iqr)}</strong>
</div>

<div>
    <span>95% CI</span>
    <strong>
        ${formatStatistic(confidenceInterval.lower)}
        –
        ${formatStatistic(confidenceInterval.upper)}
    </strong>
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
