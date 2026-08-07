function render() {

    if (window.innerWidth >= 992) {

        renderTable();

    } else {

        renderCards();

    }

}

function renderStock(component){

    if(!component.stock){

    return `
        <div class="value-unit empty-cell">
            <span>—</span>
        </div>
    `;

}


    return `

    <div class="value-unit">

        <input
        class="table-input"
        type="number"
        data-id="${component.id}"
        data-field="stock"
        value="${component.stock}">

        <span>
        ${component.stockUnit ?? ""}
        </span>

    </div>

    `;

}

function renderName(component){

if(component.locked){

return `

<span class="component-name locked-name">
    ${component.name}
</span>

`;

}


return `

<input
    class="table-input component-name"
    data-id="${component.id}"
    type="text"
    value="${component.name}">

`;

}

function renderTarget(component){

   if(component.type==="water"){

return `
<div class="value-unit">
<span>—</span>
</div>
`;

}

    if(component.type==="template"){

        return `${component.volume ?? 2} µL`;

    }

    return `

    <div class="value-unit">

        <input
            class="table-input"
            type="number"
            data-id="${component.id}"
            data-field="target"
            value="${component.target ?? ""}">

        <span>${component.targetUnit ?? ""}</span>

    </div>

    `;

}

function renderReactionVolume(component){

    return formatVolume(component.volumeReaction);

}

function renderMasterMix(component){

    return formatVolume(component.volumeMasterMix);

}

function renderInclude(component){

    if(component.type === "water"){

        return "—";

    }


    return component.includeMM ? "✓" : "—";

}

function renderMenu(component){

    if(component.locked){

        return "";

    }

    return `

        <button
            class="menu-btn"
            data-id="${component.id}">
            ⋮
        </button>

    `;

}

function renderTable(){

const area = document.getElementById("calculatorArea");


let html = `

<table class="reaction-table">

<thead>

<tr>

<th>Component</th>
<th>Stock</th>
<th>Final/added</th>
<th>Volume/rxn</th>
<th>Mastermix</th>
<th>MM</th>
<th>Menu</th>

</tr>

</thead>


<tbody>

`;


[...components]
.sort((a,b)=>a.order-b.order)
.forEach(component=>{


html += `

<tr>


<td class="component-cell">

${renderName(component)}

</td>


<td>

${renderStock(component)}

</td>


<td>

${renderTarget(component)}

</td>


<td>

${renderReactionVolume(component)}

</td>


<td>

${renderMasterMix(component)}

</td>


<td class="mm-cell">

${renderInclude(component)}

</td>


<td class="menu-cell">

${renderMenu(component)}

</td>


</tr>

`;

});


html += `

</tbody>

</table>

`;


area.innerHTML = html;


setupDynamicUI();

}

function renderCards() {

    document.getElementById("calculatorArea").innerHTML =
    "<p>Mobile layout coming soon.</p>";

}
