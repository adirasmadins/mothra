import React, { Component } from 'react';
import StringLine from './StringLine';
import DateLine from './DateLine';
import FireImgLine from './FireImgLine';
class Line extends Component {
    render() {
        var value = '';
        switch(this.props.settings.type) {
                    case 'date':
                        var value = <DateLine value={this.props.value} />
                        break;
                    case 'fireimg':
                        if(this.props.value!==undefined)
                            var value = <FireImgLine value={this.props.value} />
                        break;
                    case 'string':
                        var value = <StringLine value={this.props.value} />
                    default:
                        var value = <StringLine value={this.props.value} />
                }

        return <tr>
                    <td className="align-middle">{this.props.settings.name}</td>
                    <td className="align-middle">{value}</td>
                </tr>
    }
}

export default Line;
