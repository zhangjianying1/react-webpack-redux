export let userCenter = function (val){
    return {type: 'GET', val};
}
export let showLoading = function (val){
    return {type: 'LOAD', val};
}
export let error = function (val){
    return {type: 'ERROR', val};
}
export let fooball = function (val){
    return {type: 'FOOTBALL', val};
}
export let historyLottery = function(val) {
    return {type: 'LOTTERY', val};
}
export let forgetMobile = function(val) {
    return {type: 'FORGETMOBILE', val};
}
export let setAuthCode = function(val) {
    return {type: 'AUTHCODE', val};
}