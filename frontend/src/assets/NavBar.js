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

        let route = '/search/' + input + '/' + searchMethod;

        this.props.navigate(route);

        //reload the page after search in order to
        //triger the reconstruct for search phone page
        window.location.reload(false);

    }

    handleLogin = (e) => {
        this.props.navigate('/signIn');
    }

    setKeyword = (e) => {
        this.setState({ searchInput: e.target.value });
    }

    navToUserProfile = (e) => {
        console.log("Nav to user profile page");
    }

    navToUserBookings = (e) => {
        console.log("Nav to user bookings page");

        this.props.navigate('/user/getAllBookings/' + "testUserId");

        // let userId = cookie.load('userId');
        // if (userId !== undefined) {
        //     this.props.navigate('/user/getAllBookings/' + userId);
        // }
        // else {
        //     showAlert('warning', "Invalid login session", "Please login first");
        // }

    }

    render() {
        return (
            <div id={navBarStyle.navBarDiv} >
                <Menu id={navBarStyle.navbar} key="navBar" mode="horizontal" className='navbar'>
                    <Menu.Item id={navBarStyle.websiteName} key="websiteName" onClick={this.handleBackToHomePage.bind(this)} className='navbar-title'>PetDaily</Menu.Item>
                    <Menu.Item id={navBarStyle.search} key="search">
                        <Input id={navBarStyle.searchInput} size="large" placeholder="Search"
                            addonAfter={
                                <Select id={navBarStyle.searchSelect} defaultValue="" onSelect={this.handleSearch.bind(this)}>
                                    <Option value="">Choose Search Method</Option>
                                    <Option value="service">Search By Service Name</Option>
                                    <Option value="shop">Service By Shop Name</Option>
                                </Select>
                            } onChange={this.setKeyword.bind(this)} />
                    </Menu.Item>
                    {cookie.load('id') === undefined
                        ?
                        <Menu.Item id={navBarStyle.login} key="login" onClick={this.handleLogin.bind(this)}>
                            Login/SignUp
                        </Menu.Item>
                        :
                        <Menu.Item id={navBarStyle.profile} key="profile">
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
                        </Menu.Item>
                    }

                </Menu>
            </div>
        );
    }
}

export default withRouter(NavBar);