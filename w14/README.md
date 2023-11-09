
# Overview 
I chose to use the endpoint `ttps://jsonplaceholder.typicode.com/albums/<albume>/photos`.
Where `<album>` is the value selected from the user input. I also added the album title under the image. In the error checking I created a custom error if the status code does not equal 200. Using the keyword `throw` this will trigger the catch block with the custom error message.

My `getData()` function:
```js
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
```





