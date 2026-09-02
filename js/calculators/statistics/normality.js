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


/* ===================================
   CONSTANT DATA CHECK
   =================================== */

const min =
    Math.min(...data);

const max =
    Math.max(...data);

if (min === max) {

    document.getElementById("result").innerHTML = `

        <div class="statistics-error">

            <strong>
                Normality tests cannot be performed.
            </strong>

            <p>
                All observations are identical (zero variance).
            </p>

        </div>

    `;

    return;
}


const result =
    calculateShapiroWilk(data);

if (result.error) {

    document.getElementById("result").innerHTML = `
        <div class="statistics-error">
            <strong>${result.error}</strong>
        </div>
    `;

    return;
}

   const dagostino =
    calculateDAgostinoPearson(data);

   /* ===================================
   COMBINED INTERPRETATION
   =================================== */

const shapiroNonNormal =
    result.pValue < 0.05;

const dagostinoAvailable =
    dagostino.available;

const dagostinoNonNormal =
    dagostinoAvailable &&
    dagostino.pValue < 0.05;


let interpretation;
let recommendation;


if (!dagostinoAvailable) {

    /*
        For small samples, rely on
        Shapiro-Wilk only.
    */

    if (shapiroNonNormal) {

        interpretation =
            "The Shapiro–Wilk test provides evidence against normality.";

        recommendation =
            "Consider a non-parametric statistical method or an appropriate data transformation.";

    } else {

        interpretation =
            "The Shapiro–Wilk test provides no significant evidence against normality.";

        recommendation =
            "Parametric statistical methods may be appropriate, provided that other assumptions are also satisfied.";

    }

} else {

    /*
        Both tests available.
    */

    if (
        shapiroNonNormal &&
        dagostinoNonNormal
    ) {

        interpretation =
            "Both normality tests provide evidence against a normal distribution.";

        recommendation =
            "Consider using a non-parametric statistical method or an appropriate data transformation.";

    }

    else if (
        !shapiroNonNormal &&
        !dagostinoNonNormal
    ) {

        interpretation =
            "Neither normality test provides significant evidence against a normal distribution.";

        recommendation =
            "Parametric statistical methods may be appropriate, provided that other assumptions are also satisfied.";

    }

    else {

        interpretation =
            "The normality tests provide discordant results.";

        recommendation =
            "Inspect the data distribution and Q–Q plot before selecting a parametric or non-parametric method.";

    }

}
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

    <h4>D’Agostino–Pearson Test</h4>

    ${
        dagostino.available
        ? `
            <div class="statistics-row">
                <span>K² statistic</span>
                <strong>${formatStatistic(dagostino.K2)}</strong>
            </div>

            <div class="statistics-row">
                <span>Skewness</span>
                <strong>${formatStatistic(dagostino.skewness)}</strong>
            </div>

            <div class="statistics-row">
                <span>Excess kurtosis</span>
                <strong>${formatStatistic(dagostino.kurtosis)}</strong>
            </div>

            <div class="statistics-row">
                <span>p-value</span>
                <strong>${
                    dagostino.pValue < 0.000001
                        ? "p < 0.000001"
                        : formatStatistic(dagostino.pValue)
                }</strong>
            </div>
        `
        : `
            <p>
                The D’Agostino–Pearson test requires at least
                8 observations.
            </p>
        `
    }

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

    if (n < 3) {

        return {
            W: NaN,
            pValue: NaN,
            error:
                "The Shapiro–Wilk test requires at least 3 observations."
        };

    }

    if (n > 5000) {

        return {
            W: NaN,
            pValue: NaN,
            error:
                "The Shapiro–Wilk test is limited to 5000 observations."
        };

    }


    const x =
        [...data].sort((a, b) => a - b);


    /*
        Check for constant data
    */

    const range =
        x[n - 1] - x[0];

   


    /*
        AS R94 / Royston coefficients
    */

    const g = [
        -2.273,
        0.459
    ];

    const c1 = [
        0.0,
        0.221157,
        -0.147981,
        -2.07119,
        4.434685,
        -2.706056
    ];

    const c2 = [
        0.0,
        0.042981,
        -0.293762,
        -1.752461,
        5.682633,
        -3.582633
    ];

    const c3 = [
        0.544,
        -0.39978,
        0.025054,
        -0.0006714
    ];

    const c4 = [
        1.3822,
        -0.77857,
        0.062767,
        -0.0020322
    ];

    const c5 = [
        -1.5861,
        -0.31082,
        -0.083751,
        0.0038915
    ];

    const c6 = [
        -0.4803,
        -0.082676,
        0.0030302
    ];


    /*
        Polynomial evaluation
    */

    function polynomial(coefficients, x) {

        let result =
            coefficients[0];

        if (coefficients.length > 1) {

            let p =
                x *
                coefficients[
                    coefficients.length - 1
                ];

            for (
                let j = coefficients.length - 2;
                j > 0;
                j--
            ) {

                p =
                    (p + coefficients[j]) *
                    x;

            }

            result += p;
        }

        return result;
    }


    /*
        Number of coefficients
    */

    const nn2 =
        Math.floor(n / 2);

    const a =
        new Array(nn2 + 1);


    /*
        Calculate Shapiro-Wilk coefficients
    */

    if (n === 3) {

        a[1] =
            0.70710678;

    } else {

        const an =
            n;

        const an25 =
            an + 0.25;

        let summ2 = 0;


        for (
            let i = 1;
            i <= nn2;
            i++
        ) {

            const p =
                (i - 0.375) /
                an25;

            a[i] =
                inverseNormalCDF(p);

            summ2 +=
                a[i] *
                a[i];

        }


        summ2 *= 2;


        const ssumm2 =
            Math.sqrt(summ2);


        const rsn =
            1 /
            Math.sqrt(an);


        /*
            First coefficient
        */

        let a1 =
            polynomial(c1, rsn)
            -
            a[1] / ssumm2;


        let i1;
        let fac;


        /*
            Second coefficient
        */

        if (n > 5) {

            i1 = 3;


            const a2 =
                -a[2] / ssumm2
                +
                polynomial(c2, rsn);


            fac =
                Math.sqrt(
                    (
                        summ2
                        -
                        2 *
                        a[1] *
                        a[1]
                        -
                        2 *
                        a[2] *
                        a[2]
                    )
                    /
                    (
                        1
                        -
                        2 *
                        a1 *
                        a1
                        -
                        2 *
                        a2 *
                        a2
                    )
                );


            a[2] =
                a2;

        } else {

            i1 = 2;


            fac =
                Math.sqrt(
                    (
                        summ2
                        -
                        2 *
                        a[1] *
                        a[1]
                    )
                    /
                    (
                        1
                        -
                        2 *
                        a1 *
                        a1
                    )
                );

        }


        a[1] =
            a1;


        /*
            Normalize remaining coefficients
        */

        for (
            let i = i1;
            i <= nn2;
            i++
        ) {

            a[i] =
                a[i] /
                (-fac);

        }

    }


    /*
        Calculate W

        Scaling by the range improves
        numerical stability.
    */

    const scaled =
        x.map(
            value =>
                value / range
        );


    let xx =
        scaled[0];

    let sx =
        xx;

    let sa =
        -a[1];


    let i = 1;
    let j = n - 1;


    while (i < n) {

        const xi =
            scaled[i];


        sx +=
            xi;


        i++;


        if (i !== j) {

            const index =
                Math.min(i, j);


            const sign =
                i - j > 0
                    ? 1
                    : -1;


            sa +=
                sign *
                a[index];

        }


        xx =
            xi;

        j--;

    }


    sa /=
        n;

    sx /=
        n;


    /*
        Calculate covariance components
    */

    let ssa = 0;
    let ssx = 0;
    let sax = 0;


    i = 0;
    j = n - 1;


    while (i < n) {

        let asa;


        if (i !== j) {

            const index =
                1 +
                Math.min(i, j);


            const sign =
                i - j > 0
                    ? 1
                    : -1;


            asa =
                sign *
                a[index]
                -
                sa;

        } else {

            asa =
                -sa;

        }


        const xsx =
            scaled[i] -
            sx;


        ssa +=
            asa *
            asa;

        ssx +=
            xsx *
            xsx;

        sax +=
            asa *
            xsx;


        i++;
        j--;

    }


    /*
        Calculate 1 - W first.

        This improves numerical precision
        when W is very close to 1.
    */

    const ssassx =
        Math.sqrt(
            ssa * ssx
        );


    const w1 =
        (
            (ssassx - sax) *
            (ssassx + sax)
        )
        /
        (
            ssa * ssx
        );


    const W =
        Math.max(
            0,
            Math.min(
                1,
                1 - w1
            )
        );


    /*
        Calculate p-value
    */

    let pValue;


    /*
        n = 3 has an exact p-value
    */

    if (n === 3) {

        const pi6 =
            6 / Math.PI;

        const stqr =
            Math.asin(
                Math.sqrt(0.75)
            );


        pValue =
            pi6 *
            (
                Math.asin(
                    Math.sqrt(W)
                )
                -
                stqr
            );


        pValue =
            Math.max(
                0,
                Math.min(
                    1,
                    pValue
                )
            );


    } else {

        /*
            Royston approximation
        */

        let y =
            Math.log(w1);


        const an =
            n;


        const logN =
            Math.log(an);


        let mean;
        let sigma;


        /*
            n = 4 ... 11
        */

        if (n <= 11) {

            const gamma =
                polynomial(
                    g,
                    an
                );


            /*
                Extremely small p-value
            */

            if (y >= gamma) {

                pValue =
                    1e-99;

            } else {

                y =
                    -Math.log(
                        gamma - y
                    );


                mean =
                    polynomial(
                        c3,
                        an
                    );


                sigma =
                    Math.exp(
                        polynomial(
                            c4,
                            an
                        )
                    );


                const z =
                    (y - mean) /
                    sigma;


                /*
                    Upper-tail probability
                */

                pValue =
                    1 -
                    normalCDF(z);

            }

        }

        /*
            n >= 12
        */

        else {

            mean =
                polynomial(
                    c5,
                    logN
                );


            sigma =
                Math.exp(
                    polynomial(
                        c6,
                        logN
                    )
                );


            const z =
                (
                    y - mean
                )
                /
                sigma;


            pValue =
                1 -
                normalCDF(z);

        }


        /*
            Numerical protection
        */

        pValue =
            Math.max(
                0,
                Math.min(
                    1,
                    pValue
                )
            );

    }


    return {

        W,

        pValue

    };

}
