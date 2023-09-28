import {cfpData, cfpObjConstrutor} from "./main.js";
const TBL = document.getElementById("tab-data");
const FORM = document.getElementById("form");
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
    cfpData.forEach(function (obj,index) {
        tblBody.appendChild(createRow(obj,index));
    });

    table.appendChild(tblBody);
    TBL.replaceChildren(table);
}
// Code Along 2 challenge 1
function createRow(obj,index){
    const actionBtnText = ["Edit", "Delete"];
    const tblRow = document.createElement("tr");
        // Week 8
        for(const [key, value]of Object.entries(obj)){
           // update after video: decided to use if else due to clarity
           if (key === "user" || key ==="household"|| key === "homeSize" || key=== "cfpTotal"){
            const tblData = document.createElement("td")
            tblData.textContent = value
            tblRow.appendChild(tblData);
           }  
        } 
         const tblData = document.createElement("td");
		// create buttons
        for (let text of actionBtnText) {
            tblData.appendChild(creatActionBtns(text,index));
        }
		// row id userd for deletion
        tblRow.setAttribute("id", `row${
            obj.id
        }`);
        tblRow.appendChild(tblData);

    return tblRow;
}

// create edit and delete buttons
function creatActionBtns(text,index) {
    const actionBtn = document.createElement("button");
    actionBtn.textContent = text;
    actionBtn.value = index
    text == "Edit" ? actionBtn.addEventListener("click", editRow) : actionBtn.addEventListener("click", deleteRow);
    return actionBtn;
}

// edit button functionality
async function editRow() {
    const editForm = document.getElementById("edit-form")
    //  set edit form input values to current td values
    editForm.editfirstname.value = cfpData[this.value].firstName;
    editForm.editlastname.value = cfpData[this.value].lastName;
    editForm.edithousehold.value = cfpData[this.value].household;
    editForm.edithomesize.value = cfpData[this.value].homeSize;
    if (await asyncEditComplete()){
        const firstName = document.getElementById("editfirstname");
        const lastName = document.getElementById("editlastname");
        const household = document.getElementById("edithousehold");
        const homeSize = document.getElementById("edithomesize");
        const obj = new cfpObjConstrutor( firstName.value,lastName.value,household.value,homeSize.value);
        cfpData.splice(this.value,1,obj);
        //cfpData[this.value] = obj;
        renderTable();
    }else{
        console.log("edit canceled");
    }
}

async function asyncEditComplete(){
    return new Promise((resolve, reject) => {
        const modalEdit = document.getElementById("modal-dialog")
        modalEdit.style.display = "block"
        document.getElementById("edit-done").addEventListener("click", function(){
            modalEdit.style.display = "none"
            resolve(true);

        });
        document.getElementById("edit-cancel").addEventListener("click", function(){
            modalEdit.style.display = "none"
            resolve(false);
        });
    })
}

// delete button functionality
 async function deleteRow() { 
    // get delete confirmation and delete if yes
    await confirmDeletion() == true ? cfpData.splice(this.value,1): console.log("delete canceled");
    // conditionly render table to show update
    cfpData.length !== 0 ? renderTable() : TBL.replaceChildren("");
   
}
async function confirmDeletion(){
    return new Promise((resolve, reject) => {
        const modalDel = document.getElementById("modal-delete")
        modalDel.style.display = "block"
        document.getElementById("confirm-del").addEventListener("click", function(){
            modalDel.style.display = "none"
            resolve(true);

        });
        document.getElementById("cancel-del").addEventListener("click", function(){
            modalDel.style.display = "none"
            resolve(false);
        });
    })
}

