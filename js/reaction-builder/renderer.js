function render() {

    if (window.innerWidth >= 992) {

        renderTable();

    } else {

        renderCards();

    }

}

function renderStock(component){

    if(
        component.stock === null ||
        component.stock === undefined
    ){

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
                min="0"
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

    if(component.type === "template") {

    return `
        <div class="value-unit">

            <input
                class="table-input"
                type="number"
                min="0"
                step="0.1"
                data-id="${component.id}"
                data-field="volume"
                value="${component.volume ?? 2}">

            <span>µL</span>

        </div>
    `;

}

    return `

    <div class="value-unit">

        <input
            class="table-input"
            type="number"
            min="0"
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

    if(
        component.locked ||
        component.type === "template"
    ){

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

    const area = document.getElementById("calculatorArea");

    let html = `
        <div class="reaction-cards">
    `;

    [...components]
        .sort((a, b) => a.order - b.order)
        .forEach(component => {

            html += `

                <div class="reaction-card">

                    <div class="reaction-card-header">

                        <div class="reaction-card-title">

                            ${component.locked
                                ? `<span class="locked-name">${component.name}</span>`
                                : `
                                    <input
                                        class="component-name"
                                        type="text"
                                        data-id="${component.id}"
                                        data-field="name"
                                        value="${component.name}">
                                  `
                            }

                        </div>

                        <div class="reaction-card-menu">

                            ${renderMenu(component)}

                        </div>

                    </div>


                    <div class="reaction-card-body">


                        <div class="reaction-card-row">

                            <span class="reaction-card-label">
                                Stock
                            </span>

                            <div class="reaction-card-value">

                                ${renderStock(component)}

                            </div>

                        </div>


                        <div class="reaction-card-row">

                            <span class="reaction-card-label">
                                Final / Added
                            </span>

                            <div class="reaction-card-value">

                                ${renderTarget(component)}

                            </div>

                        </div>


                        <div class="reaction-card-row">

                            <span class="reaction-card-label">
                                Volume / reaction
                            </span>

                            <div class="reaction-card-value calculated-value">

                                ${renderReactionVolume(component)}

                            </div>

                        </div>


                        <div class="reaction-card-row master-mix-row">

                            <span class="reaction-card-label">
                                Master Mix
                            </span>

                            <div class="reaction-card-value calculated-value">

                                ${renderMasterMix(component)}

                            </div>

                        </div>


                        <div class="reaction-card-row">

                            <span class="reaction-card-label">
                                Include in MM
                            </span>

                            <div class="reaction-card-value">

                                ${renderInclude(component)}

                            </div>

                        </div>


                    </div>

                </div>

            `;

        });


    html += `
        </div>
    `;


    area.innerHTML = html;

    setupDynamicUI();

}
