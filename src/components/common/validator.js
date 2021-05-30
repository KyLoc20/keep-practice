function requireOneOf(arr) {
    return (candidate) => {
        console.log('requireOneOf', )
        if (arr.indexOf(candidate) > -1) return true
        else return false
    }
}

function requirePositiveNumber() {
    return (candidate) => {
        console.log('requirePositiveNumber', )
        if (typeof candidate === "number" && candidate > 0) return true
        else return false
    }

}
export {
    requireOneOf,
    requirePositiveNumber,
}