import React, { Component } from 'react';
import Line from './line';
import { connect } from 'react-redux';
import { getItem, clearItem, changeItem } from '../../../actions/items';
import * as Messages from '../../../actions/messages';
import { startPageLoad, endPageLoad } from '../../../actions/page-actions';

class DetailView extends Component {

    componentWillMount () {
        this.props.startPageLoad();
        this.props
        .getItem({settings:this.props.settings})
        .catch((e) => {
            this.props.addErrorMessage(e.message);
        })  
        .then(() => {
            this.props.endPageLoad();
        }) 
    }

    componentWillUnmount () {
       this.props.clearItem(); 
    }

    render() {
        const body = this.props.settings.properties.map((line) =>{
                let value = this.props.item[line.attribute]?this.props.item[line.attribute].value:'';
                return <Line key={line.attribute} settings={line} value={value} />
            }
        )

        return (
            <table className="table">               
                <tbody>
                    {body}
                </tbody>
            </table>            
        );
    }
}

const mapStateToProps = (state) => {
    return {
        item: state.item.item
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startPageLoad: () => {dispatch(startPageLoad())},
        endPageLoad: () => {dispatch(endPageLoad())},
        getItem: ({settings}) => {return dispatch(getItem({settings:settings}))},
        clearItem: () => {dispatch(clearItem())},
        addErrorMessage: (message) => {dispatch(Messages.addErrorMessage(message))},
        addSuccessMessage: (message) => {dispatch(Messages.addSuccessMessage(message))},
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(DetailView);