import React, { Component } from 'react';
import Page from '../../../components/Page';
import AddForm from '../../../components/Page/AddForm';
import {addGame} from '../../../services/games';
import {db, storage} from '../../../config/constants'

class Add extends Component {
    constructor(props) {
        super(props);
        this.state ={
            item: {
                id:"",
                name:"",
                createdAt:"",
                icon:""
            }
        };
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
            })
        });
    }

    render() {
        const settings = {
            submitHandler:addGame,
            elements:[
                {
                    attribute:"id",
                    name:"ID",
                    required:true,
                    default:this.state.item.id
                },
                {
                    attribute:"name",
                    name:"Название игры",
                    required:true,
                    default:this.state.item.name
                },
                {
                    attribute:"icon",
                    name:"Иконка",
                    type:"img",
                    required:true,
                    default:this.state.item.icon
                }
                ,
                {
                    attribute:"icontest",
                    name:"Иконкаtrst",
                    type:"img"
                }
            ]
        }

        return (
            <Page loader={false} title="Добавить новую игру" location="games" addBtn="false">
                <AddForm settings={settings} />
            </Page>
        );
    }
}

export default Add;
