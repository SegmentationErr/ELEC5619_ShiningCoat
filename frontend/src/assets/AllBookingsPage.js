import React, { Component } from 'react';
import { Menu, Row, Col, Button, Space, Input, Slider } from 'antd';
import { withRouter } from './withRouter';



class AllBookingsPage extends Component {

    constructor(props) {
        super(props);

        console.log(this.state.userId);
    }

    state = {
        userId: this.props.params.userId
    }

    render() {

        return (
            <div>
                This is all bookings page
            </div>
        );
    }
}
export default withRouter(AllBookingsPage);