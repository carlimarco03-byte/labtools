/* ===================================
   LABISTRY STATISTICAL TOOLS
   TWO-GROUP COMPARISON
   =================================== */


/* ===================================
   PARSE GROUP DATA
   =================================== */

function parseGroupData(inputId) {

    const inputElement =
        document.getElementById(
            inputId
        );


    if (!inputElement) {

        return {

            data: [],

            invalid: []

        };

    }


    const input =
        inputElement.value.trim();


    if (!input) {

        return {

            data: [],

            invalid: []

        };

    }


    /*
     * Accept:
     * - commas
     * - spaces
     * - line breaks
     * - semicolons
     */

    const values =
        input.split(
            /[\s,;]+/
        );


    const data = [];

    const invalid = [];


    values.forEach(
        value => {

            if (value === "") {

                return;

            }


            const number =
                Number(value);


            if (
                Number.isFinite(number)
            ) {

                data.push(number);

            } else {

                invalid.push(value);

            }

        }
    );


    return {

        data: data,

        invalid: invalid

    };

}


/* ===================================
   VALIDATE TWO GROUPS
   =================================== */

function validateTwoGroups() {

    const groupA =
        parseGroupData(
            "groupAInput"
        );


    const groupB =
        parseGroupData(
            "groupBInput"
        );


    const result =
        document.getElementById(
            "result"
        );


    if (!result) {

        return null;

    }


    /* =================================
       INVALID VALUES
       ================================= */

    if (
        groupA.invalid.length > 0 ||
        groupB.invalid.length > 0
    ) {

        const invalidA =
            [
                ...new Set(
                    groupA.invalid
                )
            ];


        const invalidB =
            [
                ...new Set(
                    groupB.invalid
                )
            ];


        let message = "";


        if (
            invalidA.length > 0
        ) {

            message += `
                <strong>
                    Group A:
                </strong>

                ${invalidA.join(", ")}

                <br>
            `;

        }


        if (
            invalidB.length > 0
        ) {

            message += `
                <strong>
                    Group B:
                </strong>

                ${invalidB.join(", ")}

                <br>
            `;

        }


        result.innerHTML = `

            <div class="statistics-error">

                <strong>
                    Invalid data detected.
                </strong>

                <br><br>

                The following values are not valid
                numerical values:

                <br><br>

                ${message}

                <br>

                Please enter numerical values only.

            </div>

        `;

        return null;

    }


    /* =================================
       EMPTY GROUPS
       ================================= */

    if (
        groupA.data.length === 0 ||
        groupB.data.length === 0
    ) {

        result.innerHTML = `

            <div class="statistics-error">

                <strong>
                    Please enter numerical data
                    for both groups.
                </strong>

            </div>

        `;

        return null;

    }


    /* =================================
       MINIMUM SAMPLE SIZE
       ================================= */

    if (
        groupA.data.length < 2 ||
        groupB.data.length < 2
    ) {

        result.innerHTML = `

            <div class="statistics-error">

                <strong>
                    Each group must contain at least
                    two observations.
                </strong>

            </div>

        `;

        return null;

    }


    return {

        groupA: groupA.data,

        groupB: groupB.data

    };

}


/* ===================================
   WELCH'S T-TEST
   =================================== */

function calculateWelchTTest(
    groupA,
    groupB
) {

    const nA =
        groupA.length;


    const nB =
        groupB.length;


    const meanA =
        calculateMean(
            groupA
        );


    const meanB =
        calculateMean(
            groupB
        );


    const varianceA =
        calculateVariance(
            groupA,
            true
        );


    const varianceB =
        calculateVariance(
            groupB,
            true
        );


    /* =================================
       STANDARD ERROR
       ================================= */

    const standardError =
        Math.sqrt(
            (
                varianceA /
                nA
            ) +
            (
                varianceB /
                nB
            )
        );


    /*
     * If both groups have zero variance,
     * the standard error is zero.
     */

    if (
        standardError === 0
    ) {

        if (
            meanA === meanB
        ) {

            return {

                t: 0,

                df: NaN,

                pValue: 1,

                standardError: 0

            };

        }


        return {

            t: meanA > meanB
                ? Infinity
                : -Infinity,

            df: NaN,

            pValue: 0,

            standardError: 0

        };

    }


    /* =================================
       T STATISTIC
       ================================= */

    const t =
        (
            meanA -
            meanB
        ) /
        standardError;


    /* =================================
       WELCH–SATTERTHWAITE DF
       ================================= */

    const numerator =
        Math.pow(
            (
                varianceA /
                nA
            ) +
            (
                varianceB /
                nB
            ),
            2
        );


    const denominator =
        (
            Math.pow(
                varianceA /
                nA,
                2
            ) /
            (
                nA - 1
            )
        ) +
        (
            Math.pow(
                varianceB /
                nB,
                2
            ) /
            (
                nB - 1
            )
        );


    const df =
        numerator /
        denominator;


    /* =================================
       TWO-TAILED P-VALUE
       ================================= */

    const pValue =
        calculateTTestPValue(
            Math.abs(t),
            df
        );


    return {

        t: t,

        df: df,

        pValue: pValue,

        standardError: standardError

    };

}


