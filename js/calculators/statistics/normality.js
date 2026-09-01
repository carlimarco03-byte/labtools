/* ===================================
   LABISTRY STATISTICAL TOOLS
   NORMALITY TESTS
   =================================== */


/* ===================================
   SHAPIRO–WILK TEST
   =================================== */

function calculateShapiroWilk(data) {

    const n =
        data.length;


    /*
     * Shapiro–Wilk requires
     * at least 3 observations.
     */

    if (n < 3) {

        return {
            W: NaN,
            pValue: NaN
        };

    }


    /* =================================
       SORT DATA
       ================================= */

    const sorted =
        [...data].sort(
            (a, b) => a - b
        );


    /* =================================
       SAMPLE MEAN
       ================================= */

    const mean =
        calculateMean(sorted);


    /* =================================
       SUM OF SQUARED DEVIATIONS
       ================================= */

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


    /*
     * Constant data cannot be evaluated
     * in the usual way.
     */

    if (denominator === 0) {

        return {
            W: 1,
            pValue: 1
        };

    }


    /* =================================
       EXPECTED NORMAL ORDER STATISTICS
       ================================= */

    const expected = [];


    for (
        let i = 1;
        i <= n;
        i++
    ) {

        const probability =
            (
                i - 0.375
            ) /
            (
                n + 0.25
            );


        const z =
            inverseNormalCDF(
                probability
            );


        expected.push(z);

    }


    /* =================================
       NORMALIZED WEIGHTS
       ================================= */

    const sumSquares =
        expected.reduce(
            (sum, value) =>
                sum +
                value * value,
            0
        );


    const normalization =
        Math.sqrt(
            sumSquares
        );


    const weights =
        expected.map(
            value =>
                value /
                normalization
        );


    /* =================================
       WEIGHTED SUM
       ================================= */

    let weightedSum = 0;


    for (
        let i = 0;
        i < n;
        i++
    ) {

        weightedSum +=
            weights[i] *
            sorted[i];

    }


    /* =================================
       W STATISTIC
       ================================= */

    const W =
        Math.pow(
            weightedSum,
            2
        ) /
        denominator;


    /* =================================
       P-VALUE
       ================================= */

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


    /*
     * Numerical protection.
     */

    if (W >= 1) {

        return 1;

    }


    if (W <= 0) {

        return 0;

    }


    /*
     * Approximation of the
     * Shapiro–Wilk p-value.
     *
     * This transformation follows
     * the Royston-style approximation.
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
        (
            y -
            mu
        ) /
        sigma;


    /*
     * Smaller W corresponds
     * to stronger evidence
     * against normality.
     */

    let pValue =
        1 -
        normalCDF(z);


    /*
     * Keep p-value within
     * the valid [0, 1] interval.
     */

    pValue =
        Math.max(
            0,
            Math.min(
                1,
                pValue
            )
        );


    return pValue;

}


/* ===================================
   NORMALITY ANALYSIS
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

