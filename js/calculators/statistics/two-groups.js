/* ===================================
   LABISTRY STATISTICAL TOOLS
   TWO-GROUP COMPARISON
   =================================== */


/* ===================================
   PARSE GROUP DATA
   =================================== */

function parseGroupData(inputId) {

    const input =
        document
            .getElementById(inputId)
            .value
            .trim();


    if (!input) {

        return {
            data: [],
            invalid: []
        };

    }


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


    /* =================================
       EMPTY GROUP
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
            [...new Set(
                groupA.invalid
            )];


        const invalidB =
            [...new Set(
                groupB.invalid
            )];


        let message = "";


        if (invalidA.length > 0) {

            message += `
                <strong>Group A:</strong>
                ${invalidA.join(", ")}
                <br>
            `;

        }


        if (invalidB.length > 0) {

            message += `
                <strong>Group B:</strong>
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


    return {

        groupA: groupA.data,

        groupB: groupB.data

    };

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


    const groupA =
        groups.groupA;


    const groupB =
        groups.groupB;


    const result =
        document.getElementById(
            "result"
        );


    /*
     * At this stage we only display
     * the basic group information.
     *
     * Statistical tests will be added
     * in the next step.
     */

    result.innerHTML = `

        <div class="statistics-result">

            <h3>
                Two-Group Comparison
            </h3>


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
                            Group B (n)
                        </span>

                        <strong>
                            ${groupB.length}
                        </strong>

                    </div>

                </div>

            </div>


            <div class="statistics-section">

                <h4>
                    Next step
                </h4>


                <p>
                    Statistical comparison tests will
                    be available here.
                </p>

            </div>


        </div>

    `;

}
