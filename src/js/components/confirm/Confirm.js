import React from 'react';
import {connect} from 'react-redux';
import {showConfirm} from '../../actions/action'
require('./confirm.scss');

class Confirm extends React.Component {
    close(){
        const {dispatch} = this.props;
        dispatch(showConfirm({bBtn: false}))
    }
    cancel(e) {
        this.close();
        e.preventDefault();
    }
    confirm(e){
        const {confirmData} = this.props;
        confirmData.clickHandle(() => {
            this.close();
        })
        e.preventDefault();
    }
    render (){
        const propData = this.props;
        const {dispatch, confirmData} = propData;
        console.log(confirmData)
        return (

            <div className="view" style={{display: confirmData.bBtn ? 'block' : 'none'}}>
                <div className="mark"></div>
                <div className="view-confirm">
                <header className="view-confirm-header"><h3>{confirmData.title}</h3></header>
                <div className="view-confirm-body"><p>{confirmData.message}</p></div>
                <div className="view-confirm-footer">
                <a onClick={(e) => this.cancel(e)} className="view-confirm-cancel">取消</a><a onClick={(e) => this.confirm(e)} className="view-confirm-appect">确定</a></div>
                </div>
            </div>
            )
    }
}
Confirm.propTypes = {
    data: React.PropTypes.oneOfType({
        title: React.PropTypes.string,
        message: React.PropTypes.string
    }),
    close: React.PropTypes.func,
    confirm: React.PropTypes.func
}
let init = (state) => {
    return {
        confirmData: state.showConfirm
    }
}
export default connect(init)(Confirm);