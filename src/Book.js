import React from 'react'
import PropTypes from 'prop-types'
import './App.css'
const Book = (props) => {

    const handleChange=(event)=>{
        props.updateShelf(props.bookitem.id,event.target.value)
    }

    return (
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193,
                backgroundImage: `url(${props.bookitem.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select value={props.bookitem.shelf} onChange={handleChange}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{props.bookitem.title}</div>
          <div className="book-authors">{props.bookitem.authors && props.bookitem.authors.join(', ')}</div>
        </div>
    )
}
Book.proptyes ={
    bookitem:PropTypes.object.isRequired,
    updateShelf:PropTypes.func.isRequired
}
export default Book
