import React, { Component } from 'react';
import Page from '../../../components/Page';
import Form from '../../../components/Page/Form';
import {db, storage} from '../../../config/constants';
import Loader from '../../../components/Page/Loader';

class Add extends Component {
    constructor(props) {
        super(props);
        /*
        this.state ={
            item: {
                id:"",
                name:"",
                createdAt:"",
                icon:""
            }
        };*/
    }

    componentWillMount () {
        const id = this.props.match.params.id;
        db.ref('games/'+id)
        .once("value",(snap)=>{
            let item = snap.val();
            item.id = snap.key;
            storage.ref(item.icon).getDownloadURL().then((url) => {
                this.setState({
                    item: {
                        id:item.id,
                        name:item.name,
                        createdAt:item.createdAt,
                        icon:url
                    }
                });
                Loader.enablePage();
            })
        });

    }

    render() {
        const settings = {
            ref:"games/"+this.props.match.params.id,
            action:"update",
            properties:[
                {
                    attribute:"id",
                    name:"ID",
                    value:"defaultId",
                    required:true,
                    type:"string"
                },
                {
                    attribute:"name",
                    name:"Название игры",
                    value:"defaultName",
                    required:true,
                    type:"string"
                },
                {
                    attribute:"icon",
                    name:"Иконка",
                    type:"img",
                    required:true,
                    path:"games"
                }
            ]
        }

        return (
            <Page title="Добавить новую игру" location="games" addBtn="false">
                <Form settings={settings} />
            </Page>
        );
    }
}

export default Add;
