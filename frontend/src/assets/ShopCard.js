import React, { Component } from 'react';
import { Image } from 'antd';
import { withRouter } from './withRouter';
import ShopCardStyle from '../css/shopCard.module.css'

class ShopCard extends Component {
    constructor(props) {
        super(props);
    }

    checkDetail = (e) => {
        this.props.navigate('/business/manageShop/' + this.props.id);
    }

    render() {
        return (

            <div className={ShopCardStyle.cover} onClick={this.checkDetail.bind(this)}>
                <Image
                    preview={false}
                    style={{ padding: 10, width: 300, height: 200, borderRadius: 50 }}
                    className={ShopCardStyle.image}
                    src={this.props.image}
                />
                <p className={ShopCardStyle.paragraph}>{this.props.shopName}</p>
            </div>


        );
    }
}

export default withRouter(ShopCard);