import React, { Component } from 'react';
import Loader from './Loader';

/**
 * Main page component
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

				