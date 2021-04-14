import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'

class SearchBooks extends React.Component {
    state = {
        query: '',
        resultBooks: []
    }

    shelfedBooksID = () => {
        let IDs = []
        this.props.shelfedBooks.forEach((book) => {
            IDs.push(book.id)
        })
        return IDs
    }



    seraching = (query) => {
        this.setState({ query: query})
        if (query.trim()) {

            BooksAPI.search(query)
                .then((books) => {
                    if (books && books.length) {
                        books.forEach( async (book) => {
                            if ( this.shelfedBooksID().includes(book.id) ) {
                                book.shelf = 'exist'
                            } else {
                                book.shelf = 'none'
                            }
                        })
                        this.setState({ resultBooks: books })

                    } else {
                        this.setState({ resultBooks: [] })
                    }
                })

        } else {
            this.setState({ books: [] })
        }
    }

    render() {
        let shelf = false

        if (this.state.resultBooks.length && !this.state.resultBooks.error) {
            shelf = true
        }

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={(e) => this.seraching(e.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    {shelf && this.state.query.length ? <BookShelf title='Search Result' books={this.state.resultBooks} reload={this.props.reload} /> : null}
                </div>
            </div>
        )
    }

}

// 
// NOTES: The search from BooksAPI is limited to a particular set of search terms.
// You can find these search terms here:
// https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

// However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
// you don't find a specific author or title. Every search is limited by search terms.
//                 

export default SearchBooks