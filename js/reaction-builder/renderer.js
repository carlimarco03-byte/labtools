function renderComponents() {

    const area = document.getElementById("calculatorArea");

    area.innerHTML = "";

    components.forEach(component => {

        area.innerHTML += `

<div class="component-card">

    <div class="component-header">

        <div>

            <h3>${component.name}</h3>

            <small>${component.type}</small>

        </div>

        <button class="menu-btn">

            ⋮

        </button>

    </div>

    <div class="component-body">

        <div class="form-group">

            <label>Method</label>

            <input
            type="text"
            value="${component.method}"
            disabled>

        </div>

        <div class="form-group">

            <label>Stock</label>

            <input
            type="text"
            value="${component.stock ?? "-"} ${component.stockUnit ?? ""}"
            disabled>

        </div>

        <div class="form-group">

            <label>Target</label>

            <input
            type="text"
            value="${component.target ?? "-"} ${component.targetUnit ?? ""}"
            disabled>

        </div>

        <div class="form-group">

            <label>Calculated Volume</label>

            <input
            type="text"
            value="AUTO"
            disabled>

        </div>

        <label>

            <input
            type="checkbox"
            ${component.includeMM ? "checked" : ""}
            disabled>

            Include in Master Mix

        </label>

    </div>

</div>

`;

    });

}
