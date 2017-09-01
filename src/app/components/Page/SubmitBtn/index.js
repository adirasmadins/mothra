import React, { Component } from 'react';
class SubmitBtn extends Component {
    render() {
        const disabled = this.props.disabled||false;
        return (
            disabled?<button className="button submit-btn" disabled>Сохранение...</button>:<button className="button submit-btn">Сохранить</button>
        );
    }
}

export default SubmitBtn;
