# Week 17

## Overview

For the transportation I used checkboxes and selects for the input and passed an array of ints to the footprint constructor.

```html
<div id="transportation-auto">
	<div>
		<label for="takeauto">Use Personal Auto</label>
		<input type="checkbox" id="takeauto" name="takeauto" />
	</div>
	<div>
		<label for="auto">Auto</label>
		<select id="auto" disabled name="auto">
			<option value="0">-- None --</option>
			<option value="12">Travel more than 15000</option>
			<option value="10">10,000 to 15,000</option>
			<option value="6">1,000 to 10,000</option>
			<option value="4">less than 1,000</option>
		</select>
	</div>
</div>
```

```js
const getTrasportationValues = (event)=>{
	const evnT = event.target
	return [parseInt(et.auto.value), parseInt(et.public.value),parseInt(et.flights.value)]
}
const fpObj = new Footprint(
			evnT.firstname.value,
			evnT.lastname.value,
			evnT.household.value,
			evnT.homesize.value,
			evnT.foodchoice.value,
			evnT.food_source.value,
			evnT.appliances.checked,
			parseInt(evnT.runs.value),
			parseInt(evnT.purchases.value),
			parseInt(evnT.garbage.value),
			Array.from(document.getElementsByClassName("recyclable")).map(input => input.checked),
			getTrasportationValues(event)
		)
```
Then on edit I itterate over the array

```js
 for(let i = 0; i < editTransportation.length; i++){
        editTransportation[i].value = cfpData[this.value].transportation[i]
    }

```