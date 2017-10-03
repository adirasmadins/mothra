import React, { Component } from 'react';
import Messages from '../../../../../components/Messages';
import {storage} from '../../../../../config/firebase';
import {Link} from 'react-router-dom';
class ActionCol extends Component {
    removeItem = ()=>{
        const ref = this.props.settings.ref;
        //var r = window.confirm("Вы действительно желаете удалить элемент.");
        var r = true;
        console.log(this.props.item);
        if (r === true) {
            ref.child(this.props.item.path).remove().then(()=>{
                Messages.addSuccesMsg(`Элемент "${this.props.item.name}" удален.`);
            }).then(()=>{
                this.props.settings.properties.map((element)=>{
                    if(element.type==="fireimg")
                    {
                        if(this.props.item[element.attribute]!==""&&this.props.item[element.attribute]!==undefined)
                            storage.ref(this.props.item[element.attribute]).delete().catch(error=>Messages.addErrorMsg(error.message));
                    }
                })

            }).catch(error=>Messages.addErrorMsg(error.message));
        }
    }
    render() {
        return <td className="align-middle">
                    <Link to={this.props.location + "/view/"+this.props.item.path} className="btn btn-outline-primary btn-sm"><i className="fa fa-eye"></i></Link>
                    &nbsp;<Link to={this.props.location + "/update/"+this.props.item.path} className="btn btn-outline-primary btn-sm"><i className="fa fa-pencil"></i></Link>
                    &nbsp;<button onClick={this.removeItem} className="btn btn-outline-danger btn-sm"><i className="fa fa-trash-o"></i></button>
                </td>
    }
}
export default ActionCol;
