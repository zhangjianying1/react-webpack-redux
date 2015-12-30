import React from 'react';
import superagent from 'superagent';
import {connect} from 'react-redux';
import Input from '../../components/input/Input';
import SendCode from '../../components/sendcode/SendCode';
import {error, forgetMobile} from '../../actions/action';

require('../../../css/findpsd.css');

class FindPsd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            codeUrl: '/codeController/forgetPassword',
            mobile: '',
            code: '',
            sendMobile: '',
            sendCodeText: '发送验证码',
            sendBtnStyle: {},
            findPasswordText: '找回密码'
        }

    }
    changeState(obj) {
        this.setState(obj);
    }
    subForm(e){
        e.preventDefault();
        let state = this.state,
            {dispatch, history} = this.props;

        if (!state.mobile) {
            dispatch(error('手机号不能为空'))
        } else if (!state.code) {
            dispatch(error('验证码不能为空'))
        } else if (state.findPasswordText == '找回密码'){
            this.setState({
                findPasswordText: '请稍后...'
            })
            superagent.post('/codeController/checkForgetPassword').set('Content-Type', 'application/x-www-form-urlencoded').
                send({ mobile: state.mobile, code: state.code }).then((res) => {
                    if (res.ok) {
                        this.setState({
                            findPasswordText: '找回密码'
                        })
                        let body = res.body;
                        if (body.code === '0000') {
                            dispatch(forgetMobile(state.mobile));
                            history.pushState(null, '/forgetsetpsd');
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
        this.setState(options)
    }
    render(){
        return (
            <div>
                <header id="header">
                    <a href="javascript: history.go(-1)" className="go-back"></a>
                    <h1>找回密码</h1>
                </header>
                <div className="body">
                    <section className="pd2-conet">
                        <form onSubmit={(e) => this.subForm(e)} noValidate>
                            <p>{this.state.sendMobile}</p>
                            <div className="l-input">
                                <label className="label icon-phone"></label>
                                <Input inputHandle={(name, val) => this.inputHandle(name, val)} type="number" name="mobile" placeholder="请输入您的手机号码" required />
                            </div>
                            <div className="l-input">
                                <label className="label icon-code"></label>
                                <Input inputHandle={(name, val) => this.inputHandle(name, val)} type="number" name="code" placeholder="输入验证码" required />
                            </div>
                            <div className="send-code">
                                <SendCode codeUrl={this.state.codeUrl} mobile={this.state.mobile} clickHandle = {(obj) => this.changeState(obj) }/>
                            </div>
                            <div className="sub-btns">
                                <button className="button btn-primary">{this.state.findPasswordText}</button>
                            </div>
                        </form>
                        <div className="call-service">
                            <p>手机号未绑定账号？请联系客服</p>
                            <a className="btn btn-border-green" href="tel:400-6666-780" >客服电话：400-6666-780</a>
                        </div>
                    </section>
                </div>
            </div>
            )
    }
}
export default connect()(FindPsd);