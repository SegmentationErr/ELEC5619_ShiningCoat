import React, { Component } from 'react';
import { Menu, Row, Col, Button, Space, Input, Slider } from 'antd';
import cookie from 'react-cookies';
import axios from 'axios'
import { UserOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import showAlert from './Alert';
import { withRouter } from './withRouter';



const { Search } = Input;


class SearchPhonePage extends Component {

    constructor(props) {
        super(props);

        console.log(this.state.name);
        console.log(this.state.method);
    }

    state = {
        name: this.props.params.name,
        method: this.props.params.method
    }

    render() {

        return (
            <div>

            </div>
        );
    }
}
export default withRouter(SearchPhonePage);