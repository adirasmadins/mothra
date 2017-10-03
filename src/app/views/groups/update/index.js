import React, { Component } from 'react';
import Page from '../../../components/Page';
import Form from '../../../components/Page/Form';

class Add extends Component {
    componentWillMount () {
        // const id = this.props.match.params.id;
        // db.ref('games/'+id)
        // .once("value",(snap)=>{
        //     let item = snap.val();
        //     item.id = snap.key;
        //     storage.ref(item.icon).getDownloadURL().then((url) => {
        //         this.setState({
        //             item: {
        //                 id:item.id,
        //                 name:item.name,
        //                 createdAt:item.createdAt,
        //                 icon:url
        //             }
        //         });
        //         Loader.enablePage();
        //     })
        // });

    }

    render() {
        const settings = {
            ref:"games/"+this.props.match.params.id,
            action:"update",
            properties:[
                {
                    attribute:"id",
                    name:"ID",
                    required:true,
                    type:"string"
                },
                {
                    attribute:"name",
                    name:"Название игры",
                    required:true,
                    type:"string"
                },
                {
                    attribute:"icon",
                    name:"Иконка",
                    required:true,
                    type:"img",                    
                    path:"games"
                }
            ]
        }

        return (
            <Page>
                <h1 className="display-3">Update group</h1>
                <p className="lead text-muted">Update group "{this.props.match.params.id}"</p>              
                <Form settings={settings} />
            </Page>
        );
    }
}

export default Add;
