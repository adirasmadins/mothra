import React, { Component } from 'react';
import StringColumn from './string-column';
import CounterColumn from './counter-column';
import DateColumn from './date-column';
import ActionColumn from './action-column';
import FireImgColumn from './fire-img-column';
import ImgColumn from './img-column';
class Row extends Component {
    render() {
        const row = this.props.settings.properties.map((row) =>{
                switch(row.type) {
                    case 'action':
                        return <ActionColumn {...this.props} key={row.attribute} index={this.props.index} settings={this.props.settings} location={row.location} item={this.props.item}/>
                        break;
                    case 'date':
                        return <DateColumn key={row.attribute} value={this.props.item[row.attribute]} />
                        break;
                    case 'fireimg':
                        return <FireImgColumn key={row.attribute} value={this.props.item[row.attribute]} />
                        break;
                    case 'img':
                        return <ImgColumn key={row.attribute} value={this.props.item[row.attribute]} />
                        break;                        
                    case 'string':
                        return <StringColumn key={row.attribute} value={this.props.item[row.attribute]} />
                    case 'counter':
                        return <CounterColumn key={row.attribute} value={this.props.index+1} />                        
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
