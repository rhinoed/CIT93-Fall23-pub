// CIT 93
// Mark Edmunds
// Spetember 20, 2023
// w7 CF Iteration and Objects

// top-level const

import {renderTable} from "./table.js"
import {calculateCFHomeSizePts, calculateCFHouseholdPts} from "./calculate.js";
import { FNAME, FORMERRORS,HOUSEHOLD,HOMESIZE, HOMESIZEPTS, HOUSHOLDPTS, LNAME, SUBMIT, USERINPUT,cfpData} from "./global.js";
import {saveToLS} from "./localStorage.js";





// ###################	Event handler functions	###################
// This updates the points the points shown next to the input boxes.
const householdSelectorChanged = () => {
    const householdPts = calculateCFHouseholdPts(parseInt(HOUSEHOLD.value));
    const ptsDisplay = document.getElementById("householdPts");
    ptsDisplay.textContent = householdPts != 0 ? `  ${householdPts} Pts added` : "";
    toggleSubmitButton();
}
// changes the homeSize span text content
const homeSizeSelectorChanged = () => {
    const homeSizePts = calculateCFHomeSizePts(HOMESIZE.value);
    const ptsDisplay = document.getElementById("homeSizePts");
    ptsDisplay.textContent = homeSizePts != 0 ? `  ${homeSizePts} Pts added` : "";
    toggleSubmitButton();
}

const validateField = (event) => {
    const field = event.target.value;
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
// Not converting this function to arrow function, because arrows don't have an binding to `this`
const submit = function(event) {
    event.preventDefault();
   
    if (FNAME.value !== "" && LNAME.value !== ""){
        cfpData.push(new cfpObjConstrutor(this.firstname.value, this.lastname.value, this.household.value, this.homesize.value));
        saveToLS(cfpData);
        renderTable();
    }
    HOUSHOLDPTS.textContent = null;
    HOMESIZEPTS.textContent = null;
    // reset form & points
    this.reset();
    toggleSubmitButton();
}

// ###################	DOM manipulation  ###################
// this function enables and disables the submit button based on if the user has filled out all the fields
export const toggleSubmitButton =  () => {
    
    const totalCFHeading = document.querySelector("#totalCF");
    const inputValues = [];
    for (let element of USERINPUT) {
        inputValues.push(element.value);
    }
    // check to see if inputValues contains empty strings
    if (inputValues.includes("")) {
       totalCFHeading.textContent = "All fields must be filled out to submit";
       SUBMIT.setAttribute("disabled", "disabled");
       SUBMIT.setAttribute("class", "button disabled");
    } else {
       SUBMIT.removeAttribute("disabled");
       SUBMIT.setAttribute("class", "button");
       totalCFHeading.textContent = "Click submit to see your results";
       //const formErrors = document.getElementsByClassName("form-error")
       for (const error of FORMERRORS){
            error.textContent = "";
       }    
    }
}

// ################### object constructor ###################
// export const cfpObjConstrutor = function(firstName, lastName, household, homeSize){ // object properties
//     this.id = cfpData.length;
//     this.firstName = firstName;
//     this.lastName = lastName
//     this.user = `${firstName} ${lastName}`;
//     this.household = parseInt(household);
//     this.homeSize = homeSize;
//     this.householdPts = calculateCFHouseholdPts(this.household);
//     this.homeSizePts = calculateCFHomeSizePts(this.homeSize);
//     this.cfpTotal = this.householdPts + this.homeSizePts
   
// }
// Not converting this function to arrow function, because arrow functions can't be used a constructors
export const cfpObjConstrutor = function(...params){ // object properties
    this.id = cfpData.length;
    this.firstName = params[0];
    this.lastName = params[1];
    this.user = `${params[0]} ${params[1]}`;
    this.household = parseInt(params[2]);
    this.homeSize = params[3];
    this.householdPts = calculateCFHouseholdPts(this.household);
    this.homeSizePts = calculateCFHomeSizePts(this.homeSize);
    this.cfpTotal = this.householdPts + this.homeSizePts

}
// ################### event listener function ###################
 const addListener = (element, event, func) => { // create event listeners passing the functions which are executed when changes are made to these elements
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
FNAME.addEventListener('blur', validateField);
LNAME.addEventListener('blur', validateField);
HOUSEHOLD.addEventListener('blur', validateField);
HOMESIZE.addEventListener('blur', validateField);

