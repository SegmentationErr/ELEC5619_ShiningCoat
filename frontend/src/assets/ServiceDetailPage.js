import React, { Component } from 'react';
import { Image, Card, Row, Col, Button } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';
import { withRouter } from './withRouter';
import cookie from 'react-cookies';

import styles from '../css/serviceDetailPage.module.css'
import axios from "axios";
import AddEditServiceForm from './AddEditServiceForm';

class ServiceDetailPage extends Component {

    constructor(props) {
        super(props);
        this.fetchServiceDetail()
    }

    state = {
        id: this.props.params.id,
        service_details: {
            address: 'Fetching Data...',
            available: true,
            description: 'Fetching Data...',
            image: null,
            lat: null,
            lng: null,
            pick_up: null,
            price: null,
            service_name: 'Fetching Data...',
            shop_name: 'Fetching Data...',
            total_sold: null,
            start_time: null,
            end_time: null,

            showForm: false
            // customer_reviews: [
            //     {
            //         user_name: "James",
            //         content: "Patient service.",
            //         time: "9-17pm",
            //         rating: 4
            //     },
            //     {
            //         user_name: "Bob",
            //         content: "Nice service.",
            //         time: "9-17pm",
            //         rating: 4
            //     }
            // ]
        }
    }

    fetchServiceDetail = () => {
        axios.get('http://localhost:8080/services/getServiceDetailById/' + this.state.id)
            .then((res) => {
                if (res.status === 200) {
                    // console.log(res.data);
                    this.setState({
                        service_details: res.data
                    })
                }
            }).catch((error) => {
            console.log(error)
        })
    }

    checkDetail = (e) => {
        this.props.navigate('/LocationMapPage/' + this.state.id);
    }

    changeFormDisplay = () => {
        if (this.state.showForm) {
            document.body.style.overflow = "visible"
        } else {
            document.body.style.overflow = "hidden"
        }
        this.setState({
            showForm: !this.state.showForm
        })
        // console.log(this.state.service_details)
    }

    render() {
        return (
            <div>
                {this.state.showForm ?
                    <AddEditServiceForm
                        handleCancel={this.changeFormDisplay}
                        shop_id={-1}
                        service_id={this.state.id}
                        service_details={this.state.service_details}
                    /> : null
                }
                <Card id={styles['service_detail']}>
                    <Row>
                        <Col span={12}>
                            <Image
                                preview={false}
                                style={{ margin:50, width: 400, height: 450, borderRadius: 100 / 2}}
                                src={this.state.service_details.image}
                            />
                            <div id={styles['review_text']}>Customer Reviews</div>
                        </Col>
                        <Col span={12}>
                            <div id={styles['details_text']}>
                                <p>{this.state.service_details.service_name}</p>
                                <p>{'Service Provider: ' + this.state.service_details.shop_name}</p>
                                <p>
                                    {'Location: ' + this.state.service_details.address}
                                    <Button id={styles['map']} onClick={this.checkDetail.bind(this)}>Map</Button>
                                </p>
                                <p>{'Available Time: ' + this.state.service_details.start_time + ' to ' + this.state.service_details.end_time}</p>
                                <p>{'Availability for Pick Up: ' + this.state.service_details.pick_up}</p>
                                <p>{'Price: ' + this.state.service_details.price}</p>
                                <p>{'Total Sold: ' + this.state.service_details.total_sold}</p>
                                <p>{'Description: ' + this.state.service_details.description}</p>
                            </div>
                            {cookie.load('role') === "business" ? 
                                <button id={styles["AddServices"]} className="yellowButton" type="submit"
                                    onClick={() => {this.changeFormDisplay()}}
                                >
                                    + Edit Services
                                </button> : null
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Button id={styles['heart']} type='text'><HeartTwoTone twoToneColor="#eb2f96"/></Button>
                    </Row>
                </Card>

            </div>
        );
    }
}
export default withRouter(ServiceDetailPage);