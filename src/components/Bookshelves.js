import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { addUser } from "../actions/actions";

function Bookshelves (props) {
    const {userID, addUser, token} = props
    const [givenUserID, setGivenUserID] = useState('')
    const key = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY

    
    const handleChange = (e) => {
        setGivenUserID(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // addUser(givenUserID)
        axios.get(`https://www.googleapis.com/books/v1/mylibrary/bookshelves?key=${key}`, {
            headers: {
                Authorization: `Bearer ${token}`, 
                // Authorization: token
            }    
        })
            .then(res => console.log(res))
            .catch(err => console.error(err))
    }
    return (
        
        <div> 
            {token === "" ? <div>
                <h1>Bookshelves</h1>
                <p>Instructions:</p>
                <ol>
                    <li>Login</li>
                </ol>
            </div> : 
            <div>
            <ol>
                <li>Navigate to Google Books Website using this link:</li>
                        <a href="https://books.google.com/books"target="_blank" rel="noreferrer">Google Books</a>
                    <li>Log in using Google credentials</li>
                    <li>Look at URL and copy numbers after "uid="</li>
                    <li>Bring that ID number back to this page and paste it into the User ID box</li>
                    <li>Start building your library!</li>
                </ol>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label>User ID</label>
                    <input
                        name="userID"
                        placeholder="User ID goes here"
                        type="number"
                        onChange={(e) => handleChange(e)}
                    />
                    <button>Submit</button>
                </form>
            {/* // <div>
            //     <ul>
            //         <li>Favorites</li>
            //         <li>Reading Now</li>
            //         <li>To Read</li>
            //         <li>Have Read</li>
            //         <li>Books For You</li>
            //     </ul>
            // </div> */}
            </div>

            }
        </div>  
    ) 
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps, {addUser}) (Bookshelves);