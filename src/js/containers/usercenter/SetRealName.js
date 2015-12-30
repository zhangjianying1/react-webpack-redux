import React from 'react';
import {Link} from 'react-router';
import superagent from 'superagent';
import {connect} from 'react-redux';
import Input from '../../components/input/Input';
import Header from '../../containers/header/Header';
import {error, userCenter} from '../../actions/action';
import hideNumber from '../../core/hideNumber';
require('../../../css/setrealname.css')
class SetRealName extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            realName: '',
            realCode: '',
            msg: '',
            bindText: '确认绑定'
        }
    }
    subForm(e){
        e.preventDefault();
        let state = this.state;
        let {dispatch, userCenterData} = this.props;

        if (!state.realName ) {
            dispatch(error('真实姓名不能为空'));
        } else if (!state.realCode) {
            dispatch(error('身份证号不能为空'));
        } else if (state.msg) {
            dispatch(error(state.msg));
        } else if (state.bindText !== '确认绑定') {
            dispatch(error('发送中请稍后'));
        } else {
            this.setState({
                bindText: '绑定中...'
            })
            superagent.post('/userController/realEdit').set('Content-Type', 'application/x-www-form-urlencoded').send({realName: state.realName, cardCode: state.realCode}).then((data) => {

                if (data.ok) {
                    let body = data.body;
                    this.setState({
                        bindText: '确认绑定'
                    })
                    if (body.code === '0000') {

                        // 更新 userCenterData
                        userCenterData.realName = state.realName;
                        userCenterData.cardCode = state.realCode;
                        dispatch(userCenter(userCenterData));
                        history.back();
                    } else {
                        dispatch(error(body.msg));
                    }
                }

            })
        }
    }
    inputHandle(name, val, msg){
        let options = {};
        options[name] = val;
        options.msg = msg;
        this.setState(options)
    }
    render(){
        let status = this.props.location.query && this.props.location.query.status;
        let {userCenterData} = this.props;
        return (
            <div>
                <Header title="实名信息" />
                <div className="body">
                    <section className="pd2-conet forget-psd">
                    {
                        status ?
                        <div className="real-name">
                            <p><span>真实姓名：</span><span>{userCenterData.realName}</span></p>
                            <p><span>身份证号：</span><span>{hideNumber(userCenterData.cardCode, -4)}</span></p>
                        </div>
                        :
                        <form onSubmit={(e) => this.subForm(e)} noValidate>
                            <div className="g-input">
                                <label className="label">真实姓名：</label>
                                <Input inputHandle={(name, val) => this.inputHandle(name, val)} type="text" name="realName" required placeholder="绑定后不能修改"  />
                            </div>
                            <div className="g-input">
                                <label className="label">身份证号：</label>
                                <Input inputHandle={(name, val, msg) => this.inputHandle(name, val, msg)} type="text"
                                name="realCode" required placeholder="中奖提款的唯一凭证" msg="
                                " pattern="^([1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3})|([1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4})$" />
                            </div>
                            <div className="sub-btns">
                                <button type="submit" className="button btn-primary">{this.state.bindText}</button>
                            </div>
                        </form>
                    }

                        <div className="prompt">
                            <dl>
                                <dt>注意事项</dt>
                                <dd>
                                    <p>1.真实姓名与银行卡开户名必须一致，绑定后不可修改。</p>
                                </dd>
                                <dd>
                                    <p>2.身份证号是中奖提款的唯一凭证，提交后不可修改，请填写真实信息。</p>
                                </dd>
                                <dd>客服电话：<a href="tel:400-6666-780">400-6666-780</a></dd>
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
export default connect(init)(SetRealName);