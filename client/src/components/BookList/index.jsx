import React from 'react';
import { graphql } from 'react-apollo';

import { getBooksQuery } from '../../queries';
import BookDetails from '../BookDetails';

class BookList extends React.Component {
  state = {
    selectedBook: null,
  };

  _displayBookList() {
    const { loading, books, error } = this.props.data;
    if (loading) return <div>Loading Books...</div>;
    if (books)
      return (
        <ul>
          {books.map((book) => (
            <li
              key={book._id}
              onClick={() => this.setState({ selectedBook: book._id })}
            >
              {book.name}
            </li>
          ))}
        </ul>
      );
    if (error) return <pre>Error fetching books</pre>;
  }
  render() {
    return (
      <div id='book-list'>
        {this._displayBookList()}
        <BookDetails bookId={this.state.selectedBook} />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
