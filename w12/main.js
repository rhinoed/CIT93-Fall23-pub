// Aysnc Workout
// Mark Edmunds
// CIT 93 Fall 2023

const OUTPUT = document.getElementById("output");
let count = 0;
// Returns the correct form of rep(s) based on count
const getPhrase = (count) =>{
    return  phrase = count == 1 ? "rep": "reps";
}
// Callback function
const workoutComplete = (form) =>{
    const newP = document.createElement("h2");
    newP.textContent = `${form.workout.value} workout stoped. You completed ${form.reps.value} ${getPhrase(parseInt(form.reps.value))}`;
    OUTPUT.appendChild(newP);
    count = 0;
}
//Displays the rep count
const countReps= ()=> {
    const newP = document.createElement("p");
    count += 1
    newP.textContent = `${count} ${getPhrase(count)}`;
    OUTPUT.appendChild(newP);

}
// Call by event listener
const  beginWorkout = (form,callback) =>{
    const newP = document.createElement("h2");
    const duration = parseInt(form.time.value) * 1000;
    newP.textContent = `${form.workout.value} workout with ${form.reps.value} ${getPhrase(form.reps.value)} has started`
    OUTPUT.appendChild(newP);
    // Async code
    const counter = setInterval(countReps,duration/(parseInt(form.reps.value) + .01))
    setTimeout(()=>{
        clearInterval(counter);
        callback(form);
    },duration)

}
document.getElementById("form").addEventListener("submit", function(event){
    beginWorkout(this,workoutComplete);
    event.preventDefault();
})