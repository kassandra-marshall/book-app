import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import axios from 'axios';

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
    // console.log(bookData.volumeInfo.imageLinks.thumbnail)
    return (
        bookData ? (
        <div>
            <h1>{bookData.volumeInfo.title}</h1>
            <img src={bookData.volumeInfo.imageLinks.thumbnail} alt='thumbnail' />
            <p>By: {bookData.volumeInfo.authors}</p>
            <p>Description: {bookData.volumeInfo.description}</p>
            <p>Categories: {bookData.volumeInfo.categories}</p>
            <p>Published in: {bookData.volumeInfo.publishedDate}</p>
            <a href={bookData.volumeInfo.previewLink} target="_blank" rel="noreferrer">View on Google Books</a>
        </div>
        ) : null
    )
}

export default Book;