/* ===================================
   LABISTRY STATISTICAL TOOLS
   DESCRIPTIVE STATISTICS
   =================================== */


/* ===================================
   DESCRIPTIVE STATISTICS
   =================================== */

function calculateDescriptiveStatistics() {

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
            2
        )
    ) {

        return;

    }


    /* =================================
       SAMPLE SIZE
       ================================= */

    const n =
        data.length;


    /* =================================
       BASIC STATISTICS
       ================================= */

    const mean =
        calculateMean(data);


    const median =
        calculateMedian(data);


    /* =================================
       POSITION & RANGE
       ================================= */

    const minimum =
        Math.min(...data);


    const maximum =
        Math.max(...data);


    const range =
        maximum -
        minimum;


    const q1 =
        calculateQuartile(
            data,
            0.25
        );


    const q3 =
        calculateQuartile(
            data,
            0.75
        );


    const iqr =
        q3 -
        q1;


    /* =================================
       VARIABILITY
       ================================= */

    const populationVariance =
        calculateVariance(
            data,
            false
        );


    const sampleVariance =
        calculateVariance(
            data,
            true
        );


    const populationSD =
        calculateStandardDeviation(
            data,
            false
        );


    const sampleSD =
        calculateStandardDeviation(
            data,
            true
        );


    const sem =
        calculateSEM(data);


    const cv =
        calculateCV(data);


    /* =================================
       CONFIDENCE INTERVAL
       ================================= */

    const confidenceInterval =
        calculateConfidenceInterval95(
            data
        );


    /* =================================
       RESULTS
       ================================= */

    result.innerHTML = `

        <div class="statistics-result">

            <h3>
                Descriptive Statistics
            </h3>


            <!-- BASIC STATISTICS -->

            <div class="statistics-section">

                <h4>
                    Basic Statistics
                </h4>


                <div class="statistics-grid">

                    <div>

                        <span>
                            Observations (n)
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
                            ${formatStatistic(mean)}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Median
                        </span>

                        <strong>
                            ${formatStatistic(median)}
                        </strong>

                    </div>

                </div>

            </div>


            <!-- POSITION & RANGE -->

            <div class="statistics-section">

                <h4>
                    Position & Range
                </h4>


                <div class="statistics-grid">

                    <div>

                        <span>
                            Minimum
                        </span>

                        <strong>
                            ${formatStatistic(minimum)}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Q1
                        </span>

                        <strong>
                            ${formatStatistic(q1)}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Q3
                        </span>

                        <strong>
                            ${formatStatistic(q3)}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Maximum
                        </span>

                        <strong>
                            ${formatStatistic(maximum)}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Range
                        </span>

                        <strong>
                            ${formatStatistic(range)}
                        </strong>

                    </div>


                    <div>

                        <span>
                            IQR
                        </span>

                        <strong>
                            ${formatStatistic(iqr)}
                        </strong>

                    </div>

                </div>

            </div>


            <!-- VARIABILITY -->

            <div class="statistics-section">

                <h4>
                    Variability
                </h4>


                <div class="statistics-grid">

                    <div>

                        <span>
                            Population SD
                        </span>

                        <strong>
                            ${formatStatistic(
                                populationSD
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Sample SD
                        </span>

                        <strong>
                            ${formatStatistic(
                                sampleSD
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Population variance
                        </span>

                        <strong>
                            ${formatStatistic(
                                populationVariance
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Sample variance
                        </span>

                        <strong>
                            ${formatStatistic(
                                sampleVariance
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            SEM
                        </span>

                        <strong>
                            ${formatStatistic(
                                sem
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            CV%
                        </span>

                        <strong>
                            ${formatStatistic(
                                cv
                            )}%
                        </strong>

                    </div>

                </div>

            </div>


            <!-- CONFIDENCE INTERVAL -->

            <div class="statistics-section">

                <h4>
                    95% Confidence Interval
                </h4>


                <div class="statistics-grid">

                    <div>

                        <span>
                            Lower limit
                        </span>

                        <strong>
                            ${formatStatistic(
                                confidenceInterval.lower
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Upper limit
                        </span>

                        <strong>
                            ${formatStatistic(
                                confidenceInterval.upper
                            )}
                        </strong>

                    </div>

                </div>

            </div>


        </div>

    `;

}
