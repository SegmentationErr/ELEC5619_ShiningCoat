import React, { Component } from 'react';
import { Form, Input, Row, Col } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Profile, Services } from './ShopDetailPage';


import styles from '../css/manageShopPage.module.css'

class Shop extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        // id: this.props.params.id,
        data: {
            shopName: "shop1",
            location: "xxxStreet",
            contactNumber: "1234567",
            imgSrc: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            _id: "shopTestId",
            availableTime: "9:00-10:00",
            services: [
                {
                    name: "service1",
                    location: "service1 location",
                    time: "9-17pm",
                    imgSrc: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                    _id: "serviceTestId",
                    rating: 4
                },
                {
                    name: "service2",
                    location: "service2 location",
                    time: "9-10pm",
                    imgSrc: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                    _id: "serviceTestId",
                    rating: 4
                },
                {
                    name: "service3",
                    location: "service3 location",
                    time: "9-10pm",
                    imgSrc: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                    _id: "serviceTestId",
                    rating: 4
                },
                {
                    name: "service4",
                    location: "service4 location",
                    time: "9-10pm",
                    imgSrc: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                    _id: "serviceTestId",
                    rating: 4
                },
            ]
        },
    }

    renderProfile() {
        return (
            <Profile
                // props contains two things
                id={this.state.data._id}
                shopName={this.state.data.shopName}
                location={this.state.data.location}
                contactNumber={this.state.data.contactNumber}
                imgSrc={this.state.data.imgSrc}
                availableTime={this.state.data.availableTime}

            />
        );
    }

    renderServices() {
        return (
            <Services
                // props contains two things
                services={this.state.data.services}
            />
        );
    }
    render() {
        return (

            <div id={styles["ManageShopsProfilePage"]}>
                <Row id={styles["ManageShopsProfileRow"]}>
                    <Col span={8}>
                        {this.renderProfile()}
                        <button className="yellowButton" type="submit">
                            Edit shop
                        </button>
                    </Col>
                    <Col span={16}>
                        {this.renderServices()}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Shop;