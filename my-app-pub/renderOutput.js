// 
import { FORM,TABULAR, DECISIONS,getTimeString } from "./global.js";
import { saveToLS } from "./localStorage.js";
const createTable = () => {
    return document.createElement("table");

}
const createTableHeader = function () {
    const headerLabels = ["Alarm", "Result", "Action"];
    const table = createTable();
    const thead = document.createElement("thead");
    for (let label of headerLabels) {
        const th = document.createElement("th")
        th.textContent = label;
        thead.append(th);
    }
    table.append(thead);
    return table;
}
const createTableBody = () => {
    return document.createElement("tbody");
}

const creatActionBtns = (text, index) => {
    const actionBtn = document.createElement("button");
    actionBtn.textContent = text;
    actionBtn.setAttribute("class", "actionBtns");
    actionBtn.value = index
    text == "Edit" ? actionBtn.addEventListener("click", editRow) : actionBtn.addEventListener("click", deleteRow);
    return actionBtn;
}
const createTableRow = function (data, index) {
    const tblRow = document.createElement("tr");
    const rowData = {
        "dateTime":[`${data.name}`, `${data.alarm}`, `${data.snooze} min snooze time`],
        "result": data.decision,
        "actions": ["Edit", "Delete"]
    
    };
    for (let [key, value] of Object.entries(rowData)){
        const td = document.createElement("td");
        switch(key){
            case "dateTime":
                const dateUL = document.createElement("ul");
                for (let v of value) {
                    const li = document.createElement("li");
                    li.textContent = v
                    dateUL.append(li);
                }
                td.appendChild(dateUL);
                break;
            case "result":
                td.textContent = value;
                break;
            case "actions":
                for (let label of value ){
                    td.appendChild(creatActionBtns(label,index));
                }
                break;
        }
        tblRow.appendChild(td);
    }
    return tblRow
}

const deleteRow = function (){
    console.log(this.value)
    DECISIONS.splice(this.value,1);
    saveToLS(DECISIONS);
    render();
}
const editRow = function(){
    const oldValue = DECISIONS.splice(parseInt(this.value),1);
    FORM.alarmname.value = oldValue[0].name;
    FORM.snoozetime.value = oldValue[0].snooze;
    console.log(FORM.schedule.value)
    FORM.schedule.value = oldValue[0].scheduleID;
    FORM.alarmtime.value = getTimeString(new Date(oldValue[0].alarm).toISOString());
    FORM.alarm_state.value = oldValue[0].alarmState;
    saveToLS(DECISIONS);
    render();
}

export const render = function () {
    TABULAR.replaceChildren("")
    if (DECISIONS.length !== 0){
        const table = createTableHeader();
        const tbody = createTableBody();
        DECISIONS.forEach(( obj, index)=>{
            tbody.appendChild(createTableRow(obj,index));
        })
        table.appendChild(tbody);
        TABULAR.replaceChildren(table);
    }
}


