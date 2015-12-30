import React from 'react';
import {Link} from 'react-router'
class Lottery extends React.Component{
    render(){
        return (
            <div>
                <header id="header">
                    <a href="javascript: historty.go(-1)" className="go-back"></a>
                    <h1>超级大乐透</h1>
                </header>
                <div className="body">
                    <section>
                        <ul className="lottery-list">
                            <li>
                                <a href="" className="go-detail">
                                    <div className="">
                                        <div className="lottery-tit"><strong>第20140304</strong><small className="lottery-date">1015-3-4</small></div>
                                        <div className="lottery-result">
                                            <div className="number-list"><span>2</span><span>4</span><span>6</span></div>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <div className="">
                                    <div className="lottery-tit"><strong>第20140304</strong><small className="lottery-date">1015-3-4</small></div>
                                    <div className="lottery-result">
                                        <div className="number-list"><span>2</span><span>4</span><span>6</span></div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
            )
    }
}
export default Lottery;