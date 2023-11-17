
import { cfpData, TBL } from "./global.js";
import { saveToLS } from "./localStorage.js";
import { Footprint } from "./Footprint.js";
import { calculateAverageCF } from "./calculate.js";
// creates basic table elements
const createTable = () => {
    const theadLabels = [
        "Name",
        "Household",
        "House Size",
        "Food Choices",
        "Carbon Footprint",
        "Actions",
    ];
    const table = document.createElement("table");
    table.setAttribute("id", "cfpTable");
    const tblHeader = document.createElement("thead");
    const tblBody = document.createElement("tbody");
    tblBody.setAttribute("id", "tblBody");
    const tblRow = document.createElement("tr");
    theadLabels.forEach(function (label) {
        const theadData = document.createElement("th");
        theadData.textContent = label;
        tblRow.appendChild(theadData);
    });
    tblHeader.appendChild(tblRow);
    table.appendChild(tblHeader);
    table.appendChild(tblBody);
    return table;
}

// outputs finshed table with data to DOM
export const renderTable = () => { // create reference to the table
    TBL.replaceChildren("");
    if (cfpData.length !== 0) {
        const table = createTable();
        const tblBody = table.children[1];
        cfpData.forEach(function (obj, index) {
        tblBody.appendChild(createRow(obj, index));
        });
        
    table.appendChild(tblBody);
    TBL.replaceChildren(table);
    insertRow();
    }
    
}
const insertRow = function (){
    const average = calculateAverageCF(cfpData);
    const body = document.getElementById("tblBody");
    const newRow = body.insertRow()
    const labelCell = newRow.insertCell(0);
    labelCell.setAttribute("colspan","4");
    const valueCell = newRow.insertCell(-1);
    const labelText = document.createTextNode("Average Footprint Score");
    const valueText = document.createTextNode(Math.floor(average));
    labelCell.appendChild(labelText);
    valueCell.appendChild(valueText)
    
}
// Code Along 2 challenge 1
const createRow = (obj, index) => {
    const actionBtnText = ["Edit", "Delete"];
    const values = [obj.user, obj.household, obj.homeSize,obj.foodChoices,obj.total]
    const tblRow = document.createElement("tr");
    // Week 12 update
    values.forEach((value) =>{
        const tblData = document.createElement("td")
        tblData.textContent = value;
        tblRow.appendChild(tblData);
    })
 
    const tblData = document.createElement("td");
    // create buttons
    actionBtnText.forEach((text) =>{
        tblData.appendChild(creatActionBtns(text, index));
    });
    tblRow.appendChild(tblData);
    return tblRow;
}

// create edit and delete buttons
const creatActionBtns = (text, index) => {
    const actionBtn = document.createElement("button");
    actionBtn.textContent = text;
    actionBtn.setAttribute("class", "actionBtns");
    actionBtn.value = index
    text == "Edit" ? actionBtn.addEventListener("click", editRow) : actionBtn.addEventListener("click", deleteRow);
    return actionBtn;
}

// edit button functionality
// Not converting this function to arrow function, because arrows don't have an binding to `this`
 const editRow = async function() {
    const editForm = document.getElementById("edit-form");
    const form = document.getElementsByClassName("userinput");
    for (const element of form) {
        element.disabled = true;
    }
    const actionBtns = document.getElementsByClassName("actionBtns");
    for (const button of actionBtns) {
        button.disabled = true;
    }
    // set edit form input values to current td values
    editForm.editfirstname.value = cfpData[this.value].firstName;
    editForm.editlastname.value = cfpData[this.value].lastName;
    editForm.edithousehold.value = cfpData[this.value].household;
    editForm.edithomesize.value = cfpData[this.value].homeSize;
    editForm.editfoodchoice.value = cfpData[this.value].foodChoices.split(",")[0]
    editForm.edit_food_source.value = cfpData[this.value].foodChoices.split(", ")[1]
    if (await editComplete()) {
        const firstName = document.getElementById("editfirstname");
        const lastName = document.getElementById("editlastname");
        const household = document.getElementById("edithousehold");
        const homeSize = document.getElementById("edithomesize");
        const foodChoice = document.getElementById("editfoodchoice");
        const foodSource = document.getElementById("edit-form").edit_food_source;
        const obj = new Footprint(firstName.value, lastName.value, household.value, homeSize.value,foodChoice.value,foodSource.value);
        cfpData.splice(this.value, 1, obj);
        // cfpData[this.value] = obj;
        saveToLS(cfpData);
        renderTable();
    } else {
        console.log("edit canceled");
    }
}

const editComplete = () => {
    return new Promise(resolve => {
        const modalEdit = document.getElementById("modal-dialog");
        const form = document.getElementsByClassName("userinput");
        const actionBtns = document.getElementsByClassName("actionBtns");
        modalEdit.style.display = "block"
        document.getElementById("edit-form").addEventListener("submit", function (event) {
            event.preventDefault();
            modalEdit.style.display = "none"
            for (const element of form) {
                element.disabled = false;
            }

            for (const button of actionBtns) {
                button.disabled = false;
            }
            resolve(true);
        });
        document.getElementById("edit-cancel").addEventListener("click", function () {
            modalEdit.style.display = "none"
            for (const element of form) {
                element.disabled = false;
            }
            for (const button of actionBtns) {
                button.disabled = false;
            }
            resolve(false);
        });
    })
}

// delete button functionality
// Not converting this function to arrow function, because arrows don't have an binding to `this`
const deleteRow = async function() {
    const form = document.getElementsByClassName("userinput");
    for (const element of form) {
        element.disabled = true;
    }
    const actionBtns = document.getElementsByClassName("actionBtns");
    for (const button of actionBtns) {
        button.disabled = true;
    }
    // get delete confirmation and delete if yes
    await confirmDeletion() == true ? cfpData.splice(this.value, 1) : console.log("delete canceled");
    saveToLS(cfpData);
    renderTable();

}
const confirmDeletion = function() {
    const form = document.getElementsByClassName("userinput");
    const actionBtns = document.getElementsByClassName("actionBtns");
    return new Promise((resolve) => {
        const modalDel = document.getElementById("modal-delete")
        modalDel.style.display = "block"
        document.getElementById("confirm-del").addEventListener("click", function () {
            for (const element of form) {
                element.disabled = false;
            }
            for (const button of actionBtns) {
                button.disabled = false;
            }
            modalDel.style.display = "none"
            resolve(true);

        });
        document.getElementById("cancel-del").addEventListener("click", function () {
            for (const element of form) {
                element.disabled = false;
            }
            for (const button of actionBtns) {
                button.disabled = false;
            }
            modalDel.style.display = "none"
            resolve(false);
        });
    })
}
