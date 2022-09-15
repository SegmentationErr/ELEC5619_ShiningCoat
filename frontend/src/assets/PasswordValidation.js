import React, { Component } from 'react';
import { Form, Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import '../css/passwordValidation.css';
import '../css/generalComponents.css';

class PasswordValidation extends Component {
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
                        onFinish={this.props.updateProfile}
                    >
                        <Form.Item
                            name="currPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Input Current Password!',
                                },
                            ]}
                        >
                            <Input.Password
                                style={{ width: 300 }}
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Current Password"
                                allowClear
                            />
                        </Form.Item>
                        <Form.Item>
                            <button
                                className="redButton"
                                onClick={this.props.changeDisplayValidation}>
                                Cancel
                            </button>
                            <button className="yellowButton" type="submit">
                                Update
                            </button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}
 
export default PasswordValidation;