import React, { Component } from 'react';
class Messages extends Component {

    static addSuccesMsg(msg){
        var msgBox = document.querySelector('.msg-main');
        var div = document.createElement('div');
        div.className = "message alert alert-success";
        div.onclick = function() {
            this.className += " fadeOut";
            setTimeout(()=>{this.remove()},200);
        };
        div.innerHTML = msg;
        msgBox.insertBefore(div, msgBox.firstChild);
        div.className += " animated bounceInRight";
    }

    static addErrorMsg(msg){
        var msgBox = document.querySelector('.msg-main');
        var div = document.createElement('div');
        div.className = "message alert alert-danger";
        div.onclick = function() {
            this.className += " fadeOut";
            setTimeout(()=>{this.remove()},200);
        };
        div.innerHTML = msg;
        msgBox.insertBefore(div, msgBox.firstChild);
        div.className += " animated bounceInRight";
    }

    static addMsg(msg){
        var msgBox = document.querySelector('.msg-main');
        var div = document.createElement('div');
        div.className = "message";
        div.onclick = function() {
            this.className += " fadeOut";
            setTimeout(()=>{this.remove()},200);
        };
        div.innerHTML = msg;
        msgBox.insertBefore(div, msgBox.firstChild);
        div.className += " animated bounceInRight";
    }

    render() {
        return (
            <div className="msg-main">
                {/* <div className="message active">
                    Группа успешно создана
                </div>
                <div className="message message_error active">
                    Группа успешно создана
                </div>
                <div className="message message_success active">
                    Группа успешно создана
                </div> */}
            </div>
        );
    }
}

export default Messages;
