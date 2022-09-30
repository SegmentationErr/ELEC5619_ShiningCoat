import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';
import styles from '../css/businessNavBar.module.css'
import { withRouter } from './withRouter';

class BusinessNavBar extends Component {
    state = {
        currSelected: window.location.pathname.split('/')[2] === 'profile' ? 'profile' : 'shops'
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
                <div style={{display: "flex"}}>
                    <div id={this.state.currSelected === 'profile' ? styles['menuItemSelected'] : styles['menuItem']}
                        onClick={() => this.changeSelection('profile')}
                    >
                        <p>Manage Profile</p>
                    </div>
                    <div id={this.state.currSelected === 'shops' ? styles['menuItemSelected'] : styles['menuItem']}
                        onClick={() => this.changeSelection('shops')}
                    >
                        <p>Manage Shops</p>
                    </div>
                </div>
                <Outlet />
            </div>
        );
    }
}

export default withRouter(BusinessNavBar);