const booksModel = require('./booksModel');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

class Book {
    constructor(id, title, author) {
        this.id = id;
        this.title = title;
        this.author = author;
    }
}

var schema = buildSchema(`
    input BookInput {
        title: String
        author: String
    }
    type Book {
        id: ID!
        title: String
        author: String
    }
    type Query {
        getBook(id: ID!): Book
        getBooksByAuthor(author: String): [Book]!
        getBooks: [Book!]!
    }
    type Mutation {
        createBook(input: BookInput): Book
        updateBook(id: ID!, input: BookInput): Book
        deleteBook(id: ID!): String
    }
`);

var root = {
    getBook: async ({ id }) => {
        try {
            var book = await booksModel.BookModel.findById(id);

            if (!books) {
                throw new Error('No book exists with id: ' + id);
            }

            return new Book(id, book.title, book.author);
        } catch(error) {
            throw new Error(error.message);
        }
    },
    getBooks: async () => {
        try {
            var books = await booksModel.BookModel.find();
            var booksList = [];

            books.forEach(book => {
                booksList.push(new Book(book._id, book.title, book.author));

            });

            return booksList;
        } catch(error) {
            throw new Error(error.message);
        }
    },
    getBooksByAuthor: async ({ author }) => {
        try {
            var books = await booksModel.BookModel.find({ author: author });
            var booksList = [];

            books.forEach(book => {
                booksList.push(new Book(book._id, book.title, book.author));

            });

            return booksList;
        } catch(error) {
            throw new Error(error.message);
        }
    },
    createBook: async ({ input }) => {
        try {
            var book = new booksModel.BookModel({ title: input.title, author: input.author });
            book.save();

            return new Book(book._id, book.title, book.author);
        } catch(error) {
            throw new Error(error.message);
        }
    },
    updateBook: async ({ id, input }) => {
        try {
            if (!await booksModel.BookModel.findById(id)) {
                throw new Error('No book exists with id: ' + id);
            }

            var book = { title: input.title, author: input.author };
            await booksModel.BookModel.findByIdAndUpdate(id, book);
            var updatedBook = await booksModel.BookModel.findById(id);

            return new Book(id, updatedBook.title, updatedBook.author);
        } catch(error) {
            throw new Error(error.message);
        }
    },
    deleteBook: async ({ id }) => {
        try {
            if (!await booksModel.BookModel.findById(id)) {
                throw new Error('No book exists with id: ' + id);
            }

            await booksModel.BookModel.findByIdAndDelete(id);

            return 'Deleted book with id ' + id;
        } catch(error) {
            throw new Error(error.message);
        }
    }
};

module.exports = function(app) {

    app.use('/graphql', graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    }));
}