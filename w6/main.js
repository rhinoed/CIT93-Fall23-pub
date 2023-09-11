// CIT 93
// Mark Edmunds
// August 30, 2023
// w5 CF Iteration and Objects

// top-level const
const FORM = document.getElementById("form");
const cfpData = [];
// functions
// this fuction is call easch time the user changes their selection
function calculateCarbonFootprintPts(numberInHoushold, sizeOfHome) {
	return (
		calculateCFHouseholdPts(numberInHoushold) +
		calculateCFHomeSizePts(sizeOfHome)
	);
}

function calculateCFHouseholdPts(numberInHoushold) {
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
	const householdPts = calculateCFHouseholdPts(parseInt(this.value));
	console.log(
		`based on your selection your household size points are ${householdPts}`
	);
	if (householdPts != 0) {
		document.querySelector(
			"#householdPts"
		).textContent = `	${householdPts} Pts added`;
	} else {
		document.querySelector("#householdPts").textContent = null;
	}
	prepareToStart();
}
// changes the homeSize span text content
function homeSizeSelectorChanged() {
	const homeSizePts = calculateCFHomeSizePts(this.value);
	console.log(
		`based on your selection your home size points are ${homeSizePts}`
	);
	if (homeSizePts != 0) {
		document.querySelector(
			"#homeSizePts"
		).textContent = `	${homeSizePts} Pts added`;
	} else {
		document.querySelector("#homeSizePts").textContent = null;
	}

	prepareToStart();
}

function prepareToStart() {
	const totalCFHeading = document.querySelector("#totalCF");
	const householdSelectorValue = document.querySelector("#household").value;
	const homeSizeSelectorValue = document.querySelector("#homesize").value;
	const totalCFPts = calculateCarbonFootprintPts(
		parseInt(householdSelectorValue),
		homeSizeSelectorValue
	);
	// added this so result only update when both inputs have a value
	if (householdSelectorValue != "" && homeSizeSelectorValue != "") {
		
		//start(householdSelectorValue, homeSizeSelectorValue);
		totalCFHeading.textContent = "Use Submit button to see results";
	} else if (householdSelectorValue == "" || homeSizeSelectorValue == "") {
		totalCFHeading.textContent = `Make selection for both to see results below your score so far is ${totalCFPts}`;
	} else {
		totalCFHeading.textContent =
			"Make selections to see how they effect your score";
	}
}

// DOM manipulation
function addListener(element, event, func) {
	//create event listeners passing the functions which are executed when changes are made to these elements
	element.addEventListener(event, func);
}

function start(obj) {

	// used unshift instead of push so the newest array appears first
	cfpData.unshift(obj);
	displayOutput();
}

// week 5 code along refactor (function using cfpData array)
function displayOutput() {
	const output = document.getElementById("output");
	const newParagraph = document.createElement("p");
	const outputLabels = [
		"Your household size input was:",
		"Your home size input was:",
		"Your household points are:",
		"Your home size points are:",
		"Your total carbon footprint is:",
	];
	
	// week 5 refactor to standard for loop (outer loop) && to use objects
	for (object of cfpData) {
		// counter for inner loop
		let j = 0
		const result_list = document.createElement("ul");
		const userHeader = document.createElement("h4");
		result_list.className = "result_list";
		// week 6 refactor using form submission
		for (key in object ) {
			let newElement;
			if (key == "cfpTotal"){
				newElement = document.createElement("li");
				newElement.textContent = `${outputLabels[j]} ${object.cfpTotal()}`;
				result_list.appendChild(newElement);
				j++;
			}else if(key == "user"){
				userHeader.textContent = `${object.user}`;
				newElement = document.createElement("li");
			}else{
				newElement = document.createElement("li");
				newElement.textContent = `${outputLabels[j]} ${object[key]}`;
				result_list.appendChild(newElement);
				j++;
			}
			result_list.appendChild(newElement);
			
		}
		newParagraph.appendChild(userHeader);
		newParagraph.appendChild(result_list);
	}
	// used replaceChildren because I call displayOut everytime start is called
	output.replaceChildren(newParagraph);
	document.getElementById("totalCF").textContent = "";
}
// object constructor
function cfpObjConstrutor(firstName,lastName,household,homeSize){
	// object properties
	this.user = `${firstName} ${lastName}`;
	// Number() also converts the string to a number, but I used parseInt() because it is more specific.
	this.household = parseInt(household);
	this.homeSize = homeSize;
	this.householdPts = calculateCFHouseholdPts(this.household);
	this.homeSizePts = calculateCFHomeSizePts(this.homeSize);

	// object methods
	this.cfpTotal = function(){
		return this.householdPts + this.homeSizePts
	}
}


// add event listener

addListener(
	document.querySelector("#household"),
	"change",
	householdSelectorChanged
);
addListener(
	document.querySelector("#homesize"),
	"change",
	homeSizeSelectorChanged
);


// ######################################## week 6 code along ########################################
// week 6 code along forms: The required attribute provide basic input validation by preventing submission if field is blank.
FORM.addEventListener("submit",function(e){
	e.preventDefault();
	const firstName = this.firstname.value;
	const lastName = this.lastname.value;
	const household = this.household.value;
	const homeSize = this.homesize.value;
	start(new cfpObjConstrutor(firstName,lastName,household,homeSize));
	this.reset();
	document.getElementById("householdPts").textContent = "";
	document.getElementById("homeSizePts").textContent = "";
	console.log(firstName);
	console.log(lastName);
});
