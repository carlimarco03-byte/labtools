/* ===================================
   LABISTRY STATISTICAL TOOLS
   STATISTICS CONTROLLER
   =================================== */


/* ===================================
   ANALYSIS SELECTOR
   =================================== */

function calculateStatistics() {

    const analysisType =
        document.getElementById(
            "analysisType"
        )?.value;


    switch (analysisType) {

        case "descriptive":

            calculateDescriptiveStatistics();

            break;


        case "normality":

            calculateNormality();

            break;


        case "one-sample":

            calculateOneSampleTTest();

            break;


        case "two-group":

            calculateTwoGroupComparison();

            break;


        case "paired":

            calculatePairedTTestAnalysis();

            break;


        default:

            const result =
                document.getElementById(
                    "result"
                );


            if (result) {

                result.innerHTML = `

                    <div class="statistics-error">

                        <strong>
                            Please select a valid analysis.
                        </strong>

                    </div>

                `;

            }

    }

}


/* ===================================
   RESET
   =================================== */

function resetStatistics() {

    const input =
        document.getElementById(
            "dataInput"
        );


    const groupA =
        document.getElementById(
            "groupAInput"
        );


    const groupB =
        document.getElementById(
            "groupBInput"
        );


    const pairedGroupA =
        document.getElementById(
            "pairedGroupAInput"
        );


    const pairedGroupB =
        document.getElementById(
            "pairedGroupBInput"
        );


    const result =
        document.getElementById(
            "result"
        );


    /* Clear main data input */

    if (input) {

        input.value = "";

    }


    /* Clear Two-Group inputs */

    if (groupA) {

        groupA.value = "";

    }


    if (groupB) {

        groupB.value = "";

    }


    /* Clear Paired inputs */

    if (pairedGroupA) {

        pairedGroupA.value = "";

    }


    if (pairedGroupB) {

        pairedGroupB.value = "";

    }


    /* Reset hypothesized mean */

    const hypothesizedMean =
        document.getElementById(
            "hypothesizedMean"
        );


    if (hypothesizedMean) {

        hypothesizedMean.value =
            "0";

    }


    /* Reset results */

    if (result) {

        result.innerHTML = `
            Result will appear here
        `;

    }

}


/* ===================================
   INTERFACE INITIALIZATION
   =================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const input =
            document.getElementById(
                "dataInput"
            );


        const analysisType =
            document.getElementById(
                "analysisType"
            );


        const twoGroupInputs =
            document.getElementById(
                "twoGroupInputs"
            );


        const oneSampleInputs =
            document.getElementById(
                "oneSampleInputs"
            );


        const pairedInputs =
            document.getElementById(
                "pairedInputs"
            );


        /*
         * If the current HTML does not yet
         * contain the analysis selector or
         * two-group container, stop.
         */

        if (
            !analysisType ||
            !twoGroupInputs
        ) {

            return;

        }


        /* =================================
           UPDATE ANALYSIS INTERFACE
           ================================= */

        function updateAnalysisInterface() {


            /* ================================
               TWO-GROUP INPUTS
               ================================ */

            if (
                analysisType.value ===
                "two-group"
            ) {

                twoGroupInputs.style.display =
                    "block";


                if (input) {

                    input.parentElement.style.display =
                        "none";

                }

            } else {

                twoGroupInputs.style.display =
                    "none";

            }


            /* ================================
               ONE-SAMPLE INPUTS
               ================================ */

            if (oneSampleInputs) {

                if (
                    analysisType.value ===
                    "one-sample"
                ) {

                    oneSampleInputs.style.display =
                        "block";

                } else {

                    oneSampleInputs.style.display =
                        "none";

                }

            }


            /* ================================
               PAIRED INPUTS
               ================================ */

            if (pairedInputs) {

                if (
                    analysisType.value ===
                    "paired"
                ) {

                    pairedInputs.style.display =
                        "block";

                } else {

                    pairedInputs.style.display =
                        "none";

                }

            }


            /* ================================
               MAIN DATA INPUT
               ================================ */

            if (input) {

                if (
                    analysisType.value ===
                        "two-group" ||
                    analysisType.value ===
                        "paired"
                ) {

                    input.parentElement.style.display =
                        "none";

                } else {

                    input.parentElement.style.display =
                        "block";

                }

            }

        }


        /* =================================
           ANALYSIS TYPE CHANGE
           ================================= */

        analysisType.addEventListener(
            "change",
            updateAnalysisInterface
        );


        updateAnalysisInterface();


        /* =================================
           CTRL + ENTER
           ================================= */

        if (input) {

            input.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.ctrlKey &&
                        event.key === "Enter"
                    ) {

                        calculateStatistics();

                    }

                }
            );

        }

    }
);
