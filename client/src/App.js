import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import BookList from './components/BookList';
import AddBook from './components/AddBook';
import './App.css';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GQL_CLIENT,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <h1>Book List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
