
# Week 8 U in CRUD amd TBL Heading

#### Overview
At the end of last week I had the edit and delete functioality work in my code. So in the terms of functioality nothing has changed but under the hood there are several changes.
- implemented `splice()` method in both the edit and delete funtions
- switched from `confirm()` method to a modal delete confirmation
- use of async function in both the edit and deletion processes

#### My implementation of `splice()`

`deleteRow()`
```javascript
await confirmDeletion() == true ? cfpData.splice(this.value,1): console.log("delete canceled");
```
`editRow()`
```javascript
const obj = new cfpObjConstrutor( firstName.value,lastName.value,household.value,homeSize.value);
        cfpData.splice(this.value,1,obj);
```

#### Switch To Modal Confirmation
When the page loads the `display` of this element is set to `none`
```html
<div id="modal-delete" class="modal">
        <div class="edit-content">
            <p>Do you want to delete the row?</p>
            <button type="button" id="cancel-del" value="false" class="modal-del-btns">Cancel</button>
            <button type="button" id="confirm-del" value="true" class="modal-del-btns">Yes</button>
        </div>
    </div>
```
#### Use of Async Funtions
This was the bigest challenge this week. But worth the effort before my code relied on setting and reading of `html` element `value` attributtes But now I don't need them.

`confirmDeletion()`
```javascript
async function confirmDeletion(){
    return new Promise((resolve) => {
        const modalDel = document.getElementById("modal-delete")
        modalDel.style.display = "block"
        // event listners for the modal confirmation dialog box
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
```
#### Claring TBL Header
This how I cleared the table header. 
```javascript
 cfpData.length !== 0 ? renderTable() : TBL.replaceChildren("");
```
#### Conclusion
JavaScripts implementations of asyc funtions is very different from what I'm use to in Swift. So it was a challenge, but it should help me when we cover it in this class.