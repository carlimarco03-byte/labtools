/* ===================================
   LABISTRY STATISTICAL TOOLS
   PAIRED T-TEST
   =================================== */


/* ===================================
   PAIRED T-TEST
   =================================== */

function calculatePairedTTest(
    groupA,
    groupB
) {

    if (
        !Array.isArray(groupA) ||
        !Array.isArray(groupB)
    ) {

        return null;

    }


    if (
        groupA.length < 2 ||
        groupB.length < 2
    ) {

        return null;

    }


    if (
        groupA.length !==
        groupB.length
    ) {

        return null;

    }


    if (
        !groupA.every(
            value =>
                Number.isFinite(value)
        ) ||
        !groupB.every(
            value =>
                Number.isFinite(value)
        )
    ) {

        return null;

    }


    const n =
        groupA.length;


    /* ===============================
       PAIRED DIFFERENCES
       =============================== */

    const differences =
        groupA.map(
            (value, index) =>
                value -
                groupB[index]
        );


    /* ===============================
       MEAN DIFFERENCE
       =============================== */

    const meanDifference =
        calculateMean(
            differences
        );


    /* ===============================
       SD OF DIFFERENCES
       =============================== */

    const standardDeviation =
        calculateStandardDeviation(
            differences,
            true
        );


    /* ===============================
       SEM
       =============================== */

    const sem =
        calculateSEM(
            differences
        );


    /* ===============================
       DEGREES OF FREEDOM
       =============================== */

    const degreesOfFreedom =
        n - 1;


    /* ===============================
       T STATISTIC
       =============================== */

    let tStatistic;


    if (sem === 0) {

        if (meanDifference === 0) {

            tStatistic =
                NaN;

        } else {

            tStatistic =
                meanDifference > 0
                    ? Infinity
                    : -Infinity;

        }

    } else {

        tStatistic =
            meanDifference /
            sem;

    }


    /* ===============================
       P-VALUE
       =============================== */

    let pValue;


    if (Number.isFinite(tStatistic)) {

        pValue =
            calculateTTestPValue(
                Math.abs(tStatistic),
                degreesOfFreedom
            );

    } else if (
        tStatistic === Infinity ||
        tStatistic === -Infinity
    ) {

        pValue =
            0;

    } else {

        pValue =
            NaN;

    }


    /* ===============================
       RESULT
       =============================== */

    return {

        n,

        differences,

        meanDifference,

        standardDeviation,

        sem,

        tStatistic,

        degreesOfFreedom,

        pValue

    };

}


/* ===================================
   PAIRED T-TEST CONTROLLER
   =================================== */

function calculatePairedTTestAnalysis() {

    const groupA =
        parseGroupData(
            "pairedGroupAInput"
        );


    const groupB =
        parseGroupData(
            "pairedGroupBInput"
        );


    if (
        !groupA ||
        !groupB
    ) {

        return;

    }


    /* ===============================
       MINIMUM SAMPLE SIZE
       =============================== */

    if (
        groupA.length < 2 ||
        groupB.length < 2
    ) {

        const result =
            document.getElementById(
                "result"
            );


        if (result) {

            result.innerHTML = `

                <div class="statistics-error">

                    <strong>
                        Each group must contain
                        at least 2 observations.
                    </strong>

                </div>

            `;

        }

        return;

    }


    /* ===============================
       EQUAL SAMPLE SIZE
       =============================== */

    if (
        groupA.length !==
        groupB.length
    ) {

        const result =
            document.getElementById(
                "result"
            );


        if (result) {

            result.innerHTML = `

                <div class="statistics-error">

                    <strong>
                        Both groups must contain
                        the same number of observations.
                    </strong>

                </div>

            `;

        }

        return;

    }


    /* ===============================
       CALCULATE TEST
       =============================== */

    const result =
        calculatePairedTTest(
            groupA,
            groupB
        );


    if (!result) {

        return;

    }


    /* ===============================
       OUTPUT
       =============================== */

    const output =
        document.getElementById(
            "result"
        );


    if (!output) {

        return;

    }


    output.innerHTML = `

        <div class="result-section">

            <h3>
                Paired t-test
            </h3>


            <div class="result-row">

                <span>
                    Sample size
                </span>

                <strong>
                    ${result.n}
                </strong>

            </div>


            <div class="result-row">

                <span>
                    Mean difference
                </span>

                <strong>
                    ${formatStatistic(
                        result.meanDifference
                    )}
                </strong>

            </div>


            <div class="result-row">

                <span>
                    SD of differences
                </span>

                <strong>
                    ${formatStatistic(
                        result.standardDeviation
                    )}
                </strong>

            </div>


            <div class="result-row">

                <span>
                    SEM of differences
                </span>

                <strong>
                    ${formatStatistic(
                        result.sem
                    )}
                </strong>

            </div>


            <div class="result-row">

                <span>
                    t statistic
                </span>

                <strong>
                    ${formatStatistic(
                        result.tStatistic
                    )}
                </strong>

            </div>


            <div class="result-row">

                <span>
                    Degrees of freedom
                </span>

                <strong>
                    ${formatStatistic(
                        result.degreesOfFreedom
                    )}
                </strong>

            </div>


            <div class="result-row">

                <span>
                    p-value
                </span>

                <strong>
                    ${formatStatistic(
                        result.pValue
                    )}
                </strong>

            </div>


        </div>

    `;

}
