import React, { Component } from 'react';
class Button extends Component {
    onClickHandler = () => {
        this.props.getList({order:this.props.order, add:true, last:this.props.last});       
    }	
    render() {
        const disabled = this.props.fetching||false;
        return (
            disabled?<button className="btn btn-primary btn-lg mb-5 mt-3" disabled>Fetching...</button>:<button onClick={this.onClickHandler}  className="btn btn-primary btn-lg mb-5 mt-3">Next Page</button>
        );
    }
}

export default Button;
