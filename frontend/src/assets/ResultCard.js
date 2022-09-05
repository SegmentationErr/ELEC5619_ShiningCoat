import React, { Component } from 'react';
import { Card } from 'antd';
import { Row, Col, Image } from 'antd';
import { withRouter } from './withRouter';


class ResultCard extends Component {
    constructor(props) {
        super(props);
    }

    checkDetail = (e) => {
        console.log("Nav to service detial page");
        console.log(this.props.id);
        if (this.props.isService) {
            console.log("This is a service, go to service detail page");
        }
        else {
            console.log("This is a shop, go to shop details page");
        }
        // this.props.navigate('/signIn/' + this.props.serviceId);
        //TODO nav to detial page
    }

    render() {
        return (
            <div onClick={this.checkDetail.bind(this)}>
                <Image
                    preview={false}
                    style={{ width: 200, height: 200, borderRadius: 400 / 2 }}
                    width={200}
                    src={this.props.imgSrc}
                />
                <p>{this.props.name}</p>
                <p>Rating: {this.props.rating}</p>
                <p>{this.props.location}</p>
                <p>{this.props.time}</p>
            </div>
        );
    }
}

export default withRouter(ResultCard);