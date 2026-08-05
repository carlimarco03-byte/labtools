let mode = "mass";



function changeMode(){


mode = document.getElementById("mode").value;


render();


    
}

function render(){


let area = document.getElementById("calculatorArea");



if(mode==="mass"){


area.innerHTML = `

<div class="form-group">

<label>
Compound name (optional)
</label>

<input 
id="compound"
type="text"
placeholder="NaCl">

</div>

<div
class="form-group"
id="mwGroup">

<label>
Molecular weight (g/mol)
</label>

<input
id="mw"
type="number"
placeholder="58.44">

</div>





<div class="form-group">

<label>
Concentration
</label>

<div class="input-with-unit">

<input
id="conc"
type="number"
placeholder="0.5">

<select
id="unit"
onchange="updateUnitUI()">

<option value="M">M</option>

<option value="mM">mM</option>

<option value="uM">µM</option>

<option value="gL">g/L</option>

<option value="mgmL">mg/mL</option>

<option value="ugmL">µg/mL</option>

</select>

</div>

</div>






<div class="form-group">

<label>
Final volume
</label>

<div class="input-with-unit">

<input
id="volume"
type="number"
placeholder="100">

<select id="volumeUnit">

<option value="L">L</option>

<option value="mL" selected>mL</option>

<option value="uL">µL</option>

</select>

</div>

</div>


`;
    
updateUnitUI();
    
}




if(mode==="convert"){


area.innerHTML = `


<div class="form-group">

<label>
Value
</label>

<input id="value" type="number">

</div>



<div class="form-group">

<label>
From
</label>

<select id="from">

<option value="M">M</option>
<option value="mM">mM</option>
<option value="uM">µM</option>

</select>

</div>



<div class="form-group">

<label>
To
</label>

<select id="to">

<option value="M">M</option>
<option value="mM">mM</option>
<option value="uM">µM</option>

</select>

</div>


`;

}





if(mode==="dilution"){


area.innerHTML = `


<div class="form-group">

<label>
Stock concentration
</label>

<input id="stock" type="number">


<select id="stockUnit">

<option value="M">
M
</option>

<option value="mM">
mM
</option>

<option value="uM">
µM
</option>

</select>

</div>




<div class="form-group">

<label>
Target concentration
</label>

<input id="target" type="number">


<select id="targetUnit">

<option value="M">
M
</option>

<option value="mM">
mM
</option>

<option value="uM">
µM
</option>

</select>


</div>





<div class="form-group">

<label>
Final volume (mL)
</label>

<input id="finalVolume" type="number">

</div>


`;

}





if(mode==="moles"){


area.innerHTML = `


<div class="form-group">

<label>
Mass (g)
</label>

<input id="mass" type="number">

</div>



<div class="form-group">

<label>
Molecular weight (g/mol)
</label>

<input id="mwMoles" type="number">

</div>


`;

}



}

function calculate(){


let result="";

let historyDescription="";





if(mode==="mass"){





let c = Number(document.getElementById("conc").value);

if(c <= 0){

    document.getElementById("result").innerHTML =
    "Please enter a valid concentration.";

    return;

}

let compound =
document.getElementById("compound").value;
    
let unit=document.getElementById("unit").value;

let volume =
Number(document.getElementById("volume").value);


let volumeUnit =
document.getElementById("volumeUnit").value;



if(volumeUnit==="mL"){

    volume = volume / 1000;

}


if(volumeUnit==="uL"){

    volume = volume / 1000000;

}

let mass;

if(unit === "M" || unit === "mM" || unit === "uM"){

    let mw = Number(mwInput());

    if(mw <= 0){

        document.getElementById("result").innerHTML =
        "Please enter a valid molecular weight.";

        return;

    }

    if(unit === "mM"){

        c = c / 1000;

    }

    if(unit === "uM"){

        c = c / 1000000;

    }

    mass = c * mw * volume;

}

else if(unit === "gL"){

    mass = c * volume;

}

else if(unit === "mgmL"){

    mass = (c * volume) / 1000;

}

else if(unit === "ugmL"){

    mass = (c * volume) / 1000000;

}

let formattedMass = formatMass(mass);




result =

"<strong>Required compound mass</strong><br>"
+
(compound || "Compound")
+
"<br><br>"
+
"<strong>Required mass:</strong><br>"
+
formattedMass;

}




if(mode==="convert"){



let value=Number(document.getElementById("value").value);


let from=document.getElementById("from").value;

let to=document.getElementById("to").value;



let factor={

"M":1,

"mM":1000,

"uM":1000000

};



let converted=value*factor[from]/factor[to];



result=

"<strong>Converted concentration:</strong><br>"
+
converted
+
" "
+
to;


}





if(mode==="dilution"){



let stock =
Number(document.getElementById("stock").value);


let target =
Number(document.getElementById("target").value);


let stockUnit =
document.getElementById("stockUnit").value;


let targetUnit =
document.getElementById("targetUnit").value;


let volume =
Number(document.getElementById("finalVolume").value);





let factor={

"M":1,

"mM":1000,

"uM":1000000

};




// conversione in M

stock = stock / factor[stockUnit];

target = target / factor[targetUnit];




// C1V1=C2V2

let v1 =
(target*volume)/stock;



let solvent =
volume-v1;



result =


"<strong>Stock solution required:</strong><br>"
+
v1.toFixed(3)
+
" mL"
+
"<br><br>"
+
"<strong>Solvent required:</strong><br>"
+
solvent.toFixed(3)
+
" mL";


}





if(mode==="moles"){



let mass=Number(document.getElementById("mass").value);

let mw=Number(document.getElementById("mwMoles").value);



let mol=mass/mw;



result=

"<strong>Moles:</strong><br>"
+
mol.toFixed(5)
+
" mol";


}





document.getElementById("result").innerHTML=result;



if(mode === "mass"){

    historyDescription =
        (compound || "Compound") +
        "<br>" +
        document.getElementById("conc").value + " " + unit +
        " • " +
        document.getElementById("volume").value + " " + volumeUnit +
        "<br>" +
        formattedMass;

}

else{

    historyDescription =
        result.replace(/<[^>]*>/g, " ");

}

saveCalculation({

    type:"Molarity",

    description:historyDescription,

    date:new Date().toLocaleString()

});

}

function mwInput(){

    return document.getElementById("mw").value;

}


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

function updateUnitUI(){

    const unit = document.getElementById("unit").value;

    const mwGroup = document.getElementById("mwGroup");

    if(
        unit === "gL" ||
        unit === "mgmL" ||
        unit === "ugmL"
    ){

        mwGroup.style.display = "none";

    }

    else{

        mwGroup.style.display = "block";

    }

}

function resetCalculator(){

    render();

    document.getElementById("result").innerHTML =
    "Result will appear here";

}
