import React, { Component } from 'react';
import { Menu, Input, Button, Row, Select } from 'antd';
import { UserOutlined, BookOutlined } from '@ant-design/icons';

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
                    {/* this is test frontend only, UPDATE THIS!!!!! */}
                    {cookie.load('userId') !== undefined
                        ?
                        <Menu.Item id="login" key="login" onClick={this.handleLogin.bind(this)}>
                            Login/SignUp
                        </Menu.Item>
                        :
                        <Menu.Item id="profile" key="profile">
                            <Button id="bookingButton"
                                type="ghost"
                                shape="circle"
                                onClick={this.navToUserBookings.bind(this)}
                                icon={<BookOutlined class="icon" style={{ fontSize: '30px', color: 'black' }} />} />
                            <Button id="profileButton"
                                type="ghost"
                                shape="circle"
                                onClick={this.navToUserProfile.bind(this)}
                                icon={<UserOutlined class="icon" style={{ fontSize: '30px', color: 'black' }} />} />
                        </Menu.Item>
                    }

                </Menu>
            </div>
        );
    }
}

export default withRouter(NavBar);