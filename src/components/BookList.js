import React, {useEffect, useState} from "react";
import axios from "axios";
import '../BookList.css'


function BookList(user) {
    const url = 'https://www.googleapis.com/books/v1/volumes';
    const placeholder = 'https://minalsampat.com/wp-content/uploads/2019/12/book-placeholder.jpg';
    // const proxy = 'https://proxy-server-pi.vercel.app'
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
                // console.log(res.data.items)
                setSearchResults(res.data.items)
            })
            .catch(err => {
                console.log(err)
            });
    }
    // const results = searchResults.map(item => {
    //     console.log(item.volumeInfo)
    //     return {
    //         id: item.id,
    //         title: item.volumeInfo.title,
    //         // authors: (item.volumeInfo.authors).map(author => {return author}),
    //         authors: item.volumeInfo.authors,
    //         description: item.volumeInfo.description,
    //         image: item.volumeInfo.imageLinks.smallThumbnail
    //     }
    // })
    // console.log(results)
    return (
        (user ? (
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
            <div className="grid-container">
                <ul>
                    {searchResults.map(item => {
                        return (
                            <div key={item.id} className="grid-item">
                                <li>{item.volumeInfo.title}</li>
                                {item.volumeInfo.imageLinks === undefined ?
                                <img src={placeholder} style={{height: 192, width: 128}} alt="generic-thumbnail"/> : 
                                <img src={item.volumeInfo.imageLinks.thumbnail} alt="thumbnail"/>}
                                {/* <p>{item.volumeInfo.authors}</p> */}
                                <div className="description">
                                    <p>{item.volumeInfo.description}</p>
                                </div>
                                <a href={item.volumeInfo.infoLink}>View on Google Books</a>
                            </div>
                            
                        )
                    })}
                </ul>   
            </div>
            
        </div>
        ) : null )
    )
}

export default BookList;