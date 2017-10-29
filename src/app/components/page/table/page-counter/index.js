import React, { Component } from 'react';
import FirebaseDB from '../../../../services/firebasedb';
class PageCounter extends Component {
    constructor(){
        super();
        this.state = {
            count:0
        }
    }  
    componentWillMount () {
        //Recount items if counter deleted
        FirebaseDB.count(this.props.settings.ref);
        //Listen counter
        FirebaseDB.counter(this.props.settings.ref).on("value",(snap)=>{
            this.setState({count:snap.val()});
        });       
    }     
    componentWillUnmount () {
       FirebaseDB.counter(this.props.settings.ref).off();
    }    
    render() {
        return (
            <p className="p-1 lead text-muted">
                Elements: {this.state.count}
            </p>
        );
    }
}

export default PageCounter;
