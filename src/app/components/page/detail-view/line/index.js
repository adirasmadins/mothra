import React, { Component } from 'react';
import StringLine from './string-line';
import DateLine from './date-line';
import FireImgLine from './fire-img-line';
class Line extends Component {
    render() {
        var value = '';
        switch(this.props.settings.type) {
                    case 'date':
                        value = <DateLine value={this.props.value} />
                        break;
                    case 'fireimg':
                        if(this.props.value!==undefined&&this.props.value!=='')
                            value = <FireImgLine value={this.props.value} />
                        break;
                    case 'string':
                        value = <StringLine value={this.props.value} />
                    default:
                        value = <StringLine value={this.props.value} />
                }

        return <tr>
                    <td className="align-middle">{this.props.settings.name}</td>
                    <td className="align-middle">{value}</td>
                </tr>
    }
}

export default Line;
