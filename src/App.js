import React from 'react';
import { Routes, Route } from 'react-router-dom'
import BookList from './components/BookList';
import Book from './components/Book';
import './App.css';
import LoginLogout from './components/LoginLogout';
import { Link } from 'react-router-dom';


function App() {

  return (
    <div>
        <body>
            <Link to='/booklist'>Search Our Books</Link>
        </body>
        <Routes>
            <Route exact path="/" element={<LoginLogout />}/>
            <Route path='/booklist' element={<BookList />} />
            <Route path=":id" element={<Book />}/>
        </Routes>
    </div>    
  );
}

export default App;
