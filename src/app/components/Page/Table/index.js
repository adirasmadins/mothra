import React, { Component } from 'react';
import Header from './header';
import Row from './row';
import Loader from '../loader';
import PageCounter from './page-counter';
import Button from './button';
import { connect } from 'react-redux';
import { getList, clearItemsList, removeItemFromList, setOrder, clearOrder } from '../../../actions/items';
import { startPageLoad, endPageLoad } from '../../../actions/page-actions';
import * as Messages from '../../../actions/messages';

class Table extends Component {  
    componentWillMount () {
        this.props.startPageLoad();
        if (this.props.settings.order) {
            this.props
            .setOrder(this.props.settings.order.attr, this.props.settings.order.order)
            .then(() => {
                this.props.endPageLoad();
            });
        } else {
            this.props
            .getList()
            .then(() => {
                this.props.endPageLoad();
            });            
        }
    }

    emmiterHandler = () => {
        this.props.getList({order:this.props.order, add:true, last:this.props.last});       
    }

    componentWillUnmount () {
       this.props.clearItemsList(); 
    }

    render() {
        const tablfeInfo = this.props.list.map((item, index) =>{
                return <Row {...this.props} key={index} index = {index} settings={this.props.settings} item={item}/>
            }
        )
        return (
            <div>
{/*                <div className="d-flex">
                    <PageCounter settings={this.props.settings}/>
                </div> */}         
                <table className="table">               
                    <Header {...this.props} settings={this.props.settings}/>
                    <tbody>
                        {tablfeInfo}
                    </tbody>
                </table>
                <div className="d-flex justify-content-center">
                    {this.props.last===false?'':<Button {...this.props} className="btn btn-primary btn-lg mb-5 mt-3"></Button>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.items.list,
        fetching: state.items.fetching,
        last: state.items.last,
        order: state.itemsOrder
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        startPageLoad: () => {dispatch(startPageLoad())},
        endPageLoad: () => {dispatch(endPageLoad())},
        getList: ({order, filter, add, last}) => {return dispatch(getList({last:last, add:add,ref:ownProps.settings.ref, type:ownProps.settings.type, order:order, filter:filter}))},
        removeItemFromList: ({id,index}) => {return dispatch(removeItemFromList({ref:ownProps.settings.ref, type:ownProps.settings.type, id:id, index:index}))},
        clearItemsList: () => {return dispatch(clearItemsList())},
        addErrorMessage: (message) => {dispatch(Messages.addErrorMessage(message))},
        addSuccessMessage: (message) => {dispatch(Messages.addSuccessMessage(message))},
        setOrder: (attr, order) => {return dispatch(setOrder({attr:attr, order:order, ref:ownProps.settings.ref, type:ownProps.settings.type}))},
        clearOrder: () => {dispatch(clearOrder())},
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Table);
