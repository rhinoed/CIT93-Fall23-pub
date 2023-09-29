// CIT 93
// Mark Edmunds
// Spetember 20, 2023
// w7 CF Iteration and Objects

// top-level const

import {renderTable} from "./table.js"
import {calculateCFHomeSizePts, calculateCFHouseholdPts} from "./calculate.js";



const USERINPUT = document.getElementsByClassName("userinput");
export const cfpData = [];


// ###################	Event handler functions	###################
// This updates the points the points shown next to the input boxes.
function householdSelectorChanged() {
    const householdPts = calculateCFHouseholdPts(parseInt(this.value));
    const ptsDisplay = document.querySelector("#householdPts");
    ptsDisplay.textContent = householdPts != 0 ? `  ${householdPts} Pts added` : null;
    toggleSubmitButton();
}
// changes the homeSize span text content
function homeSizeSelectorChanged() {
    const homeSizePts = calculateCFHomeSizePts(this.value);
    const ptsDisplay = document.querySelector("#homeSizePts");
    ptsDisplay.textContent = homeSizePts != 0 ? `  ${homeSizePts} Pts added` : null;
    toggleSubmitButton();
}

// this function is called when the form is submitted
function submit(event) {
    event.preventDefault();
    cfpData.push(new cfpObjConstrutor(this.firstname.value, this.lastname.value, this.household.value, this.homesize.value));
    // displayOutput();
    renderTable();
    // reset form & points
    this.reset();
    document.getElementById("householdPts").textContent = null;
    document.getElementById("homeSizePts").textContent = null
    toggleSubmitButton();
}

// ###################	DOM manipulation  ###################
// this function enables and disables the submit button based on if the user has filled out all the fields
export function toggleSubmitButton() {
    
    const totalCFHeading = document.querySelector("#totalCF");
    const inputValues = [];
    console.log[inputValues.length];
    for (let element of USERINPUT) {
        inputValues.push(element.value);
    }
    // check to see if inputValues contains empty strings
    if (inputValues.includes("")) {
        totalCFHeading.textContent = "All fields must be filled out to submit";
        document.getElementById("submit").setAttribute("disabled", "disabled");
        document.getElementById("submit").setAttribute("class", "button disabled");
    } else {
        document.getElementById("submit").removeAttribute("disabled");
        document.getElementById("submit").setAttribute("class", "button");
        totalCFHeading.textContent = "Click submit to see your results";
    }
}

// ################### object constructor ###################
export function cfpObjConstrutor(firstName, lastName, household, homeSize) { // object properties
    this.id = cfpData.length;
    this.firstName = firstName;
    this.lastName = lastName
    this.user = `${firstName} ${lastName}`;
    this.household = parseInt(household);
    this.homeSize = homeSize;
    this.householdPts = calculateCFHouseholdPts(this.household);
    this.homeSizePts = calculateCFHomeSizePts(this.homeSize);
    this.cfpTotal = this.householdPts + this.homeSizePts
   
}
// ################### event listener function ###################
function addListener(element, event, func) { // create event listeners passing the functions which are executed when changes are made to these elements
    element.addEventListener(event, func);
}

// add event listeners
addListener(document.getElementById("form"), "submit", submit);
addListener(document.querySelector("#household"), "change", householdSelectorChanged);
addListener(document.querySelector("#homesize"), "change", homeSizeSelectorChanged);
addListener(document.getElementById("firstname"),"input",toggleSubmitButton);
addListener(document.getElementById("lastname"),"input",toggleSubmitButton);

