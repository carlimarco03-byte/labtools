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

<div class="reaction-grid reaction-header">

    <div>Component</div>

    <div>Stock</div>

    <div>Final/added</div>

    <div>Volume/rxn</div>

    <div>Mastermix</div>

    <div>MM</div>

    <div></div>

</div>

`;



[...components]
.sort((a,b)=>a.order-b.order)
.forEach(component=>{


html += `

<div class="reaction-grid reaction-row">


    <div>
        ${renderName(component)}
    </div>


    <div>
        ${renderStock(component)}
    </div>


    <div>
        ${renderTarget(component)}
    </div>


    <div>
        ${renderReactionVolume(component)}
    </div>


    <div>
        ${renderMasterMix(component)}
    </div>


    <div>
        ${renderInclude(component)}
    </div>


    <div>
        ${renderMenu(component)}
    </div>


</div>

`;

});


area.innerHTML = html;


setupDynamicUI();


}

function renderCards() {

    document.getElementById("calculatorArea").innerHTML =
    "<p>Mobile layout coming soon.</p>";

}
