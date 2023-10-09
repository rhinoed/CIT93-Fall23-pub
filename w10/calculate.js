// ##################	Calculation related functions	##################
// this fuction is call easch time the user changes their selection
export const calculateCFHouseholdPts = (numberInHoushold = 3) => {
    if (numberInHoushold === 1) {
        return 14;
    } else if (numberInHoushold === 2) {
        return 12;
    } else if (numberInHoushold === 3) {
        return 10;
    } else if (numberInHoushold === 4) {
        return 8;
    } else if (numberInHoushold === 5) {
        return 6;
    } else if (numberInHoushold === 6) {
        return 4;
    } else if (numberInHoushold > 6) {
        return 2;
    } else { // only condition left is household is zero
        console.log("no update to points household is empty");
        return 0;
    }
}
// like the above this function just returns a vaule that is used in the calculateCarbonFootprintPts function.
export const calculateCFHomeSizePts = (sizeOfHome = "small") => {
    switch (sizeOfHome) {
        case "large":
            return 10;
        case "medium":
            return 7;
        case "small":
            return 4;
        case "apartment":
            return 2;
        default:
            console.log("no update to points home size not selected");
            return 0;
    }
}
