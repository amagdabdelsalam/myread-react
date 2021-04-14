import React from 'react'
import Book from './Book'

class BookShelf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {books: []};
  }
  static getDerivedStateFromProps(props, state) {
    return {books: props.books ? props.books : [] };
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
           {this.state.books.map((book) => (
             
            <Book
              key={book.id}
              bookID={book.id}
              title={book.title}
              thumbnail={ book.imageLinks ? book.imageLinks.thumbnail : ''  }
              authors={book.authors}
              shelf={book.shelf}
              reload={this.props.reload}
            />
           ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf