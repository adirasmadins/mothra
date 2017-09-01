import React, { Component } from 'react';
import { login, resetPassword } from '../../services/auth'

function setErrorMsg(error) {
  return {
    loginMessage: error
  }

}

class Login extends Component {
    handleSubmit = (e) => {
      e.preventDefault()
      login(this.email.value, this.pw.value)
        .catch((error) => {
            this.setState(setErrorMsg('Invalid username/password.'))
            console.log(error);
          })
    }
    resetPassword = () => {
      resetPassword(this.email.value)
        .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.email.value}.`)))
        .catch((error) => this.setState(setErrorMsg(`Email address not found.`)))
    }
  render() {
    return (
        <div className="auth-cnt-main">
            <div className="auth-cnt">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" ref={(email) => this.email = email}  placeholder="Email"/>
                    <input type="password" ref={(pw) => this.pw = pw} placeholder="Password"/>
                    <button className="button submit-btn">Войти</button>
                </form>
            </div>
        </div>
    );
  }
}

export default Login;
