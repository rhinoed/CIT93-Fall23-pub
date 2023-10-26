# Async Workout

## Overview
I have working code. For the additional feature I added a rep counter which is display on the page at set interverals. I do this using the `setInterval` method it is much like the `setTimeout` only it repeatedly calls a function until cleared. Here is how I implemented it.

`countReps` Declaration:
```js
const countReps= ()=> {
    const newP = document.createElement("p");
    count += 1
    newP.textContent = `${count} ${getPhrase(count)}`;
    OUTPUT.appendChild(newP);

}
```
Call to `countReps` using `setInterval` inside `beginWorkout`
```js
const  beginWorkout = (form,callback) =>{
    const newP = document.createElement("h2");
    const duration = parseInt(form.time.value) * 1000;
    newP.textContent = `${form.workout.value} workout with ${form.reps.value} ${getPhrase(form.reps.value)} has started`
    OUTPUT.appendChild(newP);
    // Async code
    const counter = setInterval(countReps,duration/parseInt(form.reps.value))
    setTimeout(()=>{
        callback(form);
        // stops the calls to countReps
        clearInterval(counter);
    },duration)
}
```
I also added some CSS. It is basicly what I used for the Carbon Footprint.