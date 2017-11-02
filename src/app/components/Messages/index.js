import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeMessage } from '../../actions/messages';

class Messages extends Component {
    render() {
        const messages = this.props.messages.map((message, index) => {
            switch(message.type) {
                case 'common':
                    return <div key={index} onClick={()=>{this.props.dispatch(removeMessage(index))}} className="message animated bounceInRight">{message.message}</div>;
                break;
                case 'success':
                    return <div key={index} onClick={()=>{this.props.dispatch(removeMessage(index))}}  className="message alert alert-success animated bounceInRight">{message.message}</div>;
                break;
                case 'error':
                    return <div key={index} onClick={()=>{this.props.dispatch(removeMessage(index))}}  className="message alert alert-danger animated bounceInRight">{message.message}</div>;
                break;
                default:
                    return <div key={index} onClick={()=>{this.props.dispatch(removeMessage(index))}}  className="message animated bounceInRight">{message.message}</div>;
                break;       
            }     
        });
        return (
            <div className="msg-main">
                {messages}
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        messages: state.messages
    }
}

export default connect(mapStateToProps)(Messages);