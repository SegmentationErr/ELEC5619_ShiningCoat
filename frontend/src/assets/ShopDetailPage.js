import React, { Component, useEffect } from 'react';
import { Menu, Row, Col, Button, Space, Input, Slider, Image } from 'antd';
import { withRouter } from './withRouter';
import ResultCard from './ResultCard';

import styles from '../css/manageShopPage.module.css'
import cookie from 'react-cookies';
import axios from 'axios';
import AddEditServiceForm from './AddEditServiceForm';

class ShopDetailPage extends Component {

    state = {
        id: this.props.params.id,
        // data: {}, 
        data:{
            user_id: "",
            phone: "",
            end_time: "",
            shop_name: "",
            description: "",
            address: "",
            start_time: "",
            id: "",
            image: "", 
            services: [],
        },
        shop_loading: true,
        service_loading: true,
        showForm: false
    }

    constructor(props) {
        super(props);
        this.fetchShopDetail()
        this.fetchServices()
    }

    fetchShopDetail = () => {
        axios.get('http://localhost:8080/shops/getShopDetail/' + this.state.id)
            .then((res) => {
                this.setState({
                    shop_loading: false
                })

                var shopData = res.data
                shopData["services"] = this.state.data["services"]
                
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
        axios.get('http://localhost:8080/services/getServices/' + this.state.id)
            .then((res) => {
                this.setState({
                    service_loading: false
                })

                if (res.status === 200) {
                    var updateData = this.state.data
                    updateData["services"] = res.data
                    this.setState({
                        data: updateData,
                        // loading: false
                    })
                }
            }).catch((error) => {
                console.log(error)
            })
    }

    changeFormDisplay = () => {
        if (this.state.showForm) {
            document.body.style.overflow = "visible"
        } else {
            document.body.style.overflow = "hidden"
        }
        this.setState({
            showForm: !this.state.showForm
        })
    }

    renderProfile() {
        return (
            <>
                <Profile
                    id={this.state.data._id}
                    shopName={this.state.data.shop_name}
                    location={this.state.data.address}
                    contactNumber={this.state.data.phone}
                    imgSrc={this.state.data.image}
                    availableTime={this.state.data.start_time + " - " + this.state.data.end_time}
                />
                {cookie.load('role') === "customer" ? null :
                    <button className="yellowButton">
                        Edit shop
                    </button>
                }
            </>
        );
    }

    renderServices() {
        return (
            <Services
                services={this.state.data.services}
                changeFormDisplay={this.changeFormDisplay}
            />
        );
    }

    render() {

        return (
            <div>
                {this.state.showForm ? <AddEditServiceForm handleCancel={this.changeFormDisplay} shop_id={this.state.data.id}/> : null}
                <div id={styles['shopProfilePage']}>
                    <Row id="shopProfileRow">
                        <Col span={8} id={styles['profileModule']}>
                            {this.state.shop_loading ? <p>Loading</p> : this.renderProfile()}
                        </Col>
                        <Col span={16} id={styles['servicesModule']}>
                            {this.state.service_loading ? <p>Loading</p> : this.renderServices()}
                        </Col>
                    </Row>
                </div>
            </div>
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
                    <p style={{display: "inline-block"}}>Available Services</p>
                    {cookie.load('role') === "customer" ? null :
                        <button id={styles["AddServices"]} className="yellowButton" type="submit" style={{display: "inline-block", float: 'right'}}
                            onClick={() => {this.props.changeFormDisplay()}}
                        >
                            + Add Services
                        </button>
                    }
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
