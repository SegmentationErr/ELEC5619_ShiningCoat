import React, { Component } from 'react';
import { Menu, Row, Col, Button, Space, Input, Slider } from 'antd';
import { withRouter } from './withRouter';



class ServiceDetailPage extends Component {

    constructor(props) {
        super(props);

        console.log(this.state.id);
    }

    state = {
        id: this.props.params.id
    }

    render() {

        return (
            <div>
                This is service detial page
            </div>
        );
    }
}
export default withRouter(ServiceDetailPage);