function convertMolarity(value, unit){

    switch(unit){

        case "M":
            return value;

        case "mM":
            return value / 1000;

        case "uM":
            return value / 1000000;

        default:
            return value;

    }

}
