import React, { Component, useEffect } from 'react';
import { Menu, Row, Col, Button, Space, Input, Slider, Image } from 'antd';
import { withRouter } from './withRouter';
import ResultCard from './ResultCard';

import styles from '../css/manageShopPage.module.css'
import cookie from 'react-cookies';
import axios from 'axios';

class ShopDetailPage extends Component {

    state = {
        id: this.props.params.id,
        // data: {}, 
        data:{
            user_id: "",
            phone: "",
            end_time: "]",
            shop_name: "",
            description: "",
            address: "",
            start_time: "",
            id: '',
            image: "", 
            services: [],
        },
        // loading: true
    }

    constructor(props) {
        super(props);
        this.fetchShopDetail()
        this.fetchServices()
    }

    fetchShopDetail = () => {
        axios.get('http://localhost:8080/shops/getShopDetail/' + this.state.id)
            .then((res) => {
                var shopData = res.data
                if (this.state.data['services'] == []){
                    shopData["services"] = []
                }else{
                    shopData["services"] = this.state.data["services"]
                }
                if (res.status === 200) {
                        this.setState({
                        data: shopData,
                        // loading: false
                    })
                }
            }).catch((error) => {
                console.log(error)
            })
    }
    fetchServices = () => {
        axios.get('http://localhost:8080/shops/getServices/' + this.state.id)
            .then((res) => {
                console.log("++++++")
                
                var updateData = this.state.data

                updateData["services"] = res.data
                console.log(updateData)
                if (res.status === 200) {
                        this.setState({
                        data: updateData,
                        // loading: false
                    })
                }
            }).catch((error) => {
                console.log(error)
            })
    }

    renderProfile() {
        return (
            <Profile
                id={this.state.data._id}
                shopName={this.state.data.shop_name}
                location={this.state.data.address}
                contactNumber={this.state.data.phone}
                imgSrc={this.state.data.image}
                availableTime={this.state.data.start_time + " - " + this.state.data.end_time}

            />
        );
    }

    renderServices() {
        return (
            <Services
                services={this.state.data.services}
                usertype={cookie.load('role')}
            />
        );
    }

    render() {

        return (
            <span>
                {/* {this.state.loading ?
                    <div>Loading .... </div>
                    : */}
                    <div id={styles['shopProfilePage']}>
                        <Row id="shopProfileRow">
                            <Col span={8} id={styles['profileModule']}>
                                {this.renderProfile()}
                            </Col>
                            <Col span={16} id={styles['servicesModule']}>
                                {this.renderServices()}
                            </Col>
                        </Row>
                    </div>
                {/* } */}
            </span>
        );
    }
}

class Profile extends Component {

    render() {

        return (
            <div >

                <div className={styles.title}>
                    {"Shop Profile"}
                </div>
                <Image
                    preview={false}
                    style={{ padding: 20, width: 350, height: 450, borderRadius: 100 / 2 }}
                    src={this.props.imgSrc}

                />
                <span id={styles['profileTextlines']}>
                    <div>
                        {this.props.shopName}
                    </div>
                    <div>
                        {"Location: " + this.props.location}
                    </div>
                    <div>
                        {"ContactNumber: " + this.props.contactNumber}
                    </div>
                    <div>
                        {"Available Time: " + this.props.availableTime}
                    </div>
                </span>
            </div>
        );
    }
}

class Services extends Component {

    render() {
        return (

            <div>
                <div className={styles.title}>
                    {"Available Services"}
                    {this.props.userType === "customer" ? null : <button id={styles["AddServices"]} className="yellowButton" type="submit">
                        + Add Services
                    </button>}
                </div>
                <div>
                    <Row>
                        {this.props.services.map((service, key) => {
                            return (
                                <Col span={8}>
                                    <ResultCard
                                        name={service.service_name}
                                        imgSrc={service.image}
                                        location={service.location}
                                        time={service.time}
                                        rating={service.rating}
                                        isService={true}
                                    />
                                </Col>
                            )
                        }
                        )}
                    </Row>
                </div>
            </div>
        );
    }
}

export default withRouter(ShopDetailPage);
export { Profile, Services };
