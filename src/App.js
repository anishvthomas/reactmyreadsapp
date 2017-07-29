import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookList from './BookList'
import BookSearch from './BookSearch'
import './App.css'
import {Route} from 'react-router-dom'

class BooksApp extends React.Component {
    state = {
      bookDisplayList:[],
      bookSearchResultList:[]
    }
    /**
    * Update the searchResults with the shelf change
    */
    updateSearchResultsWithShelfChanges = (saveBookId,shelfName) => {
        const indexOfUpdatedBook = this.state.bookSearchResultList.findIndex((bookItem) => {
          return bookItem.id === saveBookId; });

        if( indexOfUpdatedBook >= 0 ) {
          let updatedBook = this.state.bookSearchResultList[indexOfUpdatedBook];
          updatedBook.shelf = shelfName;
          let modifiedBookSearchResultList = this.state.bookSearchResultList;
          modifiedBookSearchResultList.splice(indexOfUpdatedBook,1,updatedBook);
          this.setState({bookSearchResultList:modifiedBookSearchResultList});
        }
    }

    /**
    * Change the shelf of the Book using BooksAPI
    * update the bookDisplayList & searchResults with the latest changes
    */
    updateShelf = (saveBookId,shelfName) => {
        BooksAPI.update({id:saveBookId},shelfName).then((response) => {
            BooksAPI.getAll().then((books) => {
                  this.setState({bookDisplayList:books})
                  })
            /* if Update API was successfull, reflect the shelf changes for that
            book in the searchResults */
            this.updateSearchResultsWithShelfChanges(saveBookId,shelfName);
          }
      )
    }

    render() {
        return (
          <div className="app">
              <Route exact path ="/" render = {() => (<BookList bookList = {this.state.bookDisplayList}
                  handleShelfChange={this.updateShelf}
                  clearSearch={this.clearSearchResults}/>)}
              />
              <Route path ="/search" render = {() => (<BookSearch bookList = {this.state.bookDisplayList}
                  bookResultList={this.state.bookSearchResultList}
                  handleShelfChange={this.updateShelf}
                  doSearch = {this.searchBooks}/>)}
                  />
          </div>
        )
    }

    /**
    *Clear the search results when opening the search page
    */
    clearSearchResults(){
        this.setState({bookSearchResultList:[]})
    }

    componentDidMount(){
        this.getBookList()
    }

    getBookList = () => {
        BooksAPI.getAll().then((books) => {
            this.setState({bookDisplayList:books})
        })
    }

    searchBooks = (queryTerm) => {
        const updateQuery = queryTerm.trim();
        const MAX_RESULTS = 20;
        //perform search only if the query is not empty
        if(updateQuery) {
            BooksAPI.search(updateQuery,MAX_RESULTS).then((response) => {
                if(!response.error) {
                    //Compare and correct the shelf state of books from
                    //the result by matching it with the results from the display page
                    const updatedSearchResults = response.map((bookReturned) => {
                        const bookExists = this.state.bookDisplayList.filter((showbook) => {
                            return showbook.id===bookReturned.id });
                        if (bookExists.length > 0)
                            bookReturned.shelf=bookExists[0].shelf;
                        else
                            bookReturned.shelf="None";
                        return bookReturned});

                    this.setState({bookSearchResultList:updatedSearchResults})
                }
            })
        }
    }
}
export default BooksApp
