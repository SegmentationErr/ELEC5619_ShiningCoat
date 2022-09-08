import React, { Component } from 'react';
import '../css/BusinessNavBar.css'

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
            </div>
        );
    }
}
 
export default BusinessNavBar;