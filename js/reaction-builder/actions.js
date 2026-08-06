function updateComponentName(id, value) {

    const component = components.find(c => c.id == id);

    if (!component) return;

    component.name = value;

}

function setupReactionListeners(){

    document
    .getElementById("reactionVolume")
    .addEventListener("input", function(){

       reactionSettings.volume =
Math.max(0, Number(this.value));

        calculateVolumes();

render();

    });


    document
    .getElementById("reactionNumber")
    .addEventListener("input", function(){

       reactionSettings.reactions =
Math.max(0, Number(this.value));

        calculateVolumes();

render();

    });


    document
    .getElementById("extraReactions")
    .addEventListener("input", function(){

     reactionSettings.extra =
Math.max(0, Number(this.value));

        calculateVolumes();

render();

    });


    document
    .getElementById("overage")
    .addEventListener("input", function(){

       reactionSettings.overage =
Math.max(0, Number(this.value));

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
    
