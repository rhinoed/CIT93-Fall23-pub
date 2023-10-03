// LocalStorage functions

export function saveToLS (cfpData){
    localStorage.setItem("cfp",JSON.stringify(cfpData))
}

export function importFromLS(){
    const cfpDataLS = localStorage.getItem("cfp")
    if( cfpDataLS != null || cfpDataLS != undefined){
        return JSON.parse(cfpDataLS);
    }else{
        return [];
    }
}
