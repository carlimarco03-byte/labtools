/* ===================================
   LABISTRY STATISTICAL TOOLS
   MATHEMATICAL FUNCTIONS
   =================================== */


/* ===================================
   STANDARD NORMAL CDF
   =================================== */

function normalCDF(x) {

    if (!Number.isFinite(x)) {

        return NaN;

    }


    const sign =
        x < 0 ? -1 : 1;


    const absoluteX =
        Math.abs(x) /
        Math.sqrt(2);


    const t =
        1 /
        (
            1 +
            0.3275911 *
            absoluteX
        );


    const a1 =
        0.254829592;

    const a2 =
        -0.284496736;

    const a3 =
        1.421413741;

    const a4 =
        -1.453152027;

    const a5 =
        1.061405429;


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
        Math.exp(
            -absoluteX *
            absoluteX
        );


    return (
        1 +
        sign * erf
    ) / 2;

}


/* ===================================
   INVERSE NORMAL CDF
   =================================== */

function inverseNormalCDF(p) {

    if (
        !Number.isFinite(p) ||
        p <= 0 ||
        p >= 1
    ) {

        return NaN;

    }


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


    const pLow =
        0.02425;


    const pHigh =
        1 -
        pLow;


    /* =================================
       LOWER REGION
       ================================= */

    if (
        p < pLow
    ) {

        const q =
            Math.sqrt(
                -2 *
                Math.log(p)
            );


        const numerator =
            ((((c[0] * q + c[1]) * q + c[2])
                * q + c[3])
                * q + c[4])
                * q + c[5];


        const denominator =
            (((d[0] * q + d[1]) * q + d[2])
                * q + d[3])
                * q + 1;


        return (
            numerator /
            denominator
        );

    }


    /* =================================
       CENTRAL REGION
       ================================= */

    if (
        p <= pHigh
    ) {

        const q =
            p -
            0.5;


        const r =
            q *
            q;


        const numerator =
            (((((a[0] * r + a[1]) * r + a[2])
                * r + a[3])
                * r + a[4])
                * r + a[5])
                * q;


        const denominator =
            ((((b[0] * r + b[1]) * r + b[2])
                * r + b[3])
                * r + b[4])
                * r + 1;


        return (
            numerator /
            denominator
        );

    }


    /* =================================
       UPPER REGION
       ================================= */

    const q =
        Math.sqrt(
            -2 *
            Math.log(
                1 -
                p
            )
        );


    const numerator =
        ((((c[0] * q + c[1]) * q + c[2])
            * q + c[3])
            * q + c[4])
            * q + c[5];


    const denominator =
        (((d[0] * q + d[1]) * q + d[2])
            * q + d[3])
            * q + 1;


    return (
        -numerator /
        denominator
    );

}


/* ===================================
   LOG GAMMA
   =================================== */

function logGamma(z) {

    if (
        !Number.isFinite(z) ||
        z <= 0
    ) {

        return NaN;

    }


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


    if (
        z < 0.5
    ) {

        return (
            Math.log(Math.PI) -
            Math.log(
                Math.sin(
                    Math.PI *
                    z
                )
            ) -
            logGamma(
                1 -
                z
            )
        );

    }


    z -= 1;


    let x =
        0.99999999999980993;


    for (
        let i = 0;
        i < coefficients.length;
        i++
    ) {

        x +=
            coefficients[i] /
            (
                z +
                i +
                1
            );

    }


    const t =
        z +
        coefficients.length -
        0.5;


    return (

        0.5 *
        Math.log(
            2 *
            Math.PI
        ) +

        (
            z +
            0.5
        ) *
        Math.log(t) -

        t +

        Math.log(x)

    );

}


/* ===================================
   LOG BETA FUNCTION
   =================================== */

function logBeta(
    a,
    b
) {

    if (
        a <= 0 ||
        b <= 0
    ) {

        return NaN;

    }


    return (
        logGamma(a) +
        logGamma(b) -
        logGamma(
            a +
            b
        )
    );

}


