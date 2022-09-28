import React, { Component } from 'react';
import { Form, Input, TimePicker, Col, Row, Upload, message } from 'antd';
import { withRouter } from './withRouter';
import addEditFormStyle from '../css/addEditShopForm.module.css';
import generalStyles from '../css/generalComponents.module.css';
import cookie from 'react-cookies'
import AddressAutoCompleteInput from './AddressAutoCompletInput';
import showAlert from './Alert';

import moment from 'moment';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';


const format = 'HH:mm';

const { TextArea } = Input;


class AddEditShopForm extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        startTime: "9:00",
        endTime: "21:00",
        shopAddress: "",
        file: null,
        image: {
            file: null,
            base64URL: ""
        }
    }

    handleConfirm = data => {
        data.image = this.state.image.base64URL;
        data.startTime = this.state.startTime;
        data.endTime = this.state.endTime;
        data.userId = cookie.load('id');
        data.shopAddress = this.state.shopAddress;

        console.log(this.state);

        if (this.state.lat === undefined || this.state.lng === undefined) {
            showAlert('warning', "Invalid Input", "Please choose a address");
            return;
        }

        data.lat = this.state.lat;
        data.lng = this.state.lng;

        if (this.state.shopAddress === "") {
            showAlert('warning', "Invalid Input", "Please choose a address");
            return;
        }

        console.log(data);

        axios.post(`http://localhost:8080/shops/addShop`, data)
            .then(res => {
                if (res.status === 200) {
                    message.success('Successfully Create Shop!');
                    // console.log(res.data);
                    this.props.navigate('/business/profile');
                }
                else {
                    message.error("Something went wrong")
                }
            }).catch((error) => {
                console.log(error);
                message.error('Something went wrong.\nPlease Try Again.')

            })
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

    getBase64 = file => {
        return new Promise(resolve => {
            let fileInfo;
            let baseURL = "";
            // Make new FileReader
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object
                console.log("Called", reader);
                baseURL = reader.result;
                // console.log(baseURL);
                resolve(baseURL);
            };
            console.log(fileInfo);
        });
    };

    handleFileInputChange = e => {
        console.log(e.target.files[0]);
        let { file } = this.state.image;

        file = e.target.files[0];

        this.getBase64(file)
            .then(result => {
                file["base64"] = result;
                console.log("File Is", file);
                this.setState({
                    image: {
                        base64URL: result,
                        file
                    }
                });
            })
            .catch(err => {
                console.log(err);
            });

        this.setState({
            file: e.target.files[0]
        });
    };

    handleInputAddress = e => {
        let formattedAddress = e.formatted_address;

        let geometry = e.geometry;

        let lat = geometry.location.lat();
        let lng = geometry.location.lng();

        this.setState({
            shopAddress: formattedAddress,
            lat: lat,
            lng: lng
        });
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
                        >
                            <AddressAutoCompleteInput
                                handlePlaceSelected={this.handleInputAddress} />
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
                        // valuePropName="filelist"
                        // getValueFromEvent={normFile}
                        >
                            <Row id={addEditFormStyle.uploadImageDiv}>
                                <Col span={12} offset={6}>
                                    <input
                                        id="originalFileName"
                                        type="file"
                                        inputprops={{ accept: 'image/*, .xlsx, .xls, .csv, .pdf, .pptx, .pptm, .ppt' }}
                                        required
                                        label="Document"
                                        name="originalFileName"
                                        onChange={e => this.handleFileInputChange(e)}
                                        size="small"
                                        variant="standard"
                                    />
                                    {/* <Upload.Dragger name="files" onChange={e => this.onUploadImage(e)} maxCount={1}>
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">Upload Shop Cover Image</p>
                                    </Upload.Dragger> */}
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