import React, { Component } from 'react';
class TextInput extends Component {
    constructor(props) {
        super(props);
        let value = '';
        if(props.settings.value!==undefined)
            value = props.settings.value;
        this.state = {
            value:value
        };
    }

    onChangeHandler = (event) => {
        const target = event.target;

        // const value = target.type === 'checkbox' ? target.checked : target.value;
        // const name = target.name;
        // var item = this.state.item;
        // item[name] = value;
        const value = target.value;
        const name = target.name;

        this.setState({
            value: value
        });

        this.props.onChange({
            type:'string',
            name:this.props.settings.attribute,
            value:value,
            settings:this.props.settings
        });

    }

    render() {
        return <div className="form-group">
                    <label>{this.props.settings.name}</label>
                    <input onChange={this.onChangeHandler} value={this.state.value} className="form-control" name={this.props.settings.attribute} type="text" placeholder={this.props.settings.name} />
                </div>
            
    }
}

export default TextInput;
