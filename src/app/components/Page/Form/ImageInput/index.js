import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
let count = 0;
class ImageInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: ''
        };
        //console.log(count);
        count++;
    }

    onDrop(files) {
        var file = files[0];
        var imageType = /^image\//;
        if (imageType.test(file.type)) {

            this.setState({
                file:file
            });

            this.props.onChange({
                type:'img',
                value:file,
                name:this.props.settings.attribute,
                settings:this.props.settings
            });

            console.log(file.name.substr(-4));
            var preview = document.getElementById("img-cnt_"+this.props.settings.attribute);
            preview.innerHTML = "";
            var img = document.createElement("img");
            img.classList.add("img-thumbnail");
            img.classList.add("img-thumbnail-upload");
            img.file = file;
            preview.appendChild(img); // Assuming that "preview" is the div output where the content will be displayed.

            var reader = new FileReader();
            reader.onload = (
                function(aImg) {
                    return function(e) {
                        aImg.src = e.target.result;
                    };
                }
            )(img);
            reader.readAsDataURL(file);
        }
    }

    removeImg = () => {
        this.props.onChange({
            name:this.props.settings.attribute,
        });

        this.setState({
            file:''
        });
        var preview = document.getElementById("img-cnt_"+this.props.settings.attribute);
        preview.innerHTML = "";
    }

    render() {
        let bremoveBtn = null;
        if(this.state.file){
            bremoveBtn = <div><button className="btn btn-outline-danger btn-sm ml-3" onClick={this.removeImg} ><i className="fa fa-trash-o"></i></button></div>
        }
        return (
            <div className="drop-zone">
                <label>{this.props.name}</label>
                <Dropzone activeClassName="drop-zone__input_active" className="drop-zone__input" onDrop={this.onDrop.bind(this)}>
                    <p>Upload</p>
                </Dropzone>
                <div className={"d-flex align-items-center " + (this.state.file?'mt-3':'')}>
                    <div id={"img-cnt_"+this.props.settings.attribute}>
                    </div>
                    {bremoveBtn}
                </div>
            </div>
        )
    }
}

export default ImageInput;
