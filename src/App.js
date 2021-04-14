import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import BookShelf from './BookShelf'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.reload()
  }

  reload = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books: books })
      })
  }

  render() {
    const currentlyReading = this.state.books.filter((book) => {
      return book.shelf === 'currentlyReading'
    })
    const wantToRead = this.state.books.filter((book) => {
      return book.shelf === 'wantToRead'
    })
    const read = this.state.books.filter((book) => {
      return book.shelf === 'read'
    })
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBooks shelfedBooks={this.state.books} reload={this.reload} />
        )} />

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf title='Currently Reading' books={currentlyReading} reload={this.reload}/>
                <BookShelf title='Want to Read' books={wantToRead} reload={this.reload}/>
                <BookShelf title='Read' books={read} reload={this.reload}/>
              </div>
            </div>
            <div className="open-search">
              <Link className='open-search-button' to="/search">Add a book</Link>
            </div>
          </div>
        )} />

      </div>
    )
  }
}

export default BooksApp
