import React, {useEffect, useState} from "react";
import axios from "axios";
import '../BookList.css'
import { Link } from "react-router-dom";
// import Book from "./Book";


function BookList() {
    const url = 'https://www.googleapis.com/books/v1/volumes';
    const placeholder = 'https://minalsampat.com/wp-content/uploads/2019/12/book-placeholder.jpg';
    // use following in protected booklist component to add features such as saving to libraries
    // const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
    // const clientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    // const clientSecret = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
    const [searchTerms, setSearchTerms] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        
    }, [searchTerms])
    
    const handleChange = (e) => {
        setSearchTerms(e.target.value) 
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.get(`${url}?q=${searchTerms}`)
            .then(res => {
                setSearchResults(res.data.items)
            })
            .catch(err => {
                console.log(err)
            });
    }
    
    // const handleClick = (e) => {
    //     e.preventDefault();
    //     // call book component and go to book link
    //     <Book />
    // }

    return (
        
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>
                    Search books
                </label>
                <input 
                    placeholder="Search Here"
                    name="search-term"
                    onChange={handleChange}
                />
                <button>Search</button>
            </form>
            {searchResults ? (
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
                                    <p>By: {(item.volumeInfo.authors).join(", ")}</p>
                                    
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

export default BookList;