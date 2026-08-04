const calculators = [

    {
        name: "Dilution Calculator",
        category: "Solution Preparation",
        url: "calculators/dilution.html"
    },

    {
        name: "Molarity Calculator",
        category: "Chemistry",
        url: "calculators/molarity.html"
    },

    {
        name: "PCR Master Mix Calculator",
        category: "Molecular Biology",
        url: "calculators/pcr-mastermix.html"
    }

];


const input = document.getElementById("searchInput");

const results = document.getElementById("searchResults");


if(input){

    input.addEventListener("input", function(){


        const value = input.value.toLowerCase().trim();


        results.innerHTML = "";


        if(value === ""){
            return;
        }


        const filtered = calculators.filter(calc =>

            calc.name.toLowerCase().includes(value) ||
            calc.category.toLowerCase().includes(value)

        );


        filtered.forEach(calc => {


            results.innerHTML += `

            <div class="search-result">

                <a href="${calc.url}">

                    ${calc.name}

                    <small>
                    ${calc.category}
                    </small>

                </a>

            </div>

            `;


        });


        if(filtered.length === 0){

            results.innerHTML = `

            <div class="search-result">

                No calculator found

            </div>

            `;

        }


    });

}
