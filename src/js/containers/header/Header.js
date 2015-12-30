import React from 'react';

class Header extends React.Component{
    render(){
        return (
            <header id="header">
                <a href="javascript: history.go(-1)" className="go-back"></a>
                <h1>{this.props.title}</h1>
                {this.props.children}
            </header>
            )
    }
}
export default Header;