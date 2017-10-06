import React, { Component } from 'react';
import Page from '../components/Page';
import { logout } from '../services/auth';
class Home extends Component {

  	render() {
		return (
			<Page loader={false}>
				<button onClick={()=>{logout()}} className="btn btn-primary mt-4">Logout</button>
			</Page>
		);
	}
}

export default Home;
