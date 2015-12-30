import React from 'react';
import superagent from 'superagent';
import {connect} from 'react-redux';
import {error} from '../../actions/action';
import md5 from '../../core/md5';
import InputPassword from '../../components/input/InputPassword';
import Header from '../../containers/header/Header'
require('../../../css/forgetpsd.css');
class ModifyPassword extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            oldPassword: '',
            password: '',
            repeatPassword: ''
        }
    }
    subForm(e){
        e.preventDefault();
        let state = this.state;
        let {dispatch} = this.props;
        if (!state.oldPassword) {
            dispatch(error('原密码不能为空'))
        } else if (!state.password) {
            dispatch(error('新密码不能为空'))
        } else if (!state.repeatPassword) {
            dispatch(error('重复密码不能为空'))
        } else  if (state.password !== state.repeatPassword) {
            dispatch(error('两次密码填写不一致'))
        } else {

            superagent.post('/userController/passwordEdit/').set('Content-Type', 'application/x-www-form-urlencoded').
                send({oldPassword: md5(state.oldPassword), password: md5(state.password)}).then(function(res){
                if (res.ok) {
                    let body = res.body;
                    if (body.code === '0000') {
                        history.back();
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
                <form onSubmit={(e) => this.subForm(e)} noValidate>
                    <div className="g-input">
                        <label className="label">原密码：</label>
                        <InputPassword inputHandle={(name, val) => this.inputHandle(name, val)}type="text" name="oldPassword" placeholder="请输入原密码" required />
                    </div>
                    <div className="g-input">
                        <label className="label">新密码：</label>
                        <InputPassword inputHandle={(name, val) => this.inputHandle(name, val)} type="text" name="password" placeholder="请输入新密码" required/>
                        </div>
                        <div className="g-input">
                            <label className="label">重复输入：</label>
                                <InputPassword inputHandle={(name, val) => this.inputHandle(name, val)} type="text" name="repeatPassword" placeholder="请再次输入新密码" required />
                                <span className="input-control toggle-psd"></span>
                            </div>
                            <div className="sub-btns">
                                <button className="button btn-primary">确认</button>
                            </div>
                        </form>

            )
    }
}
class SetPassword extends React.Component{
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
        let {dispatch} = this.props;
        if (!state.password) {
            dispatch(error('密码不能为空'))
        } else if (!state.repeatpassword) {
            dispatch(error('重复密码不能为空'))
        } else  if (state.password !== state.repeatpassword) {
            dispatch(error('两次密码填写不一致'))
        } else {
            superagent.post('/userController/passwordReset').set('Content-Type', 'application/x-www-form-urlencoded').send({ password: md5(state.password)}).then(function(res){
                if (res.ok) {
                    let body = res.body;
                    if (body.code === '0000') {
                        history.back();
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

            )
    }
}
class  ManagePassword extends React.Component{

    render(){
        let status = this.props.location.query && this.props.location.query.status;
        // status 0 =》 设置密码 1=> 修改密码
        return (
            <div>
                <Header title={status==0 ? '设置密码' : '修改密码' } />
                <div className="body">
                    <section className="pd2-conet forget-psd">
                        {status==0 ? <SetPassword {...this.props}/> : <ModifyPassword {...this.props}/>}
                    </section>
                </div>
            </div>
            )
    }
}

export default connect()(ManagePassword);
