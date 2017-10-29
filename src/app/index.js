import React, { Component } from 'react';
import Messages from './components/messages';
import Home from './views';
import Users from './views/users';
	import UsersAdd from './views/users/add';
	import UsersView from './views/users/view';
	import UsersUpdate from './views/users/update';
import Login from './views/login';
import Groups from './views/groups';
	import GroupsAdd from './views/groups/add';
	import GroupsView from './views/groups/view';
	import GroupsUpdate from './views/groups/update';
import { isAdmin } from './services/auth';
import { auth } from './config/firebase';

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
	  this.removeListener = auth.onAuthStateChanged((user) => {
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
		return (this.state.authed === false
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
										<span>Users</span>
									</NavLink>
								</li>
								<li>
									<NavLink to="/groups">
										<img src="/images/svg/group.svg" alt=""/>
										<span>Groups</span>
									</NavLink>
								</li>
							</ul>
							<div onClick={this.toggleMenu} className="expand-side-menu-cnt">
							</div>
						</div>

						<Route exact path="/" component={Home} />
						<Route exact path="/users" component={Users}/>
							<Route path="/users/add" component={UsersAdd}/>
							<Route path="/users/view/:id" component={UsersView}/>
							<Route path="/users/update/:id" component={UsersUpdate}/>						
						<Route exact path="/groups" component={Groups}/>
							<Route path="/groups/add" component={GroupsAdd}/>
							<Route path="/groups/view/:id" component={GroupsView}/>
							<Route path="/groups/update/:id" component={GroupsUpdate}/>
						<Route path="/login" component={Login}/>
					</div>
				</Router>)
	}
}
