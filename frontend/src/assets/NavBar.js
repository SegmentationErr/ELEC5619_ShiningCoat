import React, { Component } from 'react';
import { Menu, Input, Button, Select } from 'antd';
import { UserOutlined, BookOutlined } from '@ant-design/icons';

import cookie from 'react-cookies';
import showAlert from './Alert';

import navBarStyle from '../css/navBar.module.css';

import { withRouter } from './withRouter';


const { Search } = Input;
const { Option } = Select;

class NavBar extends Component {

    constructor(props) {
        super(props);
        if (cookie.load('id') !== undefined) {
            if (cookie.load('role') === "business") {
                this.props.navigate('/business/profile')
            }
        }
    }


    state = {
        searchInput: ""
    }

    handleBackToHomePage = (e) => {
        if (cookie.load('role') === "business") {
            this.props.navigate('/business/profile')
        }
        else {
            this.props.navigate('/');
        }
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

        let route = '/search/' + input + '/' + searchMethod;

        this.props.navigate(route);

        window.location.reload(false);

    }

    handleLogin = (e) => {
        this.props.navigate('/signIn');
    }

    handleLogOut = (e) => {
        cookie.remove('id');
        cookie.remove('role');
        this.props.navigate('/');
        // window.location.reload(false);
    }

    setKeyword = (e) => {
        this.setState({ searchInput: e.target.value });
    }

    navToUserProfile = (e) => {
        // console.log("Nav to user profile page");
        let userId = cookie.load('id');
        if (userId !== undefined) {
            this.props.navigate('/user/profile');
        }
        else {
            showAlert('warning', "Invalid login session", "Please login first");
        }
    }

    navToUserBookings = (e) => {
        console.log("Nav to user bookings page");

        let userId = cookie.load('id');
        if (userId !== undefined) {
            this.props.navigate('/user/getAllBookings');
        }
        else {
            showAlert('warning', "Invalid login session", "Please login first");
        }

    }

    render() {
        return (
            <div id={navBarStyle.navBarDiv} >
                <Menu id={navBarStyle.navbar} key="navBar" mode="horizontal" className='navbar'>
                    <Menu.Item id={navBarStyle.websiteName} key="websiteName" className='navbar-title' onClick={this.handleBackToHomePage.bind(this)}>PetDaily</Menu.Item>
                    {cookie.load('role') === "customer" || cookie.load('id') === undefined ?
                        <Menu.Item id={navBarStyle.search} key="search">
                            <Input id={navBarStyle.searchInput} size="large" placeholder="Search"
                                addonAfter={
                                    <Select id={navBarStyle.searchSelect} defaultValue="" onSelect={this.handleSearch.bind(this)}>
                                        <Option value="">Choose Search Method</Option>
                                        <Option value="service">Search By Service Name</Option>
                                        <Option value="shop">Service By Shop Name</Option>
                                    </Select>
                                } onChange={this.setKeyword.bind(this)} />
                        </Menu.Item> : null}
                    {cookie.load('id') === undefined
                        ?
                        <Menu.Item id={navBarStyle.login} key="login" onClick={this.handleLogin.bind(this)}>
                            Login/SignUp
                        </Menu.Item>
                        :
                        <Menu.Item id={navBarStyle.profile} key="profile">
                            {
                                cookie.load('role') === "customer" ?

                                    <div>
                                        <Button
                                            id={navBarStyle.logOutButton}
                                            type="ghost"
                                            shape="circle"
                                            onClick={this.handleLogOut.bind(this)}>
                                            Log Out
                                        </Button>

                                        <Button id={navBarStyle.bookingButton}
                                            type="ghost"
                                            shape="circle"
                                            onClick={this.navToUserBookings.bind(this)}
                                            icon={<BookOutlined className={navBarStyle.icon} style={{ fontSize: '30px', color: 'black' }} />} />
                                        <Button id={navBarStyle.profileButton}
                                            type="ghost"
                                            shape="circle"
                                            onClick={this.navToUserProfile.bind(this)}
                                            icon={<UserOutlined className={navBarStyle.icon} style={{ fontSize: '30px', color: 'black' }} />} />

                                    </div>
                                    : <Button
                                        id={navBarStyle.logOutButton}
                                        type="ghost"
                                        shape="circle"
                                        onClick={this.handleLogOut.bind(this)}>
                                        Log Out
                                    </Button>
                            }

                        </Menu.Item>
                    }

                </Menu>
            </div>
        );
    }
}

export default withRouter(NavBar);