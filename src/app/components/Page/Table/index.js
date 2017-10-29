import React, { Component } from 'react';
import Header from './header';
import Row from './row';
import Loader from '../loader';
import PageCounter from './page-counter';
import { connect } from 'react-redux';
import { getList, clearItemsList } from '../../../actions';
import { startPageLoad, endPageLoad } from '../../../actions/page-actions';

class Table extends Component {  
    componentWillMount () {
        this.props.dispatch(startPageLoad());
        this.props
        .dispatch(getList({ref:this.props.settings.ref}))
        .then(() => {
            this.props.dispatch(endPageLoad());
        });
    }

    emmiterHandler = () => {
        this.props.dispatch(getList({ref:this.props.settings.ref}));       
    }

    componentWillUnmount () {
       this.props.dispatch(clearItemsList()); 
    }

    render() {
        const tablfeInfo = this.props.list.map((item, index) =>{
                return <Row key={index} settings={this.props.settings} item={item}/>
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
        list: state.items.list
    }
}

export default connect(mapStateToProps)(Table);
