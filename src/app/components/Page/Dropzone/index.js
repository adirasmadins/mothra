import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
let count = 0;
class Title extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: ''
        };
        console.log(count);
        count++;
    }

    onDrop(files) {
        var file = files[0];
        var imageType = /^image\//;

        if (imageType.test(file.type)) {

            this.setState({
                file:file
            });

            this.props.onDrop({file:file,attribute:this.props.attribute});
            console.log(file.name.substr(-4));
            var preview = document.getElementById("img-cnt");
            preview.innerHTML = "";
            var img = document.createElement("img");
            img.classList.add("obj");
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

    render() {
        return (
            <div className="drop-zone">
                <Dropzone onDrop={this.onDrop.bind(this)}>
                    <p>Иконка</p>
                </Dropzone>
                <div className="img-cnt" id="img-cnt"></div>
            </div>
        )
    }
}

export default Title;
