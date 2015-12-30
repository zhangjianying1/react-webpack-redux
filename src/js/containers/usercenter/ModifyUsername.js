import React from 'react';
import superagent from 'superagent';
import {connect} from 'react-redux';
import {error, userCenter} from '../../actions/action';
import Input from '../../components/input/Input';
import Header from '../../containers/header/Header'
import Error from '../../components/error/Error';
class ModifyUsername extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userName: '',
            acceptText: '确定'
        }

    }
    subForm(e){
        e.preventDefault();
        let {dispatch, userCenterData} = this.props,
            state = this.state;

        if (state.userName) {

            if (this.state.acceptText == '确定') {
                this.setState({
                    acceptText: '请稍后...'
                })
                superagent.post('/userController/userNameEdit').set('Content-Type', 'application/x-www-form-urlencoded').send({userName: state.userName}).then((res) => {
                    if (res.ok) {
                        if (res.body && res.body.code === '0000') {
                            userCenterData.userName = state.userName;

                            // userNameModify = 0 不能修改了;
                            userCenterData.userNameModify = 0;
                            dispatch(userCenter(userCenterData));
                            history.back();
                        } else {
                            dispatch(error(res.body.msg));
                        }
                        this.setState({
                            acceptText: '确定'
                        })
                    }
                })
            }

        } else {
            dispatch(error('用户名不能为空'))
        }
    }
    inputHandle(name, val){
        this.setState({
            userName: val
        })
    }
    render(){
        return (
            <div>
                <Header title="编辑用户名"/>
                <div className="body">
                    <section className="pd2-conet forget-psd">
                        <form onSubmit={(e) => this.subForm(e) } noValidate>
                            <div className="g-input">
                                <label className="label">新用户名：</label>
                                <Input inputHandle={(nam, val) => this.inputHandle(name, val)} type="text" name="uesrName" placeholder="4-12字符(支持中文)" required maxlength="12" minlength="4"/>
                            </div>

                            <div className="sub-btns">
                                <button className="button btn-primary">{this.state.acceptText}</button>
                            </div>
                        </form>
                        <div className="prompt">
                            <dl>
                                <dd>
                                    <p>1.用户名规则为4-12个字符，1个汉字占2字符，支持汉字字母数字组合，不支持特殊字符，不区分大小写</p>
                                </dd>
                                <dd>
                                    <p>2.用户名设置后是系统内唯一且不可更改的，您可以使用设置后的用户名登录，并且会展示在“发起合买”、“参与方案”、“中奖排行”等公共展示的位置</p>
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
export default connect(init)(ModifyUsername);