// Defers a callback 
export default (callback, delayMS = 200, thisArg, onReset) => {
    let timeoutId
    return function () {
        const args = arguments
        if (timeoutId) {
            clearTimeout(timeoutId)
            onReset && onReset()
        }
        timeoutId = setTimeout(() => callback && callback.apply(thisArg, args), delayMS)
    }
}