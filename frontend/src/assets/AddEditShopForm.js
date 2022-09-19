import React, { Component } from 'react';
import { Form, Input, TimePicker, Col, Row, Upload, InputNumber } from 'antd';
import { withRouter } from './withRouter';
import addEditFormStyle from '../css/addEditShopForm.module.css';
import generalStyles from '../css/generalComponents.module.css';
import moment from 'moment';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';


const format = 'HH:mm';

const { TextArea } = Input;


const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
        return e;
    }

    return e?.fileList;
};

class AddEditShopForm extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        startTime: "9:00",
        endTime: "21:00"
    }

    handleConfirm = data => {
        console.log(this.state);
        this.props.handleConfirm();
    }

    onChangeStartTime = (time) => {

        let newTime = time.format('HH:mm');

        this.setState({
            startTime: String(newTime)
        })
    }

    onChangeEndTime = (time) => {
        let newTime = time.format('HH:mm');

        this.setState({
            endTime: String(newTime)
        })
    }

    render() {
        return (
            <div className={addEditFormStyle.cover}>
                <div className={addEditFormStyle.validationCard}>
                    <Form
                        id={addEditFormStyle.form}
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                        }}
                        onFinish={this.handleConfirm}
                    >
                        <Form.Item
                            id={addEditFormStyle.shopName}
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
                                {
                                    type: 'string',
                                    pattern: new RegExp(/^[0-9]+$/),
                                    message: 'The input is not valid phone number!',
                                },
                            ]}
                        >
                            <Input
                                style={{ width: "50%" }}
                                placeholder="Contact Number"
                            />
                        </Form.Item>

                        <Row>
                            <Col span={12} id={addEditFormStyle.startTimeCol}>
                                <Form.Item name="startTime">
                                    <p>Working Time Starts</p>
                                    <TimePicker format={format} defaultValue={moment(this.state.startTime, format)} onChange={this.onChangeStartTime} />
                                </Form.Item>
                            </Col>
                            <Col span={12} id={addEditFormStyle.endTimeCol}>
                                <Form.Item name="endTime">
                                    <p>Working Time Ends</p>
                                    <TimePicker format={format} defaultValue={moment(this.state.endTime, format)} onChange={this.onChangeEndTime} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                            name="shopDescription"
                            rules={[{ required: true, message: 'Please input your shop description!' }]}
                        >
                            <TextArea style={{ width: "50%" }} rows={4} placeholder='Shop Description' />
                        </Form.Item>

                        <Form.Item
                            name="image"
                            valuePropName="filelist"
                            getValueFromEvent={normFile}
                        >
                            <Row id={addEditFormStyle.uploadImageDiv}>
                                <Col span={12} offset={6}>
                                    <Upload.Dragger name="files" action="/upload.do">
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">Upload Shop Cover Image</p>
                                    </Upload.Dragger>
                                </Col>
                            </Row>
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