function renderComponents() {

    const area = document.getElementById("calculatorArea");

    area.innerHTML = "";

    components.forEach(component => {

        area.innerHTML += `

        <div class="component-card">

            <h3>${component.name}</h3>

            <p>Type: ${component.type}</p>

            <p>Method: ${component.method}</p>

        </div>

        `;

    });

}
