function cleanSequence(sequence) {

    return sequence
        .toUpperCase()
        .replace(/^>.*$/gm, "")
        .replace(/[\s\d]/g, "");

}


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


function calculateReverseComplement() {

    const input =
    document.getElementById("sequence").value;

const result =
    document.getElementById("result");


/* Check for multiple FASTA sequences */

const fastaHeaders =
    input.match(/^>.*$/gm);


if(fastaHeaders && fastaHeaders.length > 1){

    result.innerHTML = `

        <div class="result-box">

            <strong>Multiple FASTA sequences detected.</strong>

            <br><br>

            Please enter one DNA sequence at a time.

        </div>

    `;

    return;

}


const sequence =
    cleanSequence(input);


    if (!sequence) {

        result.innerHTML = `

            <div class="result-box">

                Please enter a DNA sequence.

            </div>

        `;

        return;

    }


    const invalidBases =
        sequence.match(/[^ATGC]/g);


    if (invalidBases) {

        const invalid =
            [...new Set(invalidBases)].join(", ");

        result.innerHTML = `

            <div class="result-box">

                <strong>Invalid DNA sequence.</strong>

                <br><br>

                Invalid character(s):
                ${invalid}

                <br><br>

                Only A, T, G and C are accepted.

            </div>

        `;

        return;

    }


    const complement =
        getComplement(sequence);


    const reverse =
        sequence
            .split("")
            .reverse()
            .join("");


    const reverseComplement =
        complement
            .split("")
            .reverse()
            .join("");


    result.innerHTML = `

        <div class="result-box">

            <strong>Sequence length:</strong>

            ${sequence.length} bp

            <br><br>


            <strong>Complementary sequence:</strong>

            <div class="sequence-result">

                <code>${complement}</code>

                <button
                    class="copy-btn"
                    onclick="copySequence('${complement}', this)">

                    Copy

                </button>

            </div>


            <br>


            <strong>Reverse sequence:</strong>

            <div class="sequence-result">

                <code>${reverse}</code>

                <button
                    class="copy-btn"
                    onclick="copySequence('${reverse}', this)">

                    Copy

                </button>

            </div>


            <br>


            <strong>Reverse complementary sequence:</strong>

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
