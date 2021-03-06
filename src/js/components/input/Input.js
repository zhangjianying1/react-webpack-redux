import React from 'react';
class Input extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            input: {
                name: this.props.name,
                val: this.props.val
            },
            msg: this.props.msg
        }
    }
    inputChange(e){
        let val = e.target.value;
        this.changeHandle(val);
    }
    clearVal(){
        this.changeHandle('')
    }
    changeHandle(val){
        let msg = '';

        if (this.props.maxlength) {
            val = val.substring(0, this.props.maxlength)
        }
        if (this.props.pattern) {
            let pattern = new RegExp(this.props.pattern, 'g');

            if (!pattern.test(val)) {
                msg = '您输入的' + this.state.msg + '不正确';
            }
        }
        this.setState({
            input: {
                name: this.props.name,
                val: val
            }
        });
        this.props.inputHandle(this.props.name, val, msg);
    }
    render(){
        return (
            <div className="form-control">
                <input onChange={(e) => this.inputChange(e)} type={this.props.type} name={this.state.input.name} value={this.state.input.val} placeholder={this.props.placeholder} autoComplete="off" required />
                <span className="input-control clear-btn" onClick={() => this.clearVal()}></span>
            </div>
            )
    }
}
Input.propTypes = {
    inputHandle: React.PropTypes.func.isRequired,
    name: React.PropTypes.string,
    type: React.PropTypes.string
}
export default Input;