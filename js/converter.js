let lastConversion = "";

function updateMWVisibility(){


let unit =
document.getElementById("unit").value;


let mwGroup =
document.getElementById("mwGroup");



if(
unit==="M" ||
unit==="mM" ||
unit==="uM"
){

    mwGroup.style.display = "none";

}

else{

    mwGroup.style.display = "block";

}


}

function convert(){

updateMWVisibility();

let value =
Number(document.getElementById("value").value);


let unit =
document.getElementById("unit").value;


let mw =
Number(document.getElementById("mw").value);



if(!value || value <= 0){

    document.getElementById("result").innerHTML =
    "Enter a valid concentration.";

    return;

}



let molarity;



// Conversioni da concentrazioni molari

if(unit === "M"){

    molarity = value;

}


if(unit === "mM"){

    molarity = value / 1000;

}


if(unit === "uM"){

    molarity = value / 1000000;

}



// Conversioni da concentrazioni in massa

if(unit === "gL"){


    if(!mw || mw <= 0){

        document.getElementById("result").innerHTML =
        "Enter molecular weight for mass conversions.";

        return;

    }


    molarity = value / mw;


}



if(unit === "mgmL"){


    if(!mw || mw <= 0){

        document.getElementById("result").innerHTML =
        "Enter molecular weight for mass conversions.";

        return;

    }


    // mg/mL = g/L

    molarity = value / mw;


}



if(unit === "ugmL"){


    if(!mw || mw <= 0){

        document.getElementById("result").innerHTML =
        "Enter molecular weight for mass conversions.";

        return;

    }


    // µg/mL → g/L

    let gL = value / 1000;


    molarity = gL / mw;


}





let output = "";


output += 
"<strong>Conversion results</strong><br><br>";



output += 
"<strong>Molar concentration</strong><br>";



output +=
formatNumber(molarity)
+
" M<br>";



output +=
formatNumber(molarity * 1000)
+
" mM<br>";



output +=
formatNumber(molarity * 1000000)
+
" µM<br>";





if(mw && mw>0){


output += "<br>";

output +=
"<strong>Mass concentration</strong><br>";



output +=
formatNumber(molarity * mw)
+
" g/L<br>";



output +=
formatNumber(molarity * mw)
+
" mg/mL<br>";



output +=
formatNumber(molarity * mw * 1000)
+
" µg/mL<br>";



}



document.getElementById("result").innerHTML = output;

if(output !== lastConversion){

    saveCalculation({

        type:"Concentration Converter",

        description:
        output.replace(/<[^>]*>/g, " "),

        date:
        new Date().toLocaleString()

    });


    lastConversion = output;

}
    
saveCalculation({

    type:"Concentration Converter",

    description: output.replace(/<[^>]*>/g, " "),

    date: new Date().toLocaleString()

});

function resetConverter(){

    document.getElementById("value").value = "";

    document.getElementById("mw").value = "";

    document.getElementById("result").innerHTML =
    "Result will appear here";

}



document.addEventListener("DOMContentLoaded", function(){

    displayHistory();

});
