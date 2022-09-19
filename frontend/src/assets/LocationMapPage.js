import React, { Component } from 'react';
import { withRouter } from './withRouter';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

export class LocationMapPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [{latitude: -33.90428987369043, longitude: 151.21296156415127},
              {latitude: -33.91261474034315, longitude: 151.20668461866637}]
    }
  }

  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return <Marker key={index} id={index} position={{
       lat: store.latitude,
       lng: store.longitude
     }}
     onClick={() => console.log("You clicked me!")} />
    })
  }

  render() {
    return (
        <Map
          google={this.props.google}
          zoom={11}
          initialCenter={{ lat: -33.82853551936511, lng: 151.22307859455668}}
        >
          {this.displayMarkers()}
        </Map>
    );
  }
}

export default withRouter(GoogleApiWrapper({
  apiKey: 'AIzaSyBt7S96F1cWsrNxFThKk2E6Q5a7b132G6Y'
})(LocationMapPage));