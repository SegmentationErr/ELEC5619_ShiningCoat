import React, { Component } from 'react';
import { Row, Col, Image } from 'antd';
import { withRouter } from './withRouter';
import ResultCard from './ResultCard';

import styles from '../css/manageShopPage.module.css'
import cookie from 'react-cookies';
import axios from 'axios';
import AddEditServiceForm from './AddEditServiceForm';
import AddEditShopForm from './AddEditShopForm';

class ShopDetailPage extends Component {

    state = {
        id: this.props.params.id,
        // data: {}, 
        data: {
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
        showForm: false,
        showEditShopForm: false
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

                console.log(shopData)

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


    changeEditShopFormDisplay = () => {
        if (this.state.showForm) {
            document.body.style.overflow = "visible"
        } else {
            document.body.style.overflow = "hidden"
        }
        this.setState({
            showEditShopForm: !this.state.showEditShopForm
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
                {cookie.load('role') === "business" ?
                    <button className="yellowButton" onClick={this.changeEditShopFormDisplay}>
                        Edit shop
                    </button> : null
                }
            </>
        );
    }

    renderServices() {
        return (
            <Services
                services={this.state.data.services}
                startTime={this.state.data.start_time}
                endTime={this.state.data.end_time}
                changeFormDisplay={this.changeFormDisplay}
            />
        );
    }

    render() {

        return (
            <div>
                {this.state.showForm ? <AddEditServiceForm handleCancel={this.changeFormDisplay} shop_id={this.state.data.id} /> : null}
                {this.state.showEditShopForm ?
                    <AddEditShopForm
                        addShop={false}
                        handleCancel={this.changeEditShopFormDisplay}
                        shop_id={this.state.data.id}
                        shop_name={this.state.data.shop_name}
                        address={this.state.data.address}
                        phone={this.state.data.phone}
                        start_time={this.state.data.start_time}
                        end_time={this.state.data.end_time}
                        description={this.state.data.description}
                        image={this.state.data.image}
                        lat={this.state.data.lat}
                        lng={this.state.data.lng}
                    /> : null}
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
                    <p style={{ display: "inline-block" }}>Available Services</p>
                    {cookie.load('role') === "business" ?
                        <button id={styles["AddServices"]} className="yellowButton" type="submit" style={{ display: "inline-block", float: 'right' }}
                            onClick={() => { this.props.changeFormDisplay() }}
                        >
                            + Add Services
                        </button> : null
                    }
                </div>
                <div>
                    <Row>
                        {this.props.services.map((service, key) => {
                            return (
                                <Col span={8}>
                                    <ResultCard
                                        key={key}
                                        name={service.service_name}
                                        imgSrc={service.image}
                                        location={service.location}
                                        startTime={this.props.startTime}
                                        endTime={this.props.endTime}
                                        rating={service.rating}
                                        isService={true}
                                        id={service.id}
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
