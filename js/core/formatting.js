function formatMass(mass){

    if(mass >= 1){

        return `
            ${mass.toFixed(3)} g
            <br><small>(${(mass*1000).toFixed(1)} mg)</small>
        `;

    }

    else if(mass >= 0.001){

        return `
            ${(mass*1000).toFixed(3)} mg
            <br><small>(${(mass*1000000).toFixed(1)} µg)</small>
        `;

    }

    else{

        return `
            ${(mass*1000000).toFixed(2)} µg
        `;

    }

}


function formatNumber(value){

    if(value === 0){

        return "0";

    }


    let absValue = Math.abs(value);


    if(absValue >= 10000 || absValue < 0.001){

        return value
            .toExponential(3)
            .replace("e+", " × 10^")
            .replace("e-", " × 10^-");

    }


    if(absValue >= 100){

        return value.toFixed(2);

    }


    if(absValue >= 1){

        return value.toFixed(3);

    }


    return value.toFixed(5);

}
