/*
=========================================
LABISTRY HISTORY SYSTEM
=========================================
*/


function saveCalculation(calculation){


    let history =
    JSON.parse(localStorage.getItem("labistryHistory"))
    || [];


    history.unshift(calculation);


    // massimo 20 calcoli salvati

    if(history.length > 20){

        history.pop();

    }


    localStorage.setItem(
        "labistryHistory",
        JSON.stringify(history)
    );


}





function getHistory(){


    return JSON.parse(
        localStorage.getItem("labistryHistory")
    )
    || [];


}





function clearHistory(){


    localStorage.removeItem(
        "labistryHistory"
    );


    displayHistory();


}





function displayHistory(){


    let container =
    document.getElementById("historyList");


    if(!container){
        return;
    }



    let history = getHistory();



    container.innerHTML="";



    if(history.length===0){


        container.innerHTML =
        "<p>No previous calculations.</p>";


        return;

    }




   history.forEach((item,index)=>{


container.innerHTML += `


<div class="history-card">


<strong>
${item.type}
</strong>


<p>
${item.description}
</p>


<small>
${item.date}
</small>



<br><br>


<button 
class="btn"
onclick="reuseCalculation(${index})">

Reuse

</button>


</div>


`;


});



}

function reuseCalculation(index){


let history = getHistory();


let item = history[index];



alert(
"Reuse feature ready for: "
+
item.description
);



}
