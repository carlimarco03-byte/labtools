/* ===================================
   LABISTRY STATISTICAL TOOLS
   ONE-SAMPLE T-TEST
   =================================== */


/* ===================================
   ONE-SAMPLE T-TEST
   =================================== */

function calculateOneSampleTTest() {

    const parsed =
        parseData("dataInput");


    if (
        !validateParsedData(
            parsed,
            2
        )
    ) {

        return;

    }


    const data =
        parsed.data;


    const result =
        document.getElementById(
            "result"
        );


    /* =================================
       SAMPLE STATISTICS
       ================================= */

    const n =
        data.length;


    const mean =
        calculateMean(
            data
        );


    const sd =
        calculateStandardDeviation(
            data,
            true
        );


    const sem =
        calculateSEM(
            data
        );


   /* =================================
   NULL HYPOTHESIS
   ================================= */

/*
 * H0: population mean = μ0
 *
 * The hypothesized mean is provided
 * by the user through the interface.
 */

const hypothesizedMeanInput =
    document.getElementById(
        "hypothesizedMean"
    );

const hypothesizedMean =
    Number(
        hypothesizedMeanInput.value
    );

   if (
    !Number.isFinite(
        hypothesizedMean
    )
) {

    return;

}


    /* =================================
       T STATISTIC
       ================================= */

    const difference =
        mean -
        hypothesizedMean;


    const t =
        difference /
        sem;


    /* =================================
       DEGREES OF FREEDOM
       ================================= */

    const df =
        n - 1;


    /* =================================
       TWO-TAILED P-VALUE
       ================================= */

    const pValue =
        calculateTTestPValue(
            Math.abs(t),
            df
        );


    /* =================================
       RESULTS
       ================================= */

    result.innerHTML = `

        <div class="statistics-result">

            <h3>
                One-Sample t-Test
            </h3>


            <!-- SAMPLE SUMMARY -->

            <div class="statistics-section">

                <h4>
                    Sample Summary
                </h4>


                <div class="statistics-grid">

                    <div>

                        <span>
                            Sample size (n)
                        </span>

                        <strong>
                            ${n}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Mean
                        </span>

                        <strong>
                            ${formatStatistic(
                                mean
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Standard deviation
                        </span>

                        <strong>
                            ${formatStatistic(
                                sd
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Standard error
                        </span>

                        <strong>
                            ${formatStatistic(
                                sem
                            )}
                        </strong>

                    </div>

                </div>

            </div>


            <!-- HYPOTHESIS -->

            <div class="statistics-section">

                <h4>
                    Hypothesis
                </h4>


                <div class="statistics-grid">

                    <div>

                        <span>
                            Hypothesized mean (μ₀)
                        </span>

                        <strong>
                            ${formatStatistic(
                                hypothesizedMean
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Mean difference
                        </span>

                        <strong>
                            ${formatStatistic(
                                difference
                            )}
                        </strong>

                    </div>

                </div>

            </div>


            <!-- T-TEST -->

            <div class="statistics-section">

                <h4>
                    One-Sample t-Test
                </h4>


                <div class="statistics-grid">

                    <div>

                        <span>
                            t statistic
                        </span>

                        <strong>
                            ${formatStatistic(
                                t
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Degrees of freedom
                        </span>

                        <strong>
                            ${formatStatistic(
                                df
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            p-value
                        </span>

                        <strong>
                            ${formatStatistic(
                                pValue
                            )}
                        </strong>

                    </div>

                </div>


                <small>

    Two-tailed one-sample t-test
    against the specified hypothesized mean.
    A p-value below 0.05 indicates
    a statistically significant difference
    from the hypothesized mean.

      </small>

            </div>


        </div>

    `;

}
