import React, { Component } from 'react';
import { Menu, Input, Modal, Row, Select } from 'antd';
import { UserOutlined, SearchOutlined } from '@ant-design/icons';
import cookie from 'react-cookies';
import showAlert from './Alert';

import '../css/navBar.css'
import { withRouter } from './withRouter';

const { Search } = Input;
const { Option } = Select;



class NavBar extends Component {

    state = {
        searchInput: ""
    }

    handleBackToHomePage = (e) => {
        this.props.navigate('/')
    }

    handleSearch = (e) => {
        let searchMethod = e;
        let input = this.state.searchInput;

        if (input === "") {
            showAlert('warning', "Invalid Input", "Please enter some text");
            return;
        }

        if (searchMethod === "") {
            showAlert('warning', "Invalid Input", "Please choose a search method");
            return;
        }

        //nav to search page
        this.props.navigate('/search');
    }

    handleLogin = (e) => {
        this.props.navigate('/signIn');
    }

    setKeyword = (e) => {
        this.setState({ searchInput: e.target.value });
    }

    render() {
        return (
            <div id="navBarDiv">
                <Menu id="navbar" key="navBar" mode="horizontal" className='navbar'>
                    <Menu.Item id="websiteName" key="websiteName" onClick={this.handleBackToHomePage.bind(this)} className='navbar-title'>PetDaily</Menu.Item>
                    <Menu.Item id="search" key="search">
                        <Input id="searchInput" size="large" placeholder="Search"
                            addonAfter={
                                <Select id="searchSelect" defaultValue="" onSelect={this.handleSearch.bind(this)}>
                                    <Option value="">Choose Search Method</Option>
                                    <Option value="service">Search By Service Name</Option>
                                    <Option value="shop">Service By Shop Name</Option>
                                </Select>
                            } onChange={this.setKeyword.bind(this)} />
                    </Menu.Item>
                    <Menu.Item id="login" key="login" onClick={this.handleLogin.bind(this)}>
                        Login/SignUp
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default withRouter(NavBar);