import React, { useState, useEffect } from "react";
import axios from "axios";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { connect } from "react-redux";
import { addToken, addUser, deleteUser } from "../actions/actions";

function LoginLogout(props) {
    const { addToken, deleteUser, addUser, token } = props
    const [user, setUser] = useState();
    const [profile, setProfile] = useState();
    // const scope= 'https://www.googleapis.com/auth/books, https://www.googleapis.com/books/v1/mylibrary/bookshelves';
    // const scopeBS = 'https://www.googleapis.com/books/v1/mylibrary/bookshelves'
    const scopeB = 'https://www.googleapis.com/auth/books'
    // const redirect_uri = 'http://localhost:3000';
    const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID
    const link = 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=';
    // const docLink = 'https://accounts.google.com/o/oauth2/v2/auth';

    const login = useGoogleLogin({
      onSuccess: (codeResponse) => setUser(codeResponse),
      onError: (error) => console.log('Login Failed:', error)
    });
  
    useEffect(
      () => {
        if (user) {
          console.log(user)
          axios
            .get(
                // `${docLink}?scope=${scopeB}&response_type=token&redirect_uri=${redirect_uri}&client_id=${client_id}`
                `${link}${user.access_token}`
                , {
              headers: {             
                Authorization: `Bearer ${user.access_token}`,
                Accept: 'application/json', 
                // scope: scopeB
              }
            })
            .then((res) => {
              setProfile(res.data)
              addToken(user.access_token)
            })
            .catch((err) => console.log(err));
        }
      },
      [user]
    );
    useEffect(() => {
        profile ? 
        addUser({
            name: profile.name,
            email: profile.email,
            image: profile.picture
        }) :
        console.log('no profile yet')
    }, [profile, addUser])
      
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
              
    //           const accessToken = token;
      
    //           const response = await axios.get(`${docLink}?scope=${scopeB}&response_type=token&redirect_uri=${redirect_uri}&client_id=${client_id}`, {
    //             headers: {
    //               Authorization: `Bearer ${accessToken}`,
    //             },
    //           });
      
    //           console.log(response.data);
    //         } catch (error) {
    //             console.log(error)
    //         }
    //       };
      
    //       fetchData();
    // }, [])

    const logOut = () => {
      googleLogout();
      setProfile(null);
      deleteUser()
    };

    return (
        <div>
            {profile ? (
                <div>
                    <img src={profile.picture} alt="user profile" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={() => login()}>Sign in with Google 🚀 </button>
            )}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        token: state.token,
        user: state.user
    }
}

export default connect (mapStateToProps, {addToken, deleteUser, addUser})(LoginLogout);
