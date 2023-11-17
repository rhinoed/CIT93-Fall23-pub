// LocalStorage functions

export const saveToLS = cfpData => {
    localStorage.setItem("cfp",JSON.stringify(cfpData))
}

export const importFromLS = () => {
    const cfpDataLS = localStorage.getItem("cfp")
    console.log(typeof(cfpDataLS));
    if( cfpDataLS != null || cfpDataLS != undefined){
        return JSON.parse(cfpDataLS);
    }else{
        return [];
    }
}