/* ===================================
   T-TEST P-VALUE
   =================================== */

function calculateTTestPValue(
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


    /*
     * Two-tailed probability:
     *
     * P = I[x](df/2, 1/2)
     *
     * where
     *
     * x = df / (df + t²)
     */

    const x =
        df /
        (
            df +
            t * t
        );


    return regularizedIncompleteBeta(
        x,
        df / 2,
        0.5
    );

}


/* ===================================
   TWO-GROUP COMPARISON
   =================================== */

function calculateTwoGroupComparison() {

    const groups =
        validateTwoGroups();


    if (!groups) {

        return;

    }


    const A =
        groups.groupA;


    const B =
        groups.groupB;


    const result =
        document.getElementById(
            "result"
        );


    /* =================================
       DESCRIPTIVE STATISTICS
       ================================= */

    const meanA =
        calculateMean(A);


    const meanB =
        calculateMean(B);


    const sdA =
        calculateStandardDeviation(
            A,
            true
        );


    const sdB =
        calculateStandardDeviation(
            B,
            true
        );


    const semA =
        calculateSEM(A);


    const semB =
        calculateSEM(B);


    const difference =
        meanA -
        meanB;


    /* =================================
       WELCH'S T-TEST
       ================================= */

    const welch =
        calculateWelchTTest(
            A,
            B
        );


    /* =================================
       RESULTS
       ================================= */

    result.innerHTML = `

        <div class="statistics-result">

            <h3>
                Two-Group Comparison
            </h3>


            <!-- GROUP SUMMARY -->

            <div class="statistics-section">

                <h4>
                    Group Summary
                </h4>


                <div class="statistics-grid">

                    <div>

                        <span>
                            Group A (n)
                        </span>

                        <strong>
                            ${A.length}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Group A Mean
                        </span>

                        <strong>
                            ${formatStatistic(meanA)}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Group A SD
                        </span>

                        <strong>
                            ${formatStatistic(sdA)}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Group A SEM
                        </span>

                        <strong>
                            ${formatStatistic(semA)}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Group B (n)
                        </span>

                        <strong>
                            ${B.length}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Group B Mean
                        </span>

                        <strong>
                            ${formatStatistic(meanB)}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Group B SD
                        </span>

                        <strong>
                            ${formatStatistic(sdB)}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Group B SEM
                        </span>

                        <strong>
                            ${formatStatistic(semB)}
                        </strong>

                    </div>

                </div>

            </div>


            <!-- MEAN DIFFERENCE -->

            <div class="statistics-section">

                <h4>
                    Difference Between Means
                </h4>


                <div class="statistics-grid">

                    <div>

                        <span>
                            Mean difference (A − B)
                        </span>

                        <strong>
                            ${formatStatistic(
                                difference
                            )}
                        </strong>

                    </div>

                </div>

            </div>


            <!-- WELCH'S T-TEST -->

            <div class="statistics-section">

                <h4>
                    Welch's t-test
                </h4>


                <div class="statistics-grid">

                    <div>

                        <span>
                            t statistic
                        </span>

                        <strong>
                            ${formatStatistic(
                                welch.t
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Degrees of freedom
                        </span>

                        <strong>
                            ${formatStatistic(
                                welch.df
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            p-value
                        </span>

                        <strong>
                            ${formatStatistic(
                                welch.pValue
                            )}
                        </strong>

                    </div>

                </div>


                <small>

                    Two-tailed Welch's t-test.
                    A p-value below 0.05 indicates
                    statistically significant evidence
                    of a difference between the group means.

                </small>

            </div>


        </div>

    `;

}
