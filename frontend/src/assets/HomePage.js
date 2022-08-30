import React, { Component } from 'react';
import { Row, Col, Image } from 'antd';
import axios from 'axios';
import showAlert from './Alert';


import '../css/homePage.css'
import { withRouter } from './withRouter';


class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        isModalVisible: false,
        data: [
            {
                name: "service1",
                location: "service1 location",
                time: "9-17pm",
                imgSrc: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            },
            {
                name: "service2",
                location: "service2 location",
                time: "9-17pm",
                imgSrc: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            },
            {
                name: "service3",
                location: "service3 location",
                time: "9-17pm",
                imgSrc: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            },
            {
                name: "service4",
                location: "service4 location",
                time: "9-17pm",
                imgSrc: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            },
            {
                name: "service5",
                location: "service1 location",
                time: "9-17pm",
                imgSrc: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            },
            {
                name: "service6",
                location: "service2 location",
                time: "9-17pm",
                imgSrc: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            },
            {
                name: "service7",
                location: "service3 location",
                time: "9-17pm",
                imgSrc: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            },
            {
                name: "service8",
                location: "service4 location",
                time: "9-17pm",
                imgSrc: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            }
        ],
    }

    render() {
        return (
            <div id="homePageMainDiv">
                <Row>
                    {this.state.data.map((service, key) => {
                        return (
                            <Col span={6}>
                                <div class="homePageRecommendationInfoDiv">
                                    <Image
                                        style={{ width: 200, height: 200, borderRadius: 400 / 2 }}
                                        width={200}
                                        src={service.imgSrc}
                                    />
                                    <p>{service.name}</p>
                                    <p>{service.location}</p>
                                    <p>{service.time}</p>
                                </div>
                            </Col>
                        )
                    })}
                </Row>
            </div>
        );
    }
}

export default withRouter(HomePage);