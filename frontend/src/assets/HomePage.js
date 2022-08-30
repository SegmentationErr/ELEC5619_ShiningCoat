import React, { Component } from 'react';
import { Row, Col, Input, Menu } from 'antd';
import axios from 'axios';
import NavBar from './NavBar';
import showAlert from './Alert';

class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        isModalVisible: false
    }

    render() {
        return (
            <Row>
                <NavBar />
            </Row>);
    }
}

export default HomePage;