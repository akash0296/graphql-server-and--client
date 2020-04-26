import { gql } from 'apollo-boost';

const getBooksQuery = gql`
  {
    books {
      name
      _id
    }
  }
`;

const getAuthorsQuery = gql`
  {
    authors {
      name
      _id
    }
  }
`;

const addBookMutation = gql`
  mutation($name: String!, $authorId: ID!, $genre: String!) {
    addBook(name: $name, authorId: $authorId, genre: $genre) {
      _id
      name
    }
  }
`;

const getBookQuery = gql`
  query($_id: ID!) {
    book(_id: $_id) {
      _id
      name
      genre
      author {
        name
        age
        books {
          name
          _id
        }
      }
    }
  }
`;

export { getBooksQuery, getAuthorsQuery, addBookMutation, getBookQuery };
