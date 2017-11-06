import React, { Component } from 'react';
class ImgCol extends Component {
    render() {
        var img = <img className="img-thumbnail" src={this.props.value} alt=""/>
        return <td className="align-middle text-center td_image">{img}</td>
    }
}

export default ImgCol;
