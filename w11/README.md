
# Week 11 

## Starting Code
Code from the end of week 11 code along

## Bug Fix
After moving my code over I realized I had a bug when the page loaded the local storage was not working it was because I had this
```js
saveToLS(fpObj);
```
I not sure when or why I changed this but it should be
```js
saveToLS(cfpData);
```
## Overview
- [x] Update form with a dropdown (select) for the food options 

- [x] Update the FP class with the this new input and write a method to include food into the footprint calculation

```js
export class Footprint{
    constructor(firstName, lastName, household, homeSize,foodChoice,foodSource){ 
        this.user = `${firstName} ${lastName}`;
        this.firstName = firstName;
        this.lastName = lastName;
        this.household = parseInt(household);
        this.homeSize = homeSize;
        this.foodChoices = `${foodChoice}, ${foodSource}`
        this.setHouseholdPts();
        this.setHomeSizePts();
        this.setFoodChoicePts(foodChoice,foodSource);
        this.total();
        
    }
    //... methods
}
```
- [x] Update the total method to include this in the total.
```js
total (){
         this.total = this.householdPts + this.homeSizePts + this.foodChoicePts
    }
```
- [x] Update the heading the include the food input.
```js
const theadLabels = [
        "Name",
        "Household",
        "House Size",
        "Food Choices",
        "Carbon Footprint",
        "Actions",
    ];
```

- [x] Update the table body render and button (edit and del) handle the new input.

Updating the table
```js
 for (const [key, value] of Object.entries(obj)) { // update after video: decided to use if else due to clarity
        if (key === "user" || key === "household" || key === "homeSize" ||key === "foodChoices"|| key === "total") {
            const tblData = document.createElement("td")
            tblData.textContent = value
            tblRow.appendChild(tblData);
        }
    }
```
Updating the edit
```js
 const editRow = async function() {
    const editForm = document.getElementById("edit-form");
    const form = document.getElementsByClassName("userinput");
    for (const element of form) {
        element.disabled = true;
    }
    const actionBtns = document.getElementsByClassName("actionBtns");
    for (const button of actionBtns) {
        button.disabled = true;
    }
    // set edit form input values to current td values
    editForm.editfirstname.value = cfpData[this.value].firstName;
    editForm.editlastname.value = cfpData[this.value].lastName;
    editForm.edithousehold.value = cfpData[this.value].household;
    editForm.edithomesize.value = cfpData[this.value].homeSize;
    editForm.editfoodchoice.value = cfpData[this.value].foodChoices.split(",")[0]
    editForm.edit_food_source.value = cfpData[this.value].foodChoices.split(", ")[1]
    if (await editComplete()) {
        const firstName = document.getElementById("editfirstname");
        const lastName = document.getElementById("editlastname");
        const household = document.getElementById("edithousehold");
        const homeSize = document.getElementById("edithomesize");
        const foodChoice = document.getElementById("editfoodchoice");
        const foodSource = document.getElementById("edit-form").edit_food_source;
        const obj = new Footprint(firstName.value, lastName.value, household.value, homeSize.value,foodChoice.value,foodSource.value);
        cfpData.splice(this.value, 1, obj);
        // cfpData[this.value] = obj;
        saveToLS(cfpData);
        renderTable();
    } else {
        console.log("edit canceled");
    }
}
```
