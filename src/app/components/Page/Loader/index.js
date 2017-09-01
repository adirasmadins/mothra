import React, { Component } from 'react';
class Loader extends Component {
    static disablePage(){
        var pageLoader = document.querySelector('#pageLoader');
        pageLoader.className += " active";
    }

    static enablePage(){
        var pageLoader = document.querySelector('#pageLoader');
        pageLoader.classList.remove("active");
    }

    render() {
        var loader = "";
        if(this.props.loader!==false)
            loader="active";
        return <div id="pageLoader" className={"page-loader-cnt "+loader}><div className="page-loader"><div className="loader"></div></div></div>
    }
}

export default Loader;
