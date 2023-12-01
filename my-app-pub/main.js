/*
main.js for Snooze Fest 
Created October 3, 2023
for CIT 93 Fall 2023
by Mark Edmunds
*/
// ______________________________________________________________________________________________________
import {
	ALARM_TIME,
	SNOOZE_TIME,
	ALARM_NAME,
	FORM,
	DECISIONS,
	SCHEDULES,
	NEW_SCH,
	EDIT_SCH,
	DAY_SELECT,
	DONE,
	SCHVIEW,
	SCHEDULE,
	CANCEL,
	DELETE
} from "./global.js"
import { saveToLS} from "./localStorage.js";
import { render } from "./renderOutput.js";
import { Decision } from "./Decision.js";
import { Schedule,completeSchedule,hideSchedule,showHschedule } from "./schedule.js";


const dateStripTime = (dateString,startTime) => {
	const elements = dateString.split("T");
	const newTime = `${elements[0]}T${startTime}`
	return new Date(newTime)
}

// retunr alarm object
const createAlarm = function (name, dateTime, snooze, set = false) {
	dateTime = new Date(dateTime)
	const alarm = {
		name: name,
		dateTime: dateTime,
		snooze: snooze,
		set: set,
	}
	return alarm
}

// returning time
const getTotalTime = function (drivetime, preptime, snooztime) {
	return drivetime + preptime + snooztime
}

const makeDecsion = function (schedule, alarm) {
	const totalTime = getTotalTime(15, 30, alarm.snooze)
	const eta = new Date(alarm.dateTime)
	const day = alarm.dateTime.getDay();
	eta.setMinutes(eta.getMinutes() + totalTime)

	DECISIONS.push(
		new Decision(
			schedule.name,
			schedule.id,
			schedule.date,
			alarm.name,
			alarm.dateTime.toDateString(),
			day,
			eta,
			alarm.snooze,
			alarm.set
		)
	)
	saveToLS(DECISIONS);
}

// form validation
const validateField = function () {
	const date = new Date(this.value)
	const now = new Date()
	if (date < now) {
		const error = document.getElementById("error")
		error.textContent = "Date must be later than now"
		setTimeout(() => {
			error.textContent = ""
			this.value = now
		}, 10000)
	} else {
		toggleSubmit()
	}
}

// enables and disables submit button
const toggleSubmit = function () {
	const inputs = document.getElementsByClassName("userinput")
	const button = document.getElementById("submit")
	const inputValues = []
	for (let element of inputs) {
		inputValues.push(element.value)
	}
	if (inputValues.includes("") || SCHVIEW.style.display == "block") {
		button.setAttribute("disabled", "disabled")
		button.setAttribute("class", "button disabled")
	} else {
		button.removeAttribute("disabled")
		button.setAttribute("class", "button")
	}
}

// event listener
FORM.addEventListener("submit", function (event) {
	event.preventDefault()
	const date = dateStripTime(this.alarmtime.value, SCHEDULES[parseInt(SCHEDULE.value)].startTime)
	const alarmState = this.alarm_state.value == "true" ? true: false
	const alarm = createAlarm(
		this.alarmname.value,
		this.alarmtime.value,
		parseInt(this.snoozetime.value),
		alarmState
		
	)
	SCHEDULES[parseInt(SCHEDULE.value)].date = date
	makeDecsion(SCHEDULES[parseInt(SCHEDULE.value)], alarm)
	render();
	this.reset()
	toggleSubmit()
})
export const createSchOptions = () =>{
	const select = document.getElementById("schedule");
	select.replaceChildren(null);
	SCHEDULES.forEach(element => {
		
		const opt = document.createElement("option");
		opt.value = element.id
		opt.textContent = element.name
		select.appendChild(opt);
	});
	
}
const contextAwareBtn = function(context="new"){
	DONE.value = context
	if(context == "new"){
		DONE.textContent = "Add"
	}else{
		DONE.textContent = "Finish"
	}
}

ALARM_TIME.addEventListener("change", validateField)
ALARM_NAME.addEventListener("change", toggleSubmit)
SNOOZE_TIME.addEventListener("change", toggleSubmit)
DONE.addEventListener("click", function(){
	completeSchedule(this.value);
	toggleSubmit()
});
NEW_SCH.addEventListener("click", function (){
	contextAwareBtn("new");
	showHschedule();
	toggleSubmit();
})
EDIT_SCH.addEventListener("click", function (){
	contextAwareBtn("edit");
	showHschedule(SCHEDULE.value);
	toggleSubmit();
})
CANCEL.addEventListener("click", ()=> {
	hideSchedule();
	toggleSubmit();
})
DELETE.addEventListener("click", ()=>{
	SCHEDULES.pop(parseInt(SCHEDULE.value));
	saveToLS(SCHEDULES,"schedules");
	createSchOptions();

})

window.addEventListener("load", function(){
	
	if (SCHEDULES.length === 0 ){
		SCHEDULES.push(new Schedule());
		saveToLS(SCHEDULES,"schedules");
		createSchOptions()
	}else{
		createSchOptions()
	}
	render()
})

