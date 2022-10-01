import React, { Component } from 'react';
import { Menu, Row, Col, Input } from 'antd';
import cookie from 'react-cookies';
import axios from 'axios';
import { withRouter } from './withRouter';
import ResultCard from './ResultCard';
import searchResultPageStyle from '../css/searchResultPage.module.css';



const { Search } = Input;


class SearchResultPage extends Component {

    constructor(props) {
        super(props);

        if (cookie.load('id') !== undefined) {
            if (cookie.load('role') === "business") {
                this.props.navigate('/business/profile');
            }
        }

        let name = this.state.name;
        let method = this.state.method;

        console.log(name, method);

        if (method === 'service') {
            this.searchServices();
        }
        else {
            this.searchShops();
        }
    }

    state = {
        name: this.props.params.name,
        method: this.props.params.method,
        searchResults: []
    }

    searchServices = () => {

        axios.get('http://localhost:8080/services/search/' + this.state.name.toLowerCase())
            .then((res) => {

                if (res.status === 200) {
                    console.log(res.data);
                    this.setState({
                        searchResults: res.data
                    })
                }
                if (res.status === 204) {
                    console.log('No content');
                }
            }).catch((error) => {
                console.log(error)
            })
    }

    searchShops = () => {
        axios.get('http://localhost:8080/shops/search/' + this.state.name.toLowerCase())
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                }
            }).catch((error) => {
                console.log(error)
            })
    }

    render() {

        return (
            <div id={searchResultPageStyle.searchResultMainDiv}>
                <Row id={searchResultPageStyle.searchResultMainRow}>
                    {this.state.searchResults.map((service, key) => {
                        return (
                            <Col span={6}>
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
                </Row>
            </div>
        );
    }
}
export default withRouter(SearchResultPage);