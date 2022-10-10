import React, { Component } from 'react';
import { withRouter } from './withRouter';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { message } from 'antd';
import cookie from 'react-cookies';
import axios from "axios";

import styles from '../css/LikedServiceCard.module.css'


class LikedServiceCard extends Component {

    state = {
        like_service: true,
        liking: false,
    }

    handleRedirection = () => {
        this.props.navigate('/serviceDetailPage/' + this.props.service_id)
        window.location.reload()
    }
    
    changeLikeState = () => {
        if (this.state.liking) {
            return
        }

        this.setState({
            liking: true
        })

        let data = {
            user_id: cookie.load('id'),
            service_id: this.props.service_id
        }

        axios.post(`http://localhost:8080/likedServices/likeOrUnlike`, data)
            .then(res => {
                if (res.status === 200) {
                    message.success(res.data)
                    this.setState({
                        like_service: !this.state.like_service,
                        liking: false
                    })
                }
            }).catch((error) => {
                this.setState({
                    liking: false
                })
                message.error('Like/Unlike Failed')
            })
    }

    render() { 
        return (
            <div>
                <div className={styles.card} onClick={() => {this.handleRedirection()}}>
                    {this.props.service_name}
                </div>
                {this.state.like_service ? 
                    <HeartFilled className={styles.heart} onClick={()=>this.changeLikeState()}/>
                    :
                    <HeartOutlined className={styles.heart} onClick={()=>this.changeLikeState()}/>
                }
            </div>
        );
    }
}
 
export default withRouter(LikedServiceCard);