import React from 'react';
import {Link} from 'react-router';
import superagent from 'superagent';
import {connect} from 'react-redux';
import {Calendar} from 'react-date-range'
import {showLoading} from '../../actions/action';
import DorpDown from '../../components/dorpdown/Dorpdown';
import Header from '../../containers/header/Header';
import {getDate, setDate} from '../../core/date';
import {isObject} from '../../core/isObject';
require('../../../css/footballdetail.css')

class FootBallCont extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            actKey: this.props.defaultActKey
        }
    }
    clickHandle(index){
        this.setState({
            actKey: index
        })
    }
    renderPanes(child, index){
        return React.cloneElement(child, {
            isAct: this.state.actKey == index,
            callback: this.clickHandle.bind(this, index)
        })
    }
    render(){
        return (
            <section className="football-detail">
                    {React.Children.map(this.props.children, this.renderPanes.bind(this))}
            </section>
            )

    }

}
class FootBallList extends React.Component{

    render(){
        let className = (param) => {
            switch (param) {
                case '平':
                    return 'football-score level'; // 平
                    break;
                case '胜':
                    return 'football-score victory'; // 胜
                    break;
                case '负':
                    return 'football-score defeat';  // 负
                    break;
            }
        }
        let getEndTime = function(str){
            let resultTime = str.split(/\s+/);
            return resultTime[1].substring(0, 5);
        }
        return (
            <div>
            {
                this.props.data.map(function(val, index) {
                    return (
                        <div className="preiod-row" key={index}>
                            <div className="football-name">
                                <span>{val.matchName}</span>
                                <p><em>{val.sn}</em>&nbsp;&nbsp;<span>{getEndTime(val.endTime)}</span></p>
                            </div>
                            <div className="football-vs">
                            {val.mainTeam}
                            </div>
                            <div className={className(val.spfResult)}>
                                <p>{val.spfResult}</p>
                                <span>{val.scoreResult}</span>
                            </div>
                            <div className="football-vs">
                            {val.guestTeam}
                            </div>
                        </div>
                        )
                })

                }
            </div>
            )
    }
}
class OneFootBall extends React.Component{

    toggleHandler(){
        this.props.callback();

    }
    render()
    {
        let val = this.props.val;

        if (val.matchList.length) {
            return(
                <dd className="football-preiod">
                    <div  onClick={() => this.toggleHandler()} className="preiod-number">
                        <h2>{val.issue} {val.matchList[0].week} {val.matchTotal}场比赛已开奖</h2>
                        <span className={this.props.isAct ? 'toggle-btn dorp' : 'toggle-btn'}></span>
                    </div>
                    <div className={this.props.isAct ? 'preiod-cent show' : 'preiod-cent hide'}>
                        <FootBallList data={val.matchList} />
                    </div>
                </dd>
                )
        } else {
            return ( <p style={{textAlign: 'center'}}>没有相关数据</p> );

        }
    }
}
OneFootBall.propTypes = {
    val: React.PropTypes.object.isRequired
}

class FootBall extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            footballList: [],
            bBtn: false,
            date: getDate('') - 1,
            page: 1
        }
    }
    componentWillMount(){
        this.init(1)
    }
    init(p, date, reset, elem){

        // 如果是下拉或者上拉的时候加载 data就是function
        if (typeof date === 'function') {
            elem = reset,
            reset = date,
            date = ''
        }
        if (!date) {
            date = this.state.date;
        }
        let {dispatch} = this.props;
        if (!reset) {
            dispatch(showLoading(true))
        }
        this.setState({
            page: p
        })
        superagent.get('/orderController/historyMatch').query({lotteryId: 200, issue: date, page: p}).then((res) => {

            if (res.ok) {
                let body = res.body;
                let footballList = body.result;

                if (reset) reset(elem);
                else dispatch(showLoading(false));
                if (p > 1) {
                     footballList.matchList  = this.state.footballList[0].matchList.concat(footballList.matchList);
                }
                setTimeout(() => {
                    this.setState({
                        footballList: [footballList]
                    })
                }, 300)

            }

        });
    }
    toggleCalendar(){
        this.setState({
            bBtn: !this.state.bBtn
        })
    }
    handleSelect(val){
        this.setState({
            date: setDate(val, '')
        })
        this.init(1, setDate(val, ''))
        this.toggleCalendar();
    }
    render(){

        return (
            <div>
                <Header title="竞彩足球">
                    <a href="javascript:;" className="header-control" onClick={() => this.toggleCalendar()}></a>
                </Header>
                <div className="body">

                    <DorpDown page={this.state.page} callback={(p, reset, elem) => {this.init(p, reset, elem)}}>

                            <FootBallCont defaultActKey="0">
                            {
                                this.state.footballList.map( (val, index) => {
                                    return <OneFootBall val={val} key={index} />
                                })
                            }
                            </FootBallCont>

                    </DorpDown>




                </div>
                {this.state.bBtn ? <div className="view"><div className="mark"></div><div className="view-calendar"> <Calendar onChange={(val) => this.handleSelect(val)} /></div> </div>: null}
            </div>
            )
    }
}

export default connect()(FootBall);