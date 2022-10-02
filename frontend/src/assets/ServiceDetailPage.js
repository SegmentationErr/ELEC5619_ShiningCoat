import React, { Component } from 'react';
import { Image, Card, Row, Col, Button, Rate, message } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';
import { withRouter } from './withRouter';
import cookie from 'react-cookies';

import styles from '../css/serviceDetailPage.module.css'
import generalStyles from '../css/generalComponents.module.css'
import axios from "axios";
import AddEditServiceForm from './AddEditServiceForm';
import MakeBookingForm from './MakeBookingForm';

class ServiceDetailPage extends Component {

    constructor(props) {
        super(props);
        this.fetchServiceDetail()
        this.fetchReview()
    }

    state = {
        id: this.props.params.id,
        service_details: {
            address: 'Fetching Data...',
            available: false,
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
        },
        customer_reviews: [
            {
                username: null,
                content: null,
                time: null,
                rating: null
            }
        ],
    }

    fetchServiceDetail = () => {
        axios.get('http://localhost:8080/services/getServiceDetailById/' + this.state.id)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    this.setState({
                        service_details: res.data
                    })
                }
            }).catch((error) => {
            console.log(error)
        })
    }

    fetchReview = () => {
        axios.get('http://localhost:8080/comments/getCommentsById/' + this.state.id)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        customer_reviews: res.data
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
            if (cookie.load('role') === "customer" && !this.state.service_details.available) {
                message.warning("The Service is Currently Unavailable")
                return
            }
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
                {this.state.showForm && cookie.load('role') === "business" ?
                    <AddEditServiceForm
                        handleCancel={this.changeFormDisplay}
                        shop_id={-1}
                        service_id={this.state.id}
                        service_details={this.state.service_details}
                    /> : null
                }
                {this.state.showForm && cookie.load('role') === "customer" ?
                    <MakeBookingForm
                        handleCancel={this.changeFormDisplay}
                        available={this.state.service_details.available}
                        end_time={this.state.service_details.end_time}
                        pick_up={this.state.service_details.pick_up}
                        price={this.state.service_details.price}
                        start_time={this.state.service_details.start_time}
                        shop_id={this.state.service_details.shop_id}
                        service_id={this.props.params.id}
                    /> : null
                }

                <Card id={styles['service_detail']}>
                    <Row>
                        <Col span={12}>
                            <Image
                                preview={false}
                                style={{ margin: 50, width: 400, height: 450, borderRadius: 50 }}
                                src={this.state.service_details.image}
                            />
                            <Button id={styles['heart']} type='text'><HeartTwoTone twoToneColor="#eb2f96" /></Button>
                        </Col>
                        <Col span={12}>
                            <div id={styles['details_text']}>
                                <p>{'Service Name: ' + this.state.service_details.service_name}</p>
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

                            {cookie.load('role') === "business" || cookie.load('role') === "customer" ?
                                <button id={styles["AddServices"]} className={generalStyles.blackButton} type="submit"
                                        onClick={() => { this.changeFormDisplay() }}
                                >
                                    {cookie.load('role') === "business" ? "+ Edit Services" : "Make Booking"}
                                </button> : null
                            }
                        </Col>
                    </Row>
                </Card>
                <Card type="inner" title="Customer Reviews" headStyle={{ backgroundColor: 'transparent' }} id={styles['comments']}>
                    <div>
                        {this.state.customer_reviews?.map(r =>
                            <div id={styles['review_text']}>
                                <div>
                                    {r.username}
                                    <Rate disabled style={{paddingLeft: 10}} defaultValue={0} value={r.rating} />
                                </div>
                                <div>{'Content: '+ r.content}</div>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        );
    }
}
export default withRouter(ServiceDetailPage);