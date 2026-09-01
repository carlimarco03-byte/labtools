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
        );


    const result =
        document.getElementById(
            "result"
        );


    if (!analysisType || !result) {

        return;

    }


    switch (analysisType.value) {

        case "descriptive":

            calculateDescriptiveStatistics();

            break;


        case "normality":

            calculateNormality();

            break;


        case "two-group":

            calculateTwoGroupComparison();

            break;


        default:

            result.innerHTML = `

                <div class="statistics-error">

                    <strong>
                        Please select a valid analysis.
                    </strong>

                </div>

            `;

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


    const result =
        document.getElementById(
            "result"
        );


    /* Clear main data input */

    if (input) {

        input.value = "";

    }


    /* Clear Group A */

    if (groupA) {

        groupA.value = "";

    }


    /* Clear Group B */

    if (groupB) {

        groupB.value = "";

    }


    /* Reset results */

    if (result) {

        result.innerHTML =
            "Result will appear here";

    }

}


/* ===================================
   INITIALIZATION
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


        /*
         * Stop initialization if the
         * required interface elements
         * are not present.
         */

        if (
            !analysisType ||
            !twoGroupInputs
        ) {

            return;

        }


        /* ==============================
           UPDATE ANALYSIS INTERFACE
           ============================== */

        function updateAnalysisInterface() {

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


                if (input) {

                    input.parentElement.style.display =
                        "block";

                }

            }

        }


        analysisType.addEventListener(
            "change",
            updateAnalysisInterface
        );


        updateAnalysisInterface();


        /* ==============================
           CTRL + ENTER
           ============================== */

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


