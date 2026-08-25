function cleanSequence(sequence) {

    return sequence
        .toUpperCase()
        .replace(/^>.*$/gm, "")
        .replace(/[\s\d]/g, "");

}


function calculateGC() {

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

        result.innerHTML =
            "Please enter a DNA sequence.";

        return;

    }


    const invalidBases =
        sequence.match(/[^ATGC]/g);


    if (invalidBases) {

        const invalid =
            [...new Set(invalidBases)].join(", ");

        result.innerHTML =

            "<strong>Invalid DNA sequence.</strong><br><br>" +

            "Invalid character(s): " +

            invalid +

            "<br><br>" +

            "Only A, T, G and C are accepted.";

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


    /* ================================
       GC CONTENT
    ================================= */

    const gc =
        countG + countC;


    const gcContent =
        (gc / length) * 100;


    /* ================================
       MELTING TEMPERATURE
       Wallace rule
    ================================= */

    const tm =
        (2 * (countA + countT)) +
        (4 * (countG + countC));


    /* ================================
       RESULTS
    ================================= */

    result.innerHTML =

        "<strong>GC Content:</strong><br>" +

        gcContent.toFixed(2) +

        "%<br><br>" +

        "<strong>Estimated Tm:</strong><br>" +

        tm.toFixed(1) +

        " °C<br>" +

        "<small>Calculated using the Wallace rule.</small>" +

        "<br><br>" +

        "<strong>Sequence statistics:</strong><br>" +

        "Length: " +

        length +

        " bp<br>" +

        "A: " +

        countA +

        "<br>" +

        "T: " +

        countT +

        "<br>" +

        "G: " +

        countG +

        "<br>" +

        "C: " +

        countC;

}


function resetCalculator() {

    document.getElementById("sequence").value =
        "";

    document.getElementById("result").innerHTML =
        "Enter a DNA sequence to calculate GC content.";

}
