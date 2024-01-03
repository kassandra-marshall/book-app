import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import axios from 'axios';
import '../styles/Book.css'

function Book () {
    const params = useParams()
    const url = 'https://www.googleapis.com/books/v1/volumes/'
    const [bookData, setBookData] = useState();
    useEffect(() => {
        axios.get(url+params.id)
        .then(res => {
            console.log(res.data)
            setBookData(res.data)
        })
        .catch(err => {console.error(err)})
    }, []) //eslint-disable-line
    
    return (
        bookData ? (
        <div className='book-wrapper'>
            <div className='left'>
                <h1>{bookData.volumeInfo.title}</h1>
                <p>By: {bookData.volumeInfo.authors}</p>
                
                <div className='cover'>
                    <p>Categories: {bookData.volumeInfo.categories}</p>
                    <p>Published in: {bookData.volumeInfo.publishedDate}</p>
                    <img src={bookData.volumeInfo.imageLinks.thumbnail} alt='thumbnail' />
                </div>
            </div>
            <div className='left-top'>
                <a href={bookData.volumeInfo.previewLink} target="_blank" rel="noreferrer">View on Google Books</a>
            </div>
            <div id='description'>
                <p>Description: {bookData.volumeInfo.description}</p>
            </div>
        </div>
        ) : null
    )
}

export default Book;