import React from 'react';

class HeaderNotBack extends React.Component{
    render(){
        return (
            <header id="header">
                <h1>{this.props.title}</h1>
                {this.props.children}
            </header>
            )
    }
}
export default HeaderNotBack;