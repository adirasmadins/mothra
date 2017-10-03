import React, { Component } from 'react';
import Header from './Header';
import Row from './Row';
import Loader from '../Loader';
class Table extends Component {
    constructor(){
        super();
        this.state = {
            items:[]
        }
    }

    componentWillMount () {
        this.props.settings.ref.orderByChild('createdAt')
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
                items: newState
            });

            Loader.enablePage();
        });
    }

    componentWillUnmount () {
        this.props.settings.ref.off();
    }

    render() {
        const tablfeInfo = this.state.items.map((item) =>{
                return <Row key={item.path} settings={this.props.settings} item={item}/>
            }
        )
        return (
            <table className="table">               
                <Header settings={this.props.settings}/>
                <tbody>
                    {tablfeInfo}
                </tbody>
            </table>
        );
    }
}

export default Table;
