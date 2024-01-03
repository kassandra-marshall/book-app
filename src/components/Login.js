import { GoogleLogin } from "react-google-login";
import { connect } from "react-redux";
import { addUser } from "../actions/actions";


function Login(props) {
    const cliendId = process.env.REACT_APP_GOOGLE_CLIENT_ID

    const onSuccess = (res) => {
        props.addUser({
            email: res.profileObj.email,
            name: res.profileObj.name,
            image: res.profileObj.imageUrl
        })

    }

    const onFailure = (res) => {
        console.log("LOGIN FAILED! res: ", res)
    }
    return(
        <div id="signInButton">
            <GoogleLogin
                clientId={cliendId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { addUser })(Login)