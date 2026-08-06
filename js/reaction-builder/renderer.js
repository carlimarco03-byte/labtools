function render() {

    if (window.innerWidth >= 992) {

        renderTable();

    } else {

        renderCards();

    }

}

function renderTable() {

    const area = document.getElementById("calculatorArea");

    let html = `

<table class="reaction-table">

<thead>

<tr>

<th>Component</th>



<th>Stock</th>

<th>Final / Added</th>

<th>Volume/rxn</th>

<th>Master Mix</th>

<th>MM</th>

<th></th>

</tr>

</thead>

<tbody>

`;

   [...components]
.sort((a,b)=>a.order-b.order)
.forEach(component => {

        html += `

<tr>

<td>

<input
class="table-input component-name"
data-id="${component.id}"
type="text"
value="${component.name}">

</td>



<td>

${
component.stock
?
`
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
`
:
"-"
}

</td>

<td>${component.target ?? "-"} ${component.targetUnit ?? ""}</td>

<td>
${formatVolume(component.volumeReaction)}
</td>

<td>
${formatVolume(component.volumeMasterMix)}
</td>

<td>${component.includeMM ? "✓" : "—"}</td>

<td>

${
component.locked
?
""
:
`
<button 
class="menu-btn"
data-id="${component.id}">
⋮
</button>
`
}

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
