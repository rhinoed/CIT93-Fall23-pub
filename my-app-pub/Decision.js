// Decision Class

export class Decision {
    constructor(scheduleName, scheduleID, startTime, name, alarm, day, eta, snooze, alarmState){
        this.scheduleName = scheduleName;
        this.scheduleID = scheduleID
        this.startTime = startTime;
        this.name = name;
        this.alarm = alarm;
        this.day = day;
        this.eta = eta;
        this.snooze = snooze
        this.alarmState = alarmState
        this.getDecision()
    }

    getDecision() {
        let decision = ""
        if (!this.alarmState){
            decision = `Your alarm was off you are missed ${this.scheduleName}`
        }else if(this.eta < this.startTime) {
            decision = `You still have time, you will be ${Math.abs(
                (this.startTime - this.eta) / 60000
            )} minutes early`
        } else if (this.eta - this.startTime === 0) {
            decision = "You need to get up now to make it on time"
        } else {
            decision = `You will be ${Math.abs(
                (this.eta - this.startTime) / 60000
            )} minutes late`
        }
        if (this.day === 6 || this.day === 0) {
            decision = "snooze away, it's the weekend!"
        }
        this.decision = decision;    
    }
}

