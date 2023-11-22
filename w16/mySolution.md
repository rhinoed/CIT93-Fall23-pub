# My Solution

#### Instructions from Website
- If you run your dishwasher or washing machine more than 9 times per week, then add 3 points. If you run it 4 to 9 times, then add 2 points. If you run it 1 to 3 times, then add 1 point. If you don't have a dishwasher, then add nothing.

- If you have a dishwasher and a washing machine, then perform the calculation twice.


#### My thoughts
Since owning a dish washer has two states owning (`true`) or not owning (`false`). I would create a checkbox input in the HTML. If that checkbox value was `false` no calculation is needed since you add nothing in that case. If it was `true` I would enable a number of runs input. I would just multiple the return of the calculation by 2 to get the points.
1. The points hinge on owning a dish washer. This is how I would enable disable the number of runs input
```js
addListener(document.getElementById("dishwasher"),"change",function(){
    const runs = document.getElementById("runs");
    if(this.checked){
        runs.removeAttribute("disabled");
    }else{
        runs.setAttribute("disabled", "disabled");
    }
})
```
2. Example of how I would get the points
```js
const ownDishWasher = document.getElementById("dishwasher").checked
const runs = document.getElementById("runs").value

const getWaterUsagePts = (runs) =>{
    // I was thinking I could switch on a range but this did not work instead I used a if else
    switch(parseInt(runs)){
        case (runs > 9):
            return 3
        case (4 >= runs <= 9):
            return 2
        case (1 >= runs <= 3):
            return 1
    }
}
const points = ownDishWasher ? getWeatherUsagePts(runs) * 2: 0
```
