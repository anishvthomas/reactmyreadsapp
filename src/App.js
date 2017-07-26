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
  updateShelf=(bookid,item)=>{
      console.log("BookList.handleShelfChange",bookid,item)
      BooksAPI.update({id:bookid},item).then((response)=>{
          BooksAPI.getAll().then((books)=> {
              this.setState({bookDisplayList:books})
              })
          }
      )
  }
  render() {
    return (
      <div className="app">
      <Route exact path="/" render={()=>(<BookList bookList={this.state.bookDisplayList}
          handleShelfChange={this.updateShelf}
          clearSearch={this.clearSearchResults}/>)}
      />
      <Route path="/search" render={()=>(<BookSearch bookList={this.state.bookDisplayList}
          bookResultList={this.state.bookSearchResultList}
          handleShelfChange={this.updateShelf}
          doSearch={this.searchBooks}/>)}
          />
      </div>
    )
  }
clearSearchResults(){
    this.setState({bookSearchResultList:[]})
}
componentDidMount(){
    this.getBookList()
}

getBookList=()=>{
    BooksAPI.getAll().then((books)=> {
        console.log("books",books)
        console.log(books.map((book)=>book.title))
        this.setState({bookDisplayList:books})

    })
}

searchBooks=(query)=>{

        console.log("Searchkey: "+query)
        if(query.trim())
            BooksAPI.search(query.trim(),20).then((response)=>{
                console.log("res",response)
                if(!response.error) {
                    //Compare and correct teh shelf state of books from
                    //the result by matching it with the results from the display page
                    var updatedResponse=response.map((bookreturned)=>{
                        var bookexists = this.state.bookDisplayList.filter((showbook)=> {
                            return showbook.id===bookreturned.id})
                            if(bookexists.length > 0)
                            {
                                bookreturned.shelf=bookexists[0].shelf
                            }
                        else
                            bookreturned.shelf="None"
                        return bookreturned});

                    this.setState({bookSearchResultList:updatedResponse})

                    /*this.setState({bookResultList:response.map((book)=>{
                        console.log("book:",book)
                        if(book['id']){
                        var bookid=book.id
                        var bookexists ;
                        console.log("this.props.bookList")
                        //= this.props.bookList.filter(showbook=> showbook.id===bookid)
                        if(bookexists)
                            book.shelf=bookexists.shelf
                        else
                            book.shelf="None"}

                    }
                )})*/
                }
            })

}
}
export default BooksApp
