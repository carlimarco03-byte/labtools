/* ===================================
   LABISTRY STATISTICAL TOOLS
   UTILITIES
   =================================== */


/* ===================================
   PARSE DATA
   =================================== */

function parseData(inputId = "dataInput") {

    const inputElement =
        document.getElementById(inputId);


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
       Accept:
       - commas
       - spaces
       - line breaks
       - semicolons
    */

    const values =
        input.split(/[\s,;]+/);


    const data = [];
    const invalid = [];


    values.forEach(value => {

        if (value === "") {
            return;
        }


        const number = Number(value);


        if (Number.isFinite(number)) {

            data.push(number);

        } else {

            invalid.push(value);

        }

    });


    return {
        data: data,
        invalid: invalid
    };

}


/* ===================================
   FORMAT STATISTICS
   =================================== */

function formatStatistic(value) {

    if (!Number.isFinite(value)) {

        return "—";

    }


    return Number(
        value.toFixed(6)
    ).toString();

}


/* ===================================
   VALIDATE DATA
   =================================== */

function validateParsedData(parsed, minimum = 2) {

    const result =
        document.getElementById("result");


    if (!result) {
        return false;
    }


    /* Empty input */

    if (
        parsed.data.length === 0 &&
        parsed.invalid.length === 0
    ) {

        result.innerHTML = `

            <div class="statistics-error">

                <strong>
                    Please enter valid numerical data.
                </strong>

            </div>

        `;

        return false;

    }


    /* Invalid values */

    if (parsed.invalid.length > 0) {

        const uniqueInvalid =
            [...new Set(parsed.invalid)];


        result.innerHTML = `

            <div class="statistics-error">

                <strong>
                    Invalid data detected.
                </strong>

                <br><br>

                The following value(s) are not valid
                numerical values:

                <br><br>

                <strong>
                    ${uniqueInvalid.join(", ")}
                </strong>

                <br><br>

                Please enter numerical values only.

            </div>

        `;

        return false;

    }


    /* Minimum sample size */

    if (parsed.data.length < minimum) {

        result.innerHTML = `

            <div class="statistics-error">

                <strong>
                    Please enter at least ${minimum}
                    values to perform this analysis.
                </strong>

            </div>

        `;

        return false;

    }


    return true;

}
