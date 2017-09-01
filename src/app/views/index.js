import React, { Component } from 'react';
import { logout } from '../services/auth'
class Home extends Component {
  render() {
    return (
        <div className="main-cnt">
            <div className="logout-cnt">
                <button onClick={()=>{logout()}} className="button submit-btn">Logout</button>
            </div>
        </div>
    );
  }
}

export default Home;
