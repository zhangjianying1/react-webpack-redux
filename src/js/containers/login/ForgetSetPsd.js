import React from 'react';
import superagent from 'superagent';
import {connect} from 'react-redux';
import md5 from '../../core/md5';
import Input from '../../components/input/Input';
import InputPassword from '../../components/input/InputPassword';

import {error} from '../../actions/action';

class ForgetSetPsd extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            repeatpassword: ''
        }
    }
    subForm(e){
        e.preventDefault();
        let state = this.state;
        let {dispatch, forgetMobile, history} = this.props;
        if (!state.password) {
            dispatch(error('密码不能为空'))
        } else if (!state.repeatpassword) {
            dispatch(error('重复密码不能为空'))
        } else  if (state.password !== state.repeatpassword) {
            dispatch(error('两次密码填写不一致'))
        } else {
            superagent.post('/userController/passwordResetByMobile').set('Content-Type', 'application/x-www-form-urlencoded').
                send({mobile: forgetMobile, password: md5(state.password)}).then(function(res){
                if (res.ok) {
                    let body = res.body;
                    if (body.code === '0000') {
                        history.pushState(null, '/login');
                    } else {
                        dispatch(error(body.msg))
                    }
                }
            })
        }

    }
    inputHandle(name, val){
        let options = {};
        options[name] = val;
        this.setState(options);
    }
    render(){
        return (
            <div>
                <header id="header">
                    <a href="javascript: history.go(-1)" className="go-back"></a>
                    <h1>设置密码</h1>
                </header>
                <div className="body">
                    <section className="pd2-conet forget-psd">
                        <form onSubmit={(e) => this.subForm(e)} noValidate>

                            <div className="g-input">
                                <label className="label">密码：</label>
                                <InputPassword inputHandle={(name, val) => this.inputHandle(name, val)} type="text" name="password" placeholder="请输入新密码" required/>
                            </div>
                            <div className="g-input">
                                <label className="label">重复输入：</label>
                                <InputPassword inputHandle={(name, val) => this.inputHandle(name, val)} type="text" name="repeatpassword" placeholder="请再次输入新密码" required />
                            </div>
                            <div className="sub-btns">
                                <button className="button btn-primary">确认</button>
                            </div>
                        </form>

                    </section>
                </div>
            </div>
            )
    }
}
let init = (state) => {
    return {
        forgetMobile: state.forgetMobile
    }
}
export default connect(init)(ForgetSetPsd);