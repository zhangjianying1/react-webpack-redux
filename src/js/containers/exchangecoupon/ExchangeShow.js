import React from 'react';
import ReactDOM from 'react-dom';

class ExchangeShow extends React.Component {
    componentDidMount(){
        ReactDOM.findDOMNode(this).addEventListener('touchmove', function(e){e.stopPropagation();}, false);
    }
    render(){
        const propData = this.props.data;
        let showClass = () => {
            return propData.status == 0 ? 'icon-success' : 'icon-failure';
        };
        let showStatus = () => {
            if (propData.status == 0) {
                return  (
                    <div>
                        <p className="success-text">
                        已成功兑换，兑换金额</p>
                        <div className="success-price">
                            <em>2.00<b>元</b></em>
                        </div>
                    </div>
                    )
            } else {
                return (
                    <p className="success-text">兑换失败！</p>
                    )
            }
        }

        return (
            <section className="coupon-exchange-success">
                <div className="show-success">
                    <i className={showClass()}></i>
                    <p className="font-19-333">卡劵{ propData.exchangeCode }</p>
                    {showStatus()}
                </div>
                <div className="exchange-btns">
                    <a className="btn btn-default" href="chuDao:closeActivity">确定</a>
                    <button type="submit" className="btn" style={{opacity:0}}></button>
                </div>
            </section>
            )
    }
}
export default ExchangeShow;