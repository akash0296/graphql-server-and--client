import React from 'react';
import { graphql } from 'react-apollo';

import { getBookQuery } from '../../queries';

class BookDetails extends React.Component {
  render() {
    const { loading, book, error } = this.props.data;
    if (!this.props.bookId) return null;
    if (loading) return <div>Loading Books...</div>;
    if (book)
      return (
        <div id='book-details'>
          <h2>{book.name}</h2>
          <h3>Genre - {book.genre}</h3>
          <span>by - {book.author && book.author.name}</span>
          <div>
            {book.author && book.author.books.length ? (
              <>
                <h3>Other books by this author</h3>{' '}
                <ul>
                  {book.author.books.map((bookItem) => (
                    <li key={bookItem._id}>{bookItem.name}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </div>
      );
    if (error) return <pre>Error fetching book details</pre>;
  }
}

export default graphql(getBookQuery, {
  options: (props) => ({
    variables: {
      _id: props.bookId,
    },
  }),
})(BookDetails);
