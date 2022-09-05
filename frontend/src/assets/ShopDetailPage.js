import React, { Component } from 'react';
import { Menu, Row, Col, Button, Space, Input, Slider } from 'antd';
import { withRouter } from './withRouter';



class ShopDetailPage extends Component {

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
                This is shop detial page
            </div>
        );
    }
}
export default withRouter(ShopDetailPage);