// My Carbon footprint total by Mark Edmunds August 4, 2023
//Variables and values are from https://www.wikihow.com/Calculate-Your-Carbon-Footprint

const sizeOfHosehold = 10;
const homeSize = 7;
const meatConsumption = 10;
const waterConsumption = 1;
const householdPurchases = 2;
const wasteProduction = 20;
const recycledWaste = 4;
const transprtaion = 4;


// Total
const myFootprint = sizeOfHosehold + homeSize + meatConsumption + waterConsumption + householdPurchases + wasteProduction + recycledWaste + transprtaion ;

//Update HTML
const totalHeading = document.querySelector("h2");
totalHeading.textContent = myFootprint;