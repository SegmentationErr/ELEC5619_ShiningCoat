import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import {useEffect, useState} from 'react'
import axios from 'axios'
import cookie from 'react-cookies';
import { message } from 'antd';
import { withRouter } from './withRouter';

function GoogleSignIn(props) {
    const [profile, setProfile] = useState([]);
    const clientId = '594879814425-h18tqekm4p3vbujs85b4344mduajoi8g.apps.googleusercontent.com'
    
    useEffect(() => {
        const initClient = () => {
              gapi.client.init({
              clientId: clientId,
              scope: ''
            });
         };
         gapi.load('client:auth2', initClient);
     });

    const onSuccess = (res) => {
        setProfile(res.profileObj);
        let data = {"tokenId": res.tokenId};

        axios.post(`http://localhost:8080/users/googleSignIn`, data)
        .then(res => {
            if (res.status === 200) {
                cookie.save("id", res.data.id)
                cookie.save("role", res.data.role)
                props.navigate('/')
            } else {
                message.error('Username or Email Already Exists.\nCreation Failed.')
            }
        }).catch((error) => {
            console.log(error);
            message.error('Something went wrong.\nPlease Try Again.')
        })
    };
    const onFailure = (err) => {
        console.log('failed:', err);
    };
    
    return (
       <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
        //   isSignedIn={true}
      />
  );
}

export default withRouter(GoogleSignIn);