import React, { Component } from 'react';
import { Row, Col, Button, Input, Rate, Form } from 'antd';
import { withRouter } from './withRouter';
import '../css/allBookingsPage.css';
import showAlert from './Alert';

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
                <div className='validationCardcCancelBooking'>
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
                    <p>Leave your comments and rating for {this.state.pendingCommentService.name}</p>

                    <Form onFinish={this.confirmLeaveComment.bind(this)}>
                        <Row >
                            <Row id="commentRatingRow">
                                <Col span={24}><p>Please select your rating for this service</p></Col>
                                <Col span={24}>
                                    <div id="rating">
                                        <Form.Item
                                            name="rating"
                                            rules={[{ required: true, message: 'Please select a rating!' }]}>
                                            <Rate id="serviceRating" defaultValue={0} name="rating" />
                                        </Form.Item>
                                    </div>
                                </Col>
                            </Row>

                            <Col span={24} className="commentCardCol">
                                <p>Please leave your comment: </p>
                                <Form.Item
                                    name="comment"
                                    rules={[{ required: true, message: 'Please input your comment!' }]}
                                >
                                    <TextArea rows={4} id="commentInputTextArea" name="comment" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row id="leaveCommentConfirmRow">
                            <Col span={12}>
                                <Form.Item>
                                    <Button
                                        id="confirCommentSubmit"
                                        shape="round"
                                        type="primary"
                                        htmlType="submit"
                                    // onClick={(e) => this.confirmLeaveComment()}
                                    >
                                        Submit Comment
                                    </Button>
                                </Form.Item>
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
                    </Form>
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

    confirmLeaveComment = (para) => {
        console.log("confirm leave a comment");
        let service = this.state.pendingCommentService;
        if (service === null) {
            showAlert('error', 'Please select a booking first');
        }
        else {
            console.log(para);

            let rating = para.rating;

            let comment = para.comment;

            console.log(rating, comment);

            showAlert('success', 'Thanks for your comment');

            this.setState({
                openLeaveCommentCard: false,
                pendingCommentService: null
            });
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
                        <p className="title" >Incoming Bookings</p>
                        {this.state.incomingBookings.map((service, key) => {
                            return (
                                <div className="serviceCard" key={key}>
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
                        <p className="title">Past Bookings</p>
                        {this.state.pastBookings.map((service, key) => {
                            return (
                                <div className="serviceCard" key={key}>
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