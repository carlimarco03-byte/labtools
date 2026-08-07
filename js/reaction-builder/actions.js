function updateComponentName(id, value) {

    const component = components.find(c => c.id == id);

    if (!component) return;

    component.name = value;

}

function positiveValue(value){

    let number = Number(value);

    if(isNaN(number) || number < 0){

        return 0;

    }

    return number;

}

function setupReactionListeners(){

    document
    .getElementById("reactionVolume")
    .addEventListener("input", function(){

      reactionSettings.volume =
positiveValue(this.value);

        this.value = reactionSettings.volume;

        calculateVolumes();

render();

    });


    document
    .getElementById("reactionNumber")
    .addEventListener("input", function(){

    reactionSettings.reactions =
Math.max(1, positiveValue(this.value));

        this.value = reactionSettings.reactions;

        calculateVolumes();

render();

    });


    document
    .getElementById("extraReactions")
    .addEventListener("input", function(){

   reactionSettings.extra =
positiveValue(this.value);

        this.value = reactionSettings.extra;

        calculateVolumes();

render();

    });


    document
    .getElementById("overage")
    .addEventListener("input", function(){

     reactionSettings.overage =
positiveValue(this.value);

        this.value = reactionSettings.overage;

        calculateVolumes();

render();

    });

}

function resetCalculator(){


    components =
    structuredClone(PCR_TEMPLATE);


    reactionSettings = {

        volume:25,

        reactions:1,

        extra:0,

        overage:5

    };


    document.getElementById("reactionVolume").value =
    reactionSettings.volume;


    document.getElementById("reactionNumber").value =
    reactionSettings.reactions;


    document.getElementById("extraReactions").value =
    reactionSettings.extra;


    document.getElementById("overage").value =
    reactionSettings.overage;


    calculateVolumes();


    render();


}

document
.getElementById("resetButton")
.addEventListener("click", function(){

    resetCalculator();

});

function setupComponentMenu(){


    const menu =
    document.getElementById("componentMenu");


    if(!menu){
        return;
    }


    document
    .querySelectorAll(".menu-btn")
    .forEach(button => {


        button.addEventListener("click", function(event){


            event.stopPropagation();


            const id =
            this.dataset.id;


            menu.dataset.componentId = id;


            menu.style.left =
            event.pageX + "px";


            menu.style.top =
            event.pageY + "px";


            menu.classList.add("active");


        });


    });



    document.addEventListener("click", function(){


        menu.classList.remove("active");


    });



    menu
    .querySelectorAll("button")
    .forEach(actionButton => {


        actionButton.addEventListener("click", function(event){


            event.stopPropagation();


            const action =
            this.dataset.action;


            const id =
            Number(menu.dataset.componentId);



            if(action === "delete"){

    deleteComponent(id);

}


if(action === "duplicate"){

    duplicateComponent(id);

}


            menu.classList.remove("active");


        });


    });


}

function deleteComponent(id){


    const component =
    components.find(
        c => c.id === id
    );


    if(!component){
        return;
    }


    if(component.type === "water"){

       showReactionWarning(
"Water cannot be removed from the PCR reaction."
);

        return;

    }


    components =
    components.filter(
        c => c.id !== id
    );


    calculateVolumes();

    render();

}

function duplicateComponent(id){


    const component =
    components.find(
        c => c.id === id
    );


    if(!component){
        return;
    }



    const newComponent =
    structuredClone(component);



    newComponent.id =
    Date.now();



    newComponent.name += " copy";



    newComponent.volumeReaction = 0;

    newComponent.volumeMasterMix = 0;



    components.push(
        newComponent
    );



    calculateVolumes();


    render();


}

function setupEditableFields(){


    document
    .querySelectorAll("[data-field]")
    .forEach(input => {


        input.addEventListener("change", function(){


            const id =
            Number(this.dataset.id);


            const field =
            this.dataset.field;


            const component =
            components.find(
                c => c.id === id
            );


            if(!component){
                return;
            }



            let value =
            this.value;



            if(this.type === "number"){

                value =
                Number(value);


                if(isNaN(value)){
                    return;
                }

            }



            component[field] =
            value;



            calculateVolumes();


            render();


        });


    });


}

function setupDynamicUI(){

    setupComponentMenu();

    setupEditableFields();

}

document
.getElementById("addComponentButton")
.addEventListener("click", function(){

    addComponent();

});

function addComponent(){

    const newComponent = {

        id: Date.now(),

        name:"New component",

        type:"reagent",

        method:"concentration",

        order: components.length + 1,


        stock:10,

        stockUnit:"µM",


        target:0.5,

        targetUnit:"µM",


        volumeReaction:0,

        volumeMasterMix:0,


        includeMM:true,

        locked:false

    };


    components.push(newComponent);


    calculateVolumes();

    render();

}
