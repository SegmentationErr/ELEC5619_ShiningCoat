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
        googleUser: true,
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
        
        axios.get('http://localhost:8080/users/ifGoogleUser/' + this.state.id)
        .then((res) => {
            if (res.status === 200) {
                if (! res.data.isGoogleUser) {
                    this.setState({
                        googleUser: false
                    })
                }
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

        data.id = this.state.id
        console.log(data)
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
                    onFinish={this.handleUpdateButton}
                    ref={(form) => this.formRef = form}
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 5 }}
                    disabled={this.state.googleUser}
                >
                    <Form.Item name="username" label='Username'>
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder={this.state.profile.username}
                            allowClear
                        />
                    </Form.Item>
                    <Form.Item name="email" label='Email'>
                        <Input
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            placeholder={this.state.profile.email}
                            allowClear
                        />
                    </Form.Item>
                    {this.state.googleUser ? null :
                        <Form.Item name="newPassword" label='New Password'>
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="New Password"
                                allowClear
                            />
                        </Form.Item>
                    }
                    {this.state.googleUser ? null :
                        <button className={styles.blackButton} type="submit" style={{ marginTop: 100 }}>
                            Update Profile
                        </button>
                    }
                </Form>
            </div>
        );
    }
}

export default ManageProfilePage;