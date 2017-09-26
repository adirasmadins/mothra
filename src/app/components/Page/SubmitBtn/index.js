import React, { Component } from 'react';
class SubmitBtn extends Component {
    render() {
        const disabled = this.props.disabled||false;
        return (
            disabled?<button className="btn btn-primary" disabled>Сохранение...</button>:<button className="btn btn-primary">Сохранить</button>
        );
    }
}

export default SubmitBtn;
