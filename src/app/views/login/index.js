import React, { Component } from 'react';
import { login, resetPassword } from '../../services/auth';
import Messages from '../../components/Messages';

class Login extends Component {
	handleSubmit = (e) => {
		e.preventDefault()
		login(this.email.value, this.pw.value)
		.catch((error) => {
			Messages.addErrorMsg('Invalid username/password.');
			console.log(error);
		})
	}
	render() {
		return (
			<div className="login-page">
				<Messages />
				<form onSubmit={this.handleSubmit} className="container h-100">
					<div className="row justify-content-center align-items-center h-100">
						<div className="col-sm-6 col-12">
							<div className="mb-3">
								<div className="form-group">
								    <input type="text" ref={(email) => this.email = email}  placeholder="Email" className="form-control" />
								</div>		
								<div className="form-group">
								    <input type="password" ref={(pw) => this.pw = pw} placeholder="Password" className="form-control" />
								</div>	
							</div>						
							<button className="btn btn-primary btn-block">Login</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default Login;
