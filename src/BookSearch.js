import React from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types'
import './App.css'
const BookSearch =(props)=> {

    const saveShelf=(bookid,item)=>{
        props.handleShelfChange(bookid,item)
    }
    const handleChange=(event)=>{
        props.doSearch(event.target.value)
    }
    return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to = "/">Close</Link>
            <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title or author" onChange={handleChange}/>
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
            {props.bookResultList &&
                props.bookResultList.map((book)=><li key={book.id}>
                                    <Book bookitem={book} updateShelf={(bookid,item)=>saveShelf(bookid,item)}/></li>)}

            </ol>
          </div>
        </div>
    )

}
BookSearch.propTypes = {
    handleShelfChange:PropTypes.func.isRequired,
    doSearch:PropTypes.func.isRequired,
    bookResultList:PropTypes.array.isRequired
}
export default BookSearch
