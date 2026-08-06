const PCR_TEMPLATE = [

{
    id:1,
    name:"Buffer",
    type:"buffer",
    method:"concentration",

    order:2,

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
    order:3,
    stock:10,
    stockUnit:"µM",

    target:0.5,
    targetUnit:"µM",

    volumeReaction:0,
    volumeMasterMix:0,

    includeMM:true
   
},



{
    id: 3,
    name: "Reverse Primer",
    type: "primer",
    method: "concentration",
    order:4,
    stock: 10,
    stockUnit: "µM",
    target: 0.5,
    targetUnit: "µM",
     volumeReaction:0,
    volumeMasterMix:0,
    includeMM: true
    
},

{
    id:4,
    name:"DNA",
    type:"template",
    method:"fixedVolume",
    order:5,
    stock:20,
    stockUnit:"ng/µL",

    volume:2,

    target:null,
    targetUnit:null,

    volumeReaction:0,
    volumeMasterMix:0,

    includeMM:false
    
},

{
    id:5,
    name:"Water",
    type:"water",
    method:"auto",
    locked:true,
    order:1,

    volumeReaction:0,
    volumeMasterMix:0,

    includeMM:true
    
}

];
