import React from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class Book extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            thumbnail: '',
            authors: [],
            shelf: '',
            shelfSearch: false
        }
    }
    componentDidMount () {
        if (this.state.shelf === "exist") {
             BooksAPI.get(this.state.id).then((book) => {
                 this.setState(() => ({
                    shelfSearch: book.shelf
                 }))
             })
        }
    }
    static getDerivedStateFromProps(props, state) {
        return {
            id: props.bookID,
            title: props.title,
            thumbnail: props.thumbnail,
            authors: props.authors,
            shelf: props.shelf
        }
    }

    move = async (shelf) => {
        try {
            await BooksAPI.update(this.state.id, shelf)
            this.props.reload()
        } catch (error) {
            console.log(error)
        }
            
        
    }

    bookShelf = async (id) => {
        let shelf = await BooksAPI.get(id)
        return shelf.shelf
     }
    
    render() {
        
        return (
            <li key={this.state.bookID}>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{
                            width: 128,
                            height: 193, 
                            backgroundImage: `url(${this.state.thumbnail})` }}>
                        </div>
                        <div className="book-shelf-changer">
                            <select 
                            onChange={(e) => {this.move(e.target.value)}} 
                            value={this.state.shelfSearch ?  this.state.shelfSearch : this.state.shelf}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{this.state.title}</div>
                    <div className="book-authors">{this.state.authors ? this.state.authors.join(' -\n') : null}</div>
                </div>
            </li>
        )
    }

}

Book.propTypes = {
    title: PropTypes.string.isRequired,
    bookID: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    shelf: PropTypes.string,
    authors: PropTypes.array,
    reload: PropTypes.func.isRequired
}

export default Book
