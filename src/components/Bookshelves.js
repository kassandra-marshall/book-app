import React, { useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

function Bookshelves () {
    useEffect(() => {
        axios.get('https://books.google.com/books')
            .then(res => console.log(res))
            .catch(err => console.error(err))
    }, [])
    return (
        <h1>Bookshelves</h1>
    ) 
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps, {}) (Bookshelves);