import Autocomplete from "react-google-autocomplete";
import React, { Component } from 'react';
import { withRouter } from './withRouter';

const GOOGLE_API_KEY = "AIzaSyCxNuBWSGau-NoH6Q1v0TFHX2FzurRQiSM";

const country = 'au';

const language = 'en';

class AddressAutoCompleteInput extends Component {

    constructor(props) {
        super(props);
    }

    // checkDetail = (e) => {
    //     this.props.navigate('/business/manageShop/' + this.props.id);
    // }

    render() {
        return (
            <Autocomplete
                style={{ width: "50%" }}
                language={language}
                apiKey={GOOGLE_API_KEY}
                onPlaceSelected={this.props.handlePlaceSelected}
                options={{
                    types: ["geocode", "establishment"],
                    componentRestrictions: { country },
                }}
            />
        );
    }
}

export default withRouter(AddressAutoCompleteInput);