export let moneyFormat = function(pries){
    let resultPries = ('' + pries).split('');
    let index = 0;
    let arr = []
    resultPries.reverse().forEach(function(val, i){

        if (i > 0 && i % 3 == 0 ) {
            arr.push(',')
            arr.push(val)

        } else {
            arr.push(val)
        }
    })
    return arr.reverse().join('');
}