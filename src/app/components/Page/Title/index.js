import React, { Component } from 'react';
import {Link} from 'react-router-dom'
class Title extends Component {
    render() {
        return (
            <div className="title-cnt">
                <h1><span>{this.props.title}
                    {this.props.addBtn==='false'?"":<Link to={"/"+this.props.location + "/add"} className="add-button">+</Link>}
                </span></h1>
            </div>
        );
    }
}

export default Title;
