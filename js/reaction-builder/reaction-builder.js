let components = structuredClone(PCR_TEMPLATE);


let reactionSettings = {

    volume:25,

    reactions:1,

    extra:0,

    overage:5

};


calculateVolumes();

render();

setupReactionListeners();

setupComponentMenu();
