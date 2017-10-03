import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class ImageInput extends Component {

    // When image is uploaded
    onDrop(files) {
        var file = files[0];
        // Only image types
        var imageType = /^image\//;
        if (imageType.test(file.type)) {            
            this.props.onChange({
                type:'img',
                value:file.preview,
                file:file,
                name:this.props.element.name,
                attribute:this.props.element.attribute,
                settings:this.props.element.settings
            });
        }
    }
    
    // Remove button handler
    removeImg = () => {
        this.props.element.value = '';
        this.props.element.file = undefined;
        this.props.onChange(
            this.props.element
        );
    }

    render() {

        // Show remove button if value not empty.
        let bremoveBtn = null;
        if(this.props.element.value){
            bremoveBtn = <div><button className="btn btn-outline-danger btn-sm ml-3" onClick={this.removeImg} ><i className="fa fa-trash-o"></i></button></div>
        }

        // Show preview image.
        let img = null;
        if(this.props.element.value)
        {
            img = <img alt="" src={this.props.element.value} className="img-thumbnail img-thumbnail-upload"/>
        }

        return (
            <div className="drop-zone">
                <label>{this.props.element.name}</label>
                <Dropzone activeClassName="drop-zone__input_active" className="drop-zone__input" onDrop={this.onDrop.bind(this)}>
                    <p>Upload</p>
                </Dropzone>
                <div className={"d-flex align-items-center " + (this.props.element.value?'mt-3':'')}>
                    <div id={"img-cnt_"+this.props.element.attribute}>
                        {img}
                    </div>
                    {bremoveBtn}
                </div>
            </div>
        )
    }
}

export default ImageInput;
