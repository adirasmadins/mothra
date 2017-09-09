import React, { Component } from 'react';
class TextInput extends Component {
    constructor(props) {
        super(props);
        let value = '';
        if(props.settings.default!==undefined)
            value = props.settings.default;
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
        return <input onChange={this.onChangeHandler} value={this.state.value} className="input" name={this.props.settings.attribute} type="text" placeholder={this.props.settings.name} />
    }
}

export default TextInput;
