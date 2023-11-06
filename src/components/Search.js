import React, {useState, useEffect} from "react";
import {  useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { search } from "../actions/actions";

function Search (props) {
    const [searchTerms, setSearchTerms] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        
    }, [searchTerms])

    const handleChange = (e) => {
        setSearchTerms(e.target.value) 
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        props.search(searchTerms)
        navigate('/booklist')
    }
    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Search Books</label>
                <input
                    placeholder="Search Here"
                    name="search-term"
                    onChange={handleChange}
                    />
                <button>Search</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        terms: state.terms
    }
}

export default connect(mapStateToProps, {search})(Search);