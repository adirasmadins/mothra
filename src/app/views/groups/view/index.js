import React, { Component } from 'react';
import Page from '../../../components/Page';
import DetailView from '../../../components/Page/DetailView';
import {Link} from 'react-router-dom';

class View extends Component {
    render() {
        const settings = {
            ref:'groups/'+this.props.match.params.id,
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
                <h1 className="display-3">{"Group " + this.props.match.params.id}</h1>
                <p className="lead text-muted">View {"group " + this.props.match.params.id}</p>     
                <Link to={"/groups/update/" + this.props.match.params.id} className="btn btn-primary mb-4">Update</Link>       
                <DetailView settings={settings} />
            </Page>
        );
    }
}

export default View;
