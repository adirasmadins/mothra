import React, { Component } from 'react';
import Page from '../../../components/page';
import Form from '../../../components/page/form';

class Add extends Component {
    render() {
        const settings = {
            ref:"users/"+this.props.match.params.id,
            action:"update",
            successMsg:"User is updated",
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
                    type:"img",
                    path:"games"
                }                                                      
            ]
        }

        return (
            <Page>
                <h1 className="display-3">Update user</h1>
                <p className="lead text-muted">Update user "{this.props.match.params.id}"</p>              
                <Form settings={settings} />
            </Page>
        );
    }
}

export default Add;
