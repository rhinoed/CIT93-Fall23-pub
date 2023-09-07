# Week 5 Iteration and Intro to Objects

#### Overview
The use of objects in this weeks code has made some function simpler. The `start()` function has less going on.
```javascript
function start(numInHousehold, sizeOfHome) {
    // All the const that were here before have been put into the object below

	// used unshift instead of push so the newest array appears first
	cfpData.unshift({
		household: numInHousehold,
		homSize: sizeOfHome,
		householdPts: calculateCFHouseholdPts(numInHousehold),
		homeSizePts: calculateCFHomeSizePts(sizeOfHome),
		cfpTotal: function () {
			return this.householdPts + this.homeSizePts;
		}
	});

	displayOutput();
}
```
- You can see also the use of a function for `cfpTotal`

The `displayOutput()` function did not change very much from week 4. but there are a couple of changes.
```javascript
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
	
	// used the word object for descriptive purposes
	for (object of cfpData) {
		// added a counter used to get right output label
		let j = 0
		const result_list = document.createElement("ul");
		result_list.className = "result_list";
		// used the word key for descriptive purposes
		for (key in object ) {
			const listItem = document.createElement("li");
			if (key == "cfpTotal"){
				listItem.textContent = `${outputLabels[j]} ${object.cfpTotal()}`;
			}else{
				listItem.textContent = `${outputLabels[j]} ${object[key]}`;
			}
			result_list.appendChild(listItem);
			j++;
		}
		newParagraph.appendChild(result_list);
	}
	// used replaceChildren because I call displayOut everytime start is called
	output.replaceChildren(newParagraph);
}
``` 
The two major changes are:
- adding `j` counter variable
- adding the `if (key == "cfpTotal")` statment 

#### Conclusion

This week code challenge was easier to implement into my code than last weeks.  But it was still fun. It may be interesting to note that JavaScript Objects are found almost everywhere. A lot of web APIs output JSON data which is based on JavaScript Objects. And the JSON data can be used with other programming languages.

#### Potential Changes

###### The `start()` Function
- I might be able to move the creation of the object to another function and get rid of this function
```javascript
function prepareToStart() {
	const totalCFHeading = document.querySelector("#totalCF");
	const householdSelectorValue = document.querySelector("#household").value;
	const homeSizeSelectorValue = document.querySelector("#homeSize").value;
	const cfpObj = {
            {
            household: householdSelectorValue,
            homSize: homeSizeSelectorValue,
            householdPts: calculateCFHouseholdPts(numInHousehold),
            homeSizePts: calculateCFHomeSizePts(sizeOfHome),
            cfpTotal: function () {
                return this.householdPts + this.homeSizePts;
            }
        }
    }
	// added this so result only update when both inputs have a value
	if (cfpObj.household != "" && cfpObj.homeSize != "") {
		directDisplayObj(cfpObj);
		totalCFHeading.textContent = "";
	} else if (householdSelectorValue == "" || homeSizeSelectorValue == "") {
		totalCFHeading.textContent = `Make selection for both to see results below your score so far is ${totalCFPts}`;
	} else {
		totalCFHeading.textContent =
			"Make selections to see how they effect your score";
	}
}
```

