// Aysnc Workout
// Mark Edmunds
// CIT 93 Fall 2023

const OUTPUT = document.getElementById("output");
let count = 0;
// Returns the correct form of rep(s) based on count
const getPhrase = (count) => {
    return phrase = count == 1 ? "rep" : "reps";
}
// increment global count
const incrementCount = ()=>{
    count += 1
}
// Callback function
const workoutComplete = (form) => {
    message = `${form.workout.value} workout stoped. You completed ${form.reps.value} ${getPhrase(parseInt(form.reps.value))}`;
    displayOut(message);
    count = 0;
    reps = document.getElementsByTagName("p");
    for (let element of reps){
        element.removeEventListener("click",incrementCount);
    }
    form.reset();
}
//Displays the rep count
const countReps = () => {
    incrementCount();
    const newP = document.createElement("p");
    newP.textContent = `${count} ${getPhrase(count)}`;
    OUTPUT.appendChild(newP);
    newP.addEventListener("click", incrementCount);

}
// Outputs workout star / stop messages
function displayOut(message) {
    const newP = document.createElement("h2");
    newP.textContent = message
    OUTPUT.appendChild(newP);
}

function onError(error) {
    displayOut(`Error: ${error}`);
    console.log(`Error: ${error}`);
    count = 0

}
// Call by event listener
const beginWorkout = (form) => {
    const duration = parseInt(form.time.value) * 1000;
    const message = `${form.workout.value} workout with ${form.reps.value} ${getPhrase(form.reps.value)} has started`;
    displayOut(message);
    // Async code
    return new Promise((resolve, reject) => {
        const counter = setInterval(countReps, duration / (parseInt(form.reps.value) + .006));
        setTimeout(() => {
            if (count > parseInt(form.reps.value)) {
                reject(`count error you counted ${count} and you completed ${form.reps.value} ${form.workout.value}`);
            } else if (count < parseInt(form.reps.value)) {
                reject(`You did not complete ${form.reps.value} ${form.workout.value} you did ${count}`)
            }else{
                resolve(form);
            }
            clearInterval(counter);
        }, duration)
    })
}

document.getElementById("form").addEventListener("submit", function (event) {
    OUTPUT.replaceChildren("");
    event.preventDefault();
    beginWorkout(this)
        .then(workoutComplete)
        .catch(onError)

})