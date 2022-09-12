import React, { Component } from 'react';
import { Menu, Row, Col, Button, Space, Input, Slider } from 'antd';
import { withRouter } from './withRouter';
import ResultCard from './ResultCard';
import '../css/allBookingsPage.css'



class AllBookingsPage extends Component {

    constructor(props) {
        super(props);

        console.log(this.state.userId);
    }

    state = {
        userId: this.props.params.userId,
        incomingBookings: [
            {
                id: "testId",
                name: "service1",
                price: 100,
                time: "time here",
                isPickUp: false
            },
        ],
        pastBookings: [

        ]
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
                                    <Row gutter={16}>
                                        <Col>
                                            <p>{service.name}</p>
                                            <p>{service.price}</p>
                                        </Col>
                                        <div>
                                            {service.isPickUp ?
                                                <p>
                                                    Pick Up service
                                                </p> :
                                                <p>
                                                    {service.time}
                                                </p>
                                            }
                                        </div>
                                        <div>
                                            <Button
                                                type="danger"
                                                shape="round"
                                            >
                                                Cancel Booking
                                            </Button>
                                        </div>
                                    </Row>

                                </div>
                            )
                        })}
                    </Col>
                    <Col id="pastBookingsCol" span={12}>
                        <p class="title">Past Bookings</p>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default withRouter(AllBookingsPage);