import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from './withRouter';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import cookie from 'react-cookies'
import signUpPageStyle from '../css/signUpPage.module.css';
import generalStyles from '../css/generalComponents.module.css';

import {
    Form,
    Input,
    Select,
    message
} from 'antd';

const { Option } = Select;

class SignUpPage extends Component {
    handleSignUp = data => {
        axios.post(`http://localhost:8080/users/add`, data)
            .then(res => {
                if (res.status === 200) {
                    message.success('Successfully Create User!')
                    // console.log(res.data)
                    cookie.save("id", res.data.id)
                    cookie.save("role", res.data.role)
                    if (res.data.role === "customer") {
                        this.props.navigate('/')
                    } else {
                        this.props.navigate('/business/profile')
                    }
                } else {
                    message.error('Username or Email Already Exists.\nCreation Failed.')
                }
            }).catch((error) => {
                console.log(error);
                message.error('Something went wrong.\nPlease Try Again.')

                // message.error('Username or Email Already Exists.\nCreation Failed.')
            })
    }

    render() {
        return (
            <div>
                <Form id={signUpPageStyle.signUpForm}
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
                            className={signUpPageStyle.input}
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
                            className={signUpPageStyle.input}
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
                            className={signUpPageStyle.input}
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
                            className={signUpPageStyle.input}
                            placeholder='Confirm Password'
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            style={{ maxWidth: 400 }} />
                    </Form.Item>

                    <Form.Item name="role" rules={[{ required: true }]}>
                        <Select
                            className={signUpPageStyle.input}
                            placeholder="Choose your role"
                            style={{ maxWidth: 400 }}
                            allowClear>
                            <Option value="customer">Customer</Option>
                            <Option value="business">Business</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <button className={generalStyles.blackButton} id={signUpPageStyle.signUpButton} htmlType="submit">
                            Sign Up
                        </button>
                    </Form.Item>

                    <Form.Item>
                        <button className={generalStyles.blackButton} id={signUpPageStyle.cancelButton} onClick={() => { this.props.navigate(-1) }} >
                            Cancel
                        </button>
                    </Form.Item>
                </Form>

            </div >
        );
    }
}
export default withRouter(SignUpPage);