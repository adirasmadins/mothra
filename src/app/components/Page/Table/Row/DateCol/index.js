import React, { Component } from 'react';
import moment from 'moment';
class DateCol extends Component {
    getHumanDate(){
        // let date = new Date(this.props.value * 1000);
        let date = moment(this.props.value).format("DD.MM.YYYY HH:mm:ss");
        return date;
    }
    render() {
        const date = this.getHumanDate();
        return <td>{date}</td>
    }
}

export default DateCol;
