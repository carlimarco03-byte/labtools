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
