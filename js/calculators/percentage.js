function updatePercentageMode() {

    const type =
        document.getElementById("solutionType").value;

    const label =
        document.getElementById("amountLabel");

    const input =
        document.getElementById("finalAmount");

    const formula =
        document.getElementById("formula");


    if (type === "wv") {

        label.textContent =
            "Final volume (mL)";

        input.placeholder =
            "Example: 250";

        formula.textContent =
            "% w/v = g solute / 100 mL solution";

    }


    else if (type === "vv") {

        label.textContent =
            "Final volume (mL)";

        input.placeholder =
            "Example: 250";

        formula.textContent =
            "% v/v = mL solute / 100 mL solution";

    }


    else if (type === "ww") {

        label.textContent =
            "Final mass (g)";

        input.placeholder =
            "Example: 250";

        formula.textContent =
            "% w/w = g solute / 100 g solution";

    }

}


function calculatePercentage() {

    const type =
        document.getElementById("solutionType").value;

    const percentage =
        Number(
            document.getElementById("percentage").value
        );

    const finalAmount =
        Number(
            document.getElementById("finalAmount").value
        );

    const result =
        document.getElementById("result");


    if (
        !Number.isFinite(percentage) ||
        !Number.isFinite(finalAmount) ||
        percentage <= 0 ||
        finalAmount <= 0
    ) {

        result.innerHTML =
            "Please enter valid values.";

        return;

    }


    const solute =
        (percentage * finalAmount) / 100;


    if (type === "wv") {

        result.innerHTML =

            "<strong>Required solute:</strong><br>" +

            solute.toFixed(2) +

            " g<br><br>" +

            "Prepare a final volume of " +

            finalAmount.toFixed(2) +

            " mL.";

    }


    else if (type === "vv") {

        result.innerHTML =

            "<strong>Required solute:</strong><br>" +

            solute.toFixed(2) +

            " mL<br><br>" +

            "Prepare a final volume of " +

            finalAmount.toFixed(2) +

            " mL.";

    }


    else if (type === "ww") {

        result.innerHTML =

            "<strong>Required solute:</strong><br>" +

            solute.toFixed(2) +

            " g<br><br>" +

            "Prepare a final solution mass of " +

            finalAmount.toFixed(2) +

            " g.";

    }

}


function resetCalculator() {

    document.getElementById("solutionType").value =
        "wv";

    document.getElementById("percentage").value =
        "";

    document.getElementById("finalAmount").value =
        "";

    document.getElementById("result").innerHTML =
        "Result will appear here";

    updatePercentageMode();

}


document.addEventListener(
    "DOMContentLoaded",
    function () {

        document
            .getElementById("solutionType")
            .addEventListener(
                "change",
                updatePercentageMode
            );

        updatePercentageMode();

    }
);
