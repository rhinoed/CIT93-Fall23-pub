
import { cfpData } from "./main.js";
const TBL = document.getElementById("tab-data");
//  creates basic table elements
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
function renderTable() {
	// create reference to the table
	const table = createTable();
	const numCols = table.childNodes[0].childNodes[0].childNodes;
	const tblBody = table.children[1];
	cfpData.forEach(function(obj){
		const tblRow = createRow(obj,numCols);
		tblBody.appendChild(tblRow);
	})

	table.appendChild(tblBody);
	TBL.replaceChildren(table);
}

// creates table row
function createRow(obj,cols) {
	const tblRow = document.createElement("tr");
	for (const i in cols) {
		const tblData = document.createElement("td");
		if (i == 0) {
			tblData.textContent = obj.user;
			tblRow.appendChild(tblData);
		} else if (i == 1) {
			tblData.textContent = obj.household;
			tblRow.appendChild(tblData);
		} else if (i == 2) {
			tblData.textContent = obj.homeSize;
			tblRow.appendChild(tblData);
		} else if (i == 3) {
			tblData.textContent = `${obj.cfpTotal()}`;
			tblRow.appendChild(tblData);
		} else if (i == 4) {
			const editBtn = creatActionBtns("Edit");
			tblData.appendChild(editBtn);
			const deleteBtn = creatActionBtns("Delete");
			tblData.appendChild(deleteBtn);
			tblRow.appendChild(tblData);
		}
		tblRow.setAttribute("id", `row${obj.id}`);
	}
	return tblRow;
}

// edit button functionality
function editRow() {
	// get the row id
	const rowId = parseInt(this.parentElement.parentElement.id.split("row")[1]);
	console.log(cfpData[rowId]);
	// TODO: get user input for update
	
	// TODO: use input to calculate new values for obj
	cfpData[rowId].household = "5"; // Temporary
	cfpData[rowId].homeSize = "small"; // Temporary
	// update table with new values
	renderTable();
}

// delete button functionality
function deleteRow() {
	// get the id of the row
	rowId = parseInt(this.parentNode.parentNode.id.split("row")[1]);
	// remove the object from the array
	confirm("Do you wish to delete this item?")
		? cfpData.pop(rowId)
		: console.log("delete canceled");
	console.log(cfpData);
	// render table to show update
	renderTable();
}

// create edit and delete buttons
function creatActionBtns(text) {
	const actionBtn = document.createElement("button");
	actionBtn.textContent = text;
	text == "Edit"
		? actionBtn.addEventListener("click", editRow)
		: actionBtn.addEventListener("click", deleteRow);
	return actionBtn;
}
export {renderTable};
