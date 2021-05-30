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
const tests = [requireOneOf(["sm", "md", "lg"]), requirePositiveNumber()];
console.log(tests.some((test => test('m'))))