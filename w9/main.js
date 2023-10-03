// CIT 93
// Mark Edmunds
// Spetember 20, 2023
// w7 CF Iteration and Objects

// top-level const

import {renderTable} from "./table.js"
import {calculateCFHomeSizePts, calculateCFHouseholdPts} from "./calculate.js";
import { USERINPUT,cfpData} from "./global.js";
import {saveToLS,importFromLS } from "./localStorage.js";





// ###################	Event handler functions	###################
// This updates the points the points shown next to the input boxes.
function householdSelectorChanged() {
    const householdPts = calculateCFHouseholdPts(parseInt(this.value));
    const ptsDisplay = document.getElementById("householdPts");
    ptsDisplay.textContent = householdPts != 0 ? `  ${householdPts} Pts added` : "";
    toggleSubmitButton();
}
// changes the homeSize span text content
function homeSizeSelectorChanged() {
    const homeSizePts = calculateCFHomeSizePts(this.value);
    const ptsDisplay = document.getElementById("homeSizePts");
    ptsDisplay.textContent = homeSizePts != 0 ? `  ${homeSizePts} Pts added` : "";
    toggleSubmitButton();
}

function validateField(event) {
    const field = event.target.value;
    console.log(field);
    const fieldId = event.target.id;
    const fieldError = document.getElementById(`${fieldId}-error`);

    if (field === '') {
        fieldError.textContent = `${fieldId} is required`;
        event.target.classList.add('invalid');
    } else {
        fieldError.textContent = '';
        event.target.classList.remove('invalid');
        toggleSubmitButton();
    }
}

// this function is called when the form is submitted
function submit(event) {
    event.preventDefault();
    const firstNameIsValid = document.getElementById('firstname').value !== '';
    const lastNameIsValid = document.getElementById('lastname').value !== '';

    if (firstNameIsValid && lastNameIsValid){
        cfpData.push(new cfpObjConstrutor(this.firstname.value, this.lastname.value, this.household.value, this.homesize.value));
        saveToLS(cfpData);
        renderTable();
    }
    document.getElementById("householdPts").textContent = null;
    document.getElementById("homeSizePts").textContent = null
    // reset form & points
    this.reset();
    toggleSubmitButton();
}

// ###################	DOM manipulation  ###################
// this function enables and disables the submit button based on if the user has filled out all the fields
export function toggleSubmitButton() {
    
    const totalCFHeading = document.querySelector("#totalCF");
    const inputValues = [];
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
       const formErrors = document.getElementsByClassName("form-error")
       for (const error of formErrors){
            error.textContent ="";
       }    
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
addListener(window, "load",renderTable);

// Attach blur event listeners
document.getElementById('firstname').addEventListener('blur', validateField);
document.getElementById('lastname').addEventListener('blur', validateField);
document.getElementById('household').addEventListener('blur', validateField);
document.getElementById('homesize').addEventListener('blur', validateField);