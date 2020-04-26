const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLList } = graphql;

const Book = require('../models/book');
const Author = require('../models/author');
const { BookType, AuthorType } = require('./typeDef');

//Initial queries --- entry point of the defined graph of data
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        _id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        return Book.findById(args._id);
      },
    },
    author: {
      type: AuthorType,
      args: {
        _id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        return Author.findById(args._id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({});
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({});
      },
    },
  },
});

module.exports = RootQuery;
