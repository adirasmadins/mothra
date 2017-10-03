import React, { Component } from 'react';
import {storage} from '../../../../../config/firebase';
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
        const img = <img className="img-thumbnail img-thumbnail-detail" src={this.state.img} alt=""/>
        return <div>{img}</div>
    }
}
export default FireImgLine;
