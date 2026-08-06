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
        Number(this.value);

        calculateVolumes();

render();

    });


    document
    .getElementById("reactionNumber")
    .addEventListener("input", function(){

        reactionSettings.reactions =
        Number(this.value);

        calculateVolumes();

render();

    });


    document
    .getElementById("extraReactions")
    .addEventListener("input", function(){

        reactionSettings.extra =
        Number(this.value);

        calculateVolumes();

render();

    });


    document
    .getElementById("overage")
    .addEventListener("input", function(){

        reactionSettings.overage =
        Number(this.value);

        calculateVolumes();

render();

    });

}