/* ===================================
   REGULARIZED INCOMPLETE BETA
   =================================== */

function regularizedIncompleteBeta(
    x,
    a,
    b
) {

    if (
        !Number.isFinite(x) ||
        !Number.isFinite(a) ||
        !Number.isFinite(b) ||
        a <= 0 ||
        b <= 0
    ) {

        return NaN;

    }


    if (
        x <= 0
    ) {

        return 0;

    }


    if (
        x >= 1
    ) {

        return 1;

    }


    const maxIterations =
        200;


    const epsilon =
        1e-12;


    function betaFraction(
        x,
        a,
        b
    ) {

        const qab =
            a +
            b;


        const qap =
            a +
            1;


        const qam =
            a -
            1;


        let c =
            1;


        let d =
            1 -
            (
                qab *
                x
            ) /
            qap;


        if (
            Math.abs(d) <
            1e-30
        ) {

            d =
                1e-30;

        }


        d =
            1 /
            d;


        let h =
            d;


        for (
            let m = 1;
            m <= maxIterations;
            m++
        ) {

            const m2 =
                2 *
                m;


            let aa =
                m *
                (
                    b -
                    m
                ) *
                x /
                (
                    (
                        qam +
                        m2
                    ) *
                    (
                        a +
                        m2
                    )
                );


            d =
                1 +
                aa *
                d;


            if (
                Math.abs(d) <
                1e-30
            ) {

                d =
                    1e-30;

            }


            c =
                1 +
                aa /
                c;


            if (
                Math.abs(c) <
                1e-30
            ) {

                c =
                    1e-30;

            }


            d =
                1 /
                d;


            h *=
                d *
                c;


            aa =
                -(
                    (
                        a +
                        m
                    ) *
                    (
                        qab +
                        m
                    ) *
                    x
                ) /
                (
                    (
                        a +
                        m2
                    ) *
                    (
                        qap +
                        m2
                    )
                );


            d =
                1 +
                aa *
                d;


            if (
                Math.abs(d) <
                1e-30
            ) {

                d =
                    1e-30;

            }


            c =
                1 +
                aa /
                c;


            if (
                Math.abs(c) <
                1e-30
            ) {

                c =
                    1e-30;

            }


            d =
                1 /
                d;


            const delta =
                d *
                c;


            h *=
                delta;


            if (
                Math.abs(
                    delta -
                    1
                ) <
                epsilon
            ) {

                break;

            }

        }


        return h;

    }


    const logBT =
        a *
        Math.log(x) +

        b *
        Math.log(
            1 -
            x
        ) -

        logBeta(
            a,
            b
        );


    const bt =
        Math.exp(
            logBT
        );


    if (
        x <
        (
            a +
            1
        ) /
        (
            a +
            b +
            2
        )
    ) {

        return (
            bt *
            betaFraction(
                x,
                a,
                b
            )
        ) /
        a;

    }


    return (
        1 -
        (
            bt *
            betaFraction(
                1 -
                x,
                b,
                a
            )
        ) /
        b
    );

}


/* ===================================
   STUDENT'S T CDF
   =================================== */

function studentTCDF(
    t,
    df
) {

    if (
        !Number.isFinite(t) ||
        !Number.isFinite(df) ||
        df <= 0
    ) {

        return NaN;

    }


    if (
        t === 0
    ) {

        return 0.5;

    }


    const x =
        df /
        (
            df +
            t *
            t
        );


    const ibeta =
        regularizedIncompleteBeta(
            x,
            df / 2,
            0.5
        );


    if (
        t > 0
    ) {

        return (
            1 -
            0.5 *
            ibeta
        );

    }


    return (
        0.5 *
        ibeta
    );

}


/* ===================================
   STUDENT'S T P-VALUE
   =================================== */

