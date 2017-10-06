import React, { Component } from 'react';
import Page from '../../components/Page';
import Table from '../../components/Page/Table';
import {Link} from 'react-router-dom';

class Users extends Component {

    render() {
        const settings = {
            ref: 'users',
            properties:[
                {
                    attribute:"access",
                    name:"Access",
                    type:"string"
                },                
                {
                    attribute:"table_action",
                    name:"",
                    type:"action",
                    location:"users"
                }
            ]
        }

        return (
            <Page>
                <h1 className="display-3">Users</h1>
                <p className="lead text-muted">Users list</p>
                <Link to={"/users/add"} className="btn btn-primary mb-4">Add user</Link>
                <Table settings={settings}/>
            </Page>
        );
    }
}

export default Users;
