import React from 'react';
import {Link} from 'react-router';
import superagent from 'superagent';
class EvenColorBall extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            realName: '',
            realCode: ''
        }
    }

    render(){
        return (
            <dl className="even-colorball">
                <dt className="win-tit">
                    <span>奖项</span>
                    <span>中奖注数</span>
                    <span>每注奖金（元）</span>
                </dt>
                {
                    this.props.data.map(function(val){
                        <dd className="win-body">
                            <div>{val.className}</div>

                            <div>
                                <span>{val.total}</span>
                            </div>
                            <div>
                                <span>{val.amount}</span>
                            </div>
                        </dd>
                    })
                }

            </dl>
            )
    }
}
export default EvenColorBall;