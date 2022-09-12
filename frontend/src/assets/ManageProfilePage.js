import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import PasswordValidation from './PasswordValidation';

class ManageProfilePage extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return (
            <div style={{ textAlign: "center", marginTop: "10%" }}>
                <PasswordValidation />
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                    }}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: false,
                                message: 'Please input your Email!',
                            },
                        ]}
                    >
                        <Input
                            style={{ width: 400, }}
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Username"
                            allowClear
                        />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: false,
                                message: 'Please input your Email!',
                            },
                        ]}
                    >
                        <Input
                            style={{ width: 400, }}
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            placeholder="Email"
                            allowClear
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: false,
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
                    </Form.Item>
                    <Form.Item>
                        <Button
                            id="signInButton" type="primary" htmlType="submit" className="login-form-button">
                            Update Profile
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
 
export default ManageProfilePage;