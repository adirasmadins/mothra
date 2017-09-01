import React, { Component } from 'react';
import StringCol from './StringCol';
import DateCol from './DateCol';
import ActionCol from './ActionCol';
import FireImgCol from './FireImgCol';
class Row extends Component {
    render() {
        const row = this.props.settings.elements.map((row) =>{
                switch(row.type) {
                    case 'action':
                        return <ActionCol key={row.attribute} settings={this.props.settings} location={row.location} item={this.props.item}/>
                        break;
                    case 'date':
                        return <DateCol key={row.attribute} value={this.props.item[row.attribute]} />
                        break;
                    case 'fireimg':
                        return <FireImgCol key={row.attribute} value={this.props.item[row.attribute]} />
                        break;
                    case 'string':
                        return <StringCol key={row.attribute} value={this.props.item[row.attribute]} />
                    default:
                        return <StringCol key={row.attribute} value={this.props.item[row.attribute]} />
                }
            }
        )

        return (
            <tr>{row}</tr>
        );
    }
}

export default Row;
