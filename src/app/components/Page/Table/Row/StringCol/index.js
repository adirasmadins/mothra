import React, { Component } from 'react';
class StringCol extends Component {
    render() {
        return <td className="align-middle">{this.props.value}</td>
    }
}

export default StringCol;
