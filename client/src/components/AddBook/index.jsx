import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../../queries';

class AddBook extends Component {
  state = {
    bookDetails: {
      name: '',
      authorId: '',
      genre: '',
    },
  };

  _handleInputChange = (value, changeFor) => {
    const { bookDetails } = this.state;
    bookDetails[changeFor] = value;
    this.setState({ bookDetails });
  };

  _displayAuthors() {
    const { getAuthorsQuery } = this.props;
    if (getAuthorsQuery.loading)
      return <option disabled>Loading Authors...</option>;
    if (getAuthorsQuery.authors)
      return getAuthorsQuery.authors.map((author) => (
        <option value={author._id} key={author._id}>
          {author.name}
        </option>
      ));
    if (getAuthorsQuery.error)
      return <option disabled>Error Fetching authors...</option>;
  }

  _submitForm(e) {
    e.preventDefault();
    const { bookDetails } = this.state;
    this.props.addBookMutation({
      variables: { ...bookDetails },
      refetchQueries: [{ query: getBooksQuery }],
    });
  }

  render() {
    const { bookDetails } = this.state;
    return (
      <div>
        <form onSubmit={this._submitForm.bind(this)}>
          <div className='form-field'>
            <label htmlFor='book-name'>Book Name</label>
            <input
              type='text'
              id='book-name'
              value={bookDetails.name}
              onChange={(e) => this._handleInputChange(e.target.value, 'name')}
            />
          </div>

          <div className='form-field'>
            <label htmlFor='book-genre'>Genre</label>
            <input
              type='text'
              id='book-genre'
              value={bookDetails.genre}
              onChange={(e) => this._handleInputChange(e.target.value, 'genre')}
            />
          </div>

          <div className='form-field'>
            <label htmlFor='book-author'>Author</label>
            <select
              name='book-author'
              id='book-author'
              placeholder='Select Author'
              onChange={(e) =>
                this._handleInputChange(e.target.value, 'authorId')
              }
            >
              {this._displayAuthors()}
            </select>
          </div>

          <button>Add Book</button>
        </form>
      </div>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);
