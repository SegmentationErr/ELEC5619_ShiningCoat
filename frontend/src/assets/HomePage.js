import React, { Component } from 'react';
import { Row, Col, Image } from 'antd';
import axios from 'axios';
import showAlert from './Alert';
import ResultCard from './ResultCard';
import cookie from 'react-cookies';


import homePageStyle from '../css/homePage.module.css';
import { withRouter } from './withRouter';


class HomePage extends Component {
    constructor(props) {
        super(props);
        if (cookie.load('id') !== undefined) {
            if (cookie.load('role') === "business") {
                this.props.navigate('/business/profile')
            }
            else {
                //TODO: update this function to handle liked service
                this.fetchAllServices();
            }
        }
        else {
            this.fetchAllServices();
        }
    }

    state = {
        isModalVisible: false,
        loading: true,
        data: [],
    }

    fetchUserInfo() {

    }

    fetchAllServices = () => {
        axios.get('http://localhost:8080/services/getAllServicesByRating')
            .then((res) => {
                // console.log(res.data)
                if (res.status === 200) {
                    console.log(res);

                    let data = res.data;

                    this.setState({ data: data, loading: false });
                }
                else {
                    console.log(res);
                    showAlert('Error', 'Something went wrong');
                }
            }).catch((error) => {
                console.log(error);
                showAlert('Error', 'Something went wrong');
            })
    }

    render() {
        return (
            <div className={homePageStyle.homePageMainDiv}>
                {this.state.loading === false ? <Row className={homePageStyle.homePageMainRow}>
                    {this.state.data.map((service, key) => {
                        return (
                            <Col span={6} key={key}>
                                <ResultCard
                                    key={key}
                                    name={service.service_name}
                                    imgSrc={service.image}
                                    id={service.id}
                                    rating={service.rating}
                                    isService={true}
                                    startTime={service.start_time}
                                    endTime={service.end_time}
                                    location={service.address}
                                    history={this.props.history}
                                />
                            </Col>
                        )
                    })}
                </Row> : <p>Loading</p>}
            </div>
        );
    }
}

export default withRouter(HomePage);