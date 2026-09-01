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

