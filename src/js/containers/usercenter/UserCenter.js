import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {setAuthCode, userCenter, showLoading} from '../../actions/action';
import superagent from 'superagent';
import Auth from '../../core/Auth';
import HeaderNotBack from '../../containers/header/HeaderNotBack'
import hideNumber from '../../core/hideNumber';
import {isObject} from '../../core/isObject';
import {search} from '../../core/location';
import {redirect} from '../../core/redirect'
require('../../../css/usercenter.css')
class UserCenter extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isShow: false
        }
    }
    componentWillMount(){
        let {dispatch, userCenterData} = this.props,
            authCode = search().code;
            authCode = authCode ? authCode == 'authdeny' ? null : authCode : null;

        if (!isObject(userCenterData)) {
            dispatch(showLoading(true));
            // 判断是否登录
            Auth.isLogin(authCode, (Token) => {
                dispatch(showLoading(false));
                // 如果localStoraget 有登录信息
                if (Token) {
                    dispatch(userCenter(Token));
                    this.setState({
                        isShow: true
                    })
                } else {
                    redirect();
                }
            })
        } else {
            this.setState({
                isShow: true
            })
        }

    }
    toggleLogin(){
        redirect();
    }
    render(){
        let {userCenterData} = this.props;

        return (
            <div>
            {this.state.isShow ? <div>



                <HeaderNotBack title="个人资料" />
                <div className="body">
                    <section className="user-center">
                        <div className="user-msg">
                            <img src="/weixin/images/user-center-photo.png" className="user-photo" />
                            <span className="user-name">{userCenterData.userName}</span>
                            {userCenterData.userNameModify == 1 ? <Link to="modifyusername" className="modify-btn" >修改<em className="icon-gt">&gt;</em></Link> : null}
                        </div>
                        <div className="user-setting">
                            <ul className="setting-list">
                                <li>
                                    <Link to="managepassword" query={{status: `${userCenterData.passwordModify}`}}>
                                        <div className="setting-box">
                                            <em className="setting-icon set-psd"></em>
                                            <span className="setting-name">密码管理</span>
                                            <span className="show-status">{!userCenterData.passwordModify ? '设置' : '修改'}<em className="icon-gt">&gt;</em></span>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    {
                                        userCenterData.mobile ?

                                                <div className="setting-box">
                                                    <em className="setting-icon set-phone"></em>
                                                    <span className="setting-name">手机号码</span>
                                                    <span className="show-status">{hideNumber(userCenterData.mobile, 3, 4)}
                                                    </span>
                                                </div>
                                            :
                                            <Link to="setphone">

                                                <div className="setting-box">
                                                        <em className="setting-icon set-phone"></em>
                                                        <span className="setting-name">手机号码</span>
                                                        <span className="show-status">未绑定
                                                            <em className="icon-gt">&gt;</em>
                                                        </span>
                                                    </div>
                                            </Link>

                                        }
                                </li>
                                <li>
                                    <Link to="setrealname" query={{status: `${userCenterData.realName}`}}>
                                        <div className="setting-box">
                                            <em className="setting-icon set-realname"></em>
                                            <span className="setting-name">身份信息</span>
                                            <span className="show-status">{userCenterData.realName ? '已完善' : '未完善'}<em className="icon-gt">&gt;</em></span>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="modify-tele">
                            <p>如需修改绑定信息请联系客服：<a href="tel:400-6666-780">400-6666-780</a></p>
                        </div>
                        <div className="user-center-btn">
                            <span className="button btn-border" onClick={this.toggleLogin}>切换账户</span>

                        </div>
                    </section>
                </div>

            </div>
                :
                null
    }
                </div>
            )
    }
}
let init = (state) => {
    return {
        userCenterData: state.userCenter
    }
}
export default connect(init)(UserCenter);