import React, { Component } from 'react';
import StringColumn from './StringColumn';
import DateColumn from './DateColumn';
import ActionColumn from './ActionColumn';
import FireImgColumn from './FireImgColumn';
class Row extends Component {
    render() {
        const row = this.props.settings.properties.map((row) =>{
                switch(row.type) {
                    case 'action':
                        return <ActionColumn key={row.attribute} settings={this.props.settings} location={row.location} item={this.props.item}/>
                        break;
                    case 'date':
                        return <DateColumn key={row.attribute} value={this.props.item[row.attribute]} />
                        break;
                    case 'fireimg':
                        return <FireImgColumn key={row.attribute} value={this.props.item[row.attribute]} />
                        break;
                    case 'string':
                        return <StringColumn key={row.attribute} value={this.props.item[row.attribute]} />
                    default:
                        return <StringColumn key={row.attribute} value={this.props.item[row.attribute]} />
                }
            }
        )

        return (
            <tr>{row}</tr>
        );
    }
}

export default Row;
