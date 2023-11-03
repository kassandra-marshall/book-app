import React from 'react';
import { Routes, Route } from 'react-router-dom'
import BookList from './components/BookList';
import Book from './components/Book';
import './App.css';
import LoginLogout from './components/LoginLogout';
import { Link } from 'react-router-dom';
import Bookshelves from './components/Bookshelves';


function App() {

  return (
    <div>
            <Link to='/booklist'>Search Our Books</Link>
        
        <Routes>
            <Route exact path="/" element={<LoginLogout />}/>
            <Route path='/booklist' element={<BookList />} />
            <Route path="booklist/:id" element={<Book />}/>
            <Route path="bookshelves" element={<Bookshelves />}/>
        </Routes>
    </div>
        
  );
}

export default App;
