import React, { Component } from 'react';
import {storage} from '../../../../../config/constants'
class FireImgCol extends Component {
    constructor(){
        super();
        this.state = {
            img:''
        }
    }
    componentDidMount () {
        if (this.props.value!==""&&this.props.value!==undefined) {
            var pathReference = storage.ref(this.props.value).getDownloadURL().then((url) => {
                this.setState({
                    img: url
                });
            })
        }

    }

    render() {
        var img = <img src={this.state.img} alt=""/>
        return <td>{img}</td>
    }
}

export default FireImgCol;
