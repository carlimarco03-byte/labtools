const PCR_TEMPLATE = [

{
    id:1,
    name:"Buffer",
    type:"buffer",
    method:"concentration",

    stock:10,
    stockUnit:"X",

    target:1,
    targetUnit:"X",

    volumeReaction:0,

    volumeMasterMix:0,

    includeMM:true
},

{
    id:2,
    name:"Forward Primer",
    type:"primer",
    method:"concentration",

    stock:10,
    stockUnit:"µM",

    target:0.5,
    targetUnit:"µM",

    volumeReaction:0,
    volumeMasterMix:0,

    includeMM:true
},

{
    id:3,
    name:"DNA",
    type:"template",
    method:"fixedVolume",

    stock:20,
    stockUnit:"ng/µL",

    volume:2,

    volumeReaction:0,
    volumeMasterMix:0,

    includeMM:false
},

{
    id: 4,
    name: "Reverse Primer",
    type: "primer",
    method: "concentration",
    stock: 10,
    stockUnit: "µM",
    target: 0.5,
    targetUnit: "µM",
     volumeReaction:0,
    volumeMasterMix:0,
    includeMM: true
},



{
    id:5,
    name:"Water",
    type:"water",
    method:"auto",

    volumeReaction:0,
    volumeMasterMix:0,

    includeMM:true
}

];
