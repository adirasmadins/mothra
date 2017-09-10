import React, { Component } from 'react';
import Page from '../../components/Page';
import Table from '../../components/Page/Table';
import {db} from '../../config/constants'

class Users extends Component {
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
            ref: db.ref('users'),
            properties:[
                {
                    attribute:"access",
                    name:"Доступ",
                    type:"string"
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
            <Page title="Игры" location="games">
                <div className="filter-cnt">
                    <p>Фильтр</p>
                    <div className="filter-inner">
                        <form action="">
                            <input type="text" placeholder="Название игры"/>
                            <button className="button submit-btn">Найти</button>
                            <button className="button reset-btn">Сброс</button>
                        </form>
                    </div>
                </div>
                <div className="pagination">
                    <div className="pagination__pages-list">
                        <div className="pagination__pages-link">1</div>
                        <div className="pagination__pages-link">2</div>
                        <div className="pagination__pages-link">3</div>
                        <div className="pagination__pages-link">4</div>
                        <div className="pagination__pages-link">55</div>
                    </div>
                </div>
                <div className="items-list">
                    <Table onPageLoad={this.onLoadHandler} settings={settings}/>
                </div>
            </Page>
        );
    }
}

export default Users;
