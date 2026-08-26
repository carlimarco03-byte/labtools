function parseFASTA(input) {

    const lines =
        input
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
     * No FASTA header:
     * treat input as a single sequence.
     */

    if (sequences.length === 0) {

        return [{
            name: "Sequence",
            sequence: input
        }];

    }


    return sequences;

}


function calculateGC() {

    const input =
        document.getElementById("sequence").value;

    const result =
        document.getElementById("result");


    if (!input.trim()) {

        result.innerHTML =
            "Please enter a DNA sequence.";

        return;

    }


    const sequences =
        parseFASTA(input);


    let results = [];


    sequences.forEach(entry => {


        const sequence =
            entry.sequence
                .toUpperCase()
                .replace(/[\s\d]/g, "");


        /*
         * Validate DNA sequence
         */

        const invalidBases =
            sequence.match(/[^ATGC]/g);


        if (invalidBases) {

            const invalid =
                [...new Set(invalidBases)].join(", ");


            results.push({

                name: entry.name,

                error:
                    `Invalid character(s): ${invalid}`

            });

            return;

        }


        if (!sequence) {

            results.push({

                name: entry.name,

                error: "Empty sequence."

            });

            return;

        }


        const length =
            sequence.length;


        const countA =
            (sequence.match(/A/g) || []).length;

        const countT =
            (sequence.match(/T/g) || []).length;

        const countG =
            (sequence.match(/G/g) || []).length;

        const countC =
            (sequence.match(/C/g) || []).length;


        const gc =
            countG + countC;


        const gcContent =
            (gc / length) * 100;


        results.push({

            name: entry.name,

            length: length,

            A: countA,

            T: countT,

            G: countG,

            C: countC,

            gcContent: gcContent

        });

    });


    /*
     * Single sequence
     */

    if (results.length === 1) {

        const r = results[0];


        if (r.error) {

            result.innerHTML = `

                <strong>Invalid DNA sequence.</strong>

                <br><br>

                ${r.error}

                <br><br>

                Only A, T, G and C are accepted.

            `;

            return;

        }


        result.innerHTML = `

            <strong>GC Content:</strong><br>

            ${r.gcContent.toFixed(2)}%

            <br><br>

            <strong>Sequence statistics:</strong><br>

            Length: ${r.length} bp<br>

            A: ${r.A}<br>

            T: ${r.T}<br>

            G: ${r.G}<br>

            C: ${r.C}

        `;

        return;

    }


    /*
     * Multiple FASTA sequences
     */

    let table = `

        <strong>Multiple Sequence Analysis</strong>

        <br><br>

        <div class="master-mix-table-wrapper">

            <table class="master-mix-table">

                <thead>

                    <tr>

                        <th>Sequence</th>

                        <th>Length</th>

                        <th>A</th>

                        <th>T</th>

                        <th>G</th>

                        <th>C</th>

                        <th>GC Content</th>

                    </tr>

                </thead>

                <tbody>

    `;


    results.forEach(r => {

        if (r.error) {

            table += `

                <tr>

                    <td>${r.name}</td>

                    <td colspan="6">

                        ${r.error}

                    </td>

                </tr>

            `;

            return;

        }


        table += `

            <tr>

                <td>${r.name}</td>

                <td>${r.length} bp</td>

                <td>${r.A}</td>

                <td>${r.T}</td>

                <td>${r.G}</td>

                <td>${r.C}</td>

                <td>

                    <strong>
                        ${r.gcContent.toFixed(2)}%
                    </strong>

                </td>

            </tr>

        `;

    });


    table += `

                </tbody>

            </table>

        </div>

    `;


    result.innerHTML = table;

}


function resetCalculator() {

    document.getElementById("sequence").value =
        "";

    document.getElementById("result").innerHTML =
        "Enter a DNA sequence to calculate GC content.";

}
