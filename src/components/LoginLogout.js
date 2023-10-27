import React, {useEffect, useState} from "react";
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import axios from "axios";
import { connect } from "react-redux";
import { addToken, addUser } from "../actions/actions"; 

function LoginLogout (props) {
    const { addToken, addUser } = props
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState();
  
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse) 
            addUser(codeResponse.id)
        },
        onError: (error) => console.log('Login Failed:', error)
    });
  
    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
                    
                    addToken(user.access_token)

                }
        },
        [ user ]
    );
  
  //   log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);

    }
    
    return (
    <div>            
            {profile ? (
                <div>
                    <img src={profile.picture} alt="user" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={() => login()}> Sign in with Google 🚀 </button>
            )}
        </div>   
    )
};


const mapStateToProps = state => {
    return {
        token: state.token,
        userID: state.userID
    }
}

export default connect(mapStateToProps, {addUser, addToken})(LoginLogout);