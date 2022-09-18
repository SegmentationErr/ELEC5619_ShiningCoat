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
    }

    state = {
        name: this.props.params.name,
        method: this.props.params.method,
        searchResults: [
            {
                name: "this is the serach result",
                location: "service1 location",
                time: "9-17pm",
                imgSrc: "https://www.rd.com/wp-content/uploads/2021/01/GettyImages-1175550351.jpg",
                _id: "serviceTestId",
                rating: 4,
                isService: true
            },
            {
                name: "this is test shop",
                location: "service2 location",
                time: "9-17pm",
                imgSrc: "https://www.rd.com/wp-content/uploads/2021/01/GettyImages-1175550351.jpg",
                _id: "serviceTestId",
                rating: 4,
                isService: false
            },
            {
                name: "service3",
                location: "service3 location",
                time: "9-17pm",
                imgSrc: "https://www.rd.com/wp-content/uploads/2021/01/GettyImages-1175550351.jpg",
                _id: "serviceTestId",
                rating: 4,
                isService: true
            },
            {
                name: "service4",
                location: "service4 location",
                time: "9-17pm",
                imgSrc: "https://www.rd.com/wp-content/uploads/2021/01/GettyImages-1175550351.jpg",
                _id: "serviceTestId",
                rating: 4,
                isService: true
            },
            {
                name: "service5",
                location: "service1 location",
                time: "9-17pm",
                imgSrc: "https://www.rd.com/wp-content/uploads/2021/01/GettyImages-1175550351.jpg",
                _id: "serviceTestId", rating: 4,
                isService: true
            },
            {
                name: "service6",
                location: "service2 location",
                time: "9-17pm",
                imgSrc: "https://www.rd.com/wp-content/uploads/2021/01/GettyImages-1175550351.jpg",
                _id: "serviceTestId", rating: 4,
                isService: true
            },
            {
                name: "service7",
                location: "service3 location",
                time: "9-17pm",
                imgSrc: "https://www.rd.com/wp-content/uploads/2021/01/GettyImages-1175550351.jpg",
                _id: "serviceTestId", rating: 4,
                isService: true
            },
            {
                name: "service8",
                location: "service4 location",
                time: "9-17pm",
                imgSrc: "https://www.rd.com/wp-content/uploads/2021/01/GettyImages-1175550351.jpg",
                _id: "serviceTestId",
                rating: 4,
                isService: true
            }
        ]
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
export default withRouter(SearchResultPage);