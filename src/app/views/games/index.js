import React, { Component } from 'react';
import Page from '../../components/Page';
import Table from '../../components/Page/Table';
import {db} from '../../config/constants'

class Games extends Component {
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
            elements:[
                {
                    attribute:"id",
                    name:"ID"
                },
                {
                    attribute:"name",
                    name:"Название игры"
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
                    location:"games"
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
                <div className="items-list">
                    <Table onPageLoad={this.onLoadHandler} settings={settings}/>
                </div>
            </Page>
        );
    }
}

export default Games;
