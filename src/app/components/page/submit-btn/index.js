import React, { Component } from 'react';
class SubmitBtn extends Component {
    render() {
        const disabled = this.props.disabled||false;
        return (
            disabled?<button className="btn btn-primary" disabled>Saving...</button>:<button className="btn btn-primary">Save</button>
        );
    }
}

export default SubmitBtn;
