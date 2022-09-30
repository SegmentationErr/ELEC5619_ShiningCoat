import React, { Component } from 'react';
import { withRouter } from './withRouter';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import axios from "axios";

export class LocationMapPage extends Component {
    constructor(props) {
        super(props);
        this.fetchMapInfo()
    }

    state = {
        id: this.props.params.id,
        lng: null,
        lat: null
    }

    fetchMapInfo() {
        axios.get('http://localhost:8080/services/getMapInfoById/' + this.state.id)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        lng: res.data.lng,
                        lat: res.data.lat
                    })
                }
            }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <Map
              google={this.props.google}
              zoom={11}
              initialCenter={{ lat: -33.82853551936511, lng: 151.22307859455668}}
            >
                <Marker position={{ lat: this.state.lat, lng: this.state.lng}} />
            </Map>
        );
    }
}

export default withRouter(GoogleApiWrapper({
  apiKey: 'AIzaSyBt7S96F1cWsrNxFThKk2E6Q5a7b132G6Y'
})(LocationMapPage));