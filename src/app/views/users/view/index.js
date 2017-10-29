import React, { Component } from 'react';
import Page from '../../../components/page';
import DetailView from '../../../components/page/detail-view';
import {Link} from 'react-router-dom';

class View extends Component {
    render() {
        const settings = {
            ref:'users/'+this.props.match.params.id,
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
                    attribute:"avatar",
                    name:"Avatar",
                    type:"fireimg"
                }
            ]
        }

        return (
            <Page>
                <h1 className="display-3">{"User " + this.props.match.params.id}</h1>
                <p className="lead text-muted">View {"user " + this.props.match.params.id}</p>     
                <Link to={"/users/update/" + this.props.match.params.id} className="btn btn-primary mb-4">Update</Link>       
                <DetailView settings={settings} />
            </Page>
        );
    }
}

export default View;
