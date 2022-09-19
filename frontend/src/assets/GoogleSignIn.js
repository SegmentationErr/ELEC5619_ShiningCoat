import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import {useEffect, useState} from 'react'

function GoogleSignIn() {
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
        console.log('success:', res);
    };
    const onFailure = (err) => {
        console.log('failed:', err);
    };
    console.log("user name", profile.name);
    console.log("user email", profile.email);

    return (
       <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
      />
  );
}

export default GoogleSignIn;