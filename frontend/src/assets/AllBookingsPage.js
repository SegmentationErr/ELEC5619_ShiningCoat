import React, { Component } from 'react';
import { Row, Col, Input, Rate, Form } from 'antd';
import { withRouter } from './withRouter';
import showAlert from './Alert';
import cookie from 'react-cookies';
import axios from 'axios';


import allBookingPageStyle from '../css/allBookingsPage.module.css';
import generalStyles from '../css/generalComponents.module.css';


const { TextArea } = Input;

class AllBookingsPage extends Component {

    constructor(props) {
        super(props);
        if (cookie.load('id') !== undefined) {
            if (cookie.load('role') === "business") {
                this.props.navigate('/business/profile')
            }
            else {
                this.fetchAllBookings();
            }
        }
    }


    state = {
        loading: true,
        openCancelConfirm: false,
        openLeaveCommentCard: false,
        pendingDelteService: null,
        pendingCommentService: null,
        userId: this.props.params.userId,
        incomingBookings: [],
        pastBookings: []
    }

    fetchAllBookings = () => {
        axios.get('http://localhost:8080/bookings/getAllBookings/' + cookie.load('id'))
            .then((res) => {
                // console.log(res.data)
                if (res.status === 200) {
                    console.log(res);

                    let data = res.data;

                    const currentTime = new Date();

                    let pastBookings = [];
                    let incomingBookings = [];

                    for (let booking of data) {
                        let time = new Date(booking.time);

                        let formattedTime = time.getFullYear() + '/' + (time.getMonth() + 1) + '/' + time.getDate() + "-" + time.getHours() + ":" + time.getMinutes();

                        booking.time = formattedTime;

                        if (currentTime > time) {
                            pastBookings.push(booking);
                        }
                        else {
                            incomingBookings.push(booking);
                        }
                    }

                    this.setState({
                        incomingBookings: incomingBookings,
                        pastBookings: pastBookings,
                        loading: false
                    })
                }
                else {
                    console.log(res);
                    this.setState({
                        incomingBookings: [],
                        pastBookings: [],
                        loading: false
                    })
                }
            }).catch((error) => {
                console.log(error)
            })
    }

