/*
CIT 93
Mark Edmunds
August 19, 2023  
w3 CF Household and Functions
 */

/*
note:
There are a lot of changes to this code from the code that was in the code along.
I made these changes with the idea that in calculator webpages there are HTML elements used for input.
So I added the code to accept user input and respond to changes.
I also made changes to the code which I think helps improve it's modularity and adaptability.
*/

const cfpData = [];
// functions
// this fuction is call easch time the user changes their selection
function calculateCarbonFootprintPts(numberInHoushold, sizeOfHome) {
	return (
		calculateCFHouseholdPts(numberInHoushold) +
		calculateCFHomeSizePts(sizeOfHome)
	);
}

/*
note:
I am using return statements instead of changing the value of a varible.
Functions can both accept arguments and return values.
And by saying return 14; for example the reult of calling the function is 14
*/
function calculateCFHouseholdPts(numberInHoushold) {
	if (numberInHoushold == 1) {
		return 14;
	} else if (numberInHoushold == 2) {
		return 12;
	} else if (numberInHoushold == 3) {
		return 10;
	} else if (numberInHoushold == 4) {
		return 8;
	} else if (numberInHoushold == 5) {
		return 6;
	} else if (numberInHoushold == 6) {
		return 4;
	} else if (numberInHoushold > 6) {
		return 2;
	} else {
		// only condition left is household is zero
		console.log("no update to points household is empty");
		return 0;
	}
	
}
// like the above this function just returns a vaule that is used in the calculateCarbonFootprintPts function.
function calculateCFHomeSizePts(sizeOfHome) {
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
// This updates the points the points shown next to the input boxes.
function householdSelectorChanged() {
	console.log(this.value);
	const householdPts = calculateCFHouseholdPts(this.value);
	console.log(`based on your selection your household size points are ${householdPts}`);
	if (householdPts != 0) {
		document.querySelector(
			"#householdPts"
		).textContent = ` ${householdPts} Pts added to your total`;
	} else {
		document.querySelector("#householdPts").textContent = null;
	}
	updateCFTotal();
}
// changes the homeSize span text content
function homeSizeSelectorChanged() {
	console.log(this.value);
	const homeSizePts = calculateCFHomeSizePts(this.value);
	console.log(`based on your selection your home size points are ${homeSizePts}`);
	if (homeSizePts != 0) {
		document.querySelector(
			"#homeSizePts"
		).textContent = ` ${homeSizePts} Pts added to your total`;
	} else {
		document.querySelector("#homeSizePts").textContent = null;
	}

	updateCFTotal();
}
function updateCFTotal() {
	const totalCFHeading = document.querySelector("#totalCF");
	const householdSelectorValue = document.querySelector("#household").value;
	const homeSizeSelectorValue = document.querySelector("#homeSize").value;
	const totalCFPts = calculateCarbonFootprintPts(
		householdSelectorValue,
		homeSizeSelectorValue
	);
	if (householdSelectorValue != "" && homeSizeSelectorValue != ""){
		start(householdSelectorValue,homeSizeSelectorValue)
	}
	if (totalCFPts != 0) {
		totalCFHeading.textContent = ` Your Carbon Footprint is ${totalCFPts} pts.`;
	} else {
		totalCFHeading.textContent =
			"Make selections to see how they effect your score";
	}
}

// DOM manipulation
function addListener(element, event, func){
	//create event listeners passing the functions which are executed when changes are made to these elements
	element.addEventListener(event,func)
}
function start(numInHousehold,sizeOfHome) {
	// creating for week 4 code along - arrays
	const householdPts = calculateCFHouseholdPts(numInHousehold);
	const housSizePts = calculateCFHomeSizePts(sizeOfHome);
	const total = calculateCarbonFootprintPts(numInHousehold,sizeOfHome);
	cfpData.push([numInHousehold,sizeOfHome,householdPts,housSizePts,total]);
	console.log(cfpData)
}

function displayOutput(){

}
addListener(document.querySelector("#household"),"change",householdSelectorChanged);
addListener(document.querySelector("#homeSize"),"change",homeSizeSelectorChanged);
start(4,"medium");
start(4,"large"); 
start(4,"small"); 
start(4, "apt"); // There are about 28 diffenent ways of calling this function which give unique results
