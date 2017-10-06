import React, { Component } from 'react';
import Page from '../../components/Page';
import Table from '../../components/Page/Table';
import {Link} from 'react-router-dom';

class Groups extends Component {
    render() {
        const settings = {
            ref: 'games',
            properties:[
                {
                    attribute:"id",
                    name:"ID",
                    type:"string"
                },
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
                    attribute:"avatar",
                    name:"Avatar",
                    type:"fireimg"
                },                
                {
                    attribute:"icon",
                    name:"Icon",
                    type:"fireimg"
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
                <h1 className="display-3">Groups</h1>
                <p className="lead text-muted">Groups list</p>
                <Link to={"/groups/add"} className="btn btn-primary mb-4">Add group</Link>
                <Table settings={settings}/>
            </Page>
        );
    }
}

export default Groups;
