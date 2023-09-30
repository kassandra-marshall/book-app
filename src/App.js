import React from 'react';
import { Routes, Route } from 'react-router-dom'
import BookList from './components/BookList';
import Book from './components/Book';
import './App.css';
import LoginLogout from './components/LoginLogout';
import { Link } from 'react-router-dom';


function App() {

  return (
    <body>
    
        <div>
            <Link to='/booklist'>Search Our Books</Link>
        
        <Routes>
            <Route exact path="/" element={<LoginLogout />}/>
            <Route path='/booklist' element={<BookList />} />
            <Route path="booklist/:id" element={<Book />}/>
        </Routes>
        </div>
    </body>
        
  );
}

export default App;
