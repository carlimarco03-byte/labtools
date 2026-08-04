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
