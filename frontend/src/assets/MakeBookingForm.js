import React, { Component } from 'react';
import { Form, message, Radio, DatePicker } from 'antd';
import axios from 'axios';
import cookie from 'react-cookies';


import addEditFormStyle from '../css/addEditShopForm.module.css';
import generalStyles from '../css/generalComponents.module.css';


class MakeBookingForm extends Component {
    state = {
        image: null
    }

    generateRange = (start, end) => {
        start = start.split(':')[0]
        end = end.split(':')[0]
        
        let result = [];
        for (let i = 0; i < start; i++) {
          result.push(i);
        }
        for (let i = end; i < 24; i++) {
          result.push(i);
        }
        return result;
    }

    handleConfirm = data => {
        data.time = data.time.format("YYYY-MM-DD HH:mm")
        data.service_id = this.props.service_id
        data.shop_id = this.props.shop_id
        data.user_id = cookie.load('id')

        axios.post(`http://localhost:8080/bookings/add`, data)
        .then(res => {
            if (res.status === 200) {
                message.success('Successfully Make Booking!');
                this.props.handleCancel()
            }
            else {
                message.error("Something went wrong")
            }
        }).catch((error) => {
            console.log(error);
            message.error('Something went wrong.\nPlease Try Again.')
        })
    }

    render() { 
        return (
            <div className={addEditFormStyle.cover}>
                <div className={addEditFormStyle.validationCard} style={{width: '30%', marginTop: '10%'}}>
                    <Form
                        id={addEditFormStyle.form}
                        name="normal_login"
                        className="login-form"
                        initialValues={{

                        }}
                        onFinish={this.handleConfirm}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 12 }}
                    >

                        <Form.Item
                            name="time"
                            label="Date and Time"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select service date and time',
                                },
                            ]}
                        >
                            <DatePicker
                                showTime={{ format: 'HH:mm' }}
                                format="YYYY-MM-DD HH:mm"
                                showNow={false}
                                minuteStep={15}
                                allowClear={false}
                                disabledDate={
                                    current => {
                                        let date = new Date()
                                        date = new Date(date.toDateString())
                                        return current && current.valueOf() < date
                                    }
                                }
                                disabledTime={
                                    () => ({
                                        disabledHours: () => this.generateRange(this.props.start_time, this.props.end_time)
                                    })
                                }
                            />
                        </Form.Item>

                        <Form.Item
                            name="pickup"
                            label="Pick-Up?"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select if you want pickup',
                                },
                            ]}
                        >
                            <Radio.Group>
                                <Radio value={1} disabled={!this.props.pick_up}> Yes </Radio>
                                <Radio value={0}> No </Radio>
                            </Radio.Group>
                        </Form.Item>

                        <p>Total Price: ${this.props.price}</p>

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
 
export default MakeBookingForm;