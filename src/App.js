import React from 'react';
import { Routes, Route } from 'react-router-dom'
import BookList from './components/BookList';
import Book from './components/Book';
import './App.css';
import LoginLogout from './components/LoginLogout';
import { Link } from 'react-router-dom';
import Bookshelves from './components/Bookshelves';
import Search from './components/Search';


function App() {

  return (
    <div className='App'>
      <h1>Book App</h1>
      <p>Search books by clicking link below or sign in for more options</p>
      <div className='link'>
        <Link to='/search' element={<Search />}>Search Our Books</Link>
      </div>
        
        <Routes>
            <Route exact path="/" element={<LoginLogout />}/>
            <Route path='/search' element={<Search />} />
            <Route path='/booklist' element={<BookList />} />
            <Route path="booklist/:id" element={<Book />}/>
            <Route path="bookshelves" element={<Bookshelves />}/>
        </Routes>
    </div>
        
  );
}

export default App;
