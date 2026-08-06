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
    
