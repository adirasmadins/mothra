import React, { Component } from 'react';
import Loader from './Loader';
import { connect } from 'react-redux';

/**
 * Main page component
 */

class Page extends Component {
	render() {     
		return (
		<div className="page">
			<div className="container-fluid py-3 px-5">
				<Loader loader={this.props.loader} {...this.props}/>
				{this.props.children}
			</div>
		</div>);
	}
}

function mapStateToProps (state) {
	return {
		test: state
	}
}

export default connect(mapStateToProps)(Page);

				