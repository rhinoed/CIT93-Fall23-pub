// Async Await Week 14

const ALBUM = document.getElementById("album");
const OUTPUT = document.getElementById("output");

async function getData(album=1){
    const endPoint = `https://jsonplaceholder.typicode.com/albums/${album}/photos/`
    try{
        const data = await fetch(endPoint);
        if (data.status === 200){
            onSuccess(await data.json());
        }else{
             throw new Error("Status Code != 200");
        }
    }catch(error){
        onFailure(error);
    }
}

function onSuccess(data){
    console.log(data)
    const outterContainer = document.createElement("div");
    data.forEach((obj)=>{
        const innerContainer = document.createElement("h6");
        const title = document.createElement("div");
        const image = document.createElement("img");
        image.setAttribute("src", obj.thumbnailUrl);
        innerContainer.appendChild(image);
        title.textContent = obj.title;
        innerContainer.appendChild(title);
        innerContainer.setAttribute("class", "grid-item")
        outterContainer.appendChild(innerContainer);

    })
    OUTPUT.replaceChildren(outterContainer);
}

function onFailure(error){
    console.log(`Error: ${error}`)
}
ALBUM.addEventListener("change",function(){
    getData(parseInt(this.value));
})
getData();
