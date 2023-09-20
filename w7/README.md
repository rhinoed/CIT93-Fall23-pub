# Week 7 Update Render and Create Module

### Overview
I started outlining how I would complete the table render early in the week and ended up coding the completed table.  Initialy I was checking to see if the table existed first then if it did apped a table row to the body. I created each row from a function which was call with the last element in cfpData. This work well but I realized that when I wanted to delte or update the row I would have to do it in two places using this method, if I wanted the data in the table and in cfpData to match. So now I use a forEach on cfpData each time renderTable, deleteRow, or editRow are called.

#### Early code samples:
`renderTable`
```javascript
function renderTable(){
    // check if table exists

        // if it exists call the populateTblData function passsing the last object in the cfpData array
        if (document.getElementById("cfpTable")) {
            console.log("table exists")
            const length = cfpData.length
            populatTblData(cfpData[length - 1]);
        } else {
            // table does not exist yet so only one object exitts in the cfpData array
            console.log("table does not exist")
            createTable();
            populatTblData(cfpData[0]);
        }

}
```
`creatTable`
```javascript
function createTable(){
    const theadLabels = [ "Name", "Household", "House Size", "Carbon Footprint","Actions"];
    const table = document.createElement("table");
    table.setAttribute("id","cfpTable");
    const tblHeader = document.createElement("thead");
    const tblBody = document.createElement("tbody");
    tblBody.setAttribute("id","tblBody");
    const tblRow = document.createElement("tr"); 
    theadLabels.forEach(function(label){
        const theadData = document.createElement("th");
        theadData.textContent = label;
        tblRow.appendChild(theadData);

    });
    tblHeader.appendChild(tblRow);
    table.appendChild(tblHeader);
    table.appendChild(tblBody);
    TBL.appendChild(table);
}
```
`populateTblData`
```javascript
function populateTblData(obj){
    // create reference to the table
    table = document.getElementById("cfpTable");
    tblBody = document.getElementById("tblBody");
    tblRow = document.createElement("tr");
    const numbCols = 5
    console.log(obj);
    for (let i = 0; i < numbCols; i++) {
        const tblData = document.createElement("td");
        if (i == 0){
            console.log(obj.user);
            tblData.textContent = obj.user;
            tblRow.appendChild(tblData);
        }else if (i == 1){
            console.log(obj.household);
            tblData.textContent = obj.household;
            tblRow.appendChild(tblData);
        }else if (i == 2) {
            console.log(obj.homeSize);
            tblData.textContent = obj.homeSize;
            tblRow.appendChild(tblData);
        } else if (i == 3){
            console.log(obj.cfpTotal);
            tblData.textContent = `${obj.cfpTotal()}`;
            tblRow.appendChild(tblData);
        } else if (i == 4){
            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.setAttribute("id", "editBtn");
            tblData.appendChild(editBtn);
            const deleteBtn = document.createElement("button");
            deleteBtn.setAttribute("id", "deleteBtn");
            deleteBtn.textContent = "Delete";
            tblData.appendChild(deleteBtn);
            tblRow.appendChild(tblData);
        }

    }
    tblBody.appendChild(tblRow);
    table.appendChild(tblBody);
}
```

#### Updated Code:
`renderTable`

```javascript
// populateTblData became this function and the old renderTable way deleted
function renderTable() {
	// create reference to the table
	const table = createTable();
	const numCols = table.childNodes[0].childNodes[0].childNodes;
	const tblBody = table.children[1];
	cfpData.forEach(function(obj){
        // row creation was moved to separate function
		const tblRow = createRow(obj,numCols);
		tblBody.appendChild(tblRow);
	})

	table.appendChild(tblBody);
	TBL.replaceChildren(table);
}
```
`createTable`
```javascript
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
```
The code for creating a row stayed nearly the same just being refatored into separate function for creating the buttons.

`createRow`
```javascript
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
```
### Conclusion
Adding modules initaly broke some of my for loops and at first I couldn't figure out why. I found that I had not used keywords for my variables in the loops. After adding them it my code worked. The functionality is nearly complete I just need to add the ablity for the user to provide input when editing the table. I thought about using prompts but, I might also try using a separate window to capture their input.


