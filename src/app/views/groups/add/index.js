import React, { Component } from 'react';
import Page from '../../../components/Page';
import Form from '../../../components/Page/Form';

class Add extends Component {
    render() {
        const settings = {
            ref:"groups",
            action:"create",
            successMsg:"New group is saved",
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
                    required:true,
                    type:"string"
                },
                {
                    attribute:"description",
                    name:"Description",
                    type:"string"
                },             
                {
                    attribute:"sigil",
                    name:"Sigil",                   
                    type:"img",
                    path:"games"
                },                                     
                {
                    attribute:"logo",
                    name:"Logo",                   
                    required:true,
                    type:"img",
                    path:"games"
                }             
            ]
        }

        return (
            <Page loader={false}>
                <h1 className="display-3">New group</h1>
                <p className="lead text-muted">Add new group</p>            
                <Form settings={settings} />
            </Page>
        );
    }
}

export default Add;
