import React, {useEffect, useState} from "react";
import axios from "axios";
import '../styles/BookList.css'
import { Link } from "react-router-dom";
import LoginLogout from "./LoginLogout";
import { connect } from "react-redux";
import { clearTerms } from "../actions/actions";

function BookList(props) {
    const { clearTerms, terms } = props
    const url = 'https://www.googleapis.com/books/v1/volumes';
    const placeholder = 'https://minalsampat.com/wp-content/uploads/2019/12/book-placeholder.jpg';
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {    
        async function checkForTerms(searchTerms) {
            await searchTerms
            try {
                axios.get(`${url}?q=${searchTerms}`)
                    .then(res => {
                        setSearchResults(res.data.items)
                        
                    })
                .catch(err => {
                    console.error(err)
                });
            } catch (error) {
                console.log('Something went wrong with Axios request')
            }
        }
        checkForTerms(terms)
            
    }, [terms])

    useEffect(() => {
        if(searchResults) {
            clearTerms()
        }
    }, [searchResults])

    return (
        
        <div className="page">
            <LoginLogout />
            {searchResults !== undefined ? (
                <ul>
                    {searchResults.map(item => {
                        return (
                            <div className="grid-container">

                                <div className="main">
                                    <Link to={`${item.id}`}>
                                        <li key={item.id}>{item.volumeInfo.title}</li>
                                    </Link>
                                    <button onClick={(e) => {
                                        e.preventDefault()
                                        axios.post('http://localhost:9000/books', {
                                            ID: item.id,
                                            Title: item.volumeInfo.title,
                                            URL: item.volumeInfo.infoLink
                                        })
                                            .then(res => {
                                                console.log(res)
                                            })
                                            .catch(err => console.log(err))
                                        }}>Add to My Collection</button>
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
        terms: state.terms,
    }
}

export default connect(mapStateToProps, {clearTerms})(BookList);