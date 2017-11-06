import React, { Component } from 'react';
import ImageInput from './image-input';
import TextInput from './text-input';
import SubmitBtn from '../submit-btn';
import Validator from '../../../services/validator';
import { connect } from 'react-redux';
import { getItem, clearItem, changeItem, addItem, updateItem } from '../../../actions/items';
import * as Messages from '../../../actions/messages';
import { startPageLoad, endPageLoad } from '../../../actions/page-actions';

class Form extends Component {
    componentWillMount() {
        // Get values from FireBase when 'update' action
        if(this.props.settings.action=='update')
        {
            this.props.startPageLoad();
            this.props
            .getItem({settings:this.props.settings})
            .catch((e) => {
                this.props.addErrorMessage(e.message);
            })  
            .then(() => {
                this.props.endPageLoad();
            })                                      
        }
        
    }

    //Form submit handler
    handleSubmit = (event) => {
        event.preventDefault();
        if(this.validate())
        {
            if(this.props.settings.action=='update') {
                this.props.updateItem({ref:this.props.settings.ref, item:this.props.item, id:this.props.settings.id})
                .then(() => {
                    this.props.addSuccessMessage(this.props.settings.successMsg||"Success");
                })
                .catch((e) => {
                    this.props.addErrorMessage(e.message);
                })
            } else {
                this.props.addItem({ref:this.props.settings.ref, item:this.props.item})
                .then(() => {
                    this.props.addSuccessMessage(this.props.settings.successMsg||"Success");
                })  
                .catch((e) => {
                    this.props.addErrorMessage(e.message);
                })                              
            }
        }
    }

    //Validate input. Required fields.
    validate(){
        var validator = new Validator(this.props.item, this.props.settings);
        if(validator.validate()) {
            return true;
        } else {
            this.props.addErrorMessage(validator.getMessage());
            return false;
        }
    }

    //Input change handler
    handleChange = (data) => {
        this.props.changeItem(data);
    }

    componentWillUnmount () {
       this.props.clearItem(); 
    }

    render() {
        const body = this.props.settings.properties.map((element) =>{
                let value = element.value || '';
                let item = {...element, value:value, ...this.props.item[element.attribute]};
                switch(element.type) {
                    case 'fireimg':
                    case 'img':
                        return <ImageInput onChange={this.handleChange} key={element.attribute} element={item}/>
                        break;
                    case 'string':
                        return <TextInput onChange={this.handleChange} key={element.attribute} element={item}/>
                        break;
                    default:
                        return <TextInput onChange={this.handleChange} key={element.attribute} element={item}/>
                }
            }
        )

        return (
            <div className="form-cnt">
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-5">
                        {body}
                    </div>
                    <SubmitBtn {...this.props}/>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        item: state.item.item,
        saving: state.item.saving
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startPageLoad: () => {dispatch(startPageLoad())},
        endPageLoad: () => {dispatch(endPageLoad())},
        getItem: ({settings}) => {return dispatch(getItem({settings:settings}))},
        updateItem: ({ref, item, id}) => {return dispatch(updateItem({ref:ref, item:item, id:id}))},
        addItem: ({ref, item}) => {return dispatch(addItem({ref:ref, item:item}))},
        changeItem: (data) => {dispatch(changeItem(data))},
        clearItem: () => {dispatch(clearItem())},
        addErrorMessage: (message) => {dispatch(Messages.addErrorMessage(message))},
        addSuccessMessage: (message) => {dispatch(Messages.addSuccessMessage(message))},
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Form);
