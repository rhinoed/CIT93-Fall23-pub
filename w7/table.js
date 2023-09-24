import {cfpData} from "./main.js";
const TBL = document.getElementById("tab-data");
import {cfpObjConstrutor} from "./main.js";
// creates basic table elements
function createTable() {
    const theadLabels = [
        "Name",
        "Household",
        "House Size",
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
export function renderTable() { // create reference to the table
    const table = createTable();
    const tblBody = table.children[1];
    // this function array replaces the if else statement I had
    const functionArray = [
        (obj) => {
            return obj.user
        },
        (obj) => {
            return obj.household
        },
        (obj) => {
            return obj.homeSize
        },
        (obj) => {
            return obj.cfpTotal()
        },
    ];
    const actionBtnText = ["Edit", "Delete"];

    cfpData.forEach(function (obj) {
        const tblRow = document.createElement("tr");
        for (let func of functionArray) {
            const tblData = document.createElement("td");
            tblData.textContent = `${
                func(obj)
            }`;
            tblRow.appendChild(tblData);
        }
        const tblData = document.createElement("td");
		// create buttons
        for (let text of actionBtnText) {
            tblData.appendChild(creatActionBtns(text));
        }
		// row id userd for deletion
        tblRow.setAttribute("id", `row${
            obj.id
        }`);
        tblRow.appendChild(tblData);
        tblBody.appendChild(tblRow);
    });

    table.appendChild(tblBody);
    TBL.replaceChildren(table);
}

// edit button functionality
function editRow() {
    const rowId = parseInt(this.parentElement.parentElement.id.split("row")[1]);
    document.getElementById("edit-done").setAttribute("value", rowId)
    console.log(rowId)
    // present modal input dialog for user input
	const edit = document.getElementById("modal-dialog")
    edit.style.display = "block"
    // updating of cfpData occurs in editComplete()

}

// delete button functionality
function deleteRow() { // get the id of the row
    const rowId = parseInt(this.parentNode.parentNode.id.split("row")[1]);
    // remove the object from the array
    confirm("Do you wish to delete this item?") ? cfpData.pop(rowId) : console.log("delete canceled");
    console.log(cfpData);
    // render table to show update
    renderTable();
}

// create edit and delete buttons
function creatActionBtns(text) {
    const actionBtn = document.createElement("button");
    actionBtn.textContent = text;
    text == "Edit" ? actionBtn.addEventListener("click", editRow) : actionBtn.addEventListener("click", deleteRow);
    return actionBtn;
}
// callback function for edit buttons listeners
export function editComplete() {
    const edit = document.getElementById("modal-dialog")
    const household = document.getElementById("edit-household")
    const homeSize = document.getElementById("edit-homesize")
    if (this.id == "edit-done") {
        const index = this.value
		// creat new obj and replace obj at cfpData[index]
        const obj = new cfpObjConstrutor(cfpData[index].firstName, cfpData[index].lastName, household.value, homeSize.value)
        obj.index = index
        cfpData[index] = obj
        renderTable();
        edit.style.display = "none"
    } else {
        edit.style.display = "none"
        console.log("edit canceled")
        return
    }
}

