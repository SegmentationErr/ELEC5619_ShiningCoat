import React, { Component } from 'react';
import { Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import axios from 'axios';
import PasswordValidation from './PasswordValidation';
import styles from '../css/generalComponents.module.css';
import cookie from 'react-cookies';


class ManageShopsPage extends Component {
    constructor(props) {
        super(props);
        this.fetchAllShops();
    }

    state = {
        id: cookie.load('id'),
        data: []
        // profile: {
        //     'username': 'Fetching Data...',
        //     'email': 'Fetching Data...',
        // },
        // newProfile: {},
        // validation: false
    }

    fetchAllShops = () => {
        console.log("fetch all shops")
        axios.get('http://localhost:8080/shops/getAllShopsById/' + this.state.id)
            .then((res) => {
                // console.log(res.data)
                if (res.status === 200) {
                    console.log(res);
                    // this.setState({
                    //     profile: res.data
                    // })
                }
            }).catch((error) => {
                console.log(error)
            })
    }


    render() {
        return (
            <div style={{ textAlign: "center", marginTop: "10%" }}>
                {this.state.data.length === 0 ?
                    <div>No Shops Yet</div>
                    : <div>show some shops</div>
                }
            </div>
        );
    }
}

export default ManageShopsPage;