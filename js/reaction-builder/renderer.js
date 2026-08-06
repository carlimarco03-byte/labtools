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

<th>Volume</th>

<th>MM</th>

<th></th>

</tr>

</thead>

<tbody>

`;

    components.forEach(component => {

        html += `

<tr>

<td>${component.name}</td>

<td>${component.method}</td>

<td>${component.stock ?? "-"} ${component.stockUnit ?? ""}</td>

<td>${component.target ?? "-"} ${component.targetUnit ?? ""}</td>

<td>AUTO</td>

<td>${component.includeMM ? "✓" : "—"}</td>

<td>⋮</td>

</tr>

`;

    });

    html += `

</tbody>

</table>

`;

    area.innerHTML = html;

}

function renderCards() {

    document.getElementById("calculatorArea").innerHTML =
    "<p>Mobile layout coming soon.</p>";

}
