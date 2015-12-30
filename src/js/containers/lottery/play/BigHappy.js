import React from 'react';
import {Link} from 'react-router';
import superagent from 'superagent';
import {moneyFormat} from '../../../core/money';

class BigHappy extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mapData: this.props.data
        }
    }
    componentWillMount(){
        let arr = [];
        let RE1 = /^\一/;
        let RE2 = /^\二/;
        let RE3 = /^\三/;
        let RE4 = /^\四/;
        let RE5 = /^\五/;
        let RE6 = /^\六/;
        this.state.mapData.map(function(val, index){
            if (RE1.test(val.className)) {
                if (!arr[0]) {
                    arr[0] = []
                    arr[0].push(val)
                } else {
                    arr[0].push(val)
                }
            } else if (RE2.test(val.className)) {
                if (!arr[1]) {
                    arr[1] = []
                    arr[1].push(val)
                } else {
                    arr[1].push(val)
                }
            }else if (RE3.test(val.className)) {
                if (!arr[2]) {
                    arr[2] = []
                    arr[2].push(val)
                } else {
                    arr[2].push(val)
                }
            }else if (RE4.test(val.className)) {
                if (!arr[3]) {
                    arr[3] = []
                    arr[3].push(val)
                } else {
                    arr[3].push(val)
                }
            }else if (RE5.test(val.className)) {
                if (!arr[4]) {
                    arr[4] = []
                    arr[4].push(val)
                } else {
                    arr[4].push(val)
                }
            }else if (RE6.test(val.className)) {
                if (!arr[5]) {
                    arr[5] = []
                    arr[5].push(val)
                } else {
                    arr[5].push(val)
                }
            }
        })
        this.setState({
            mapData: arr
        })
    }
    render(){
        console.log(this.state.mapData)
        return (
            <dl className="big-happy">
                <dt className="win-tit">
                    <span>奖项</span>
                    <span></span>
                    <span>中奖注数</span>
                    <span>每注奖金（元）</span>
                </dt>
            {this.state.mapData.map(function (val, index) {
                return (
                    <dd className="win-body">

                        <div>{val[0].className}</div>
                        <div>
                            <span>基本</span>
                            {
                                index !== 5 ?
                                    <span>追加</span>
                                    : null
                             }
                        </div>
                        <div>
                        {val.map(function(val){
                            return (
                                <span>{val.total}</span>
                            )
                            })
                        }
                        </div>
                        <div>
                           {val.map(function(val){
                               return (
                                   <span>{val.amount}</span>
                               )
                           })
                               }
                        </div>
                    </dd>
                    )
            })
                }
            </dl>
            )
    }
}
export default BigHappy;