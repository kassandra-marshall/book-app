import React from 'react';
import { Routes, Route } from 'react-router-dom'
import BookList from './components/BookList';
import Book from './components/Book';
import './App.css';
import { Link } from 'react-router-dom';
import Search from './components/Search';
import { connect } from 'react-redux';
import MyCollection from './components/MyCollection';



function App(props) {  

  return (
    <div className='App'>
      <h1>Book App</h1>
      <p>Create Your Reading List Now</p>
      <div className='link'>
        <Link to='/search' element={<Search />}>Search Our Books</Link> 
        <Link to='/mycollection'>My Collection</Link>
      </div>    
        <Routes>
            <Route exact path="/" element={<Search />} />
            <Route path='/search' element={<Search />} />
            <Route path='/booklist' element={<BookList />} />
            <Route path="/booklist/:id" element={<Book />}/>
            <Route path="/mycollection" element={<MyCollection />} />
        </Routes>
    </div>
        
  );
}

const mapStateToProps = state => {
  return {
    token: state.token
  }
}

export default connect(mapStateToProps, {})(App);
