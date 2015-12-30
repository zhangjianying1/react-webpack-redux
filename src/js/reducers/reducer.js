import {combineReducers} from 'redux';

let userCenter = (state={}, action) => {
    switch(action.type) {
        case 'GET':
            return action.val
            break;
        default:
            return state;
    }
};
let showLoading = (state='', action) => {
    switch (action.type) {
        case 'LOAD':
            return action.val;
            break;
        default:
            return state;
    }
}
let fooball = (state={}, action) => {
    switch (action.type) {
        case 'FOOTBALL':
            return action.val;
        break;
        default:
            return state;
    }
}
let error = (state="", action) => {
    switch (action.type) {
        case 'ERROR':
            return action.val;
            break;
        default:
            return state;
    }
}
let historyLottery = (state="", action) => {
    switch(action.type) {
        case 'LOTTERY':
            return action.val;
        default:
            return state;

    }
}
let forgetMobile = (state="", action) => {
    switch(action.type) {
        case 'FORGETMOBILE':
            return action.val;
        break;
        default:
            return state;
    }
}

let authCode = (state="", action) => {
    switch(action.type) {
        case 'AUTHCODE':
            return action.val;
            break;
        default:
            return state;
    }
}
let combineReducer = combineReducers({
    userCenter,
    showLoading,
    fooball,
    error,
    historyLottery,
    forgetMobile,
    authCode

})

export default combineReducer;