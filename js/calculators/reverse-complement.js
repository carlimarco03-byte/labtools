function getComplement(sequence) {

    const complementMap = {

        A: "T",
        T: "A",
        G: "C",
        C: "G"

    };

    return sequence
        .split("")
        .map(base => complementMap[base])
        .join("");

}

function parseFASTA(input) {

    const lines = input
        .trim()
        .split(/\r?\n/);

    const sequences = [];

    let currentName = null;
    let currentSequence = "";

    lines.forEach(line => {

        line = line.trim();

        if (!line) {
            return;
        }

        if (line.startsWith(">")) {

            if (currentName !== null) {

                sequences.push({
                    name: currentName,
                    sequence: currentSequence
                });

            }

            currentName =
                line.substring(1).trim() ||
                `Sequence ${sequences.length + 1}`;

            currentSequence = "";

        } else {

            currentSequence += line;

        }

    });


    if (currentName !== null) {

        sequences.push({
            name: currentName,
            sequence: currentSequence
        });

    }


    /*
     * If there is no FASTA header,
     * treat the entire input as one sequence.
     */

    if (sequences.length === 0) {

        return [{
            name: "Sequence",
            sequence: input
        }];

    }


    return sequences;

}

function calculateReverseComplement() {

    const input =
        document.getElementById("sequence").value;

    const result =
        document.getElementById("result");


    if (!input.trim()) {

        result.innerHTML = `

            <div class="result-box">

                Please enter a DNA sequence.

            </div>

        `;

        return;

    }


    const sequences =
        parseFASTA(input);


    let output = "";


    sequences.forEach((entry, index) => {


        const sequence =
            entry.sequence
                .toUpperCase()
                .replace(/[\s\d]/g, "");


        /*
         * Validate sequence
         */

        const invalidBases =
            sequence.match(/[^ATGC]/g);


        if (invalidBases) {

            const invalid =
                [...new Set(invalidBases)].join(", ");


            output += `

                <div class="result-box">

                    <strong>
                        ${entry.name}
                    </strong>

                    <br><br>

                    <strong>
                        Invalid DNA sequence.
                    </strong>

                    <br><br>

                    Invalid character(s):
                    ${invalid}

                    <br><br>

                    Only A, T, G and C are accepted.

                </div>

            `;

            return;

        }


        if (!sequence) {

            output += `

                <div class="result-box">

                    <strong>
                        ${entry.name}
                    </strong>

                    <br><br>

                    Empty sequence.

                </div>

            `;

            return;

        }


        /*
         * Calculate complement
         */

        const complement =
            getComplement(sequence);


        /*
         * Calculate reverse
         */

        const reverse =
            sequence
                .split("")
                .reverse()
                .join("");


        /*
         * Calculate reverse complement
         */

        const reverseComplement =
            complement
                .split("")
                .reverse()
                .join("");


        /*
         * Result
         */

        output += `

            <div class="result-box">

                <strong>
                    ${entry.name}
                </strong>

                <br><br>

                <strong>
                    Sequence length:
                </strong>

                ${sequence.length} bp

                <br><br>


                <strong>
                    Complementary sequence:
                </strong>

                <div class="sequence-result">

                    <code>${complement}</code>

                    <button
                        class="copy-btn"
                        onclick="copySequence('${complement}', this)">

                        Copy

                    </button>

                </div>


                <br>


                <strong>
                    Reverse sequence:
                </strong>

                <div class="sequence-result">

                    <code>${reverse}</code>

                    <button
                        class="copy-btn"
                        onclick="copySequence('${reverse}', this)">

                        Copy

                    </button>

                </div>


                <br>


                <strong>
                    Reverse complementary sequence:
                </strong>

                <div class="sequence-result">

                    <code>${reverseComplement}</code>

                    <button
                        class="copy-btn"
                        onclick="copySequence('${reverseComplement}', this)">

                        Copy

                    </button>

                </div>

            </div>

        `;

    });


    result.innerHTML = output;

}


function copySequence(sequence, button) {

    navigator.clipboard
        .writeText(sequence)
        .then(() => {

            const originalText =
                button.textContent;

            button.textContent =
                "Copied!";

            setTimeout(() => {

                button.textContent =
                    originalText;

            }, 1500);

        })
        .catch(() => {

            button.textContent =
                "Copy failed";

        });

}


function resetCalculator() {

    document.getElementById("sequence").value =
        "";

    document.getElementById("result").innerHTML = `

        <div class="result-box">

            Enter a DNA sequence to calculate its reverse complement.

        </div>

    `;

}
