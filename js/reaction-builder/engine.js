function calculateVolumes(){

    components.forEach(component=>{

    if(component.stock < 0){

        component.stock = 0;

    }

    if(component.target < 0){

        component.target = 0;

    }

});

    let usedVolume = 0;


    components.forEach(component => {


        if(component.method === "concentration"){


    if(component.stock <= 0){

        component.volumeReaction = 0;

    }

    else {

        let volume =
        (
            component.target *
            reactionSettings.volume
        )
        /
        component.stock;


        component.volumeReaction = volume;

    }

}

else if(component.method === "activity"){

    if(
        component.stock <= 0 ||
        component.target <= 0
    ){

        component.volumeReaction = 0;

    }

    else {

        component.volumeReaction =
        component.target /
        component.stock;

    }

}
    
        else if(component.method === "fixedVolume"){


            component.volumeReaction =
            component.volume || 0;


        }


        else if(component.method === "auto"){


            component.volumeReaction = 0;


        }



        if(component.type !== "water"){

            usedVolume += component.volumeReaction;

        }


    });



    components.forEach(component => {


        if(component.type === "water"){


            component.volumeReaction =
Math.max(
    0,
    reactionSettings.volume - usedVolume
);


        }


    });

checkReactionVolume();

    calculateMasterMix();


}

function calculateMasterMix(){

    let totalReactions =
        reactionSettings.reactions
        +
        reactionSettings.extra;


    totalReactions =
        totalReactions *
        (1 + reactionSettings.overage / 100);


    components.forEach(component => {

        if(
            component.includeMM &&
            component.volumeReaction > 0
        ){

            component.volumeMasterMix =
                component.volumeReaction *
                totalReactions;

        }

        else {

            component.volumeMasterMix = 0;

        }

    });

}

function checkReactionVolume(){

    clearReactionWarning();

    let totalVolume = 0;

    let smallVolumeComponent = null;


    components.forEach(component => {

        if(component.type !== "water"){

            totalVolume += component.volumeReaction;

        }


        if(
            component.type !== "water" &&
            component.volumeReaction > 0 &&
            component.volumeReaction < 0.1
        ){

            smallVolumeComponent = component;

        }

    });


    if(totalVolume > reactionSettings.volume){

        showReactionWarning(
            "Reaction volume too small for current components"
        );

        return;

    }


    if(smallVolumeComponent){

        showReactionWarning(
            `${smallVolumeComponent.name}: volume below 0.1 µL. Consider preparing a dilution.`
        );

    }

}

function showReactionWarning(message){


    const warning =
    document.getElementById("reactionWarning");


    if(!warning){
        return;
    }


    warning.innerHTML =
    "⚠️ " + message;


    warning.classList.add("active");


}

function clearReactionWarning(){


    const warning =
    document.getElementById("reactionWarning");


    if(!warning){
        return;
    }


    warning.innerHTML="";


    warning.classList.remove("active");


}
