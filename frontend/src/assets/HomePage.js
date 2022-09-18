import React, { Component } from 'react';
import { Row, Col, Image } from 'antd';
import axios from 'axios';
import showAlert from './Alert';
import ResultCard from './ResultCard';


import homePageStyle from '../css/homePage.module.css';
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
                imgSrc: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                _id: "serviceTestId",
                rating: 4,
                isService: true
            },
            {
                name: "service2",
                location: "service2 location",
                time: "9-17pm",
                imgSrc: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                _id: "serviceTestId",
                rating: 4,
                isService: true
            },
            {
                name: "service3",
                location: "service3 location",
                time: "9-17pm",
                imgSrc: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                _id: "serviceTestId",
                rating: 4,
                isService: true
            },
            {
                name: "service4",
                location: "service4 location",
                time: "9-17pm",
                imgSrc: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                _id: "serviceTestId",
                rating: 4,
                isService: true
            },
            {
                name: "service5",
                location: "service1 location",
                time: "9-17pm",
                imgSrc: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                _id: "serviceTestId", rating: 4,
                isService: true
            },
            {
                name: "service6",
                location: "service2 location",
                time: "9-17pm",
                imgSrc: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                _id: "serviceTestId", rating: 4,
                isService: true
            },
            {
                name: "service7",
                location: "service3 location",
                time: "9-17pm",
                imgSrc: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                _id: "serviceTestId", rating: 4,
                isService: true
            },
            {
                name: "service8",
                location: "service4 location",
                time: "9-17pm",
                imgSrc: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                _id: "serviceTestId",
                rating: 4,
                isService: true
            }
        ],
    }

    render() {
        return (
            <div className={homePageStyle.homePageMainDiv}>
                <Row className={homePageStyle.homePageMainRow}>
                    {this.state.data.map((service, key) => {
                        return (
                            <Col span={6}>
                                <ResultCard
                                    key={key}
                                    name={service.name}
                                    imgSrc={service.imgSrc}
                                    id={service._id}
                                    time={service.time}
                                    rating={service.rating}
                                    isService={service.isService}
                                    history={this.props.history}
                                />
                            </Col>
                        )
                    })}
                </Row>
            </div>
        );
    }
}

export default withRouter(HomePage);