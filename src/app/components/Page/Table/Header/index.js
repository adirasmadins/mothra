import React, { Component } from 'react';
class Header extends Component {
    render() {
        const header = this.props.settings.properties.map((row) =>{
                return <th key={row.attribute}>{row.name}</th>
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
