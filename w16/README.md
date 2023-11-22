
# Week 16

## Overview
I decided to change my solution I had coded in for the code along. After doing that I forgot to move my code over and make a commit. So if you look at my commits there will be no differences in the files. I will try to break do the changes here instead.

#### Part One Solution
Since I am using the point value pass in by the `select` input and converting it into a `int` I am just using a ternary operator to check if the checkbox for owning both a dishwasher and washing machine is check. if it is I just multiple it by 2. And if it is not I just return the valus.
```js
this.waterUseagePts = this.ownBoth ? this.runs * 2 : this.runs
    
```
#### Part Two Solution
```js
this.purchasesPts = purchases
```
For this I decided to skip any logic or calculation by just using the value of the `select`. And converting it into an `int`
```js
getTotal() {
		this.total =
			this.householdPts +
			this.homeSizePts +
			this.foodChoicePts +
			this.waterUseagePts +
			this.purchasesPts
	}
```
I also refactored my edit to make it cleaner
```js
// Before I used an if else here
const editRow = function(){
    // .....
    try{
            const edits = await editComplete()
            const obj = new Footprint(
                edits.editfirstname.value,
                edits.editlastname.value,
                edits.edithousehold.value,
                edits.edithomesize.value,
                edits.editfoodchoice.value,
                edits.edit_food_source.value,
                edits.editappliances.checked,
                parseInt(edits.editruns.value),
                parseInt(edits.editpurchases.value)
            )
            cfpData.splice(this.value, 1, obj)
            saveToLS(cfpData)
            renderTable();
        }catch(err){
            console.log(err);
        }
}
// Before in this I resolve true
const editComplete = function(){
    return new Promise((resolve,reject) =>{
    //....

    resolve(event.target)

    //....

    reject("edit canceled")
    })
    
}

```
