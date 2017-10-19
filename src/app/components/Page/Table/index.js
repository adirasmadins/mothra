import React, { Component } from 'react';
import Header from './Header';
import Row from './Row';
import Loader from '../Loader';
import {db, storage} from '../../../config/firebase';
import PageCounter from './PageCounter';

class Table extends Component {
    constructor(){
        super();
        this.state = {
            items:[],
            count:0
        }
    }

    componentWillMount () {
        //Get List from FireBase
        db.ref(this.props.settings.ref).orderByChild('createdAt').limitToLast(10)
        .on("value",(snap)=>{

            let newState = [];
            snap.forEach(function(child,i) {
                let item = child.val();
                item.path = child.key;
                let newItem = {};
                this.props.settings.properties.map((element)=>{
                    if(item[element.attribute]!=undefined)
                        newItem[element.attribute] = item[element.attribute]

                })
                newItem['path'] = item.path;
                newState.push(newItem);

            }.bind(this));

            this.setState({
                items: newState.reverse()
            });

            Loader.enablePage();
        });

    }

    componentWillUnmount () {
       db.ref(this.props.settings.ref).off();
    }

    render() {
        const tablfeInfo = this.state.items.map((item) =>{
                return <Row key={item.path} settings={this.props.settings} item={item}/>
            }
        )
        return (
            <div>
                <div className="d-flex">
                    <PageCounter settings={this.props.settings}/>
                </div>          
                <table className="table">               
                    <Header settings={this.props.settings}/>
                    <tbody>
                        {tablfeInfo}
                    </tbody>
                </table>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-primary btn-lg mb-5 mt-3">Next Page</button>
                </div>
            </div>
        );
    }
}

export default Table;
