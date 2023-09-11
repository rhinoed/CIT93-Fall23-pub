# Week 6 Forms and Data Validation

##### Overview

Besides creating the form and ouptuting the username and carbon footprint to the DOM I also did some cleaning up of my code removing some fucntions and restructuring of my code. I added an object constructor function this week as well.
```javascript
function cfpObjConstrutor(firstName, lastName, household, homeSize) {
	// object properties
	this.user = `${firstName} ${lastName}`;
	// Number() also converts the string to a number, but I used parseInt() because it is more specific.
	this.household = parseInt(household);
	this.homeSize = homeSize;
	this.householdPts = calculateCFHouseholdPts(this.household);
	this.homeSizePts = calculateCFHomeSizePts(this.homeSize);

	// object methods
	this.cfpTotal = function () {
		return this.householdPts + this.homeSizePts;
	};
}
``` 
Also because of the addition of `user` to the object I needed to make changes to the `displayOutput()` function
so everything would display correctly. I did this by adding a `<h4>` element to the `<p>` and then altering the `if else` statment to include a condition for `user`

```javascript
const userHeader = document.createElement("h4");
		result_list.className = "result_list";
		// week 6 refactor using form submission
		for (key in object) {
			let newElement;
			if (key == "cfpTotal") {
				newElement = document.createElement("li");
				newElement.textContent = `${outputLabels[j]} ${object.cfpTotal()}`;
				result_list.appendChild(newElement);
                // notice the counter variable is only incremented in two blocks to ensure the labels match with the values
				j++;
			} else if (key == "user") {
				userHeader.textContent = `${object.user}`;
				newElement = document.createElement("li");
			} else {
				newElement = document.createElement("li");
				newElement.textContent = `${outputLabels[j]} ${object[key]}`;
				result_list.appendChild(newElement);
				j++;
			}
```  
I removed the `start()` amd `prepareToStart()` functions, because they were unecessary. I created a function `toggelSubmitButton()` which enables the submit button when all fields of the form have a value, and disables it when one or more fields do not have a value.

```javascript
function toggleSubmitButton() {
	// create reference to the form
	const form = document.getElementsByClassName("userinput");
	const totalCFHeading = document.querySelector("#totalCF");
	const inputValues = [];
	for (element of form) {
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
```
On the HTML side I moved the `<style>` into a separate CSS file just to tiddy things up a bit

#### Conclusion

It was fun messing around with forms this week. It was also fun writing the `toggleSubmitButton()` function learning how I can set and remove attributes on elements.

