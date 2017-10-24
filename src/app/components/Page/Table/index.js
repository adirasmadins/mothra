import React, { Component } from 'react';
import Header from './Header';
import Row from './Row';
import Loader from '../Loader';
import FirebaseModel from '../../../services/firebasemodel';
import {db, storage} from '../../../config/firebase';
import PageCounter from './PageCounter';
import { connect } from 'react-redux';

var FirebaseM = new FirebaseModel();

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

    emmiterHandler = () => {
        this.props.dispatch({type:'ADD_ITEM',payload:{a:1,b:2}});       
    }

    componentWillUnmount () {
       db.ref(this.props.settings.ref).off();
    }

    render() {
        console.log(this.props);
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
                    <button onClick={this.emmiterHandler} className="btn btn-primary btn-lg mb-5 mt-3">Next Page</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        test: state
    }
}

export default connect(mapStateToProps)(Table);
