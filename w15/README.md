
# Week 15

## Starting Code
Code from the end of week 12

## Adding Carbon Footprint Average to Table Using HOFs

#### Overview
For this challenge I used the `map` and `reduce` Higher Order Functions to calculate the average of the carbon footprints. I used them in the function `calculateAverageCF` which I have in my calculate.js module. Here is the code for that:
```js
export const calculateAverageCF = function (arr){
    const totals = arr.map((obj)=> obj.total)
    const average = totals.reduce((prevSum, nxtValue )=> prevSum + nxtValue,0) / totals.length
    return average
}
```
For outputting the average to the table I used the `insertRow` method. I do this in the `insertRow` function. In the function I first insert the row into the table body ommitting an index argument which will default to -1, inserting the new row into the last position. Then I create twp cells in the new row using `insertCell`. For the first cell I insert it into index 0 and set the `colspan` attribute to 4. I then create and assign values to textNodes for the cells and append them. Here is the code:
```js
const insertRow = function (){
    const average = calculateAverageCF(cfpData);
    const body = document.getElementById("tblBody");
    const newRow = body.insertRow()
    const labelCell = newRow.insertCell(0);
    labelCell.setAttribute("colspan","4");
    const valueCell = newRow.insertCell(-1);
    const labelText = document.createTextNode("Average");
    const valueText = document.createTextNode(Math.floor(average));
    labelCell.appendChild(labelText);
    valueCell.appendChild(valueText)
    
}
```
