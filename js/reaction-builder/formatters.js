function formatVolume(volume){


    if(volume === null || volume === undefined){

        return "-";

    }


    if(volume === 0){

        return "-";

    }


    if(volume < 0.001){

        return (
            (volume * 1000000).toFixed(1)
            + " nL"
        );

    }


    if(volume < 1){

        return (
            volume.toFixed(2)
            + " µL"
        );

    }


    if(volume >= 1000){

        return (
            (volume / 1000).toFixed(2)
            + " mL"
        );

    }


    return (
        volume.toFixed(2)
        + " µL"
    );

}
