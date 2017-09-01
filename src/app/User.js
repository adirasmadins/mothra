import React, { Component } from 'react';

class User extends Component {  
  render() {
    return (
        <div className="main-cnt">
            User {this.props.match.params.userId}
        </div>
    );
  }
}

export default User;
