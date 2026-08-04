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
placeholder="Example: NaCl">

</div>

<div class="form-group">

<label>
Molecular weight (g/mol)
</label>


<input 
id="mw" 
type="number" 
placeholder="Example: 58.44">

</div>





<div class="form-group">

<label>
Concentration value
</label>

<input 
id="conc" 
type="number" 
placeholder="Example: 0.5">

</div>





<div class="form-group">

<label>
Concentration unit
</label>


<select id="unit">


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
Final volume
</label>


<input 
id="volume" 
type="number"
placeholder="Example:100">


<select id="volumeUnit">


<option value="L">
L
</option>


<option value="mL">
mL
</option>


<option value="uL">
µL
</option>


</select>


</div>


`;

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
