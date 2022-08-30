import React, { Component } from 'react';
import { Row, Col } from 'antd';
import axios from 'axios'

class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    state = {
    }

    render() {
        return (<h1 style={{ marginTop: 20 }}>This is homepage</h1>);
    }
}

export default HomePage;