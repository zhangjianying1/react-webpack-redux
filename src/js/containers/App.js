import React from 'react';
import Loading from '../components/loading/Loading';
import Error from '../components/error/Error';
let App  = React.createClass({
    render(){
        return (

            <div className="main">
                {this.props.children}
                <Loading />
                <Error/>
            </div>
            )

    }
});

export default App