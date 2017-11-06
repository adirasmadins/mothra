import React, { Component } from 'react';
import StringLine from './string-line';
import DateLine from './date-line';
import ImageLine from './image-line';
class Line extends Component {
    render() {
        var value = '';
        switch(this.props.settings.type) {
                    case 'date':
                        value = <DateLine value={this.props.value} />
                        break;
                    case 'img':    
                    case 'fireimg':
                        if(this.props.value!==undefined&&this.props.value!=='')
                            value = <ImageLine value={this.props.value} />
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
