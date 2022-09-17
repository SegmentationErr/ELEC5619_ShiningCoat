import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import axios from 'axios'
import cookie from 'react-cookies';
import { withRouter } from './withRouter';
import signInPageStyle from '../css/signInPage.module.css';
import generalStyles from '../css/generalComponents.module.css';



class SignInPage extends Component {

    render() {
        return (
            <div style={{ textAlign: "center", marginTop: "10%" }}>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                    }}
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
                            prefix={<MailOutlined className="site-form-item-icon" />}
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
                        <Input.Password
                            style={{ width: 400, }}
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                        {/* <div style={{ marginTop: 24 }}>
                            Forget password?
                            <a href="/forgetPassword"> Reset your password</a>
                        </div> */}
                        <div style={{ marginTop: 24 }}>
                            New to PetDaily?
                            <a href="/signUp"> Register now!</a>
                        </div>
                    </Form.Item>
                    <Form.Item>
                        <button
                            className={generalStyles.blackButton}
                            id={signInPageStyle.signInButton} htmlType="submit">
                            Sign in
                        </button>
                    </Form.Item>
                </Form>
                <button
                    className={generalStyles.blackButton}
                    id={signInPageStyle.backButton} onClick={() => this.props.navigate(-1)}>
                    Back
                </button>
            </div>
        );
    }
}

export default withRouter(SignInPage);