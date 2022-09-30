import React, { Component } from 'react';
import { Form, Input, TimePicker, Col, Row, Upload, message, InputNumber, Radio } from 'antd';
import { FileAddOutlined } from '@ant-design/icons';
import axios from 'axios';

import addEditFormStyle from '../css/addEditShopForm.module.css';
import generalStyles from '../css/generalComponents.module.css';


const { TextArea } = Input;

class AddEditServiceForm extends Component {
    constructor(props) {
        super(props);
    }
    
    state = {
        image: null
    }

    handleConfirm = data => {
        if (this.props.shop_id == -1) {
            data.image = this.state.image ? this.state.image : this.props.service_details.image
            data.service_id = this.props.service_id
            // console.log(data)
            this.updateService(data)
        } else {
            this.newService(data)
        }
    }

    updateService = data => {
        axios.post(`http://localhost:8080/services/update`, data)
            .then(res => {
                if (res.status === 200) {
                    message.success('Successfully Create Service!');
                    window.location.reload()
                }
                else {
                    message.error("Something went wrong")
                }
            }).catch((error) => {
                console.log(error);
                message.error('Something went wrong.\nPlease Try Again.')

            })
    }

    newService = data => {
        data.image = this.state.image
        data.shop_id = this.props.shop_id
        data.price = data.price.toString()
        // console.log(data)

        axios.post(`http://localhost:8080/services/add`, data)
            .then(res => {
                if (res.status === 200) {
                    message.success('Successfully Create Service!');
                    window.location.reload()
                }
                else {
                    message.error("Something went wrong")
                }
            }).catch((error) => {
                console.log(error);
                message.error('Something went wrong.\nPlease Try Again.')

            })
    }

    getBase64 = file => {
        return new Promise(resolve => {
            let baseURL = "";
            // Make new FileReader
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object
                // console.log("Called", reader);
                baseURL = reader.result;
                // console.log(baseURL);
                resolve(baseURL);
            };
        });
    };

    beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
      
        const isLt2M = file.size / 1024 / 1024 < 2;
      
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }

        this.getBase64(file)
            .then(result => {
                this.setState({
                    image: result
                })
            })
            .catch(err => {
                console.log(err);
            });

        return false;
    };

    render() { 
        return (
            <div className={addEditFormStyle.cover}>
                <div className={addEditFormStyle.validationCard}>
                    <Form
                        id={addEditFormStyle.form}
                        name="normal_login"
                        className="login-form"
                        initialValues={
                            this.props.shop_id == -1 ?
                            {
                                serviceName: this.props.service_details.service_name,
                                price: this.props.service_details.price,
                                serviceDescription: this.props.service_details.description,
                                pickup: this.props.service_details.pick_up ? 1 : 0,
                                available: this.props.service_details.available ? 1 : 0,
                            } : {}
                        }
                        onFinish={this.handleConfirm}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 12 }}
                    >
                        <Form.Item
                            id={addEditFormStyle.serviceName}
                            name="serviceName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your service name!',
                                },
                            ]}
                            label='Service Name'
                        >
                            <Input
                                placeholder="service Name"
                            />
                        </Form.Item>

                        <Form.Item
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your price!',
                                },
                            ]}
                            label='Service Price'
                        >
                            <InputNumber
                                style={{ float: 'left' }}
                                prefix='$'
                                min={0.1}
                            />
                        </Form.Item>

                        <Form.Item
                            name="serviceDescription"
                            rules={[{ required: true, message: 'Please input your service description!' }]}
                            label='Service Description'
                        >
                            <TextArea rows={4} placeholder='service Description' />
                        </Form.Item>

                        <Form.Item
                            name="pickup"
                            label="Provide Pick-Up?"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select if provide pickup',
                                },
                            ]}
                        >
                            <Radio.Group>
                                <Radio value={1}> Yes </Radio>
                                <Radio value={0}> No </Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            name="available"
                            label="Is Service Still Available?"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select if still available',
                                },
                            ]}
                        >
                            <Radio.Group>
                                <Radio value={1}> Yes </Radio>
                                <Radio value={0}> No </Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            // name={'image'}
                            label="Service Image"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please upload your service image',
                                },
                            ]}
                        >
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={{showPreviewIcon: false}}
                                accept='image/*'
                                maxCount={1}
                                beforeUpload={this.beforeUpload}
                            >
                                <FileAddOutlined style={{fontSize: 40}}/>
                            </Upload>
                        </Form.Item>

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
                    </Form>
                </div>
            </div>
        );
    }
}
 
export default AddEditServiceForm;