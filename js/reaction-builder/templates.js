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
    stock:20,
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
    stock: 20,
    stockUnit: "µM",
    target: 0.5,
    targetUnit: "µM",
     volumeReaction:0,
    volumeMasterMix:0,
    includeMM: true
    
},

{
    id:6,

    name:"dNTP Mix",

    type:"dntps",

    method:"concentration",

    order:5,

    stock:10,
    stockUnit:"mM",

    target:0.2,
    targetUnit:"mM",

    volumeReaction:0,
    volumeMasterMix:0,

    includeMM:true
},

{
    id:7,

    name:"DNA Polymerase",

    type:"polymerase",

    method:"activity",

    order:6,

    stock:5,
    stockUnit:"U/µL",

    target:1.25,
    targetUnit:"U",

    volumeReaction:0,
    volumeMasterMix:0,

    includeMM:true
},    

{
    id:4,
    name:"DNA",
    type:"template",
    method:"fixedVolume",
    order:7,
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

const REACTION_TEMPLATES = {

    "PCR": PCR_TEMPLATE,

    "qPCR (SYBR)": [

    {
        id:101,

        name:"Water",

        type:"water",

        method:"auto",

        locked:true,

        order:1,

        volumeReaction:0,

        volumeMasterMix:0,

        includeMM:true
    },

    {
        id:102,

        name:"2X SYBR Master Mix",

        type:"mastermix",

        method:"concentration",

        order:2,

        stock:2,

        stockUnit:"X",

        target:1,

        targetUnit:"X",

        volumeReaction:0,

        volumeMasterMix:0,

        includeMM:true
    },

    {
        id:103,

        name:"Forward Primer",

        type:"primer",

        method:"concentration",

        order:3,

        stock:20,

        stockUnit:"µM",

        target:0.5,

        targetUnit:"µM",

        volumeReaction:0,

        volumeMasterMix:0,

        includeMM:true
    },

    {
        id:104,

        name:"Reverse Primer",

        type:"primer",

        method:"concentration",

        order:4,

        stock:20,

        stockUnit:"µM",

        target:0.5,

        targetUnit:"µM",

        volumeReaction:0,

        volumeMasterMix:0,

        includeMM:true
    },

    {
        id:105,

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
    }

],

    "qPCR (Probe)": [

    {
        id:201,

        name:"Water",

        type:"water",

        method:"auto",

        locked:true,

        order:1,

        volumeReaction:0,

        volumeMasterMix:0,

        includeMM:true
    },

    {
        id:202,

        name:"2X Probe Master Mix",

        type:"mastermix",

        method:"concentration",

        order:2,

        stock:2,

        stockUnit:"X",

        target:1,

        targetUnit:"X",

        volumeReaction:0,

        volumeMasterMix:0,

        includeMM:true
    },

    {
        id:203,

        name:"Forward Primer",

        type:"primer",

        method:"concentration",

        order:3,

        stock:20,

        stockUnit:"µM",

        target:0.5,

        targetUnit:"µM",

        volumeReaction:0,

        volumeMasterMix:0,

        includeMM:true
    },

    {
        id:204,

        name:"Reverse Primer",

        type:"primer",

        method:"concentration",

        order:4,

        stock:20,

        stockUnit:"µM",

        target:0.5,

        targetUnit:"µM",

        volumeReaction:0,

        volumeMasterMix:0,

        includeMM:true
    },

    {
        id:205,

        name:"Probe",

        type:"probe",

        method:"concentration",

        order:5,

        stock:10,

        stockUnit:"µM",

        target:0.2,

        targetUnit:"µM",

        volumeReaction:0,

        volumeMasterMix:0,

        includeMM:true
    },

    {
        id:206,

        name:"DNA",

        type:"template",

        method:"fixedVolume",

        order:6,

        stock:20,

        stockUnit:"ng/µL",

        volume:2,

        target:null,

        targetUnit:null,

        volumeReaction:0,

        volumeMasterMix:0,

        includeMM:false
    }

],

    "RT-PCR": [

    {
        id:301,

        name:"Water",

        type:"water",

        method:"auto",

        locked:true,

        order:1,

        volumeReaction:0,

        volumeMasterMix:0,

        includeMM:true
    },

    {
        id:302,

        name:"2X RT-PCR Master Mix",

        type:"mastermix",

        method:"concentration",

        order:2,

        stock:2,

        stockUnit:"X",

        target:1,

        targetUnit:"X",

        volumeReaction:0,

        volumeMasterMix:0,

        includeMM:true
    },

    {
        id:303,

        name:"RT Primer",

        type:"primer",

        method:"concentration",

        order:3,

        stock:20,

        stockUnit:"µM",

        target:0.5,

        targetUnit:"µM",

        volumeReaction:0,

        volumeMasterMix:0,

        includeMM:true
    },

    {
        id:304,

        name:"Forward Primer",

        type:"primer",

        method:"concentration",

        order:4,

        stock:20,

        stockUnit:"µM",

        target:0.5,

        targetUnit:"µM",

        volumeReaction:0,

        volumeMasterMix:0,

        includeMM:true
    },

    {
        id:305,

        name:"Reverse Primer",

        type:"primer",

        method:"concentration",

        order:5,

        stock:20,

        stockUnit:"µM",

        target:0.5,

        targetUnit:"µM",

        volumeReaction:0,

        volumeMasterMix:0,

        includeMM:true
    },

    {
        id:306,

        name:"RNA Template",

        type:"template",

        method:"fixedVolume",

        order:6,

        stock:null,

        stockUnit:null,

        volume:2,

        target:null,

        targetUnit:null,

        volumeReaction:0,

        volumeMasterMix:0,

        includeMM:false
    }

],
    "Blank Mix": [

    {
        id:401,

        name:"Water",

        type:"water",

        method:"auto",

        locked:true,

        order:1,

        volumeReaction:0,

        volumeMasterMix:0,

        includeMM:true
    }

],

    };
