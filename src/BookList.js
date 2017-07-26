import React  from 'react'
import {Link} from 'react-router-dom'
import './App.css'
import BookShelf from './BookShelf'
const BookList=(props)=> {

    return (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <BookShelf shelfname="Currently Reading"
                booklist={props.bookList.filter((book)=>book.shelf==="currentlyReading")}
                saveShelfChange={props.handleShelfChange}/>
            <BookShelf shelfname="Read"
                booklist={props.bookList.filter((book)=>book.shelf==="read")}
                saveShelfChange={props.handleShelfChange}/>
            <BookShelf shelfname="Want To Read"
                booklist={props.bookList.filter((book)=>book.shelf==="wantToRead")}
                saveShelfChange={props.handleShelfChange}/>

          </div>
          <div className="open-search">
            <Link to="/search" onClick={props.clearSearch}>Add a book</Link>
          </div>
        </div>
    )
}

export default BookList
