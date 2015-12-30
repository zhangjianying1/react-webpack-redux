import React from 'react';
import {Link} from 'react-router';
import superagent from 'superagent';
import {connect} from 'react-redux';
import {error, userCenter} from '../../actions/action';
import Input from '../../components/input/Input';
import InputPassword from '../../components/input/InputPassword';
import HeaderNotBack from '../../containers/header/HeaderNotBack'

import Auth from '../../core/Auth';
import {search} from '../../core/location';
import md5 from '../../core/md5';
import {redirect} from '../../core/redirect';

require('../../../css/login.css');
class Login extends React.Component{
    constructor(props){
        super(props);
        let {forgetMobile} = this.props;
        this.state = {
            user: forgetMobile,
            password: '',
            loginText: '登录',
            registerText: '一键登录'

        }
    }

    inputHandle(name, val){
        let options = {};
        options[name] = val;
        this.setState(options);
    }
    subForm(e){
        e.preventDefault();
        let {dispatch, history} = this.props,
            authCode = search().code,
            state = this.state,
            weixinUserNameLogin = authCode ? '/userController/weixinUserNameLogin' : '/userController/userNameLogin',
            weixinMobileLogin = authCode ? '/userController/weixinMobileLogin' : '/userController/mobileLogin',
            phoneRE = /^1[23456789][0-9]{9}$/;


        if (!state.user) {
            dispatch(error('用户名不能为空'));
        } else if (!state.password) {
            dispatch(error('密码不能为空'));
        } else if (state.loginText === '登录') {
            let sendParam = {
                password: md5(state.password)
            }
            if (authCode) sendParam.authCode = authCode;
            this.setState({
                loginText: '登录中...'
            });
            // 是不是手机号登陆
            if (phoneRE.test(state.user)) {
                sendParam.mobile =  state.user
                sendLogin(weixinMobileLogin, sendParam)
            } else {
                sendParam.userName = state.user
                sendLogin(weixinUserNameLogin, sendParam)
            }
        }



        let goUserCenter = (data) => {
            if (data.ok) {
                this.setState({
                    loginText: '登录'
                });
                let body = data.body;
                if (body.code == '0000') {

                    dispatch(userCenter(body.result));
                    // 个人中心是登录的入口页面，登录成功返回前一个页面

                    history.pushState(null, '/usercenter');
                } else {
                    dispatch(error(body.msg))
                    redirect();
                }
            }

        }
        function sendLogin(url, param){

            superagent.post(url).set('Content-Type', 'application/x-www-form-urlencoded').
                send(param).then(function(res){
                    goUserCenter(res)
                })
        }


    }
    register(e) {
        e.stopPropagation();
        let {dispatch, history} = this.props,
            authCode = search().code;

        // authCode 不存在情况（点击切换账号时，不用微信的授权方式就没有code）
        if (!authCode){
            dispatch(error('您没有授权不能登录'));
        } else if (this.state.registerText === '一键登录') {
            this.setState({
                registerText: '登录中...'
            })

            superagent.post('/userController/weixinLogin').set('Content-Type', 'application/x-www-form-urlencoded').send({authCode: authCode}).then((res) => {

                if (res.ok) {
                    // 一键登录成功
                    this.setState({
                        registerText: '一键登录'
                    })
                    let body = res.body;
                    if (body.code == '0000') {

                        dispatch(userCenter(body.result));
                        Auth.setToken(JSON.stringify(body.result));
                        // 个人中心是登录的入口页面，登录成功返回前一个页面

                        history.pushState(null, '/usercenter');
                    } else {
                        dispatch(error(body.msg))
                        redirect();
                    }
                }
            })

        }

    }
    render(){
        let {forgetMobile} = this.props;

        return (
            <div>
                <HeaderNotBack title="登录" />
                <div className="body">
                    <section className="login">
                        <form onSubmit={(e) => this.subForm(e)} noValidate>
                            <div className="l-input">
                                <label className="label icon-user"></label>
                                <div className="form-control">
                                     <Input type="text" val={forgetMobile} name="user"inputHandle={(name, val) => this.inputHandle(name, val)} placeholder="用户名/手机号" />
                                </div>
                             </div>
                                <div className="l-input">
                                    <label className="label icon-psd"></label>
                                     <InputPassword type="password" name="password" inputHandle={(name, val) => this.inputHandle(name, val)} placeholder="请输入密码" />
                                </div>
                                <div className="find-psd">
                                    <p><Link to="findpsd">忘记密码</Link></p>
                                </div>
                                <div className="sub-btns">
                                    <button type="submit" className="button btn-primary ">{this.state.loginText}</button>
                                    <a className="button btn-border-green" onClick={(e) => this.register(e)}>{this.state.registerText}</a>
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
export default connect(init)(Login);
