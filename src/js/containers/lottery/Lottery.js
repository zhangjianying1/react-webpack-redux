import React from 'react';
import {Link} from 'react-router'
import {connect} from 'react-redux';
import {showLoading} from '../../actions/action';
import superagent from 'superagent';
import HeaderNotBack from '../../containers/header/HeaderNotBack'

import {getBonusNumber} from '../../core/getBonusNumber';
class Lottery extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lotteryList: []
        }
    }
    componentWillMount(){

        let {dispatch} = this.props;

        dispatch(showLoading(true))
        superagent.get('/orderController/bonusCenter').set('Accept', 'application/json').then((res) => {
        let issueList;

        if (res.ok) {
            let data = res.body;

            if (data.code === '0000' && data.result) {
                issueList = data.result.issueList;

                issueList.length && issueList.forEach(function(val){

                    if (val.bonusNumber !== undefined) {
                        val.bonusNumber = getBonusNumber(val.bonusNumber)
                    }
                })
            }
            this.setState({
                lotteryList: issueList
            })
            dispatch(showLoading(false))
        }

        });
    }
    render(){
        let lotteryList = this.state.lotteryList.map( (val, index) => {
            if (val.lotteryId == '200') {
                return (
                    <li  key={val.lotteryId}>
                        <Link className="go-detail" to="football"  >
                            <div className="football">
                                <div className="lottery-tit"><strong>竞彩足球</strong></div>
                                <div className="lottery-result"></div>
                            </div>
                        </Link>
                    </li>
                    )
            } else {
                return(
                    <li key={val.lotteryId}>
                        <Link className="go-detail" to="lotteryhistory" query={{lotteryId: `${val.lotteryId}`}}>
                            <div className="">
                                <div className="lottery-tit"><strong>
                                    {
                                        //        001 双色球 002 福彩3D 004 七乐彩 108 排列三 109 排列五 110 七星彩 113 大乐透
                                            val.lotteryId == '001' ? '双色球' :
                                            val.lotteryId =='002' ? '福彩3D':
                                            val.lotteryId == '004' ? '七乐彩' :
                                            val.lotteryId  == '108' ? '排列三':
                                            val.lotteryId == '109' ?  '排列五' :
                                            val.lotteryId == '110' ? '七星彩' :
                                            val.lotteryId == '113' ? '大乐透' : null


                                        }
                                </strong><small className="lottery-date">第{val.issue}期</small></div>
                                <div className="lottery-result">
                                    <div className="number-list">
                                        {
                                            val.bonusNumber.redball.map(function(val, index){
                                                return <span key={index}>{val}</span>
                                            })
                                            }
                                        {
                                            val.bonusNumber.blueball ? val.bonusNumber.blueball.map(function(val, index){
                                                return <span className="blue-ball" key={index}>{val}</span>
                                            }) : null
                                            }
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </li>
                )
            }

        })




        return (
            <div>
                <HeaderNotBack title="开奖公告" />
                <div className="body">
                    <section>
                        <ul className="lottery-list">

                            {lotteryList}
                        </ul>
                    </section>
                </div>
            </div>
            )
    }
}
export default connect()(Lottery);