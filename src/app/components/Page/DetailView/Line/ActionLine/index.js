import React, { Component } from 'react';
import Messages from '../../../../../components/Messages';
import {storage} from '../../../../../config/constants'
import {Link} from 'react-router-dom'
class ActionLine extends Component {
    removeItem = ()=>{
        const ref = this.props.settings.ref;
        var r = window.confirm("Вы действительно желаете удалить элемент.");
        if (r === true) {
            ref.child(this.props.item.id).remove().then(()=>{
                Messages.addSuccesMsg(`Элемент "${this.props.item.name}" удален.`);
            }).then(()=>{
                if(this.props.item.icon!=undefined)
                    storage.ref(this.props.item.icon).delete().catch(error=>Messages.addErrorMsg(error.message));
            }).catch(error=>Messages.addErrorMsg(error.message));
        }
    }
    render() {
        return <td><a onClick={this.removeItem} className="action-btn"><i className="fa fa-trash-o"></i></a> <Link to={this.props.location + "/view/"+this.props.item.id} className="action-btn"><i className="fa fa-eye"></i></Link></td>
    }
}
export default ActionLine;
