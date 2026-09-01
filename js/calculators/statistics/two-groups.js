/* ===================================
   LABISTRY STATISTICAL TOOLS
   TWO-GROUP COMPARISON
   =================================== */


/* ===================================
   TWO-GROUP COMPARISON
   =================================== */

function calculateTwoGroupComparison() {

    const groups =
        validateTwoGroups();


    if (!groups) {

        return;

    }


    const groupA =
        groups.groupA;


    const groupB =
        groups.groupB;


    const result =
        document.getElementById(
            "result"
        );


    /* =================================
       GROUP STATISTICS
       ================================= */

    const meanA =
        calculateMean(
            groupA
        );


    const meanB =
        calculateMean(
            groupB
        );


    const sdA =
        calculateStandardDeviation(
            groupA,
            true
        );


    const sdB =
        calculateStandardDeviation(
            groupB,
            true
        );


    const semA =
        calculateSEM(
            groupA
        );


    const semB =
        calculateSEM(
            groupB
        );


    const difference =
        meanA -
        meanB;


    /* =================================
       WELCH'S T-TEST
       ================================= */

    const welch =
        calculateWelchTTest(
            groupA,
            groupB
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
                            ${groupA.length}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Group A Mean
                        </span>

                        <strong>
                            ${formatStatistic(
                                meanA
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Group A SD
                        </span>

                        <strong>
                            ${formatStatistic(
                                sdA
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Group A SEM
                        </span>

                        <strong>
                            ${formatStatistic(
                                semA
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Group B (n)
                        </span>

                        <strong>
                            ${groupB.length}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Group B Mean
                        </span>

                        <strong>
                            ${formatStatistic(
                                meanB
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Group B SD
                        </span>

                        <strong>
                            ${formatStatistic(
                                sdB
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Group B SEM
                        </span>

                        <strong>
                            ${formatStatistic(
                                semB
                            )}
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
                    a statistically significant difference
                    between the group means.

                </small>

            </div>


        </div>

    `;

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

        t:
            t,

        df:
            df,

        pValue:
            pValue,

        standardError:
            standardError

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


    const x =
        df /
        (
            df +
            t * t
        );


    const probability =
        regularizedIncompleteBeta(
            x,
            df / 2,
            0.5
        );


    return probability;

}
