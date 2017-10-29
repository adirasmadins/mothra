import React, { Component } from 'react';
import Page from '../../components/page';
import Table from '../../components/page/table';
import {Link} from 'react-router-dom';

class Groups extends Component {
    render() {
        const settings = {
            ref: 'groups',
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
                    attribute:"description",
                    name:"Description",
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
                    attribute:"sigil",
                    name:"Sigil",                   
                    type:"fireimg",
                },                            
                {
                    attribute:"logo",
                    name:"Logo",
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
