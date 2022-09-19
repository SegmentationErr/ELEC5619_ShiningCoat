import React, { Component } from 'react';
import { Image, Card, Row, Col, Button } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';
import { withRouter } from './withRouter';

import styles from '../css/serviceDetailPage.module.css'

class ServiceDetailPage extends Component {

    constructor(props) {
        super(props);
        console.log(this.state.id);
    }

    state = {
        id: this.props.params.id,
        data: {
            imgSrc: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            service_name: "Service 1",
            service_provider: "Shop 1",
            location: "xxx Street", //Google Map API
            available_time: "9:00-10:00",
            pick_up: true,
            price: 39.99,
            total_sold: 25,
            description: "This is a excellent SPA service for dogs.",
            customer_reviews: [
                {
                    user_name: "James",
                    content: "Patient service.",
                    time: "9-17pm",
                    rating: 4
                },
                {
                    user_name: "Bob",
                    content: "Nice service.",
                    time: "9-17pm",
                    rating: 4
                }
            ]
        }
    }

    checkDetail = (e) => {
        this.props.navigate('/LocationMapPage/' + this.state.id);
    }

    render() {
        return (
            <div>

                <Card id={styles['service_details']}>
                    <Row>
                        <Col span={12}>
                            <Image
                                preview={false}
                                style={{ margin:50, width: 400, height: 450, borderRadius: 100 / 2}}
                                src={this.state.data.imgSrc}
                            />
                            <div id={styles['review_text']}>Customer Reviews</div>
                        </Col>
                        <Col span={12}>
                            <div id={styles['details_text']}>
                                <p>{this.state.data.service_name}</p>
                                <p>{'Service Provider: ' + this.state.data.service_provider}</p>
                                <p>
                                    {'Location: ' + this.state.data.location}
                                    <Button id={styles['map']} onClick={this.checkDetail.bind(this)}>Map</Button>
                                </p>
                                <p>{'Available Time: ' + this.state.data.available_time}</p>
                                <p>{'Availability for Pick Up: ' + this.state.data.pick_up}</p>
                                <p>{'Price: ' + this.state.data.price}</p>
                                <p>{'Total Sold: ' + this.state.data.total_sold}</p>
                                <p>{'Description: ' + this.state.data.description}</p>
                            </div>
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