import React, { Component } from 'react';
import moment from 'moment';
class DateCol extends Component {
    getHumanDate(){
        // let date = new Date(this.props.value * 1000);
        if(this.props.value!==undefined)
        	return moment(this.props.value).format("DD.MM.YYYY HH:mm:ss");
        else '';
    }
    render() {
        const date = this.getHumanDate();
        return <td className="align-middle">{date}</td>
    }
}

export default DateCol;
