import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';
import '../css/BusinessNavBar.css'
import { withRouter } from './withRouter';

class BusinessNavBar extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        currSelected: 'profile'
    }

    changeSelection = (selection) => {
        this.setState({
            currSelected: selection
        })
        this.props.navigate('/business/' + selection);
    }

    render() {
        return (
            <div>
                <div id={this.state.currSelected === 'profile' ? 'menuItemSelected' : 'menuItem'}
                    onClick={() => this.changeSelection('profile')}
                >
                    <p>Manage Profile</p>
                </div>
                <div id={this.state.currSelected === 'shops' ? 'menuItemSelected' : 'menuItem'}
                    onClick={() => this.changeSelection('shops')}
                >
                    <p>Manage Shops</p>
                </div>
                <Outlet />
            </div>
        );
    }
}

export default withRouter(BusinessNavBar);