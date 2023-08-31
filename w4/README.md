# Week 4 - Intro to Iteration
#### Overview
If you look at the week 3 README you'll see a section where I list some ways to improve my code. I have implemented most of thoose in my code this week.

For this week in the displayOutput function I used a nested for loop. The first For of lopp iterates over each array in the cfpData array, and the second For in loop itterate over each element in the array from the outer loop.
```javascript
for (array of cfpData) {
		console.log(array);
		const result_list = document.createElement("ul");
		result_list.className = "result_list";
		for (index in array) {
			const listItem = document.createElement("li");
			listItem.textContent = `${outputLabels[index]} ${array[index]}`;
			result_list.appendChild(listItem);
		}
		newParagraph.appendChild(result_list);
	}
```
- You can see for each array in `cfpData` I create an unorder list element and give it a class name,
- And then for that array I create a list item for each of the five elements.
- Then I append `listItem` to the unorder list. The last thing I do in the For loop is to append the unorder list to the paragraph element which I created earlier.

If we stepback and look at the entire function we can see more of what is going on.

```javascript
function displayOutput() {
	const output = document.getElementById("output");
	const newParagraph = document.createElement("p");
	const outputLabels = [
		"Your household size input was:",
		"Your home size input was:",
		"Your household points are:",
		"Your home size point are:",
		"Your total carbon footprint is:",
	];
	console.log(cfpData);
	for (array of cfpData) {
		console.log(array);
		const result_list = document.createElement("ul");
		result_list.className = "result_list";
		for (index in array) {
			const listItem = document.createElement("li");
			listItem.textContent = `${outputLabels[index]} ${array[index]}`;
			result_list.appendChild(listItem);
		}
		newParagraph.appendChild(result_list);
	}
	// used replaceChildren because I call displayOut everytime start is called
	output.replaceChildren(newParagraph);
}
```
- You can see the `outputLabel` constant which I use in the inner For loop to create a template string
- Because `displayOutput();` is called everytime `start();` is executed I needed to use `output.replaceChildren(newParagraph)` instead of `output.appendChild(newParagraph)` and move it outside of the for loop. Otherwise the output `<div>` child nodes would grow exponetialy with each call.

One more thing to look at from `start();`
```javascript
// unshift method instead of push
cfpData.unshift([
		numInHousehold,
		sizeOfHome,
		householdPts,
		homeSizePts,
		total,
	]);
```
- I used this instead of `push` because I wanted the most recently added data at the top of the list.
- This method overwrites the existing array putting the new object first.

#### Conclusion

The main challenge for me this week was to fix a bug where the number of lists in the output grew exponetialy with every call to `start();`. I placed the `displayOutput();` call inside of `start();` because it allowed me to keep my user input functional and make minimal changes to my code.

#### Potential Changes
- The `prepareToStart();` which was called `updateCFPts();` could be made better or possibly eliminated.
- Maybe use an array of objects instead of an array of arrays for `cfpData`. Iteration would be easier and you could use dot notation.
- That object migh look something like this:
```javascript
const cfpData = {
    "household": 3,
    "homSize": "medium",
    "householdPts": 10,
    "homeSizePts": 7,
    "total": 17
}
console.log(cfpData.total)
// console output: 17
```