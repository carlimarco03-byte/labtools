const calculators = [

    {
        name: "Dilution Calculator",
        url: "calculators/dilution.html"
    },

    {
        name: "Molarity Calculator",
        url: "calculators/molarity.html"
    },

    {
        name: "PCR Master Mix Calculator",
        url: "#"
    }

];


const input = document.getElementById("searchInput");

const results = document.getElementById("searchResults");


if(input){

    input.addEventListener("input", function(){


        const value = input.value.toLowerCase();


        results.innerHTML = "";


        if(value === ""){
            return;
        }


        const filtered = calculators.filter(calc =>

            calc.name.toLowerCase().includes(value)

        );


        filtered.forEach(calc => {


            results.innerHTML += `

            <div class="search-result">

                <a href="${calc.url}">

                    ${calc.name}

                </a>

            </div>

            `;


        });


    });

}
