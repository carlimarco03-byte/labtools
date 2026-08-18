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


    const gc =
        countG + countC;


    const gcContent =
        (gc / length) * 100;


    result.innerHTML =

        "<strong>GC Content:</strong><br>" +

        gcContent.toFixed(2) +

        "%<br><br>" +

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
