import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class ActionCol extends Component {
    removeItem = () => {
        this.props.removeItemFromList({id:this.props.item.key, index:this.props.index})
            .catch((e) => {
                this.props.addErrorMessage(e.message);
            }) 
    }
    render() {
        return <td className="align-middle">
                    <Link to={this.props.location + "/view/"+this.props.item.key} className="btn btn-outline-primary btn-sm"><i className="fa fa-eye"></i></Link>
                    &nbsp;<Link to={this.props.location + "/update/"+this.props.item.key} className="btn btn-outline-primary btn-sm"><i className="fa fa-pencil"></i></Link>
                    &nbsp;<button onClick={this.removeItem} className="btn btn-outline-danger btn-sm"><i className="fa fa-trash-o"></i></button>
                </td>
    }
}
export default ActionCol;
