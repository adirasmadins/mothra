import React, { Component } from 'react';
import Title from './Title';
import Loader from './Loader';
class Page extends Component {
    render() {
        return <div className="main-cnt">
            <Loader loader={this.props.loader} />
            <Title addBtn={this.props.addBtn} title={this.props.title} location={this.props.location}/>
            {this.props.children}
        </div>;
    }
}

export default Page;
