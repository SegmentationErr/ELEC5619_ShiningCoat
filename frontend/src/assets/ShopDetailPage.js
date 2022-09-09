import React, { Component } from 'react';
import { Menu, Row, Col, Button, Space, Input, Slider, Image } from 'antd';
import { withRouter } from './withRouter';
import ResultCard from './ResultCard';

import '../css/shopDetailPage.css'

class ShopDetailPage extends Component {

    constructor(props) {
        super(props);

        // console.log(this.state.id);
    }

    state = {
        id: this.props.params.id,
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
    renderProfile(){
        return (
            <Profile 
                // props contains two things
                id = {this.state.data._id}
                shopName = {this.state.data.shopName}
                location = {this.state.data.location}
                contactNumber = {this.state.data.contactNumber}
                imgSrc = {this.state.data.imgSrc}
                availableTime = {this.state.data.availableTime}             

            />
        );
    }

    renderServices(){
        return (
            <Services
                // props contains two things
                services = {this.state.data.services}        
            />
        );
    }

    render() {

        return (
            <div id="shopProfilePage">
                <Row id="shopProfileRow">
                {/* This is shop detial page */}
                    <Col span={8} id="profile">
                        {this.renderProfile()}
                    </Col>
                    <Col span={16} id="services">
                        {this.renderServices()}
                    </Col>
                </Row>
            </div>
        );
    }
}

class Profile extends Component {

    render() {
        
        return (
            <div >
            
                <div class="title">
                    {"Shop Profile"}
                </div>
                <Image
                    preview={false}
                    style={{ padding: 20, width: 350, height: 450, borderRadius: 100 / 2}}
                    src={this.props.imgSrc}

                />
                <span id="profileTextlines">
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
                        {"Available Time: " +this.props.availableTime}
                    </div>
                </span>
            </div>
        );
      }
}

class Services extends Component {

    render() {
        return(
            
            <div>                 
                <div class="title">
                    {"Available Services"}
                </div>
                <div>
                    <Row id="homePageMainRow">
                        {this.props.services.map((service, key) => {
                            return (
                                <Col span={8}>
                                    <ResultCard
                                        name={service.name}
                                        imgSrc={service.imgSrc}
                                        location={service.location}
                                        time={service.time}
                                        rating={service.rating}
                                        isService={true}
                                    />
                                </Col>
                            )}
                        )}
                    </Row>
                </div>
            </div>           
        );
    }
}

export default withRouter(ShopDetailPage);