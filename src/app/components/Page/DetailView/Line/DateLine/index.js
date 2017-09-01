import React, { Component } from 'react';
import moment from 'moment';
class DateLine extends Component {
    getHumanDate(){
        // let date = new Date(this.props.value * 1000);
        if(this.props.value)
            var date = moment(this.props.value).format("DD.MM.YYYY HH:mm:ss");
        else {
            var date = "";
        }
        return date;
    }
    render() {
        const date = this.getHumanDate();
        return <div>{date}</div>
    }
}

export default DateLine;
