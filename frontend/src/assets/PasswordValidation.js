import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import '../css/passwordValidation.css';
import '../css/generalComponents.css';

class PasswordValidation extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }

    handleConfirm = () => {
        console.log(123123)
    }

    render() { 
        return (
            <div className='cover'>
                <div className='validationCard'>
                    <p>For updating the information<br/>please enter your password:</p>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                        }}
                        onFinish={this.handleConfirm}
                    >
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
                                style={{ width: 300, }}
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                id="signInButton" type="primary" htmlType="submit" className="login-form-button">
                                Update
                            </Button>
                        </Form.Item>
                        <Button
                            className="yellowButto" htmlType="submit">
                            Update
                        </Button>
                        {/* <Button  */}
                    </Form>
                </div>
            </div>
        );
    }
}
 
export default PasswordValidation;