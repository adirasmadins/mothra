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

        return <div className="view-cnt__line">
                    <div className="view-cnt__name">{this.props.settings.name}</div>
                    <div className="view-cnt__value">{value}</div>
                </div>
    }
}

export default Line;
