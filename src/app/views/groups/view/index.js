import React, { Component } from 'react';
import Page from '../../../components/Page';
import DetailView from '../../../components/Page/DetailView';
import { addGame } from '../../../services/games';
import Messages from '../../../components/Messages';
import {db} from '../../../config/constants'
import moment from 'moment';

class View extends Component {
    render() {
        const settings = {
            ref:db.ref('games/'+this.props.match.params.id),
            properties:[
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
                }
            ]
        }
        return (
            <Page title={"Игра " + this.props.match.params.id} location="games" addBtn="false">
                <DetailView settings={settings} />
            </Page>
        );
    }
}

export default View;
