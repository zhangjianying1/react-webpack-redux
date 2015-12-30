import React from 'react';
import superagent from 'superagent';
import {connect} from 'react-redux';
import {error} from '../../actions/action';
class SendCode extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sendCodeText: '发送验证码',
            sendBtnStyle: {}
        }
        this.timer = null;

    }
    componentWillUnmount(){
        clearInterval(this.timer)
    }
    sendState(obj){
        this.props.clickHandle(obj)
    }
    sendCode(){
        let mobileRE = /^1[3456789][0-9]{9}$/g,
            count = 60,
            state = this.state,
            {dispatch, mobile, codeUrl} = this.props;

        let downCount = () => {
            this.timer = setTimeout(() => {
                count--;
                this.setState({
                    sendCodeText: '重发验证码' + count,
                    sendBtnStyle: {background: '#ddd'}
                })
                if (count > 0) {
                    downCount();
                } else {
                    this.setState({
                        sendCodeText: '重发验证码',
                        sendBtnStyle: {}
                    })
                }
            }, 1000)

        }
        if (state.sendCodeText == '发送验证码' || state.sendCodeText === '重发验证码') {

            if (mobileRE.test(mobile)) {
                this.setState({
                    sendCodeText: '发送中...'
                });
                this.sendState({sendMobile: ''})
                superagent.get(codeUrl, {mobile: mobile}).then((res) => {

                    if (res.ok) {
                        let body = res.body;
                        if (body.code === '0000') {
                            if (body.result.status != 1) {
                                this.sendState({sendMobile: '包含验证码的短信已发送至' + mobile})
                                downCount();
                            } else {
                                this.setState({
                                    sendCodeText: '验证码功能已锁定'
                                });
                                dispatch(error('验证码一天只能接受3次'));
                            }

                        } else {
                            this.setState({
                                sendCodeText: '发送验证码'
                            });
                            dispatch(error(body.msg));
                        }

                    }
                })
            } else {
                this.sendState({sendMobile: '您填写的手机号码不正确'})
            }
        }

    }
    render(){
        return (
            <span className="send-btn" onClick={() => this.sendCode()} style={this.state.sendBtnStyle}>{this.state.sendCodeText}</span>
            )
    }
}
SendCode.propTypes = {
    codeUrl: React.PropTypes.string.isRequired,
    mobile: React.PropTypes.string.isRequired,
    changeState: React.PropTypes.func
}
export default connect()(SendCode);