import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from './withRouter';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import signUpPageStyle from '../css/signUpPage.module.css';
import generalStyles from '../css/generalComponents.module.css';

import {
    Form,
    Input,
    Select
} from 'antd';

const { Option } = Select;

class SignUpPage extends Component {

    render() {
        return (
            <div>
                <Form id={signUpPageStyle.signUpForm}
                    name="register"
                    scrollToFirstError
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
                            <Option value="0">Customer</Option>
                            <Option value="1">Business</Option>
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