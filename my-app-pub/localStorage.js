
export const saveToLS = (object, key="decisions") => {
    localStorage.setItem(key,JSON.stringify(object))
}

export const importFromLS = (key="decisions") => {
    const value = localStorage.getItem(key)
    if( value != null || value != undefined){
        return JSON.parse(value);
    }else{
        return [];
    }
}