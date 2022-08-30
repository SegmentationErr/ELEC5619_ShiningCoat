import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios'
import cookie from 'react-cookies';


class SignInPage extends Component {

    render() {
        return (
            <div style={{ textAlign: "center", marginTop: "10%" }}>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                    }}
                    onFinish={this.onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Email!',
                            },
                        ]}
                    >
                        <Input
                            style={{ width: 400, }}
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Email"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            style={{ width: 400, }}
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: 400 }}>
                            Sign in
                        </Button>
                        <div style={{ marginTop: 24 }}>
                            Forget password?
                            <a href="/forgetPassword"> Reset your password</a>
                        </div>
                        <div style={{ marginTop: 24 }}>
                            New to SellPhone?
                            <a href="/signUp"> Register now!</a>
                        </div>
                    </Form.Item>
                </Form>
                <Button style={{ width: 400 }} onClick={() => { this.props.history.goBack() }}>
                    Back
                </Button>
            </div>
        );
    }
}

export default SignInPage;