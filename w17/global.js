
import { importFromLS } from "./localStorage.js";

// Gloabl constants file
export const TBL = document.getElementById("tab-data");
export const USERINPUT = document.getElementsByClassName("userinput");
export const HOUSEHOLD = document.getElementById('household');
export const HOMESIZE = document.getElementById("homesize")
export const FNAME = document.getElementById('firstname');
export const LNAME = document.getElementById('lastname');
export const HOUSHOLDPTS = document.getElementById("householdPts");
export const HOMESIZEPTS = document.getElementById("homeSizePts");
export const SUBMIT = document.getElementById("submit");
export const FORMERRORS = document.getElementsByClassName("form-error");
export const cfpData = importFromLS();


