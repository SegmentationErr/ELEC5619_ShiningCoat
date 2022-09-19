import React, { Component } from 'react';
import { Form, Input } from 'antd';
import { withRouter } from './withRouter';
import addEditForm from '../css/addEditShopForm.module.css';
import generalStyles from '../css/generalComponents.module.css';


class AddEditShopForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={addEditForm.cover}>
                <div className={addEditForm.validationCard}>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                        }}
                        onFinish={this.props.handleConfirm}
                    >
                        <Form.Item
                            name="shopName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your shop name!',
                                },
                            ]}
                        >
                            <Input
                                style={{ width: "50%" }}
                                placeholder="Shop Name"
                            />
                        </Form.Item>

                        <Form.Item
                            name="shopAddress"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your shop address!',
                                },
                            ]}
                        >
                            <Input
                                style={{ width: "50%" }}
                                placeholder="Shop Address"
                            />
                        </Form.Item>


                        <Form.Item
                            name="contactNumber"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your shop contact number!',
                                },
                            ]}
                        >
                            <Input
                                style={{ width: "50%" }}
                                placeholder="Contact Number"
                            />
                        </Form.Item>


                        <Form.Item>
                            <button
                                className={generalStyles.yellowButton}
                                type="submit">
                                Confirm
                            </button>
                            <button
                                className={generalStyles.redButton}
                                onClick={this.props.handleCancel}>
                                Cancel
                            </button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

export default withRouter(AddEditShopForm);