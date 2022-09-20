import React, { Component } from 'react';
import { Image } from 'antd';
import { withRouter } from './withRouter';


class ShopCard extends Component {
    constructor(props) {
        super(props);
    }

    checkDetail = (e) => {
        this.props.navigate('/business/manageShop/' + this.props.id);
    }

    render() {
        return (
            <div onClick={this.checkDetail.bind(this)}>
                {/* <Image
                    preview={false}
                    style={{ padding: 10, width: 200, height: 200, borderRadius: 400 / 2 }}
                    width={200}
                    src={this.props.image}
                /> */}
                <div id="info" style={{ "lineHeight": "50%" }}>
                    <p>TETS</p>
                    <p>{this.props.shopName} </p>
                </div>
            </div>
        );
    }
}

export default withRouter(ShopCard);