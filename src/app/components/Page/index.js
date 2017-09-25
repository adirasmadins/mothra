import React, { Component } from 'react';
import Loader from './Loader';

/**
 * Main page component
 * @prop location {string} Curent root page location
 * @prop title {string} Page title
 * @prop addBtn {boolean} Show or not button for adding new item
 */

class Page extends Component {
    render() {
        return (
        <div className="page">
        	<div className="container-fluid py-3 px-5">
	            <Loader loader={this.props.loader} />
	            {this.props.children}
            </div>
        </div>);
    }
}

export default Page;

				