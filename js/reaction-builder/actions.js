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

function setupResetButton(){

    const resetButton =
        document.getElementById("resetButton");

    if(!resetButton){
        return;
    }

    if(resetButton.dataset.initialized === "true"){
        return;
    }

    resetButton.dataset.initialized = "true";

    resetButton.addEventListener("click", function(){

        resetCalculator();

    });

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


            /*
             * Prima rendiamo visibile il menu
             * per poterne calcolare le dimensioni.
             */

            menu.classList.add("active");


            const menuWidth =
            menu.offsetWidth;

            const menuHeight =
            menu.offsetHeight;


            const margin = 8;


            /*
             * Coordinate iniziali
             */

            let left =
            event.pageX;

            let top =
            event.pageY;


            /*
             * Limiti orizzontali
             */

            const viewportWidth =
            window.innerWidth;


            const scrollX =
            window.pageXOffset;


            const minLeft =
            scrollX + margin;

            const maxLeft =
            scrollX +
            viewportWidth -
            menuWidth -
            margin;


            /*
             * Mantieni il menu
             * completamente dentro lo schermo.
             */

            left =
            Math.max(
                minLeft,
                Math.min(left, maxLeft)
            );


            /*
             * Limiti verticali
             */

            const viewportHeight =
            window.innerHeight;


            const scrollY =
            window.pageYOffset;


            const minTop =
            scrollY + margin;

            const maxTop =
            scrollY +
            viewportHeight -
            menuHeight -
            margin;


            top =
            Math.max(
                minTop,
                Math.min(top, maxTop)
            );


            menu.style.left =
            left + "px";


            menu.style.top =
            top + "px";


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

    setupResetButton();

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

/* =================================
   COPY MASTER MIX
================================= */

function copyMasterMix(){

    const sortedComponents =
        [...components]
        .sort((a,b) => a.order - b.order);


    let text = "";


    text += "PCR MASTER MIX\n";
    text += "==============================\n\n";


    text +=
        "Reaction volume: " +
        formatVolume(reactionSettings.volume) +
        "\n";

    text +=
        "Reactions: " +
        reactionSettings.reactions +
        "\n";

    text +=
        "Extra reactions: " +
        reactionSettings.extra +
        "\n";

    text +=
        "Overage: " +
        reactionSettings.overage +
        "%\n\n";


    text += "MASTER MIX\n";
    text += "------------------------------\n";


    sortedComponents.forEach(component => {


        if(
            component.type === "template" ||
            component.includeMM === false
        ){

            return;

        }


        text +=
            component.name +
            ": " +
            formatVolume(component.volumeMasterMix) +
            "\n";

    });


    text += "\n";


    navigator.clipboard.writeText(text)

        .then(() => {

            showCopyFeedback();

        })

        .catch(() => {

            showReactionWarning(
                "Unable to copy the Master Mix."
            );

        });

}

function showCopyFeedback(){

    const button =
        document.getElementById("copyMasterMixButton");


    if(!button){
        return;
    }


    const originalText =
        button.textContent;


    button.textContent =
        "✓ Copied!";


    button.disabled = true;


    setTimeout(() => {

        button.textContent =
            originalText;

        button.disabled = false;

    }, 1500);

}

/* =================================
   EXPORT PROTOCOL — PDF
================================= */

function exportProtocol(){

    if(
        typeof window.jspdf === "undefined" ||
        typeof window.jspdf.jsPDF === "undefined"
    ){

        showReactionWarning(
            "PDF export is currently unavailable."
        );

        return;

    }


    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();


    /* ================================
       DATA
    ================================= */

    const sortedComponents =
        [...components]
        .sort((a,b) => a.order - b.order);


    const templateSelector =
        document.getElementById("template");


    const templateName =
        templateSelector
        ? templateSelector.value
        : "PCR";


    const today =
        new Date();


    const date =
        today.toLocaleDateString(
            "en-GB"
        );


    /* ================================
       COLORS
    ================================= */

    const dark =
        [30, 41, 59];

    const muted =
        [100, 116, 139];

    const light =
        [241, 245, 249];

    const border =
        [226, 232, 240];


    /* ================================
       PAGE SETTINGS
    ================================= */

    const pageWidth =
        doc.internal.pageSize.getWidth();

    const pageHeight =
        doc.internal.pageSize.getHeight();


    const margin = 18;


    /* ================================
       HEADER
    ================================= */

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(20);

    doc.setTextColor(
        ...dark
    );

    doc.text(
        "LABISTRY",
        margin,
        22
    );


    doc.setFontSize(12);

    doc.setFont(
        "helvetica",
        "normal"
    );

    doc.setTextColor(
        ...muted
    );

    doc.text(
        "PCR PROTOCOL",
        margin,
        30
    );


    doc.setFontSize(9);

    doc.text(
        date,
        pageWidth - margin,
        22,
        {
            align:"right"
        }
    );


    /* separator */

    doc.setDrawColor(
        ...border
    );

    doc.line(
        margin,
        36,
        pageWidth - margin,
        36
    );


    /* ================================
       REACTION SETTINGS
    ================================= */

    let y = 48;


    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(11);

    doc.setTextColor(
        ...dark
    );

    doc.text(
        "REACTION SETTINGS",
        margin,
        y
    );


    y += 8;


    const settingsData = [

        [
            "Template",
            templateName
        ],

        [
            "Reaction volume",
            formatVolume(
                reactionSettings.volume
            )
        ],

        [
            "Reactions",
            String(
                reactionSettings.reactions
            )
        ],

        [
            "Extra reactions",
            String(
                reactionSettings.extra
            )
        ],

        [
            "Overage",
            reactionSettings.overage + "%"
        ]

    ];


    doc.autoTable({

        startY: y,

        margin:{
            left:margin,
            right:margin
        },

        body:settingsData,

        theme:"plain",

        styles:{

            font:"helvetica",

            fontSize:9,

            cellPadding:3,

            textColor:dark

        },

        columnStyles:{

            0:{
                fontStyle:"bold",
                cellWidth:50
            },

            1:{
                cellWidth:100
            }

        }

    });


    y =
        doc.lastAutoTable.finalY + 14;


    /* ================================
       MASTER MIX
    ================================= */

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(11);

    doc.setTextColor(
        ...dark
    );

    doc.text(
        "MASTER MIX",
        margin,
        y
    );


    y += 5;


    const masterMixComponents =
        sortedComponents.filter(
            component =>
                component.type !== "template" &&
                component.includeMM !== false
        );


    const masterMixRows =
        masterMixComponents.map(
            component => [

                component.name,

                component.stock !== null &&
                component.stock !== undefined
                    ? `${component.stock} ${component.stockUnit ?? ""}`
                    : "—",

                formatVolume(
                    component.volumeReaction
                ),

                formatVolume(
                    component.volumeMasterMix
                )

            ]
        );


    doc.autoTable({

        startY:y,

        margin:{
            left:margin,
            right:margin
        },

        head:[

            [
                "Component",
                "Stock",
                "Vol./rxn",
                "Master Mix"
            ]

        ],

        body:masterMixRows,

        theme:"grid",

        styles:{

            font:"helvetica",

            fontSize:9,

            cellPadding:5,

            textColor:dark,

            lineColor:border,

            lineWidth:0.3

        },

        headStyles:{

            fillColor:light,

            textColor:dark,

            fontStyle:"bold",

            lineColor:border,

            lineWidth:0.3

        },

        columnStyles:{

            0:{
                cellWidth:65
            },

            1:{
                cellWidth:35,
                halign:"center"
            },

            2:{
                cellWidth:35,
                halign:"right"
            },

            3:{
                cellWidth:40,
                halign:"right",
                fontStyle:"bold"
            }

        }

    });


    y =
        doc.lastAutoTable.finalY + 10;


    /* ================================
       TOTAL MASTER MIX
    ================================= */

    let totalMasterMix =
        0;


    masterMixComponents.forEach(
        component => {

            const value =
                Number(
                    component.volumeMasterMix
                );

            if(!isNaN(value)){

                totalMasterMix += value;

            }

        }
    );


    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(10);

    doc.setTextColor(
        ...dark
    );


    doc.text(
        "Total Master Mix:",
        pageWidth - 80,
        y
    );


    doc.text(
        formatVolume(totalMasterMix),
        pageWidth - margin,
        y,
        {
            align:"right"
        }
    );


    y += 14;


    /* ================================
       ADD SEPARATELY
    ================================= */

    const separateComponents =
        sortedComponents.filter(
            component =>
                component.type !== "template" &&
                component.type !== "water" &&
                component.includeMM === false
        );


    if(separateComponents.length > 0){

        doc.setFont(
            "helvetica",
            "bold"
        );

        doc.setFontSize(11);

        doc.setTextColor(
            ...dark
        );

        doc.text(
            "ADD SEPARATELY",
            margin,
            y
        );


        y += 5;


        const separateRows =
            separateComponents.map(
                component => [

                    component.name,

                    formatVolume(
                        component.volumeReaction
                    ),

                    "per reaction"

                ]
            );


        doc.autoTable({

            startY:y,

            margin:{
                left:margin,
                right:margin
            },

            head:[

                [
                    "Component",
                    "Volume",
                    "Use"
                ]

            ],

            body:separateRows,

            theme:"grid",

            styles:{

                font:"helvetica",

                fontSize:9,

                cellPadding:5,

                textColor:dark,

                lineColor:border,

                lineWidth:0.3

            },

            headStyles:{

                fillColor:light,

                textColor:dark,

                fontStyle:"bold"

            }

        });


        y =
            doc.lastAutoTable.finalY + 12;

    }


    /* ================================
       TEMPLATE / DNA
    ================================= */

    const template =
        sortedComponents.find(
            component =>
                component.type === "template"
        );


    if(template){

        if(y > pageHeight - 45){

            doc.addPage();

            y = 20;

        }


        doc.setFont(
            "helvetica",
            "bold"
        );

        doc.setFontSize(11);

        doc.setTextColor(
            ...dark
        );

        doc.text(
            "TEMPLATE / DNA",
            margin,
            y
        );


        y += 7;


        doc.setFont(
            "helvetica",
            "normal"
        );

        doc.setFontSize(9);


        doc.text(
            template.name +
            ": " +
            formatVolume(
                template.volumeReaction
            ) +
            " per reaction",
            margin,
            y
        );

    }


    /* ================================
       FOOTER
    ================================= */

    const totalPages =
        doc.internal.getNumberOfPages();


    for(
        let i = 1;
        i <= totalPages;
        i++
    ){

        doc.setPage(i);


        doc.setFont(
            "helvetica",
            "normal"
        );

        doc.setFontSize(8);

        doc.setTextColor(
            ...muted
        );


        doc.text(
            "Generated by Labistry",
            margin,
            pageHeight - 10
        );


        doc.text(
            `Page ${i} of ${totalPages}`,
            pageWidth - margin,
            pageHeight - 10,
            {
                align:"right"
            }
        );

    }


    /* ================================
       SAVE
    ================================= */

    doc.save(
        "Labistry_PCR_Protocol.pdf"
    );

}
