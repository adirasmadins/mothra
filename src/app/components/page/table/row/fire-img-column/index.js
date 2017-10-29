import React, { Component } from 'react';
import {storage} from '../../../../../config/firebase';
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
        var img = <img className="img-thumbnail" src={this.state.img} alt=""/>
        return <td className="align-middle text-center td_image">{img}</td>
    }
}

export default FireImgCol;
