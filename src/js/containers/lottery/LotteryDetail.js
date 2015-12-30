import React from 'react';
import {Link} from 'react-router';
import superagent from 'superagent';
import {connect} from 'react-redux';
import BigHappy from './play/BigHappy';
import EvenColorball from './play/EvenColorball';
import Header from '../../containers/header/Header';
import {historyLottery} from '../../actions/action';
import {sliceTime, getWeek} from '../../core/date';
import {moneyFormat} from '../../core/money';
require('../../../css/lotterydetail.css')
class LotteryDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mapData: []
        }
    }
    componentWillMount(){
        let query = this.props.location.query;
        let {historyLottery} = this.props;


        historyLottery.forEach((val) => {
            if (val.issue == query.issue) {

                this.setState({
                    mapData: {
                        lotteryId: val.lotteryId,
                        bonusTime: val.bonusTime,
                        issue: val.issue,
                        bonusNumber: val.bonusNumber,
                        bonusClass: val.bonusClass,
                        prizePool: val.prizePool,
                        saleTotal: val.saleTotal
                    }
                })
                return;
            }
        })

    }
    render(){
        let state = this.state.mapData;

        return (
            <div>
                <Header title={
                    state.lotteryId == '113' ? '超级大乐透' : '双色球'
                } />
                <div className="body">
                    <section>
                        <div className="lottery-detail">
                            <div className="lottery-tit"><strong>第{state.issue}</strong>/<small className="lottery-date">{sliceTime(state.bonusTime, 'year')} {getWeek(state.bonusTime)}</small></div>
                            <div className="lottery-result">
                                <div className="number-list">
                                {
                                    state.bonusNumber.redball.map(function(val, index){
                                        return <span key={index}>{val}</span>
                                    })
                                 }
                                {
                                    state.bonusNumber.blueball ? state.bonusNumber.blueball.map(function(val, index){
                                        return <span className="blue-ball" key={index}>{val}</span>
                                    }) : null
                                }
                                </div>
                            </div>
                            <div className="lottery-sale">
                                <div className="sale-tit">
                                    <span>本期销量（元）</span>
                                    <span>奖池奖金（元）</span>
                                </div>
                                <div className="sale-price">
                                    <span>{moneyFormat(state.saleTotal * 2)}</span>
                                    <span>{state.prizePool.slice(0, -3)}</span>
                                </div>
                            </div>
                            <div className="lottery-win">
                            {state.lotteryId == '113' ?
                                <BigHappy data={state.bonusClass}/>
                                :
                                <EvenColorball data={state.bonusClass}/>
                            }
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            )
    }
}
let init = (state) => {
    return {
        historyLottery: state.historyLottery
    }
}
export default connect(init)(LotteryDetail);