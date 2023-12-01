
import { importFromLS,saveToLS } from "./localStorage.js";
import { NEW_SCH,EDIT_SCHEDULE,DAY_SELECT,DONE ,SCHVIEW,TIME,SCHNAME, SCHEDULES, SCHEDULE} from "./global.js";
import {createSchOptions} from "./main.js"


export const loadDefaultSch = function(){
    return new Promise((resolve,reject) => {
        document.getElementById("modal-dialog").setAttribute("display", "block");
        resolve(true)
    })
}

export class Schedule{
    constructor(name="Work", startTime="06:00",days=[1,2,3,4,5],id=SCHEDULES.length, date=""){
        this.name = name
        this.startTime = startTime 
        this.days = days
        this.id = id
        this.date = date

    
    }
   
}

export const showHschedule = function (index=null){
    if (index){
        const days = Array.from(DAY_SELECT.getElementsByTagName("input"));
        const schedule = SCHEDULES[parseInt(index)]
        SCHNAME.value = schedule.name
        TIME.value = schedule.startTime
       
            for (const day of days){
                if (schedule.days.includes(parseInt(day.value))){
                    day.checked = true
                }else{
                    day.checked = false
                }
            }
        
    }
   SCHVIEW.style.display = "block";
}
export const hideSchedule = function (){
    
    SCHVIEW.style.display = "none";
}
export const completeSchedule = function(context){
    
    const days = Array.from(DAY_SELECT.getElementsByTagName("input"));
    const selectDays = days.filter(day => day.checked )
    const name = SCHNAME.value
    const time = TIME.value
    const schDays = selectDays.map(day => parseInt(day.value))
    const selectedSch = SCHEDULE.value;
    const newSch = SCHEDULES.length
    hideSchedule();
    context == "new" ? 
        SCHEDULES.push(new Schedule(name,time,schDays))
        : SCHEDULES.splice(parseInt(selectedSch),1,new Schedule(name,time,schDays,selectedSch));
    saveToLS(SCHEDULES,"schedules");
    createSchOptions();
    SCHEDULE.value = context == "new" ? newSch : selectedSch;
}