import React, { Component } from 'react';
import Page from '../../components/Page';
import Table from '../../components/Page/Table';
import {db} from '../../config/firebase';
import {Link} from 'react-router-dom';

class Groups extends Component {
    constructor(){
        super();
        this.state = {
            pageDisabled:true
        }

    }

    onLoadHandler = () => {
        this.setState({
            pageDisabled: false
        });
    }

    render() {
        const settings = {
            ref: db.ref('games'),
            properties:[
                {
                    attribute:"id",
                    name:"ID",
                    type:"string"
                },
                {
                    attribute:"name",
                    name:"Название игры",
                    type:"string"
                },
                {
                    attribute:"createdAt",
                    name:"Время создания",
                    type:"date"
                },
                {
                    attribute:"icon",
                    name:"Иконка",
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
                <Table onPageLoad={this.onLoadHandler} settings={settings}/>
            </Page>
        );
    }
}

export default Groups;
