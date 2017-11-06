import React, { Component } from 'react';
class ImageLine extends Component {
    render() {
        const img = <img className="img-thumbnail img-thumbnail-detail" src={this.props.value} alt=""/>
        return <div>{img}</div>
    }
}
export default ImageLine;
