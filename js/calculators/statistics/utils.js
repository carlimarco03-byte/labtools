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
     * Accept:
     * - commas
     * - spaces
     * - line breaks
     * - semicolons
     */

    const values =
        input.split(/[\s,;]+/);


    const data = [];
    const invalid = [];


    values.forEach(value => {

        if (value === "") {
            return;
        }


        const number =
            Number(value);


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
   PARSE GROUP DATA
   =================================== */

function parseGroupData(inputId) {

    return parseData(inputId);

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
   VALIDATE PARSED DATA
   =================================== */

function validateParsedData(
    parsed,
    minimum = 2
) {

    const result =
        document.getElementById(
            "result"
        );


    if (!result) {

        return false;

    }


    /* =================================
       EMPTY INPUT
       ================================= */

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


    /* =================================
       INVALID VALUES
       ================================= */

    if (
        parsed.invalid.length > 0
    ) {

        const uniqueInvalid =
            [
                ...new Set(
                    parsed.invalid
                )
            ];


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


    /* =================================
       MINIMUM SAMPLE SIZE
       ================================= */

    if (
        parsed.data.length <
        minimum
    ) {

        result.innerHTML = `

            <div class="statistics-error">

                <strong>
                    Please enter at least
                    ${minimum}
                    values to perform this analysis.
                </strong>

            </div>

        `;

        return false;

    }


    return true;

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

        groupA:
            groupA.data,

        groupB:
            groupB.data

    };

}
