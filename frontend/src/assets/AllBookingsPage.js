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
                //this.props.navigate('/business/profile')
                this.fetchAllBookingsBusiness();
            }
            else {
                this.fetchAllBookings();
            }
        }
    }


    state = {
        isBusiness: cookie.load('role') === "business" ? true : false,
        loading: true,
        openCancelConfirm: false,
        openLeaveCommentCard: false,
        pendingDelteService: null,
        pendingCommentService: null,
        userId: cookie.load('id'),
        incomingBookings: [],
        pastBookings: []
    }

    processResData(data) {
        const currentTime = new Date();

        let pastBookings = [];
        let incomingBookings = [];

        data.sort(function (a, b) {
            const date1 = new Date(a.time)
            const date2 = new Date(b.time)

            return date1 - date2;
        })

        for (let booking of data) {
            let time = new Date(booking.time);

            let formattedTime = time.getFullYear() + '/' + (time.getMonth() + 1) + '/' + time.getDate() + "-" + time.getHours() + ":" + time.getMinutes();

            let text = time.getMinutes().toString();

            if (text.length === 1) {
                formattedTime = formattedTime + "0";
            }

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


    fetchAllBookingsBusiness = () => {
        let shopId = this.props.params.shopId;

        axios.get('http://localhost:8080/bookings/getAllShopBookings/' + shopId)
            .then((res) => {
                // console.log(res.data)
                if (res.status === 200) {
                    console.log(res);

                    let data = res.data;

                    this.processResData(data);
                }
                else {
                    console.log(res);
                    // showAlert('error', 'Something went wrong');
                    this.setState({
                        incomingBookings: [],
                        pastBookings: [],
                        loading: false
                    })
                }
            }).catch((error) => {
                console.log(error);
                showAlert('error', 'Something went wrong');
                this.setState({
                    incomingBookings: [],
                    pastBookings: [],
                    loading: false
                })
            })
    }

    fetchAllBookings = () => {
        axios.get('http://localhost:8080/bookings/getAllBookings/' + this.state.userId)
            .then((res) => {
                // console.log(res.data)
                if (res.status === 200) {

                    let data = res.data;

                    this.processResData(data);
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
                    {
                        this.state.pendingDelteService.pick_up ?
                            <p>Are you sure you want to cancel {this.state.isBusiness ? this.state.pendingDelteService.username + "'s" : null} booking for pick up service: {this.state.pendingDelteService.service_name}?</p> :
                            <p>Are you sure you want to cancel {this.state.isBusiness ? this.state.pendingDelteService.username + "'s" : null} booking for {this.state.pendingDelteService.service_name} at {this.state.pendingDelteService.time}?</p>
                    }
                    <Row id={allBookingPageStyle.cancelBookingConfirmRow}>
                        <Col span={12}>
                            <button className={generalStyles.redButton}
                                id={allBookingPageStyle.confirmDelete}
                                onClick={(e) => this.confirmDeleteBooking()}
                            >
                                Confirm
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

    handleUpdateServiceTotalSold(service_id) {
        let data = {
            id: service_id,
            value: -1
        }
        axios.post(`http://localhost:8080/services/updateTotalSold`, data)
            .then(res => {
                console.log(res);
            }).catch((error) => {
                console.log(error);
            })
    }

    confirmDeleteBooking = (e) => {
        console.log("confirm delete this booking");
        let service = this.state.pendingDelteService;
        if (service === null || !service.available) {
            showAlert('error', 'Please select a booking first');
        }
        else {
            console.log(service);

            let data = {
                id: service.id
            }

            axios.post(`http://localhost:8080/bookings/deleteBooking`, data)
                .then(res => {
                    if (res.status === 200) {
                        showAlert('success', 'Successfully deleted this booking');
                        this.handleUpdateServiceTotalSold(service.service_id);
                        this.setState({
                            openCancelConfirm: false,
                            pendingDelteService: null
                        });
                        window.location.reload(false);
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
        if (service === null || !service.available) {
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


                        axios.post(`http://localhost:8080/services/updateServiceRating`, { serviceId: service.service_id })
                            .then(res => {
                                console.log(res);
                            }).catch((error) => {
                                console.log(error);
                            })
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


    handleViewServiceDetial = (e) => {
        if (!this.state.isBusiness) {
            this.props.navigate('/serviceDetailPage/' + e.service_id);
        }
    }

    render() {

        return (
            <div id={allBookingPageStyle.mainContent}>
                {this.state.openCancelConfirm ? this.cancelBookingConfirmationCard() : null}
                {this.state.openLeaveCommentCard ? this.leaveCommentCard() : null}
                {this.state.loading ?
                    <p id={allBookingPageStyle.loadingP}>Loading ... </p> :
                    <Row id={allBookingPageStyle.mainContentRow}>
                        <Col id={allBookingPageStyle.incomingBookingsCol} span={12}>
                            <p className={allBookingPageStyle.title} >Incoming Bookings</p>
                            {this.state.incomingBookings.map((service, key) => {
                                return (
                                    // this.state.isBusiness ? <p>Show Business Incoming Bookings Now</p> : this.customerIncomingBookingCard({ service }, { key })
                                    <div className={service.pick_up && this.state.isBusiness ? allBookingPageStyle.serviceCardBusiness : allBookingPageStyle.serviceCard} key={key}>
                                        <Row >
                                            <Col span={7} className={allBookingPageStyle.nameCol} onClick={(e) => this.handleViewServiceDetial(service)}>
                                                <p>{service.service_name}</p>
                                                <p>Price: {service.price}</p>
                                            </Col>

                                            <Col span={7} className={allBookingPageStyle.timeCol}>
                                                <p>Time: {service.time}</p>
                                                {service.pick_up ? <p>
                                                    Pick Up Service
                                                </p> : null}
                                                <p>{service.username}</p>
                                            </Col>

                                            <Col span={10} className={service.pick_up && this.state.isBusiness ? allBookingPageStyle.buttonColBusiness : allBookingPageStyle.buttonCol}>
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
                                    // this.state.isBusiness ? <p>Show Business Past Bookings Now</p> : this.customerPastBookingCard({ service }, { key })
                                    <div className={this.state.isBusiness ? allBookingPageStyle.serviceCard : service.available ? allBookingPageStyle.serviceCard : allBookingPageStyle.serviceCardUnavailable} key={key}>
                                        <Row >
                                            <Col span={10} className={allBookingPageStyle.pastBookingNameCol} onClick={(e) => this.handleViewServiceDetial(service)}>
                                                <p>{service.service_name}</p>
                                                <p>Price: {service.price}</p>
                                            </Col>

                                            <Col span={14} className={allBookingPageStyle.buttonColPast}>
                                                {this.state.isBusiness ?
                                                    <button
                                                        className={`${allBookingPageStyle.usernameButton} ${allBookingPageStyle.leaveCommentButton}`}
                                                    >
                                                        {service.username}
                                                    </button> :
                                                    service.available ?
                                                        <button
                                                            className={`${generalStyles.yellowButton} ${allBookingPageStyle.leaveCommentButton}`}
                                                            onClick={(e) => this.showCommentCard(service)}
                                                        >
                                                            Leave a Comment
                                                        </button> : <button
                                                            className={`${allBookingPageStyle.unavailableButton}`}
                                                        >
                                                            Service Unavailable
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