    cancelBookingConfirmationCard() {
        return (
            <div className={allBookingPageStyle.cover}>
                <div className={allBookingPageStyle.validationCardcCancelBooking}>
                    <p>Are you sure you want to cancel booking for {this.state.pendingDelteService.name}?</p>
                    <Row id={allBookingPageStyle.cancelBookingConfirmRow}>
                        <Col span={12}>
                            <button className={generalStyles.redButton}
                                id={allBookingPageStyle.confirmDelete}
                                onClick={(e) => this.confirmDeleteBooking()}
                            >
                                Confirm Delete
                            </button>
                        </Col>
                        <Col span={12}>
                            <button
                                className={generalStyles.yellowButton}
                                id={allBookingPageStyle.cancel}
                                onClick={(e) => this.doNotCancel()}
                            >
                                Cancel
                            </button>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }

    leaveCommentCard() {
        return (
            <div className={allBookingPageStyle.cover}>
                <div className={allBookingPageStyle.validationCardComment}>
                    <p>Leave your comments and rating for {this.state.pendingCommentService.name}</p>

                    <Form onFinish={this.confirmLeaveComment.bind(this)}>
                        <Row >
                            <Row id={allBookingPageStyle.commentRatingRow}>
                                <Col span={24}><p>Please select your rating for this service</p></Col>
                                <Col span={24}>
                                    <div id={allBookingPageStyle.rating}>
                                        <Form.Item
                                            name="rating"
                                            rules={[{ required: true, message: 'Please select a rating!' }]}>
                                            <Rate id={allBookingPageStyle.serviceRating} defaultValue={0} name="rating" />
                                        </Form.Item>
                                    </div>
                                </Col>
                            </Row>

                            <Col span={24} className={allBookingPageStyle.commentCardCol}>
                                <p>Please leave your comment: </p>
                                <Form.Item
                                    name="comment"
                                    rules={[{ required: true, message: 'Please input your comment!' }]}
                                >
                                    <TextArea rows={4} id={allBookingPageStyle.commentInputTextArea} name="comment" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row id={allBookingPageStyle.leaveCommentConfirmRow}>
                            <Col span={12}>
                                <Form.Item>
                                    <button
                                        className={generalStyles.yellowButton}
                                        id={allBookingPageStyle.confirCommentSubmit}
                                        htmlType="submit"
                                    // onClick={(e) => this.confirmLeaveComment()}
                                    >
                                        Submit Comment
                                    </button>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <button
                                    className={generalStyles.redButton}
                                    id={allBookingPageStyle.cancelComment}
                                    onClick={(e) => this.doNotLeaveComment()}
                                >
                                    Cancel
                                </button>
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

        console.log(e);

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

            let data = {
                rating: rating,
                content: comment,
                userId: cookie.load('id'),
                serviceId: service.service_id
            };

            axios.post(`http://localhost:8080/comments/addComment`, data)
                .then(res => {
                    if (res.status === 200) {
                        showAlert('success', 'Thanks for your comment');

                        this.setState({
                            openLeaveCommentCard: false,
                            pendingCommentService: null
                        });

                    }
                    else {
                        showAlert('warning', 'Something went wrong');
                    }
                }).catch((error) => {
                    console.log(error);
                    showAlert('warning', 'Something went wrong');
                })
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
                {this.state.loading ? <p id={allBookingPageStyle.loadingP}>Loading ... </p> :
                    <Row id={allBookingPageStyle.mainContentRow}>
                        <Col id={allBookingPageStyle.incomingBookingsCol} span={12}>
                            <p className={allBookingPageStyle.title} >Incoming Bookings</p>
                            {this.state.incomingBookings.map((service, key) => {
                                return (
                                    <div className={allBookingPageStyle.serviceCard} key={key}>
                                        <Row >
                                            <Col span={7} className={allBookingPageStyle.nameCol}>
                                                <p>{service.service_name}</p>
                                                <p>Price: {service.price}</p>
                                            </Col>

                                            {service.pick_up ?
                                                <Col span={7} className={allBookingPageStyle.timeCol}>
                                                    <p>
                                                        Pick Up Service
                                                    </p>
                                                </Col>
                                                :
                                                <Col span={7} className={allBookingPageStyle.timeCol}>
                                                    <p>Time: </p>
                                                    <p>
                                                        {service.time}
                                                    </p>
                                                </Col>
                                            }

                                            <Col span={10} className={allBookingPageStyle.buttonCol}>
                                                <button
                                                    className={`${generalStyles.redButton} ${allBookingPageStyle.cancelBookingButton}`}
                                                    onClick={(e) => this.showCancelConfirm(service)}
                                                >
                                                    Cancel Booking
                                                </button>
                                            </Col>
                                        </Row>

                                    </div>
                                )
                            })}
                        </Col>
                        <Col id={allBookingPageStyle.pastBookingsCol} span={10}>
                            <p className={allBookingPageStyle.title}>Past Bookings</p>
                            {this.state.pastBookings.map((service, key) => {
                                return (
                                    <div className={allBookingPageStyle.serviceCard} key={key}>
                                        <Row >
                                            <Col span={10} className={allBookingPageStyle.pastBookingNameCol}>
                                                <p>{service.service_name}</p>
                                                <p>Price: {service.price}</p>
                                            </Col>

                                            <Col span={14} className={allBookingPageStyle.buttonColPast}>
                                                {service.available ?
                                                    <button
                                                        className={`${generalStyles.yellowButton} ${allBookingPageStyle.leaveCommentButton}`}
                                                        onClick={(e) => this.showCommentCard(service)}
                                                    >
                                                        Leave a Comment
                                                    </button> :
                                                    <button
                                                        className={`${generalStyles.redButton} ${allBookingPageStyle.leaveCommentButton}`}
                                                    >
                                                        Not Available
                                                    </button>
                                                }
                                            </Col>
                                        </Row>

                                    </div>
                                )
                            })}
                        </Col>
                    </Row>}
            </div>
        );
    }
}
export default withRouter(AllBookingsPage);