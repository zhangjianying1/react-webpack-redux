import React from 'react';
import {connect} from 'react-redux';
import {changeCoupon, showLoading} from '../../actions/action';
import superagent from 'superagent';
import {Link} from 'react-router';
import Confirm from '../../components/confirm/Confirm';
import DorpDown from '../../components/dorpdown/Dorpdown';
import Coupon from './Coupon';
import ExchangeShow from './ExchangeShow';
require('./exchangecoupon.scss')


class ExchangeCoupon extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            bBtn: true
        }
        this.search = function(){
            let search = location.search && location.search.substring(1);
            let index;
            let result = {};
            search.split('&').forEach(function(val){
                let index = val.indexOf('=');
                if (index != -1) {
                    result[val.substring(0, index)] = val.substring(index+1);
                }
            });
            return result;
        }

    }
    toggle(){
        this.setState({
            bBtn: !this.state.bBtn
        })
    }
    componentWillMount (func, elem){
        //let searchObj = this.search();
        const {dispatch, coupon} = this.props;

        let serialization = (val) => {
              let re = /([0-9]{4})(?=\d)/ig;
              return val.replace(re, '$1-');
        }

        let ajaxHandle = (data) => {
            data = {code: '0000', status: 0};

            if (data.code == '0000') {
                dispatch(changeCoupon({
                    exchangeCode: serialization(this.props.params.exchangecode),
                    status: data.status
                }));
                dispatch(showLoading(false))
                if (func && elem) {
                    setTimeout(function(){
                        func(elem);
                    }, 500)
                }
            }
        }
        superagent.get('/').end((data) => {
            setTimeout(function(){
                ajaxHandle(data);

            }, 2000)
        })
    }
    render() {
        const {dispatch, coupon} = this.props;

        return (
            <DorpDown callback={(func, elem) => this.componentWillMount(func, elem)}>

                    {this.state.bBtn ? <Coupon data={coupon} onChangeStore={(val) => dispatch(changeCoupon(val))} toggleHandle={() => this.toggle()}/> : <ExchangeShow data={coupon}/>}
            </DorpDown>
        )
    }
}
let init = (state) => {
    return {
        coupon: state.setCoupon
    }
}
export default connect(init)(ExchangeCoupon)