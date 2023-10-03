
# Week 9 

#### Starting Code
Using code from week eight disscussion with a few changes. Most of the changes involved bug fixes.

###### Bugs

Fixed these bugs:

- [x] Issue with modal edit form not providing validation

    - This was fixed by setting the button type to submit and changing the oject the evvent listener was on

- [x] Unexpected output when deleting while modal window is diplayed

    - Fixed by diabling the action buttons while the modal dialog is diplayed

- [x] Issue with form submit button being disabled when all fields were filled

    - Fixed by diabling all the inputs in the form when the modal dialog is diplayed

###### Other Changes
- The functions `asycEditComplete()` and `confirmDeletion()` are no longer marked as asynchronous
- `asycEditComplete()` is now `edidComplete()`

### Form Validation Challenge For Discussion
I ended up implementing the ChatGPT code into my existing validation. It took a little while to figure out Chat was dooing in the code, but I was able to get it working.

Implementation:
`validateField()`
```javascript
function validateField(event) {
    const field = event.target.value;
    console.log(field);
    const fieldId = event.target.id;
    const fieldError = document.getElementById(`${fieldId}-error`);

    if (field === '') {
        fieldError.textContent = `${fieldId} is required`;
        event.target.classList.add('invalid');
    } else {
        fieldError.textContent = '';
        event.target.classList.remove('invalid');
        toggleSubmitButton();
    }
}
```
`submit()`
```javascript
function submit(event) {
    event.preventDefault();
    const firstNameIsValid = document.getElementById('firstname').value !== '';
    const lastNameIsValid = document.getElementById('lastname').value !== '';

    if (firstNameIsValid && lastNameIsValid){
        cfpData.push(new cfpObjConstrutor(this.firstname.value, this.lastname.value, this.household.value, this.homesize.value));
        saveToLS(cfpData);
        renderTable();
    }
    document.getElementById("householdPts").textContent = null;
    document.getElementById("homeSizePts").textContent = null
    // reset form & points
    this.reset();
    toggleSubmitButton();
}
```
### Conclusion
I found it hard today to focus, and because of that everything took longer than usual. Most of the time I try to do a little extra to challenge myself but today just doing what I need to do will be good enough. I would have like to add more validation to check for length and value, maybe later.