# Async Workout - Promises

## Overview
Adding the promise to `beginWorkout` was simple I just returned a `new Promise()` and moved the `setTimeout()` into it. I added `.then(workoutComplete)` tp tje `beginWorkout()` call in the event listener. The `cacth` block was a little more challenging. I decided to use the count constant to trigger the `catch` block. In the `countReps()` function I add an event listener to the `<p>` element that contains the count. If it is clicked the `count` is incremented by 1. And when the `setTimeout` completes if `count` is not equal to the number of reps in the form `reject()` is called.

Here it is in code
```js

const countReps= ()=> {
    count += 1
    const newP = document.createElement("p");
    newP.textContent = `${count} ${getPhrase(count)}`;
    OUTPUT.appendChild(newP);
    newP.addEventListener("click",()=>{
        count += 1
    })

}

const  beginWorkout = (form) =>{
    const duration = parseInt(form.time.value) * 1000;
    const message = `${form.workout.value} workout with ${form.reps.value} ${getPhrase(form.reps.value)} has started`;
    displayOut(message);
    // Async code
    return new Promise((resovle, reject)=>{
        const counter = setInterval(countReps,duration/(parseInt(form.reps.value) + .001));
        setTimeout(()=>{
            if (count != parseInt(form.reps.value)){
                reject(`Workout stopped you lost count you counted ${count} and you completed ${form.reps.value} ${form.workout.value}`);
            }else{
                resovle(form);
            }
            clearInterval(counter);
        },duration)
    })
}

document.getElementById("form").addEventListener("submit", function(event){
    OUTPUT.replaceChildren("");
    event.preventDefault();
    beginWorkout(this)
        .then(workoutComplete)
        .catch(onError)
}) 
```
The catch block can also be triggered by a bug I identified in my code last week.
###### Bug 
- [x] Issue in Safari where rep count did display the final count before the stop workout header appeared
    - This did not occur during testing using Chrome. Could be caused by `setTimeout` finishing before `setInterval`. That would clear the interval call to `countReps`. Adding some time to the denomiator of `duration/parseInt(form.reps.value)`  could provide a quick fix
    
By reducing the amount of time added to the doenominator the catch block can sometimes be triggered. I have only seen this bug effect Safari and Firefoxm in my testing. Chrome and Opera don't seem to have the issue, but my testing has not been exhaustive.