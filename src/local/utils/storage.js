function dumpToLocalStorage(key, value) {
    if (!localStorage) throw Error('Global Object: localStorage Not Found!')
        //todo type check 
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromLocalStorage(key) {
    if (!localStorage) throw Error('Global Object: localStorage Not Found!')
    return JSON.parse(localStorage.getItem(key));

}
export {
    dumpToLocalStorage,
    loadFromLocalStorage
}