import React, { Component } from 'react';
class Header extends Component {

    changeOrder = (attr) => {
        let order = 'DESC'
        if (this.props.order && this.props.order.attr === attr && this.props.order.order === 'DESC') {
            order = 'ASC';
        }
        this.props.setOrder(attr, order);
    }
    
    render() {
        const header = this.props.settings.properties.map((column) =>{
                if (column.order) {
                    let arrow = '';
                    if(this.props.order && this.props.order.attr === column.attribute) {
                        if(this.props.order.order === 'DESC') {
                            return <th key={column.attribute}><a href="javascript:" onClick={()=>{this.changeOrder(column.attribute)}}>{column.name} <i className="fa fa-caret-down" aria-hidden="true"></i></a></th>
                        } else {
                            return <th key={column.attribute}><a href="javascript:" onClick={()=>{this.changeOrder(column.attribute)}}>{column.name} <i className="fa fa-caret-up" aria-hidden="true"></i></a></th>
                        }

                    }
                    return <th key={column.attribute}><a href="javascript:" onClick={()=>{this.changeOrder(column.attribute)}}>{column.name} {arrow}</a></th>
                } else {
                    return <th key={column.attribute}>{column.name}</th>
                }             
            }
        )

        return (
            <thead>
                <tr>
                    {header}
                </tr>
            </thead>
        );
    }
}

export default Header;
