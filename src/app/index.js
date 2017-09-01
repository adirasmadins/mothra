import React, { Component } from 'react';
import Messages from './components/Messages';
import Home from './views';
import User from './User';
import Users from './views/users';
import Groups from './views/groups';
import Voices from './views/voices';
import Games from './views/games';
    import GamesAdd from './views/games/add';
    import GamesView from './views/games/view';
    import GamesUpdate from './views/games/update';
import Login from './views/login';
import { isAdmin } from './services/auth'
import { firebaseAuth } from './config/constants'

import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom';

/*function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/' />}
    />
  )
}*/

export default class App extends Component {
    state = {
      authed: false,
      loading: true,
    }

    toggleMenu() {
        var menu = document.querySelector('.side-menu');
        menu.classList.toggle('active');
    }

    componentDidMount () {
      this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
        if (user) {
            isAdmin(user).then((snapshot) => {
                if(snapshot.val()==='A')
                {
                    this.setState({
                      authed: true,
                      loading: false,
                    })
                }
            });
        } else {
          this.setState({
            authed: false,
            loading: false
          })
        }
      })
    }
    componentWillUnmount () {
      this.removeListener()
    }
    render(){
        return  this.state.authed === false
                ?<Login></Login>
                :<Router>
                    <div className="app">
                        <Messages />
                        <div className="side-menu">
                            <header className="header">
                                <Link to="/">
                                    <div className="logo">
                                        <img src="/images/svg/honeycomb.svg" alt=""/>
                                    </div>
                                </Link>
                            </header>
                            <ul>
                                <li>
                                    <NavLink to="/users">
                                        <img src="/images/svg/man.svg" alt=""/>
                                        <span>Пользователи</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/groups">
                                        <img src="/images/svg/group.svg" alt=""/>
                                        <span>Группы</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/games">
                                        <img src="/images/svg/gamepad.svg" alt=""/>
                                        <span>Игры</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/voices">
                                        <img src="/images/svg/microphone.svg" alt=""/>
                                        <span>Голосовая связь</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/complain">
                                        <img src="/images/svg/exclamation-mark.svg" alt=""/>
                                        <span>Жалобы</span>
                                    </NavLink>
                                </li>
                            </ul>
                            <div onClick={this.toggleMenu} className="expand-side-menu-cnt">
                            </div>
                        </div>

                        <Route exact path="/" component={Home} />
                        <Route exact path="/users" component={Users}/>
                        <Route path="/user/:userId" component={User}/>
                        <Route path="/groups" component={Groups}/>
                        <Route path="/voices" component={Voices}/>
                        <Route exact path="/games" component={Games}/>
                            <Route path="/games/add" component={GamesAdd}/>
                            <Route path="/games/view/:id" component={GamesView}/>
                            <Route path="/games/update/:id" component={GamesUpdate}/>
                        <Route path="/login" component={Login}/>
                    </div>
                </Router>
    }
}
