import React, { Component } from 'react';
import { Select, Row, Col, Button, Input, Slider } from 'antd';
import { withRouter } from './withRouter';
import '../css/cancelBookingConfirmation.css';

import '../css/allBookingsPage.css';
import showAlert from './Alert';

const { Option } = Select;
const { TextArea } = Input;

class AllBookingsPage extends Component {


    constructor(props) {
        super(props);
    }


    state = {
        openCancelConfirm: false,
        openLeaveCommentCard: false,
        pendingDelteService: null,
        pendingCommentService: null,
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

    cancelBookingConfirmationCard() {
        return (
            <div className='cover'>
                <div className='validationCard'>
                    <p>Are you sure you want to cancel booking for {this.state.pendingDelteService.name}?</p>
                    <Row id="cancelBookingConfirmRow">
                        <Col span={12}>
                            <Button
                                id="confirmDelete"
                                shape="round"
                                type="danger"
                                onClick={(e) => this.confirmDeleteBooking()}
                            >
                                Confirm Delete
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Button
                                id="cancel"
                                shape="round"
                                type="primary"
                                onClick={(e) => this.doNotCancel()}
                            >
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }

    leaveCommentCard() {
        return (
            <div className='cover'>
                <div className='validationCardComment'>
                    <p>Leave your comments and rating for {this.state.pendingCommentService.name}?</p>
                    <Row>
                        <p>Please select your rating for this service</p>
                        <Select
                            defaultValue="5"
                        >
                            <Option value="5">5</Option>
                            <Option value="4">4</Option>
                            <Option value="3">3</Option>
                            <Option value="2">2</Option>
                            <Option value="1">1</Option>
                        </Select>
                        <p>Please leave your comment: </p>
                        <TextArea rows={4} />
                    </Row>
                    <Row id="leaveCommentConfirmRow">
                        <Col span={12}>
                            <Button
                                id="confirCommentSubmit"
                                shape="round"
                                type="primary"
                                onClick={(e) => this.confirmLeaveComment()}
                            >
                                Submit Comment
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Button
                                id="cancelComment"
                                shape="round"
                                type="danger"
                                onClick={(e) => this.doNotLeaveComment()}
                            >
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }

    showCancelConfirm = (e) => {
        this.setState({
            openCancelConfirm: true,
            pendingDelteService: e
        });
    }

    confirmDeleteBooking = (e) => {
        console.log("confirm delete this booking");
        let service = this.state.pendingDelteService;
        if (service === null) {
            showAlert('error', 'Please select a booking first');
        }
        else {
            console.log(service);
            showAlert('success', 'Successfully deleted this booking');
            this.setState({
                openCancelConfirm: false,
                pendingDelteService: null
            });
        }
    }

    doNotCancel = (e) => {
        this.setState({
            openCancelConfirm: false,
            pendingDelteService: null
        });
    }

    showCommentCard = (e) => {
        this.setState({
            openLeaveCommentCard: true,
            pendingCommentService: e
        });
    }

    confirmLeaveComment = (e) => {
        console.log("confirm leave a comment");
        let service = this.state.pendingCommentService;
        if (service === null) {
            showAlert('error', 'Please select a booking first');
        }
        else {
            console.log(service);
            // showAlert('success', 'Successfully deleted this booking');
            // this.setState({
            //     openCancelConfirm: false,
            //     pendingDelteService: null
            // });
        }
    }

    doNotLeaveComment = (e) => {
        this.setState({
            openLeaveCommentCard: false,
            pendingCommentService: null
        });
    }



    render() {

        return (
            <div id="mainContent">
                {this.state.openCancelConfirm ? this.cancelBookingConfirmationCard() : null}
                {this.state.openLeaveCommentCard ? this.leaveCommentCard() : null}
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
                                                onClick={(e) => this.showCancelConfirm(service)}
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
                                                onClick={(e) => this.showCommentCard(service)}
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