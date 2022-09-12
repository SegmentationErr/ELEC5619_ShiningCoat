import React, { Component } from 'react';
import { Menu, Row, Col, Button, Space, Input, Slider } from 'antd';
import { withRouter } from './withRouter';
import ResultCard from './ResultCard';
import '../css/allBookingsPage.css'



class AllBookingsPage extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        userId: this.props.params.userId,
        incomingBookings: [
            {
                id: "testId",
                name: "service1",
                price: 100,
                time: "02/02/2022",
                isPickUp: false
            },
            {
                id: "testId",
                name: "service2",
                price: 200,
                time: "03/02/2022",
                isPickUp: false
            },
            {
                id: "testId",
                name: "service3",
                price: 300,
                time: "04/02/2022",
                isPickUp: true
            },
        ],
        pastBookings: [
            {
                id: "testId",
                name: "past service1",
                price: 100,
                time: "01/02/2022",
                isPickUp: false
            },
            {
                id: "testId",
                name: "past service2",
                price: 200,
                time: "01/02/2022",
                isPickUp: false
            },
            {
                id: "testId",
                name: "past service3",
                price: 300,
                time: "01/02/2022",
                isPickUp: true
            },
        ]
    }

    cancelBooking = (e) => {
        let serviceId = e.value;
        console.log(serviceId);
    }

    render() {

        return (
            <div id="mainContent">
                <Row id="mainContentRow">
                    <Col id="incomingBookingsCol" span={12}>
                        <p class="title" >Incoming Bookings</p>
                        {this.state.incomingBookings.map((service, key) => {
                            return (
                                <div class="serviceCard">
                                    <Row >
                                        <Col span={8} className="nameCol">
                                            <p>{service.name}</p>
                                            <p>Price: {service.price}</p>
                                        </Col>

                                        {service.isPickUp ?
                                            <Col span={8} className="timeCol">
                                                <p>
                                                    Pick Up Service
                                                </p>
                                            </Col>
                                            :
                                            <Col span={8} className="timeCol">
                                                <p>Time: </p>
                                                <p>
                                                    {service.time}
                                                </p>
                                            </Col>
                                        }

                                        <Col span={8} className="buttonCol">
                                            <Button
                                                type="danger"
                                                shape="round"
                                                className="cancelBookingButton"
                                                value={service.id}
                                                onClick={this.cancelBooking.bind(this)}
                                            >
                                                Cancel Booking
                                            </Button>
                                        </Col>
                                    </Row>

                                </div>
                            )
                        })}
                    </Col>
                    <Col id="pastBookingsCol" span={12}>
                        <p class="title">Past Bookings</p>
                        {this.state.pastBookings.map((service, key) => {
                            return (
                                <div class="serviceCard">
                                    <Row >
                                        <Col span={12} className="pastBookingNameCol">
                                            <p>{service.name}</p>
                                            <p>Price: {service.price}</p>
                                        </Col>

                                        <Col span={12} className="buttonColPast">
                                            <Button
                                                type="primary"
                                                shape="round"
                                                className="leaveCommentButton"
                                                value={service.id}
                                            >
                                                Leave a Comment
                                            </Button>
                                        </Col>
                                    </Row>

                                </div>
                            )
                        })}
                    </Col>
                </Row>
            </div>
        );
    }
}
export default withRouter(AllBookingsPage);