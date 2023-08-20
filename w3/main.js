/*
CIT 93
Mark Edmunds
August 19, 2023  
w3 CF Household and Functions
 */

// functions
function calculateCFHouseholdPts(numberInHoushold){
    console.log("inside the function");
    if (numberInHoushold === 1) {
      carbonFooprintPoints = carbonFooprintPoints + 14;
    } else if (numberInHoushold === 2) {
      carbonFooprintPoints = carbonFooprintPoints + 12;
    } else if (numberInHoushold === 3) {
      carbonFooprintPoints = carbonFooprintPoints + 10;
    } else if (numberInHoushold === 4) {
      carbonFooprintPoints = carbonFooprintPoints + 8;
    } else if (numberInHoushold === 5) {
      carbonFooprintPoints = carbonFooprintPoints + 6;
    } else if (numberInHoushold === 6) {
      carbonFooprintPoints = carbonFooprintPoints + 4;
    } else if (numberInHoushold > 6) {
      carbonFooprintPoints = carbonFooprintPoints + 2;
    } else {
      // only condition left is household is zero
      console.log("no update to points household is empty");
    }
    
    console.log(`Given the number in household ${numberInHoushold} the carbon footprint score is ${carbonFooprintPoints}`);
}

// setup code from marke-pri w3
let carbonFooprintPoints = 0;
//const numberInHoushold = 3;

// global scope
calculateCFHouseholdPts(3);
calculateCFHouseholdPts(4);