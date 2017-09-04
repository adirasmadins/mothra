import React, { Component } from 'react';
class Header extends Component {
    render() {
        const header = this.props.settings.properties.map((row) =>{
                return <th key={row.attribute}>{row.name}</th>
            }
        )

        return (
            <tr>
                {header}
            </tr>
        );
    }
}

export default Header;
