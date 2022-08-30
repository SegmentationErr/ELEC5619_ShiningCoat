import React, { Component } from 'react';
import { message } from 'antd';
import axios from 'axios';
import { withRouter } from './withRouter';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../css/signUpPage.css'


import {
    Form,
    Input,
    Button,
    Select
} from 'antd';

const { Option } = Select;

class SignUpPage extends Component {


    render() {
        return (
            <div >
                <Form id="signUpForm"
                    name="register"
                    scrollToFirstError
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 8 }}
                >
                    <Form.Item
                        name="username"
                        label="Username"
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
                        <Input style={{ maxWidth: 400 }} />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
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
                        <Input style={{ maxWidth: 400 }} />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password style={{ maxWidth: 400 }} />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        label="Confirm Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your confirm password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password style={{ maxWidth: 400 }} />
                    </Form.Item>

                    <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                        <Select style={{ maxWidth: 400 }}
                            allowClear
                        >
                            <Option value="0">Customer</Option>
                            <Option value="1">Business</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button id="signUpButton" type="primary" htmlType="submit" style={{ marginLeft: '120%' }}>
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
                <Button id="cancelButton" onClick={() => { this.props.navigate(-1) }} style={{ marginLeft: "40vw" }} >
                    Cancel
                </Button>
            </div>
        );
    }
}
export default withRouter(SignUpPage);