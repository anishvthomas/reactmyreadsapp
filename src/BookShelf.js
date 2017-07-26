import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import './App.css'
const BookShelf = (props) => {
    return (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{props.shelfname}</h2>
         <div className="bookshelf-books">
            <ol className="books-grid">
                {props.booklist && props.booklist.map((book)=><li key={book.id}>
                                        <Book bookitem={book} updateShelf={(bookid,item)=>props.saveShelfChange(bookid,item)}/></li>)}
            </ol>
          </div>
        </div>
    )

}
BookShelf.propTypes = {
    shelfname:PropTypes.string.isRequired,
    booklist:PropTypes.array
}

export default BookShelf
