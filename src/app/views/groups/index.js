import React, { Component } from 'react';
import Page from '../../components/page';
import Table from '../../components/page/table';
import {Link} from 'react-router-dom';

class Groups extends Component {
    render() {
        const settings = {
            ref: 'grouptest',
            type: 'firebase',
            order:{attr:'createdAt',order:'DESC'},
            properties:[
                {
                    attribute:"counter",
                    name:"Counter",
                    type:"counter"
                },            
                {
                    attribute:"id",
                    name:"ID",
                    type:"string"
                },
                {
                    attribute:"name",
                    name:"Name",
                    type:"string",
                    order:true
                },
                {
                    attribute:"description",
                    name:"Description",
                    type:"string"
                },                 
                {
                    attribute:"createdAt",
                    name:"Created at",
                    type:"date",
                    order:true
                }, 
                {
                    attribute:"updatedAt",
                    name:"Updated at",
                    type:"date",
                    order:true
                },                  
                {
                    attribute:"sigil",
                    name:"Sigil",                   
                    type:"img",
                },                            
                {
                    attribute:"logo",
                    name:"Logo",
                    type:"img"
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
