import React, { Component } from 'react';
class TextInput extends Component {

    onChangeHandler = (event) => {
        const target = event.target;

        // const value = target.type === 'checkbox' ? target.checked : target.value;
        // const name = target.name;
        // var item = this.state.item;
        // item[name] = value;
        const value = target.value;
        const name = target.name;

        this.props.onChange({
            type:'string',
            name:this.props.element.name,
            attribute:this.props.element.attribute,
            value:value
            //settings:this.props.element.settings
        });

    }

    render() {
        return <div className="form-group">
                    <label>{this.props.element.name}</label>
                    <input onChange={this.onChangeHandler} value={this.props.element.value} className="form-control" name={this.props.element.attribute} type="text" placeholder={this.props.element.name} />
                </div>
    }
}

export default TextInput;
