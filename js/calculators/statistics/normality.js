/* ===================================
   NORMALITY TEST
   =================================== */

/*
    Shapiro-Wilk normality test

    Notes:
    - Suitable for small and moderate sample sizes.
    - W close to 1 indicates agreement with normality.
    - p < 0.05 indicates evidence against normality.
*/


function calculateNormality() {

    const parsed = parseData("dataInput");

    if (!validateParsedData(parsed, 3)) {
        return;
    }

    const data = parsed.data;

    const result = calculateShapiroWilk(data);

   if (result.error) {

    document.getElementById("result").innerHTML = `
        <div class="statistics-error">
            <strong>${result.error}</strong>
        </div>
    `;

    return;
}

    const interpretation =
        result.pValue < 0.05
            ? "The data significantly deviate from a normal distribution."
            : "There is no significant evidence that the data deviate from a normal distribution.";

    const recommendation =
        result.pValue < 0.05
            ? "Consider using a non-parametric test or an appropriate data transformation."
            : "Parametric statistical methods may be appropriate, provided that other assumptions are also satisfied.";

    document.getElementById("result").innerHTML = `

        <div class="statistics-result">

            <h3>Shapiro–Wilk Normality Test</h3>

            <div class="statistics-section">

                <h4>Test Summary</h4>

                <div class="statistics-row">
                    <span>Sample size (n)</span>
                    <strong>${data.length}</strong>
                </div>

                <div class="statistics-row">
                    <span>W statistic</span>
                    <strong>${formatStatistic(result.W)}</strong>
                </div>

                <div class="statistics-row">
                    <span>p-value</span>
                    <strong>${
    result.pValue < 0.000001
        ? "p < 0.000001"
        : formatStatistic(result.pValue)
}</strong>
                </div>

            </div>

            <div class="statistics-section">

                <h4>Interpretation</h4>

                <p>
                    ${interpretation}
                </p>

                <p>
                    <strong>Recommendation:</strong>
                    ${recommendation}
                </p>

            </div>

            <div class="statistics-section">

                <h4>Statistical criterion</h4>

                <p>
                    The null hypothesis of the Shapiro–Wilk test is that
                    the data come from a normal distribution.
                    A p-value below 0.05 indicates statistically significant
                    evidence against normality.
                </p>

            </div>

        </div>

    `;
}


/* ===================================
   SHAPIRO-WILK
   =================================== */

function calculateShapiroWilk(data) {

    const n = data.length;

    /*
        Shapiro-Wilk supported range
    */

    if (n < 3 || n > 5000) {

        return {
            W: NaN,
            pValue: NaN,
            error:
                n < 3
                    ? "The Shapiro–Wilk test requires at least 3 observations."
                    : "The Shapiro–Wilk test is limited to 5000 observations."
        };

    }


    /*
        Sort observations
    */

    const sorted = [...data].sort((a, b) => a - b);

    const mean = calculateMean(sorted);


    /*
        Sum of squared deviations
    */

    let denominator = 0;

    for (let i = 0; i < n; i++) {

        const deviation =
            sorted[i] - mean;

        denominator +=
            deviation * deviation;

    }


    /*
        Constant dataset
    */

    if (denominator === 0) {

        return {
            W: 1,
            pValue: 1
        };

    }


    /*
        Expected normal order statistics.

        Blom approximation:

        p = (i - 0.375) / (n + 0.25)
    */

    const m = [];

    for (let i = 1; i <= n; i++) {

        const p =
            (i - 0.375) /
            (n + 0.25);

        m.push(
            inverseNormalCDF(p)
        );

    }


    /*
        Calculate the coefficient normalization.

        The Shapiro-Wilk numerator is based on
        symmetric coefficients.
    */

    let sumSquares = 0;

    for (let i = 0; i < n; i++) {

        sumSquares +=
            m[i] * m[i];

    }


    const norm =
        Math.sqrt(sumSquares);


    /*
        Normalized coefficients
    */

    const a = [];

    for (let i = 0; i < n; i++) {

        a.push(
            m[i] / norm
        );

    }


    /*
        Use symmetric coefficient pairing.

        This avoids accumulating numerical
        errors from summing all coefficients
        independently.
    */

    let numerator = 0;

    const half =
        Math.floor(n / 2);

    for (let i = 0; i < half; i++) {

        const coefficient =
            a[n - 1 - i];

        const difference =
            sorted[n - 1 - i] -
            sorted[i];

        numerator +=
            coefficient *
            difference;

    }


    /*
        Odd sample size:

        The middle observation does not
        contribute to the symmetric numerator.
    */


    numerator *= numerator;


    /*
        Shapiro-Wilk statistic
    */

    const W =
        numerator /
        denominator;


    /*
        Numerical protection
    */

    const boundedW =
        Math.max(
            0,
            Math.min(1, W)
        );


    /*
        Approximate p-value
    */

    const pValue =
        shapiroPValue(
            boundedW,
            n
        );


    return {

        W: boundedW,

        pValue

    };

}


/* ===================================
   SHAPIRO-WILK P-VALUE
   =================================== */

function shapiroPValue(W, n) {

    if (!Number.isFinite(W)) {
        return NaN;
    }

    if (W >= 1) {
        return 1;
    }

    if (W <= 0) {
        return 0;
    }


    /*
        Transform W.

        Smaller W indicates stronger
        deviation from normality.
    */

    const y =
        Math.log(1 - W);


    /*
        Approximation of the distribution
        of the transformed statistic.
    */

    let mu;
    let sigma;


    if (n <= 11) {

        const lnN =
            Math.log(n);

        mu =
            -0.0006714 *
            Math.pow(n, 3)
            +
            0.025054 *
            Math.pow(n, 2)
            -
            0.39978 *
            n
            +
            0.5440;

        sigma =
            Math.exp(
                -0.0020322 *
                Math.pow(n, 3)
                +
                0.062767 *
                Math.pow(n, 2)
                -
                0.77857 *
                n
                +
                1.3822
            );

    } else {

        const lnN =
            Math.log(n);

        mu =
            0.0038915 *
            Math.pow(lnN, 3)
            -
            0.083751 *
            Math.pow(lnN, 2)
            -
            0.31082 *
            lnN
            -
            1.5861;

        sigma =
            Math.exp(
                0.0030302 *
                Math.pow(lnN, 2)
                -
                0.082676 *
                lnN
                -
                0.4803
            );

    }


    /*
        Standardized statistic
    */

    const z =
        (y - mu) /
        sigma;


    /*
        Upper-tail probability
    */

    let pValue =
        1 - normalCDF(z);


    /*
        Numerical protection
    */

    pValue =
        Math.max(
            0,
            Math.min(1, pValue)
        );


    return pValue;

}
