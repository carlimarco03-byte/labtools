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

<th>Method</th>

<th>Stock</th>

<th>Target</th>

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
    type="text"
    value="${component.name}"
    class="component-name"
    oninput="updateComponentName(${component.id}, this.value)">

</td>

<td>${component.method}</td>

<td>${component.stock ?? "-"} ${component.stockUnit ?? ""}</td>

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

    setupComponentMenu();
    
}

function renderCards() {

    document.getElementById("calculatorArea").innerHTML =
    "<p>Mobile layout coming soon.</p>";

}
