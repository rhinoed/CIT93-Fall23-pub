# Week 3 Carbon Footprint And Functions
#### Code Overview
Breaking this code into steps looks like this:
1. All the globe constants are created
    - `householdSelector`
    - `homeSizeSelector`
    - `totalCFHeading`
    - `initialCFHeading`
    - `householdSelectorChanged`
    - `homeSizeSelectorChanged`
2. The event listeners are added
    - `householdSelector.addEventListener("change", householdSelectorChanged, false);`
    - `homeSizeSelector.addEventListener("change", homeSizeSelectorChanged, false);`
3. The user makes changes to the input selectors
4. The event listener is triggered and the code that was pass in as an argument, is executed.
5. The `updatePtsFor(this.id)` is called `this.id` is the id of the object that created the event.
6. The id is used in a switch statement and used to update the text content of the `<span></span>` html tag.
7. After the switch statement in the `updatePtsFor()` function the carbon footprint header is updated by calling the `calculateCarbonFootprintPts()`
#### Notes:
- There are a lot of changes to this code from the code that was in the code along.
I made these changes with the idea that in calculator webpages there are HTML elements used for input.
So I added the code to accept user input and respond to changes.
I also made changes to the code which I think helps improve it's modularity and adaptability.
- I am most familiar with using document.getElementById. But using the MDN docs I was able to find a way to use querySelector
``` javascript
// This creates a reference to the HTML home size selector
    const homeSizeSelector = document.querySelector("#homeSize"); 
```
- Using the above reference I can add event listeners which react DOM events based on user action, that I specify
```javascript
// Here I passed in the DOM event 'change', but there are many more choices such as 'click' and 'mouseover'
homeSizeSelector.addEventListener("change", homeSizeSelectorChanged);
```
- [DOM events](https://www.w3schools.com/jsref/dom_obj_event.asp)
- I am using return statements instead of changing the value of a variable.
Functions can both accept arguments and return values.
- In the code below you can see this.
```javascript
// When I call this function I pass in the value that the user has selected
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
```
```javascript
const houseSizePts = calculateCFHomeSizePts("medium");
console.log(houseSizePts);
// log result would be 7
```

## Potential Improvments To Code
- In Rios' feedback on my code she mentioned that I might want to move my updates of the DOM out of the global scope. I looked into it further and found that adding event listeners in the global scope can cause memory issues. So I might want to move them into a function like this
```javascript
function addListeners(){
    housholdSelector.addEventListener("change", householdSelectorChanged, false);
    homeSizeSelector.addEventListener("change", homeSizeSelectorChanged, false);
}
```
- If I wanted to make this more reusable I could add two parameters one which takes a DOM element, and another which takes the event the listener will respond to.
```javascript
const myHeading = document.querySelector("h1");
const mySubHeading = document.querySelector("h2");
// doing it this way I can add a listener to any element
addListener(myHeading, "click");
addListener(mySubHeading, "mouseover")
function addListeners(element,event){
    element.addEventListener(event, householdSelectorChanged);
}
```
- Another change I could make is to replace the function below with separate functions. Originally I thought that having one function which used a switch statement would require less code. But it turns out it does not.
```javascript
function updatePtsFor(elementId) {
    switch (elementId) {
        // I could refactor each case into a separate function
        case "household":
            const householdPts = calculateCFHouseholdPts(housholdSelector.value);
            if (householdPts != 0) {
                document.querySelector(
                    "#householdPts"
                ).textContent = ` ${householdPts} Pts added to your total`;
            } else {
                document.querySelector("#householdPts").textContent = null;
            }
        case "homeSize":
            const homeSizePts = calculateCFHomeSizePts(homeSizeSelector.value);
            if (homeSizePts != 0) {
                document.querySelector(
                    "#homeSizePts"
                ).textContent = ` ${homeSizePts} Pts added to your total`;
            } else {
                document.querySelector("#homeSizePts").textContent = null;
            }
    }
    // I could also refactor this into a separate function
    totalCFPts = calculateCarbonFootprintPts(
        housholdSelector.value,
        homeSizeSelector.value
    );
    if (totalCFPts != 0) {
        totalCFHeading.textContent = ` Your Carbon Footprint is ${totalCFPts} pts.`;
    } else {
        totalCFHeading.textContent = initialCFHeading;
    }
}
```
