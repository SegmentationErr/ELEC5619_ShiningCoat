import React, { Component } from 'react';
import { Form, Input, TimePicker, Col, Row, Upload, message } from 'antd';
import { withRouter } from './withRouter';
import addEditFormStyle from '../css/addEditShopForm.module.css';
import generalStyles from '../css/generalComponents.module.css';
import cookie from 'react-cookies'
import AddressAutoCompleteInput from './AddressAutoCompletInput';
import showAlert from './Alert';
import { FileAddOutlined } from '@ant-design/icons';


import moment from 'moment';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';


const format = 'HH:mm';

const { TextArea } = Input;


class AddEditShopForm extends Component {
    constructor(props) {
        super(props);
        if (!this.state.addShop) {
            showAlert('warning', 'now showing edit shop form');
            //TODO: call backend to get he current shop infomation and filled in the corresponding fields in the state
        }
    }

    state = {
        addShop: this.props.addShop,
        shopName: "loading...",
        contactNumber: "loading...",
        startTime: "9:00",
        endTime: "21:00",
        shopAddress: "loading...",
        shopDescription: "loading...",
        file: null,
        image: {
            file: null,
            base64URL: ""
        }
    }

    //TODO: complete this function for edit shop info
    handleEditShopConfirm = data => {
        showAlert('warning', 'called edit shop information confirm');
    }

    handleAddShopConfirm = data => {
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

        console.log(e);

        let file = e;

        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

        console.log(file.type);

        if (!isJpgOrPng) {
            showAlert('warning', 'You can only upload JPG/PNG file!');
            return;
        }

        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isLt2M) {
            showAlert('warning', 'Image must smaller than 2MB!');
            return;
        }

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
            file: e
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
                        onFinish={this.state.addShop ? this.handleAddShopConfirm : this.handleEditShopConfirm}
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
                            {this.state.addShop ?
                                <Input
                                    style={{ width: "50%" }}
                                    placeholder="Shop Name"
                                /> :
                                <Input
                                    style={{ width: "50%" }}
                                    placeholder="Shop Name"
                                    defaultValue={this.state.shopName}
                                />}
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


                            {this.state.addShop ?
                                <Input
                                    style={{ width: "50%" }}
                                    placeholder="Contact Number"
                                /> :
                                <Input
                                    style={{ width: "50%" }}
                                    placeholder="Contact Number"
                                    defaultValue={this.state.contactNumber}

                                />
                            }
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
                            {this.state.addShop ?
                                <TextArea style={{ width: "50%" }} rows={4} placeholder='Shop Description' /> :
                                <TextArea style={{ width: "50%" }} rows={4} placeholder='Shop Description' defaultValue={this.state.shopDescription} />
                            }

                        </Form.Item>

                        <Form.Item
                            name="image"
                        // valuePropName="filelist"
                        // getValueFromEvent={normFile}
                        >
                            <Row id={addEditFormStyle.uploadImageDiv}>
                                <Col span={12} offset={6}>
                                    {/* <input
                                        id="originalFileName"
                                        type="file"
                                        inputprops={{ accept: 'image/*, .xlsx, .xls, .csv, .pdf, .pptx, .pptm, .ppt' }}
                                        required
                                        label="Document"
                                        name="originalFileName"
                                        onChange={e => this.handleFileInputChange(e)}
                                        size="small"
                                        variant="standard"
                                    /> */}
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={{ showPreviewIcon: false }}
                                        accept='image/*'
                                        maxCount={1}
                                        beforeUpload={e => this.handleFileInputChange(e)}
                                    >
                                        <FileAddOutlined style={{ fontSize: 40 }} />
                                    </Upload>
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