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

    const selector =
        document.getElementById("template");

    const templateName =
        selector ? selector.value : "PCR";

    let selectedTemplate;

    if(
        typeof REACTION_TEMPLATES !== "undefined" &&
        REACTION_TEMPLATES[templateName]
    ){

        selectedTemplate =
            REACTION_TEMPLATES[templateName];

    }

    else{

        selectedTemplate =
            PCR_TEMPLATE;

    }


    components =
        structuredClone(selectedTemplate);


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


    if(
    component.type === "water" ||
    component.type === "template"
){

    showReactionWarning(
        "This component cannot be removed."
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

    value = 0;

}


if(value < 0){

    value = 0;

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

    setupAddComponentModal();

    setupTemplateSelector();

}

function updateComponentPreview(){

    const type =
        document.getElementById("componentType").value;

    const preview =
        document.getElementById("componentPreview");

    if(!preview){
        return;
    }

    const preset =
        COMPONENT_PRESETS[type];

    if(!preset){
        preview.innerHTML = "";
        return;
    }


    preview.innerHTML = `

        <div class="preview-row">

            <span class="preview-label">
                Stock
            </span>

            <span class="preview-value">
                ${preset.stock ?? "—"}
                ${preset.stockUnit ?? ""}
            </span>

        </div>


        <div class="preview-row">

            <span class="preview-label">
                Final / added
            </span>

            <span class="preview-value">
                ${preset.target ?? "—"}
                ${preset.targetUnit ?? ""}
            </span>

        </div>

    `;

}


function setupAddComponentModal(){

    if(window.addComponentInitialized){

        return;

    }

    window.addComponentInitialized = true;

    const button =
    document.getElementById("addComponentButton");


    const modal =
    document.getElementById("addComponentModal");


    const cancel =
    document.getElementById("cancelComponent");

    
    const confirm =
    document.getElementById("confirmComponent");

    const typeSelect =
    document.getElementById("componentType");

    
    if(!button || !modal){

        return;

    }

    if(typeSelect){

    typeSelect.addEventListener("change", function(){

        updateComponentPreview();

    });

}

    button.addEventListener("click", function(){

        modal.classList.add("active");

        updateComponentPreview();

    });


    cancel.addEventListener("click", function(){

        modal.classList.remove("active");

    });

    confirm.addEventListener("click", function(){

    createComponentFromPreset();

        modal.classList.remove("active");

});
    
}

function createComponentFromPreset(){

    const type =
    document.getElementById("componentType").value;


    const preset =
    COMPONENT_PRESETS[type];


    if(!preset){

        return;

    }


    const newComponent = {

        id: Date.now(),

        ...structuredClone(preset),

        order:0,

        volumeReaction:0,

        volumeMasterMix:0,

        locked:false

    };


    const dnaIndex =
    components.findIndex(
        c => c.type === "template"
    );


    if(dnaIndex !== -1){

        components.splice(
            dnaIndex,
            0,
            newComponent
        );

    }
    else{

        components.push(newComponent);

    }


   components.forEach(component => {

    if(component.type === "water"){

        component.order = 1;

    }

    else if(component.type === "template"){

        component.order = 999;

    }

});


let order = 2;

components
.filter(c =>
    c.type !== "water" &&
    c.type !== "template"
)
.forEach(component => {

    component.order = order;

    order++;

});


    calculateVolumes();

    render();

}

function setupTemplateSelector(){

    if(window.templateSelectorInitialized){

        return;

    }

    window.templateSelectorInitialized = true;


    const selector =
        document.getElementById("template");


    if(!selector){
        return;
    }


    selector.addEventListener("change", function(){

        const templateName =
            this.value;


        const template =
            REACTION_TEMPLATES[templateName];


        if(!template){
            return;
        }


        components =
            structuredClone(template);


        calculateVolumes();

        render();

    });

}
