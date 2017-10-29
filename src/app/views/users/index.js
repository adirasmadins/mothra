import React, { Component } from 'react';
import Page from '../../components/page';
import Table from '../../components/page/table';
import {Link} from 'react-router-dom';

class Users extends Component {

    render() {
        const settings = {
            ref: 'users',
            properties:[
                {
                    attribute:"name",
                    name:"Name",
                    type:"string"
                },        
                {
                    attribute:"nickname",
                    name:"Nickname",
                    type:"string"
                },    
                {
                    attribute:"createdAt",
                    name:"Created at",
                    type:"date"
                },  
                {
                    attribute:"updatedAt",
                    name:"Updated at",
                    type:"date"
                },                                
                {
                    attribute:"avatar",
                    name:"Avatar",
                    type:"fireimg"
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
