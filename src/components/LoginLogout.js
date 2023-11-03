import React, {useEffect, useState} from "react";
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import axios from "axios";
import { connect } from "react-redux";
import { addToken, deleteUser } from "../actions/actions"; 
import { Link } from "react-router-dom";

function LoginLogout (props) {
    const { addToken } = props
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState();
  
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse) 
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
                            Accept: 'application/json',
                            // CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                            // CLIENT_SECRET: process.env.REACT_APP_GOOGLE_CLIENT_SECRET
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
                    

                }

        },
        [ user ]
    );

    async function checkIfExists(user) {
        await user;
        if (user.access_token)
            addToken(user.access_token)
        if (user)
            console.log(user)
    }
  checkIfExists(user);
  //   log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
        deleteUser()

    }
    
    return (
    <div>            
            {profile ? (
                <div>
                    <img src={profile.picture} alt="user" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <Link to='/bookshelves'>Bookshelves</Link>
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
        token: state.token
    }
}

export default connect(mapStateToProps, {addToken, deleteUser})(LoginLogout);