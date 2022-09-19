import React, { Component } from 'react';
import { Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import axios from 'axios';
import PasswordValidation from './PasswordValidation';
import styles from '../css/generalComponents.module.css';
import cookie from 'react-cookies';


class ManageProfilePage extends Component {
    constructor(props) {
        super(props);
        this.fetchUserProfile()
    }

    state = {
        id: cookie.load('id'),
        profile: {
            'username': 'Fetching Data...',
            'email': 'Fetching Data...',
        },
        newProfile: {},
        validation: false
    }

    fetchUserProfile = () => {
        axios.get('http://localhost:8080/users/profile/' + this.state.id)
            .then((res) => {
                // console.log(res.data)
                if (res.status === 200) {
                    // console.log(res);
                    this.setState({
                        profile: res.data
                    })
                }
            }).catch((error) => {
                console.log(error)
            })
    }

    changeDisplayValidation = () => {
        this.setState({
            validation: !this.state.validation
        })
    }

    handleUpdateButton = (input) => {
        this.changeDisplayValidation()

        let newProfile = {}
        newProfile.username = input.username ? input.username : this.state.profile.username
        newProfile.email = input.email ? input.email : this.state.profile.email
        if (input.newPassword) {
            newProfile.newPassword = input.newPassword
        }

        this.setState({
            newProfile: newProfile
        })
    }

    updateProfile = (input) => {
        let data = this.state.newProfile
        data.currPassword = input.currPassword
        if (!data.newPassword) {
            data.newPassword = input.currPassword
        }

        data.id = "1"

        this.setState({
            validation: false
        })
        axios.post(`http://localhost:8080/users/update`, data)
            .then(res => {
                if (res.status === 200) {
                    message.success('Successfully Update User Profile!')
                    this.formRef.resetFields()
                    this.fetchUserProfile()
                } else {
                    message.error('Incorrect Password\nFailed to Update User Profile!')
                }
            }).catch((error) => {
                message.error('Incorrect Password\nFailed to Update User Profile!')
            })
    }

    render() {
        return (
            <div style={{ textAlign: "center", marginTop: "10%" }}>
                {this.state.validation ?
                    <PasswordValidation changeDisplayValidation={this.changeDisplayValidation} updateProfile={this.updateProfile} /> :
                    null}
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={this.handleUpdateButton}
                    ref={(form) => this.formRef = form}
                >
                    <Form.Item name="username">
                        <Input
                            style={{ width: 400, }}
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder={this.state.profile.username}
                            allowClear
                        />
                    </Form.Item>
                    <Form.Item name="email">
                        <Input
                            style={{ width: 400, }}
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            placeholder={this.state.profile.email}
                            allowClear
                        />
                    </Form.Item>
                    <Form.Item name="newPassword">
                        <Input.Password
                            style={{ width: 400, }}
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="New Password"
                            allowClear
                        />
                    </Form.Item>
                    <Form.Item>
                        <button className={styles.blackButton} type="submit" style={{ marginTop: 100 }}>
                            Update Profile
                        </button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default ManageProfilePage;