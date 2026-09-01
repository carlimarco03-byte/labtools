/* ===================================
   LABISTRY STATISTICAL TOOLS
   NORMALITY TESTS
   =================================== */


/* ===================================
   SHAPIRO–WILK
   =================================== */

function calculateShapiroWilk(data) {

    const n =
        data.length;


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
                Math.pow(
                    value - mean,
                    2
                ),
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
     * Expected normal order statistics
     * are estimated using the Blom
     * approximation.
     */

    const m = [];


    for (
        let i = 1;
        i <= n;
        i++
    ) {

        const p =
            (i - 0.375) /
            (n + 0.25);


        const z =
            inverseNormalCDF(p);


        m.push(z);

    }


    const mSquared =
        m.reduce(
            (sum, value) =>
                sum +
                value * value,
            0
        );


    const weights =
        m.map(
            value =>
                value /
                Math.sqrt(
                    mSquared
                )
        );


    let numerator = 0;


    for (
        let i = 0;
        i < n;
        i++
    ) {

        numerator +=
            weights[i] *
            sorted[i];

    }


    const W =
        Math.pow(
            numerator,
            2
        ) /
        denominator;


    /*
     * Approximate p-value.
     */

    const pValue =
        shapiroPValue(
            W,
            n
        );


    return {

        W:
            W,

        pValue:
            pValue

    };

}


/* ===================================
   SHAPIRO–WILK P-VALUE
   =================================== */

function shapiroPValue(
    W,
    n
) {

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
     * Approximation based on the
     * distribution of the Shapiro-Wilk
     * statistic.
     */

    const y =
        Math.log(
            1 - W
        );


    const lnN =
        Math.log(n);


    const mu =
        -1.5861 -
        0.31082 * lnN -
        0.083751 *
        lnN *
        lnN;


    const sigma =
        Math.exp(
            -0.4803 -
            0.082676 * lnN +
            0.0030302 *
            lnN *
            lnN
        );


    const z =
        (y - mu) /
        sigma;


    /*
     * Small W corresponds to
     * stronger evidence against
     * normality.
     */

    let p =
        1 -
        normalCDF(z);


    p =
        Math.max(
            0,
            Math.min(
                1,
                p
            )
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


    const result =
        document.getElementById(
            "result"
        );


    /* =================================
       VALIDATION
       ================================= */

    if (
        !validateParsedData(
            parsed,
            3
        )
    ) {

        return;

    }


    /* =================================
       SHAPIRO–WILK
       ================================= */

    const shapiro =
        calculateShapiroWilk(
            data
        );


    const W =
        shapiro.W;


    const pValue =
        shapiro.pValue;


    /* =================================
       INTERPRETATION
       ================================= */

    let interpretation;


    if (
        pValue < 0.05
    ) {

        interpretation =
            "The data show significant evidence of deviation from normality (p < 0.05).";

    } else {

        interpretation =
            "The data do not show significant evidence of deviation from normality (p ≥ 0.05).";

    }


    /* =================================
       RESULTS
       ================================= */

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
