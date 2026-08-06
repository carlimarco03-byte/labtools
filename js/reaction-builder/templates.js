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
    id: 2,
    name: "MgCl₂",
    type: "salt",
    method: "concentration",
    stock: 25,
    stockUnit: "mM",
    target: 2,
    targetUnit: "mM",
    includeMM: true
},

{
    id: 3,
    name: "Forward Primer",
    type: "primer",
    method: "concentration",
    stock: 10,
    stockUnit: "µM",
    target: 0.5,
    targetUnit: "µM",
    includeMM: true
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
    includeMM: true
},

{
    id: 5,
    name: "DNA",
    type: "template",
    method: "fixedVolume",
    volume: 2,
    includeMM: false
},

{
    id: 6,
    name: "Water",
    type: "water",
    method: "auto",
    includeMM: true
}

];
