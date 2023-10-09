
# Week 10 

##### Refactoring to Arrow Functions
In my code base I use the `this` keyword in a lot of my functions. This poses a problem, as arrow functions do not have a binding to `this`. So in order to convert the functions to arrow functions I would need to reference the objects directly. I really don't want to do that, because it provides no real benefit other than praticing writing arrow function. So for most of the functions that use `this` I am leaving them a standard functions. But I have converted all the rest. In order to demonstate my understanding of how I would convert them I have converted two of my function that used `this` to arrow functions.

```js
const householdSelectorChanged = () => {
    // HOUSEHOLD.value was this.value 
    const householdPts = calculateCFHouseholdPts(parseInt(HOUSEHOLD.value));
    const ptsDisplay = document.getElementById("householdPts");
    ptsDisplay.textContent = householdPts != 0 ? `  ${householdPts} Pts added` : "";
    toggleSubmitButton();
}
```
```js
const homeSizeSelectorChanged = () => {
    // HOMESIZE.value was this.value 
    const homeSizePts = calculateCFHomeSizePts(HOMESIZE.value);
    const ptsDisplay = document.getElementById("homeSizePts");
    ptsDisplay.textContent = homeSizePts != 0 ? `  ${homeSizePts} Pts added` : "";
    toggleSubmitButton();
}
```

#### Default Values
For the default values I chose `calculateCFHouseholdPt` and `calculateCFHomeSizePts` because they make the most sense to have defaults in my opinion. Here is what they look like now:

```js
export const calculateCFHouseholdPts = (numberInHoushold = 3) => {
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
    } else { // only condition left is household is zero
        console.log("no update to points household is empty");
        return 0;
    }
}
```

```js
export const calculateCFHomeSizePts = (sizeOfHome = "small") => {
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
#### REST Operator
I decided that in my code the `cfpObjectConstrutor()` made the most sense to use the rest operator on for this assignment. It is not something that I am likely to keep in the code.

```js
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
```

#### Conclusion
For the most part this challenge was strait forward. I was already aware that arrow functions don't have bindings to `this` so I did not waste any time trying to figure out the errors converting those functions would have caused. The use of default values is familiar to me from the Swift programming language. The rest operator I can see being useful when the number of arguments are unknown or might change but in our code it is not very useful.
