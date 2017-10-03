import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class ImageInput extends Component {
    onDrop(files) {
        var file = files[0];
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

            console.log(file);
            //this.addImage(file);
        }
    }
    
    // Add file to dom. DEPRICATED TEMPORARY
    /*
    addImage = (file) => {
        var preview = document.getElementById("img-cnt_"+this.props.element.attribute);
        preview.innerHTML = "";
        var img = document.createElement("img");
        img.classList.add("img-thumbnail");
        img.classList.add("img-thumbnail-upload");
        img.file = file;
        preview.appendChild(img); 

        var reader = new FileReader();
        reader.onload = (
            function(aImg) {
                return function(e) {
                    aImg.src = e.target.result;
                };
            }
        )(img);
        reader.readAsDataURL(file);        
    }*/

    removeImg = () => {
        this.props.element.value = '';
        this.props.element.file = undefined;
        this.props.onChange(
            this.props.element
        );
    }

    render() {
        // Show button if value not empty.
        let bremoveBtn = null;
        if(this.props.element.value){
            bremoveBtn = <div><button className="btn btn-outline-danger btn-sm ml-3" onClick={this.removeImg} ><i className="fa fa-trash-o"></i></button></div>
        }

        // Show preview image for default value. If this.props.element.file not undefined mean there is uploaded image.
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
