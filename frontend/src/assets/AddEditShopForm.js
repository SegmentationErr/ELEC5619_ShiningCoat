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
                    <p>For updating the information<br />please enter your password:</p>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                        }}
                        onFinish={this.props.handleConfirm}
                    >
                        <Form.Item>
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