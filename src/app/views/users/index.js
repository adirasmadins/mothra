import React, { Component } from 'react';
import Page from '../../components/page';
import Table from '../../components/page/table';
import {Link} from 'react-router-dom';

class Users extends Component {
    render() {
        const settings = {
            ref: 'grouptest',
            type: 'rest',
            order:{attr:'createdAt',order:'DESC'},
            properties:[
                {
                    attribute:"counter",
                    name:"Counter",
                    type:"counter"
                },            
                {
                    attribute:"name",
                    name:"Name",
                    type:"string",
                    order:true
                },
                {
                    attribute:"table_action",
                    name:"",
                    type:"action",
                    location:"groups"
                }
            ]
        }

        return (
            <Page>
                <h1 className="display-3">Users</h1>
                <p className="lead text-muted">Users list</p>
                <Link to={"/groups/add"} className="btn btn-primary mb-4">Add User</Link>
                <Table settings={settings}/>
            </Page>
        );
    }
}

export default Users;
