import {History} from 'react-router'
const es6Mixin = base => class extends base {
    componentWillMount() {
        console.log(History)
        console.log("augmented componentWillMount");
    }
    render() {
        console.log("augmented render");
    }
}
export default es6Mixin;
