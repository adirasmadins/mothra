import React, { Component } from 'react';
import Page from '../../../components/page';
import Form from '../../../components/page/form';

class Add extends Component {
    render() {
        const settings = {
            ref:"users",
            action:"create",
            successMsg:"New user is added",
            properties:[
                {
                    attribute:"id",
                    name:"ID",
                    required:true,
                    type:"string"
                },
                {
                    attribute:"name",
                    name:"Name",
                    type:"string",
                    required:true
                },        
                {
                    attribute:"nickname",
                    name:"Nickname",
                    required:true,
                    type:"string"
                },    
                {
                    attribute:"avatar",
                    name:"Avatar",
                    required:true,
                    type:"fireimg",
                    path:"games"
                }                                                      
            ]
        }

        return (
            <Page loader={false}>
                <h1 className="display-3">New user</h1>
                <p className="lead text-muted">Add new user</p>            
                <Form settings={settings} />
            </Page>
        );
    }
}

export default Add;
