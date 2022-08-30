import React, { Component } from 'react';
import { Menu, Input, Modal, Row } from 'antd';
import { UserOutlined, SearchOutlined } from '@ant-design/icons';
import cookie from 'react-cookies';
import showAlert from './Alert';

import '../css/navBar.css'

const { Search } = Input;

class NavBar extends Component {

    state = {

    }

    handleBackToHomePage = (e) => {
        this.props.history.push('/')
    }

    handleSearch = (e) => {
        let input = e;
        console.log(input);
        if (input == "") {
            showAlert('warning', "Invalid Input", "Please enter some text");
        }
        //TODO: adapt to backend search
    }

    handleLogin = (e) => {
        this.props.history.push('/signIn');
    }

    render() {
        return (
            <div id="navBarDiv">
                <Menu id="navbar" key="navBar" mode="horizontal" className='navbar'>
                    <Menu.Item id="websiteName" key="websiteName" onClick={this.handleBackToHomePage} className='navbar-title'>PetDaily</Menu.Item>
                    <Menu.Item id="search" key="search">
                        <Search id="searchInput" size="large" placeholder="Search" onSearch={this.handleSearch} />
                    </Menu.Item>
                    <Menu.Item id="login" key="login" onClick={this.handleLogin.bind(this)}>
                        Login/SignUp
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default NavBar;