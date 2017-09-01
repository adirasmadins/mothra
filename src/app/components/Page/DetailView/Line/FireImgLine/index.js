import React, { Component } from 'react';
import {storage} from '../../../../../config/constants';
class FireImgLine extends Component {
    constructor(){
        super();
        this.state = {
            img:''
        }
    }

    componentWillMount () {
        if(this.props.value!==undefined)
        {
            var pathReference = storage.ref(this.props.value).getDownloadURL().then((url) => {
                this.setState({
                    img: url
                });
            })
        }
    }

    render() {
        const img = <img src={this.state.img} alt=""/>
        return <div>{img}</div>
    }
}
export default FireImgLine;
