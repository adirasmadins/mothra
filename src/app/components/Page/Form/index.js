import React, { Component } from 'react';
import ImageInput from './ImageInput';
import TextInput from './TextInput';
import SubmitBtn from '../SubmitBtn';
import Messages from '../../Messages';
import Loader from '../Loader';
import {addToFB} from '../../../services/fireform';
import {db, storage} from '../../../config/firebase';

class Form extends Component {

    constructor(props) {
        super(props);
        let state = {
            item:{}
        };

        //Init state
        this.props.settings.properties.map((element) =>{
            state["item"][element.attribute] = {
                attribute:element.attribute,
                name:element.name,
                type:element.type,
                value:element.value||'',
                settings:element
            }
        })

        state.disabled=false;
        this.state = state;
    }

    componentWillMount() {
        // Get values from FireBase when 'update' action
        if(this.props.settings.action=='update')
        {
            db.ref(this.props.settings.ref).once("value",(snap)=>{

                let item = snap.val();
                item.key = snap.key; 

                this.props.settings.properties.map((element) => {

                    // If propery exist in FireBase
                    if (item[element.attribute] !== undefined) {

                        let stateItem = this.state.item;
                        stateItem[element.attribute]= {
                            attribute:element.attribute,
                            name:element.name,
                            type:element.type,
                            value:item[element.attribute],
                            settings:element
                        }
                        this.setState({'item':stateItem});

                        // Image type property only
                        if(element.type==="img"){ 
                            storage.ref(item.icon).getDownloadURL().then((url) => {
                                let stateItem = this.state.item;
                                stateItem[element.attribute].value = url;
                                this.setState({'item':stateItem});
                            })
                        }

                    }
                })

                Loader.enablePage();
            });
        }
        
    }

    componentDidMount() {
        //Loader.enablePage();
    }

    //Form submit handler
    handleSubmit = (event) => {
        event.preventDefault();
        if(this.validate())
        {
            this.setState({disabled: true});
            //Add game to FireBase DateBase
            addToFB(this.state.item, this.props.settings.ref,this.props.settings.action).then(()=>{
                this.setState({disabled: false});
            })
        }
    }

    //Validate input. Required fields.
    validate(){
        let valid = true;
        let message = "Необходимо заполнить поля ";
        let requiredFields = [];

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
        let item = this.state.item;
        item[data.attribute] = data;
        this.setState({
            item: item
        });
    }

    render() {
        const body = this.props.settings.properties.map((element) =>{
                switch(element.type) {
                    case 'img':
                        return <ImageInput onChange={this.handleChange} key={element.attribute} element={this.state.item[element.attribute]}/>
                        break;
                    case 'string':
                        return <TextInput onChange={this.handleChange} key={element.attribute} element={this.state.item[element.attribute]}/>
                    default:
                        return <TextInput onChange={this.handleChange} key={element.attribute} element={this.state.item[element.attribute]}/>
                }
            }
        )

        return (
            <div className="form-cnt">
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-5">
                        {body}
                    </div>
                    <SubmitBtn disabled={this.state.disabled}/>
                </form>
            </div>
        );
    }
}

export default Form;