function studentTTwoTailedPValue(
    t,
    df
) {

    if (
        !Number.isFinite(t) ||
        !Number.isFinite(df) ||
        df <= 0
    ) {

        return NaN;

    }


    const probability =
        studentTCDF(
            Math.abs(t),
            df
        );


    return (
        2 *
        (
            1 -
            probability
        )
    );

}


/* ===================================
   T CRITICAL VALUE — 95% CI
   =================================== */

function getTValue95(df) {

    if (
        !Number.isFinite(df) ||
        df <= 0
    ) {

        return NaN;

    }


    const target =
        0.975;


    /*
     * For very large degrees
     * of freedom, Student's t
     * approaches the standard
     * normal distribution.
     */

    if (
        df > 100000
    ) {

        return 1.959963984540054;

    }


    let lower =
        0;


    let upper =
        10;


    while (
        studentTCDF(
            upper,
            df
        ) <
        target
    ) {

        upper *=
            2;

    }


    for (
        let i = 0;
        i < 100;
        i++
    ) {

        const middle =
            (
                lower +
                upper
            ) /
            2;


        const probability =
            studentTCDF(
                middle,
                df
            );


        if (
            probability <
            target
        ) {

            lower =
                middle;

        } else {

            upper =
                middle;

        }

    }


    return (
        lower +
        upper
    ) / 2;

}


/* ===================================
   NORMAL APPROXIMATION FOR
   MANN–WHITNEY U TEST
   =================================== */

function calculateMannWhitneyPValue(
    z
) {

    if (!Number.isFinite(z)) {

        return NaN;

    }


    const probability =
        normalCDF(
            Math.abs(z)
        );


    return 2 *
        (
            1 -
            probability
        );

}



/* ===================================
   MANN–WHITNEY U STATISTIC
   =================================== */

function calculateMannWhitneyU(
    groupA,
    groupB
) {

    if (
        !Array.isArray(groupA) ||
        !Array.isArray(groupB) ||
        groupA.length === 0 ||
        groupB.length === 0
    ) {

        return {

            U1: NaN,
            U2: NaN,
            U: NaN,
            z: NaN,
            pValue: NaN

        };

    }


    const combined = [];


    groupA.forEach(
        value => {

            combined.push({

                value: value,
                group: "A"

            });

        }
    );


    groupB.forEach(
        value => {

            combined.push({

                value: value,
                group: "B"

            });

        }
    );


    combined.sort(
        (a, b) =>
            a.value - b.value
    );


    /* =================================
       RANKS WITH TIE HANDLING
       ================================= */

    let rank = 1;

    let rankSumA = 0;

    let i = 0;


    /*
        Store the size of each tie group.

        Example:

        [1, 1, 2, 3, 3, 3]

        tie groups:
        2, 1, 3
    */

    const tieGroupSizes = [];


    while (
        i < combined.length
    ) {

        let j =
            i + 1;


        while (
            j < combined.length &&
            combined[j].value ===
            combined[i].value
        ) {

            j++;

        }


        const tieSize =
            j - i;


        tieGroupSizes.push(
            tieSize
        );


        const averageRank =
            (
                rank +
                (rank + tieSize - 1)
            ) / 2;


        for (
            let k = i;
            k < j;
            k++
        ) {

            if (
                combined[k].group ===
                "A"
            ) {

                rankSumA +=
                    averageRank;

            }

        }


        rank +=
            tieSize;


        i =
            j;

    }


    /* =================================
       U STATISTICS
       ================================= */

    const nA =
        groupA.length;


    const nB =
        groupB.length;


    const n =
        nA + nB;


    const U1 =
        rankSumA -
        (
            nA *
            (nA + 1)
        ) / 2;


    const U2 =
        nA *
        nB -
        U1;


    const U =
        Math.min(
            U1,
            U2
        );


    /* =================================
       MEAN U
       ================================= */

    const meanU =
        (
            nA *
            nB
        ) / 2;


    /* =================================
       TIE-CORRECTED VARIANCE
       ================================= */

    let tieCorrectionTerm = 0;


    tieGroupSizes.forEach(
        tieSize => {

            if (
                tieSize > 1
            ) {

                tieCorrectionTerm +=
                    (
                        Math.pow(
                            tieSize,
                            3
                        ) -
                        tieSize
                    );

            }

        }
    );


    let varianceU;


    if (
        n > 1
    ) {

        varianceU =
            (
                nA *
                nB
            ) / 12 *
            (
                n + 1 -
                tieCorrectionTerm /
                (
                    n *
                    (n - 1)
                )
            );

    }
    else {

        varianceU =
            NaN;

    }


    const standardDeviationU =
        Math.sqrt(
            varianceU
        );


    /* =================================
       DEGENERATE CASE
       ================================= */

    /*
        If every observation has the
        same value, there is no variance
        in the ranks.

        In this situation the normal
        approximation is undefined.
    */

    let z = NaN;


    if (
        standardDeviationU >
        0
    ) {

        /* =================================
           CONTINUITY CORRECTION
           ================================= */

        let continuityCorrection = 0;


        if (
            U < meanU
        ) {

            continuityCorrection =
                0.5;

        }
        else if (
            U > meanU
        ) {

            continuityCorrection =
                -0.5;

        }


        z =
            (
                U -
                meanU +
                continuityCorrection
            ) /
            standardDeviationU;

    }


    /* =================================
       P-VALUE
       ================================= */

    const pValue =
        calculateMannWhitneyPValue(
            z
        );


    return {

        U1:
            U1,

        U2:
            U2,

        U:
            U,

        z:
            z,

        pValue:
            pValue

    };

}



