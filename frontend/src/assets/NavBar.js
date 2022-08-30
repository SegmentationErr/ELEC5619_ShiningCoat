import React, { Component } from 'react';
import { Menu, Input, Modal, Row } from 'antd';
import { UserOutlined, SearchOutlined } from '@ant-design/icons';
import cookie from 'react-cookies';
import showAlert from './Alert'

import '../css/navBar.css'

const { Search } = Input;

class NavBar extends Component {
    state = {
        isModalVisible: false
    }

    handleBackToHomePage = (e) => {
        this.props.history.push('/')
    }

    render() {
        return (
            <div id="navBarDiv">
                <Menu id="navbar" key="navBar" mode="horizontal" className='navbar'>
                    <Menu.Item id="websiteName" key="websiteName" onClick={this.handleBackToHomePage} className='navbar-title'>PetDaily</Menu.Item>
                    <Menu.Item id="search" key="search">
                        <Input id="searchInput" size="large" placeholder="Search" prefix={<SearchOutlined />} />
                    </Menu.Item>
                    <Menu.Item id="login" key="login">
                        Login/SignUp
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default NavBar;