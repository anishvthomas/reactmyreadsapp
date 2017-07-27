import React  from 'react'
import {Link} from 'react-router-dom'
import './App.css'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'
const BookList=(props)=> {

    return (
        <div className = "list-books">
          <div className = "list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className = "list-books-content">
            <BookShelf shelfName = "Currently Reading"
                bookList = {props.bookList.filter((book) => book.shelf==="currentlyReading")}
                saveShelfChange={props.handleShelfChange}/>
            <BookShelf shelfName = "Read"
                bookList = {props.bookList.filter((book) => book.shelf==="read")}
                saveShelfChange = {props.handleShelfChange}/>
            <BookShelf shelfName = "Want To Read"
                bookList = {props.bookList.filter((book) => book.shelf==="wantToRead")}
                saveShelfChange={props.handleShelfChange}/>

          </div>
          <div className = "open-search">
            <Link to = "/search" onClick = {props.clearSearch}>Add a book</Link>
          </div>
        </div>
    )
}
BookList.propTypes = {
    handleShelfChange:PropTypes.func.isRequired,
    clearSearch:PropTypes.func.isRequired,
    bookList:PropTypes.array.isRequired
}
export default BookList
