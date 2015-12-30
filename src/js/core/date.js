let resultDate = function(date, splitStr){
    let oDate = date ? new Date(date) : new Date();
    let dateArr = [];

    dateArr[0] = oDate.getFullYear();
    dateArr[1] = fullZero(oDate.getMonth() + 1);
    dateArr[2] = fullZero(oDate.getDate());

    return dateArr.join(splitStr);
    function fullZero(str) {
        if (str && str.length == 1) {
            return '0' + str;
        }
        return str;
    }
}
export let getDate = function(splitStr){
    return resultDate(null, splitStr)
}
export let setDate = function(time, splitStr){
    return resultDate(time, splitStr)
}
export let sliceTime = function(timeStr, param) {
    let resultTime = timeStr && timeStr.split(/\s+/);
    return param == 'year' ? resultTime[0] : resultTime[1];
}
export let getWeek = function(timeStr) {
    let dateRE = /([0-9]{4})\-([0-9]{2})\-([0-9]{2}).*/;
    let result = dateRE.exec(timeStr) || [];
    let oDate = new Date();
    oDate.setFullYear(result[1]);
    oDate.setMonth(result[2] -1 );
    oDate.setDate(result[3]);

    switch (oDate.getDay()) {
        case 1:
            return '周一';
        break;
        case 2:
            return '周二';
            break;
        case 3:
            return '周三';
            break;
        case 4:
            return '周四';
            break;
        case 5:
            return '周五';
            break;
        case 6:
            return '周六';
            break;
        case 0:
            return '周日';
            break;
//        default:
    }
}