/* ===================================
   D'AGOSTINO-PEARSON NORMALITY TEST
   =================================== */


/*
    Sample skewness
*/

function calculateSkewness(data) {

    const n = data.length;

    if (n < 3) {
        return NaN;
    }

    const mean = calculateMean(data);

    let m2 = 0;
    let m3 = 0;

    for (let i = 0; i < n; i++) {

        const deviation =
            data[i] - mean;

        m2 +=
            deviation * deviation;

        m3 +=
            deviation * deviation * deviation;

    }

    if (m2 === 0) {
        return 0;
    }

    /*
        Unbiased sample skewness
    */

    const s =
        Math.sqrt(
            m2 / (n - 1)
        );

    const skewness =
        (n / ((n - 1) * (n - 2))) *
        (m3 / Math.pow(s, 3));

    return skewness;
}


/*
    Sample excess kurtosis
*/

function calculateKurtosis(data) {

    const n = data.length;

    if (n < 4) {
        return NaN;
    }

    const mean = calculateMean(data);

    let m2 = 0;
    let m4 = 0;

    for (let i = 0; i < n; i++) {

        const deviation =
            data[i] - mean;

        const squared =
            deviation * deviation;

        m2 += squared;

        m4 +=
            squared * squared;

    }

    if (m2 === 0) {
        return 0;
    }

    /*
        Unbiased excess kurtosis

        Normal distribution → 0
    */

    const variance =
        m2 / (n - 1);

    const rawKurtosis =
        (m4 / n) /
        Math.pow(variance, 2);

    const excessKurtosis =
        (
            (n - 1) *
            (
                (n + 1) *
                rawKurtosis
                - 3 *
                (n - 1)
            )
        )
        /
        (
            (n - 2) *
            (n - 3)
        );

    return excessKurtosis;
}


/*
    Log Gamma helper

    Already available above in this file.
*/


/*
    Chi-square survival probability

    P(X >= x)
*/

