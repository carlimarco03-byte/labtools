const COMPONENT_PRESETS = {

    primer: {

        name: "Primer",

        type: "primer",

        method: "concentration",

        stock: 10,
        stockUnit: "µM",

        target: 0.5,
        targetUnit: "µM",

        includeMM: true

    },

    probe: {

        name: "Probe",

        type: "probe",

        method: "concentration",

        stock: 10,
        stockUnit: "µM",

        target: 0.2,
        targetUnit: "µM",

        includeMM: true

    },

    polymerase: {

        name: "DNA Polymerase",

        type: "polymerase",

        method: "fixedVolume",

        stock: 5,
        stockUnit: "U/µL",

        volume: 0.25,

        includeMM: true

    },

    dntps: {

        name: "dNTP Mix",

        type: "dntps",

        method: "concentration",

        stock: 10,
        stockUnit: "mM",

        target: 0.2,
        targetUnit: "mM",

        includeMM: true

    },

    mgcl2: {

        name: "MgCl₂",

        type: "mgcl2",

        method: "concentration",

        stock: 50,
        stockUnit: "mM",

        target: 2,
        targetUnit: "mM",

        includeMM: true

    },

    other: {

        name: "New Component",

        type: "reagent",

        method: "concentration",

        stock: 10,
        stockUnit: "µM",

        target: 0.5,
        targetUnit: "µM",

        includeMM: true

    }

};
