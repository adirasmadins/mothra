import React, { Component } from 'react';
class CounterColumn extends Component {
    render() {
        return <td className="align-middle">{this.props.value}</td>
    }
}

export default CounterColumn;