function chiSquareSurvival(x, df) {

    if (
        !Number.isFinite(x) ||
        !Number.isFinite(df) ||
        x < 0 ||
        df <= 0
    ) {
        return NaN;
    }

    /*
        For the D'Agostino-Pearson test,
        df = 2.

        The chi-square survival function
        for df = 2 has a simple closed form:

            P(X >= x) = exp(-x / 2)
    */

    if (df === 2) {

        return Math.exp(
            -x / 2
        );

    }

    /*
        General fallback using the
        regularized incomplete gamma
        function would be implemented here
        if additional chi-square tests
        are required in the future.
    */

    return NaN;
}

/* ===================================
   D'AGOSTINO-PEARSON NORMALITY TEST
   =================================== */

function calculateDAgostinoPearson(data) {

    const n = data.length;

    /*
        D'Agostino-Pearson is not reliable
        for very small samples.

        Labistry will use it for n >= 8.
    */

    if (n < 8) {

        return {
            available: false,
            K2: NaN,
            pValue: NaN,
            skewness: calculateSkewness(data),
            kurtosis: calculateKurtosis(data)
        };

    }


    const skewness =
        calculateSkewness(data);

    const kurtosis =
        calculateKurtosis(data);


    if (
        !Number.isFinite(skewness) ||
        !Number.isFinite(kurtosis)
    ) {

        return {
            available: false,
            K2: NaN,
            pValue: NaN,
            skewness,
            kurtosis
        };

    }


    /* =================================
       SKEWNESS TRANSFORMATION
       ================================= */

    /*
        Approximate standard error
        of sample skewness.
    */

    const skewnessSE =
        Math.sqrt(
            6 * n * (n - 1)
            /
            (
                (n - 2) *
                (n + 1) *
                (n + 3)
            )
        );


    const zSkewness =
        skewness /
        skewnessSE;


    /*
        Finite-sample correction.

        This transformation improves the
        approximation of skewness to a
        standard normal distribution.
    */

    const y =
        zSkewness *
        Math.sqrt(
            (
                (n + 1) *
                (n + 3)
            )
            /
            (
                6 *
                (n - 2)
            )
        );


    const beta2 =
        3 *
        (
            n * n
            + 27 * n
            - 70
        )
        /
        (
            (n - 2) *
            (n + 5)
        );


    const W =
        -1 +
        Math.sqrt(
            2 *
            (beta2 - 1)
        );


    /*
        Numerical protection.
    */

    const Wsafe =
        Math.max(
            1.0000001,
            W
        );


    const delta =
        1 /
        Math.sqrt(
            Math.log(Wsafe)
        );


    const alpha =
        Math.sqrt(
            2 /
            (Wsafe - 1)
        );


    const transformedSkewness =
        alpha *
        Math.asinh(
            y / delta
        );


    /* =================================
       KURTOSIS TRANSFORMATION
       ================================= */

    /*
        Expected excess kurtosis
        for a finite sample.
    */

    const expectedKurtosis =
        -6 /
        (n + 1);


    /*
        Variance of sample excess
        kurtosis.
    */

    const varianceKurtosis =
        24 *
        n *
        (n - 2) *
        (n - 3)
        /
        (
            Math.pow(n + 1, 2) *
            (n + 3) *
            (n + 5)
        );


    const zKurtosis =
        (
            kurtosis -
            expectedKurtosis
        )
        /
        Math.sqrt(
            varianceKurtosis
        );


    /*
        The transformed skewness and
        kurtosis are approximately
        standard normal.
    */


    /* =================================
       OMNIBUS STATISTIC
       ================================= */

    const K2 =
        Math.pow(
            transformedSkewness,
            2
        )
        +
        Math.pow(
            zKurtosis,
            2
        );


    /*
        Under H0:

            K² ~ Chi-square(df = 2)

        For df = 2:

            p = exp(-K² / 2)
    */

    const pValue =
        chiSquareSurvival(
            K2,
            2
        );


    return {

        available: true,

        K2,

        pValue,

        skewness,

        kurtosis

    };

}
