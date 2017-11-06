import React, { Component } from 'react';
class Loader extends Component {
    render() {
        var loader = "";
        if(this.props.loader!==false) {
            if(this.props.page.loading === true) {
                loader="active";
            }
        }
        return <div id="pageLoader" className={"page-loader-cnt "+loader}><div className="page-loader"><div className="loader"></div></div></div>
    }
}

export default Loader;
