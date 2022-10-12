import React, { Component } from 'react';
import { Row, Col } from 'antd';
import cookie from 'react-cookies';
import axios from 'axios';
import { withRouter } from './withRouter';
import ResultCard from './ResultCard';
import searchResultPageStyle from '../css/searchResultPage.module.css';
import showAlert from './Alert';


class SearchResultPage extends Component {

    constructor(props) {
        super(props);

        if (cookie.load('id') !== undefined) {
            if (cookie.load('role') === "business") {
                this.props.navigate('/business/profile');
            }
        }

        let method = this.state.method;

        if (method === 'service') {
            this.searchServices();
        }
        else {
            this.searchShops();
        }
    }

    state = {
        laoding: true,
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
                        searchResults: res.data,
                        loading: false
                    })
                }
                if (res.status === 204) {
                    console.log('No content');
                    this.setState({
                        searchResults: [],
                        loading: false
                    })
                }
            }).catch((error) => {
                console.log(error);
                showAlert('error', 'Something went wrong');
                this.setState({
                    searchResults: [],
                    loading: false
                })
            })
    }

    searchShops = () => {
        axios.get('http://localhost:8080/shops/search/' + this.state.name.toLowerCase())
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    this.setState({
                        searchResults: res.data,
                        loading: false
                    })
                }
                if (res.status === 204) {
                    console.log('No content');
                    this.setState({
                        searchResults: [],
                        loading: false
                    })
                }
            }).catch((error) => {
                console.log(error);
                showAlert('error', 'Something went wrong');
                this.setState({
                    searchResults: [],
                    loading: false
                })
            })
    }

    render() {

        return (
            <div id={searchResultPageStyle.searchResultMainDiv}>
                {this.state.loading === false ?
                    <Row id={searchResultPageStyle.searchResultMainRow}>
                        {this.state.searchResults.map((service, key) => {
                            return (
                                <Col span={6}>
                                    {this.state.method === "service" ?
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
                                        /> : <ResultCard
                                            key={key}
                                            name={service.shop_name}
                                            imgSrc={service.image}
                                            id={service.id}
                                            rating={service.averagerating}
                                            isService={false}
                                            startTime={service.start_time}
                                            endTime={service.end_time}
                                            location={service.address}
                                            history={this.props.history}
                                        />}
                                </Col>
                            )
                        })}
                        {this.state.searchResults.length === 0 ? <p>No Matching Result</p> : null}
                    </Row> : <p>Loading</p>}
            </div>
        );
    }
}
export default withRouter(SearchResultPage);