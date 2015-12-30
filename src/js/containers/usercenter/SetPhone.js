import React from 'react';
import superagent from 'superagent';
import {connect} from 'react-redux';
import {error, userCenter} from '../../actions/action';
import Input from '../../components/input/Input';
import Header from '../../containers/header/Header';
import SendCode from '../../components/sendcode/SendCode';
require('../../../css/setphone.css')
class SetPhone extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            codeUrl: '/codeController/bindMobile',
            sendMobile: '点击发送验证码到手机',
            mobile: '',
            code: '',
            bindText: '确认绑定'
        }
    }

    changeState(obj){
        this.setState(obj);
    }
    subForm(e){
        e.preventDefault();
        let state = this.state;
        let {dispatch, userCenterData} = this.props;

        if (!state.mobile) {
            dispatch(error('手机号不能为空'))
        } else if (!state.code) {
            dispatch(error('验证码不能为空'))
        } else if (state.bindText == '确认绑定'){
            this.setState({
                bindText: '绑定中...'
            })
            superagent.post('/userController/mobileEdit').set('Content-Type', 'application/x-www-form-urlencoded').
                send({ mobile: state.mobile, code: state.code }).then((res) => {
                if (res.ok) {
                    let body = res.body;
                    if (body.code === '0000') {
                        userCenterData.mobile = state.mobile;
                        dispatch(userCenter(userCenterData));
                        history.back();
                    } else {
                        dispatch(error(body.msg))
                    }
                    this.setState({
                        bindText: '确认绑定'
                    })
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
                <Header title="手机号码" />
                <div className="body">
                    <section className="pd2-conet">
                        <p className="send-cod-tips">
                        {this.state.sendMobile}
                        </p>
                        <form onSubmit={(e) => this.subForm(e)} noValidate>
                            <div className="l-input">
                                <label className="label icon-phone"></label>
                                <Input inputHandle={(name, val) => this.inputHandle(name, val)} type="number" name="mobile" placeholder="请输入您的手机号码" required maxlength="11" />
                            </div>
                            <div className="l-input">
                                <label className="label icon-code"></label>
                                 <Input inputHandle={(name, val) => this.inputHandle(name, val)} type="number" name="code" placeholder="输入验证码" required maxlength="6" />
                            </div>
                            <div className="send-code">
                                <SendCode codeUrl={this.state.codeUrl} mobile={this.state.mobile} clickHandle = {(obj) => this.changeState(obj) }/>
                            </div>
                            <div className="sub-btns">
                                <button type="submit" className="button btn-primary">{this.state.bindText}</button>
                            </div>
                        </form>
                        <div className="prompt">
                            <dl>
                                <dt>注意事项</dt>
                                <dd>
                                    <p>1.短信验证码每日受网络影响，会出现不同程度的延迟，请耐心等待。</p>
                                </dd>
                                <dd>
                                    <p>2.如果1分钟后未收到短信，请查询手机号填写是否正确或重新提交</p>
                                </dd>
                            </dl>
                        </div>
                    </section>
                </div>
            </div>
            )
    }
}
let init = (state) => {
    return {
        userCenterData: state.userCenter
    }
}
export default connect(init)(SetPhone);