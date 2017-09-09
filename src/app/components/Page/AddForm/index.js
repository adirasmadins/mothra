import React, { Component } from 'react';
import ImageInput from './ImageInput';
import TextInput from './TextInput';
import SubmitBtn from '../SubmitBtn';
import Messages from '../../Messages';
import Loader from '../Loader';
import {addToFB} from '../../../services/fireform';
class AddForm extends Component {

    constructor(props) {
        super(props);
        var state = {
            item:{}
        };

        this.props.settings.properties.map((element) =>{
            if(element.default===undefined) {
                state["item"][element.attribute] = "";                
            }
            else {
                state["item"][element.attribute] = {
                    name:element.name,
                    type:element.type,
                    value:element.default,
                    settings:element
                }
            }
        })
        state.disabled=false;
        this.state = state;
        console.log(this.props.settings);
    }

    componentDidMount() {
        if(this.props.ref!==undefined)
            Loader.disablePage();
    }

    //Form submit handler
    handleSubmit = (event) => {
        event.preventDefault();
        if(this.validate())
        {
            this.setState({disabled: true});
            //Add game to FireBase DateBase
            addToFB(this.state.item, this.props.settings.path).then(()=>{
                this.setState({disabled: false});
            })
        }
    }

    //Validate input. Required fields.
    validate(){
        var valid = true;
        var message = "Необходимо заполнить поля ";
        var requiredFields = [];

        this.props.settings.properties.map((element) =>{
            if(element.required)
            {
                if(this.state["item"][element.attribute]['value']===undefined||this.state["item"][element.attribute]['value']==='')
                {
                    valid = false;
                    requiredFields.push('"'+element.name+'"');
                }
            }
        })
        if(!valid)
            Messages.addErrorMsg(message + requiredFields.join(", "));
        return valid;
    }

    //Input change handler
    handleChange = (data) => {
        var item = this.state.item;
        item[data.name] = data;
        this.setState({
            item: item
        });
    }

    render() {
        const body = this.props.settings.properties.map((element) =>{
                switch(element.type) {
                    case 'img':
                        return <ImageInput onChange={this.handleChange}  onFileRemove={this.onFileRemove} key={element.attribute} default={element.default}  name={element.name} settings={element}/>
                        break;
                    case 'string':
                        return <TextInput onChange={this.handleChange} key={element.attribute} settings={element}/>
                    default:
                        return <TextInput onChange={this.handleChange} key={element.attribute} settings={element}/>
                }
            }
        )

        return (
            <div className="form-cnt">
                <form action="" onSubmit={this.handleSubmit}>
                    {body}
                    <SubmitBtn disabled={this.state.disabled}/>
                </form>
            </div>
        );
    }
}

export default AddForm;
