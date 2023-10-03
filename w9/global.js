// Gloabl constants file
import { importFromLS } from "./localStorage.js";
export const TBL = document.getElementById("tab-data");
export const USERINPUT = document.getElementsByClassName("userinput");
export const cfpData = importFromLS();
console.log(cfpData)

