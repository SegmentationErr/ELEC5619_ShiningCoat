import React, { Component } from 'react';
import { message } from 'antd';
import axios from 'axios';
import { withRouter } from './withRouter';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import '../css/signUpPage.css'


import {
    Form,
    Input,
    Button,
    Select
} from 'antd';

const { Option } = Select;

class SignUpPage extends Component {
    handleSignUp = data => {
        axios.post(`http://localhost:8080/users/add`, data)
        .then(res => {
            if (res.status === 200) {
                message.success('Successfully Create User!')
                // this.formRef.resetFields()
                // this.fetchUserProfile()
            } else {
                message.error('Username or Email Already Exists.\nCreation Failed.')
            }
        }).catch((error) => {
            message.error('Username or Email Already Exists.\nCreation Failed.')
        })
    }
    render() {
        return (
            <div id="mainContentDiv">
                <Form id="signUpForm"
                    name="register"
                    scrollToFirstError
                    onFinish={this.handleSignUp}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your user name!',
                            },
                            {
                                type: 'string',
                                pattern: /^[a-zA-Z]+$/,
                                message: 'The input is not valid name!',
                            },
                        ]}
                    >
                        <Input
                            placeholder='Username'
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            style={{ maxWidth: 400 }} />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input
                            placeholder='Email'
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            style={{ maxWidth: 400 }} />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password
                            placeholder='Password'
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            style={{ maxWidth: 400 }} />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your confirm password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password
                            placeholder='Confirm Password'
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            style={{ maxWidth: 400 }} />
                    </Form.Item>

                    <Form.Item name="role" rules={[{ required: true }]}>
                        <Select
                            placeholder="Choose your role"
                            style={{ maxWidth: 400 }}
                            allowClear>
                            <Option value="0">Customer</Option>
                            <Option value="1">Business</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button id="signUpButton" type="primary" htmlType="submit" style={{}}>
                            Sign Up
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <Button id="cancelButton" onClick={() => { this.props.navigate(-1) }} style={{}} >
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>

            </div >
        );
    }
}
export default withRouter(SignUpPage);