import { importFromLS } from "./localStorage.js";

// Global variables
export const TABULAR = document.getElementById("tab-data")
export const FORM = document.getElementById("form");
export const ALARMS = [];
export const SCHEDULE = document.getElementById("schedule");
export const SCHEDULES = importFromLS("schedules");
export const DECISIONS = importFromLS();
export const SNOOZE_TIME =  document.getElementById("snoozetime");
export const ALARM_TIME = document.getElementById("alarmtime");
export const ALARM_NAME = document.getElementById("alarmname");
export const EDIT_SCHEDULE = document.getElementById("edit-schedule");
export const NEW_SCHEDULE = document.getElementById("new-schedule");
export const DAY_SELECT = document.getElementById("day-select");
export const NEW_SCH = document.getElementById("new-schedule");
export const EDIT_SCH =document.getElementById("edit-schedule");
export const DONE = document.getElementById("done");
export const SCHVIEW = document.getElementById("schedule-view");
export const TIME = document.getElementById("time");
export const SCHNAME = document.getElementById("schname");
export const CANCEL = document.getElementById("cancel");
export const DELETE = document.getElementById("del-schedule");

export function getTimeString(isoString){
    return isoString.split(".")[0];
}