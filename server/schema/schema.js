const graphql = require('graphql');
const _ = require('lodash');

const Book = require('../models/book');
const Author = require('../models/author');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
  GraphQLList
} = graphql;

const BookType = new GraphQLObjectType({
  name: 'Book',
  //fields is a function 'cause to help with relations with other types and escape undefined erros.
  fields: () => ({
    _id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    genre: {
      type: GraphQLString
    },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return Author.findById({ _id: parent.authorId });
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  //fields is a function 'cause to help with relations with other types and escape undefined erros.
  fields: () => ({
    _id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({ authorId: parent._id });
      }
    }
  })
});

//Initial queries to get to the defined graph of data
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        _id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        return Book.findById(args._id);
      }
    },
    author: {
      type: AuthorType,
      args: {
        _id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        return Author.findById(args._id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        //code to get data from DB/other sources
        return Book.find();
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        //code to get data from DB/other sources
        return Author.find();
      }
    },
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {
          type: GraphQLString,
        },
        age: {
          type: GraphQLInt,
        },
      },
      resolve(parent, args) {
        const author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: {
          type: GraphQLString,
        },
        genre: {
          type: GraphQLString,
        },
        authorId: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        const book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });
        return book.save();
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
})
