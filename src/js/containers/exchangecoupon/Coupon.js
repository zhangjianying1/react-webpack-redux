import React from 'react';
import superagent from 'superagent';
import Confirm from '../../components/confirm/Confirm';
import {connect} from 'react-redux';
import {showConfirm} from '../../actions/action';
class Coupon extends React.Component {


    useCoupon (fn){
        let successFn = (data) => {
            data = {code: '0000', result: {status: -2}};
            console.log(this.props)
            console.log(fn)
            if (data.code === '0000' && data.result) {
                // 兑换 0 成功 -1 已核销 -2 核销失败 -99 网络异常
                if (data.result.status == 0 || data.result.status == -2) {
                    this.props.toggleHandle();
                    if (fn) fn();
                }
                this.props.onChangeStore({
                    exchangeCode: this.props.data.exchangeCode,
                    status: data.result.status
                })

            }
        }
        superagent.get('/').end(successFn)
    }
    clickHandle (e){
        if (this.props.data.status === 0) {

        }
        const {dispatch } = this.props;
        dispatch(showConfirm({
            bBtn: true,
            title: '卡券兑换',
            message: '您确定要兑换改卡劵吗？',
            clickHandle: (fn) => this.useCoupon(fn)
        }));
        e.preventDefault();
    }

    render (){
        const propData = this.props.data;
        let showStatus = () => {
            switch (propData.status) {
                case 0:
                    return <span>兑换码可使用</span>
                    break;
                case -1:
                    return <span>兑换码已使用</span>
                    break;
                case -2:
                    return <span>兑换码无效</span>
                    break;
                case -99:
                    return <span><i className="ion-timeout"></i>网络超时,请重试</span>
                    break;
                //default
            }
        };
        let showClass = () => {
            return propData.status != 0 ? 'btn btn-default btn-disabled' : 'btn btn-default';
        }
        return (
            <section className="coupon">

                <div className="coupon-img">
                    <span className="coupon-tit"><em>兑</em><em>换</em><em>券</em></span>
                    <span className="coupon-code"><em>{propData.exchangeCode}</em></span>
                </div>
                <div className="coupon-status">
                    <p className="show-status">{showStatus()}</p>
                    <p className="">下拉刷新兑换码状态</p>
                </div>
                <div className="exchange-btns">
                    <a type="submit" onClick={e => this.clickHandle(e)} className={showClass()} >兑换</a>
                    <a href="chudao:closeActivity" className="btn btn-cancel">取消</a>
                </div>

            </section>
            )
    }
}
let init = function(state) {
    return {
        confirmData: state.showConfirm
    }
}
export default connect(init)(Coupon);