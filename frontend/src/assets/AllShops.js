import React, { Component } from 'react';
import { Row, Col, message } from 'antd';
import axios from 'axios';
import generalStyle from '../css/generalComponents.module.css';
import allShopStyle from '../css/allShops.module.css';
import AddEditShopForm from './AddEditShopForm';

import cookie from 'react-cookies';


class ManageShopsPage extends Component {
    constructor(props) {
        super(props);
        this.fetchAllShops();
    }

    state = {
        id: cookie.load('id'),
        showForm: false,
        data: []
        // profile: {
        //     'username': 'Fetching Data...',
        //     'email': 'Fetching Data...',
        // },
        // newProfile: {},
        // validation: false
    }

    fetchAllShops = () => {
        console.log("fetch all shops")
        axios.get('http://localhost:8080/shops/getAllShopsById/' + this.state.id)
            .then((res) => {
                // console.log(res.data)
                if (res.status === 200) {
                    console.log(res);
                    this.setState({
                        data: res.data
                    })
                }
            }).catch((error) => {
                console.log(error)
            })
    }

    openAddShopForm = (e) => {
        this.setState({ showForm: true });
    }

    handleCancel = () => {
        this.setState({ showForm: false });
    }

    handleConfirm = () => {
        this.setState({ showForm: false });
    }


    render() {
        return (
            <div>
                {this.state.showForm ? <AddEditShopForm handleConfirm={this.handleConfirm} handleCancel={this.handleCancel} /> : null}
                <Col id={allShopStyle.addShopButtonCol}>
                    <button className={generalStyle.yellowButton} onClick={this.openAddShopForm.bind(this)}>+ Add Shop</button>
                </Col>
                <Col id={allShopStyle.mainContentsCol}>
                    {this.state.data.length === 0 ?
                        <div>No Shops Yet</div>
                        : <div>show some shops</div>
                    }
                </Col>
            </div>
        );
    }
}

export default ManageShopsPage;