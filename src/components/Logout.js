import { GoogleLogout } from "react-google-login";
import { connect } from "react-redux";
import { deleteUser } from "../actions/actions";
import { useNavigate } from "react-router";



function Logout(props) {
    const cliendId = process.env.REACT_APP_GOOGLE_CLIENT_ID
    const navigate = useNavigate()

    const onSuccess = (res) => {
        console.log("Log out successful!")
        props.deleteUser()
        navigate('/')
    }

    const onFailure = (err) => {
        console.error(err)
    }

    return(
        <div id="signOutButton">
            <GoogleLogout
                clientId={cliendId}
                buttonText={"Logout"}
                onLogoutSuccess={onSuccess}
                onFailure={onFailure}
            />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps, { deleteUser })(Logout)