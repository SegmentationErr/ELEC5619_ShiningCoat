import React, { Component } from 'react';
import { Image } from 'antd';
import { withRouter } from './withRouter';


class ResultCard extends Component {
    constructor(props) {
        super(props);
    }

    checkDetail = (e) => {
        if (this.props.isService) {
            this.props.navigate('/serviceDetailPage/' + this.props.id);
        }
        else {
            this.props.navigate('/shopDetailPage/' + this.props.id);
        }
    }

    render() {
        return (
            <div onClick={this.checkDetail.bind(this)}>
                <Image
                    preview={false}
                    style={{ padding: 10, width: 200, height: 200, borderRadius: 400 / 2 }}
                    width={200}
                    src={this.props.imgSrc}
                />
                <div id="info" style={{ "lineHeight": "50%" }}>
                    <p>{this.props.name + ' (' + this.props.rating + ')'} </p>
                    {/* <div>Rating: {this.props.rating}</div> */}
                    <p>{this.props.location}</p>
                    <p>{this.props.time}</p>
                </div>
            </div>
        );
    }
}

export default withRouter(ResultCard);