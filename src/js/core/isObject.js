export let isObject = function(obj) {
    for (var i in obj) {
        return true;
    }
    return false;
}