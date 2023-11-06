import React, {useEffect, useState} from "react";
import axios from "axios";
import '../styles/BookList.css'
import { Link } from "react-router-dom";
import LoginLogout from "./LoginLogout";
import { connect } from "react-redux";
import { clearTerms } from "../actions/actions";
// import Book from "./Book";

function BookList(props) {
    const { clearTerms, terms } = props
    const url = 'https://www.googleapis.com/books/v1/volumes';
    const placeholder = 'https://minalsampat.com/wp-content/uploads/2019/12/book-placeholder.jpg';
    // use following in protected booklist component to add features such as saving to libraries
    // const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
    // const clientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    // const clientSecret = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {    
            if (terms !== undefined){
                axios.get(`${url}?q=${terms}`)
                    .then(res => {
                        setSearchResults(res.data.items)
                        clearTerms()
                    })
                .catch(err => {
                    console.error(err)
                });
            } else {
                
            }
            
    }, [terms, clearTerms])
    
    
    return (
        
        <div className="page">
            <LoginLogout />
            {searchResults !== undefined ? (
                <ul>
                    {searchResults.map(item => {
                        return (
                            <div className="grid-container">

                                <div key={item.id} className="main">
                                    <Link to={`${item.id}`}>
                                        <li>{item.volumeInfo.title}</li>
                                    </Link>
                                    {item.volumeInfo.imageLinks === undefined ?
                                    <img src={placeholder} style={{height: 192, width: 128}} alt="generic-thumbnail"/> : 
                                    <img src={item.volumeInfo.imageLinks.thumbnail} alt="thumbnail"/>}
                                    {typeof item.volumeInfo.authors === Array ? <p>By: {(item.volumeInfo.authors).join(", ")}</p> :
                                    <p>By: {item.volumeInfo.authors}</p>}
                                    
                                </div>
                                <div className="description">
                                    <p>{item.volumeInfo.description}</p>
                                    <a href={item.volumeInfo.infoLink} target="_blank" rel="noreferrer">
                                        View More on Google Books</a>
                                </div>
                            </div>
                            
                        )
                    })}
                </ul>   
            ) : null}
        </div>

    )
}
const mapStateToProps = state => {
    return {
        terms: state.terms
    }
}

export default connect(mapStateToProps, {clearTerms})(BookList);