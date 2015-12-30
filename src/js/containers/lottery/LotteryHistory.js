import React from 'react';
import {Link} from 'react-router';
import superagent from 'superagent';
import {connect} from 'react-redux';
import {showLoading, historyLottery} from '../../actions/action';
import DorpDown from '../../components/dorpdown/Dorpdown';
import Header from '../../containers/header/Header';
import {getBonusNumber} from '../../core/getBonusNumber';
import {sliceTime} from '../../core/date';
class LotteryHistory extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            page: 1,
            mapData: []
        }
    }
    componentWillMount(){
        this.loadPage(1);
    }
    loadPage(p, reset, elem){
        if (typeof p == 'function') {
            elem = reset;
            reset = p;
            p = ''
        }
        if (!p) {
            p = this.state.page;
        }


        this.setState({
            page: p
        })


        let query = this.props.location.query;

        let {dispatch} = this.props;
        if (!reset) dispatch(showLoading(true))


        superagent.get('/orderController/historyIssue').set('Accept', 'application/json').query({lotteryId: query.lotteryId, issue: query.issue, page: p, pageSize: '15'}).then((res) => {

            if (res.ok) {
                let issueList = res.body && res.body.result && res.body.result.issueList;
                issueList.length > 0 && issueList.forEach(function(val){
                    if (val.bonusNumber !== undefined) {
                        val.bonusNumber = getBonusNumber(val.bonusNumber)
                    }
                });

                issueList = (p == 1) ? issueList : this.state.mapData.concat(issueList);


                dispatch(historyLottery(issueList))
                if (reset) reset(elem);
                dispatch(showLoading(false))
                setTimeout(() => {
                    this.setState({
                        mapData: issueList
                    })
                }, 300)
            }

        })

    }
    render(){
        let query = this.props.location.query;
        let lotteryId = query.lotteryId;
        let lotteryOne = function(val) {
            return (
                <div className="">
                    <div className="lottery-tit">
                        <strong>第{val.issue}期</strong>
                    /
                        <small className="lottery-date">{sliceTime(val.bonusTime, 'year')}</small>
                    </div>
                    <div className="lottery-result">
                        <div className="number-list">
                        {
                            val.bonusNumber.redball.map(function (val, index) {
                                return <span key={index}>{val}</span>
                            })
                            }
                        {
                            val.bonusNumber.blueball ? val.bonusNumber.blueball.map(function (val, index) {
                                return <span className="blue-ball" key={index}>{val}</span>
                            }) : null
                            }
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <Header title=
                        {
                            //        001 双色球 002 福彩3D 004 七乐彩 108 排列三 109 排列五 110 七星彩 113 大乐透
                        lotteryId == '001' ? '双色球' :
                        lotteryId =='002' ? '福彩3D':
                        lotteryId == '004' ? '七乐彩' :
                        lotteryId  == '108' ? '排列三':
                        lotteryId == '109' ?  '排列五' :
                        lotteryId == '110' ? '七星彩' :
                        lotteryId == '113' ? '大乐透' : null


                    }
                     />
                <div className="body">
                    <DorpDown page={this.state.page} callback={(page, reset, elem) => this.loadPage(page, reset, elem)}>
                    <section>
                        <ul className="lottery-list">
                        {this.state.mapData.map(function(val, index){
                            return (<li key={index}>

                                {
                                   ((val.lotteryId == '001' && val.bonusClass.length > 0) || (val.lotteryId == '113' && val.bonusClass.length > 0)) ?
                                        <Link to="lotterydetail" query={{lotteryId: `${val.lotteryId}`, issue: `${val.issue}`}} className="go-detail">
                                             {lotteryOne(val)}
                                        </Link>

                                    : lotteryOne(val)

                              }
                            </li>)
                        })}
                        </ul>
                    </section>
                    </DorpDown>
                </div>
            </div>
            )
    }
}
export default connect()(LotteryHistory);