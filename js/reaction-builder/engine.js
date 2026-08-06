function calculateVolumes(){


    let usedVolume = 0;


    components.forEach(component => {


        if(component.method === "concentration"){


            let volume =
            (
                component.target *
                reactionSettings.volume
            )
            /
            component.stock;


            component.volumeReaction =
            volume;


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


        if(component.includeMM){


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


    let totalVolume = 0;


    components.forEach(component => {


        if(component.type !== "water"){

            totalVolume += component.volumeReaction;

        }


    });


   if(totalVolume > reactionSettings.volume){


    console.warn(
    "Reaction volume too small for current components"
    );


}


}
