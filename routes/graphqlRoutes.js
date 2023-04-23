const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const BookModel = require('../models/Book');
const AuthorModel = require('../models/Author');

class Book {
    constructor(id, title, author) {
        this.id = id;
        this.title = title;
        this.author = author;
    }
}

class Author {
    constructor(id, name, surname) {
        this.id = id;
        this.name = name;
        this.surname = surname;
    }
}

const schema = buildSchema(`
    input AuthorInput {
        name: String,
        surname: String
    }
    type Author {
        id: ID!
        name: String
        surname: String
    }
    type Book {
        id: ID!
        title: String
        author: Author
    }
    type Query {
        getBook(id: ID!): Book
        getBooks: [Book!]!
        getBooksByAuthor(id: ID!): [Book]!
        getAuthor(id: ID!): Author
        getAuthors: [Author!]!
        getAuthorByBook(id: ID!): Author
    }
    type Mutation {
        createBook(book: String, authorId: ID!): Book
        updateBook(id: ID!, book: String): Book
        deleteBook(id: ID!): String
        createAuthor(author: AuthorInput): Author
        updateAuthor(id: ID!, author: AuthorInput): Author
        deleteAuthor(id: ID!): String
    }
`);

const root = {

    createBook: async ({ book, authorId }) => {
        try {
            if (!await AuthorModel.findById(authorId)) {
                throw new Error('No author exists with id: ' + authorId);
            }

            const newBook = await new BookModel({ title: book, author: authorId }).save();
            createdBook = await BookModel.findById(newBook._id).populate('author');

            const author = new Author(createdBook.author._id, createdBook.author.name, createdBook.author.surname);
            return new Book(createdBook._id, createdBook.title, author);
        } catch(error) {
            throw new Error(error.message);
        }
    },

    updateBook: async ({ id, book }) => {
        try {
            if (!await BookModel.findById(id)) {
                throw new Error('No book exists with id: ' + id);
            }

            const updateBook = { title: book };
            await BookModel.findByIdAndUpdate(id, updateBook);
            
            const getUpdatedBook = await BookModel.findById(id).populate('author');
            const author = new Author(getUpdatedBook.author._id, getUpdatedBook.author.name, getUpdatedBook.author.surname);
            return new Book(id, getUpdatedBook.title, author);
        } catch(error) {
            throw new Error(error.message);
        }
    },

    deleteBook: async ({ id }) => {
        try {
            if (!await BookModel.findById(id)) {
                throw new Error('No book exists with id: ' + id);
            }

            await BookModel.findByIdAndDelete(id);

            return 'Deleted book with id ' + id;
        } catch(error) {
            throw new Error(error.message);
        }
    },

    getBooks: async () => {
        try {
            const books = await BookModel.find().populate('author');
            const booksList = [];

            books.forEach(book => {
                const author = new Author(book.author._id, book.author.name, book.author.surname);
                booksList.push(new Book(book._id, book.title, author));
            });

            return booksList;
        } catch(error) {
            throw new Error(error.message);
        }
    },

    getBook: async ({ id }) => {
        try {
            const book = await BookModel.findById(id).populate('author');

            if (!book) {
                throw new Error('No book exists with id: ' + id);
            }

            const author = new Author(book.author._id, book.author.name, book.author.surname);
            return new Book(id, book.title, author);
        } catch(error) {
            throw new Error(error.message);
        }
    },

    getBooksByAuthor: async ({ id }) => {
        try {
            if (!await AuthorModel.findById(id)) {
            throw new Error('No author exists with id: ' + id);
            }
  
            const books = await BookModel.find({ author: id }).populate('author');
            const booksList = [];

            books.forEach(book => {
                const author = new Author(book.author._id, book.author.name, book.author.surname);
                booksList.push(new Book(book._id, book.title, author));
            });

            return booksList;
        } catch(error) {
            throw new Error(error.message);
        }
    },

    createAuthor: async ({ author }) => {
        try {
            const newAuthor = new AuthorModel({ name: author.name, surname: author.surname });
            newAuthor.save();

            return new Author(newAuthor._id, newAuthor.name, newAuthor.surname);
        } catch(error) {
            throw new Error(error.message);
        }
    },

    updateAuthor: async ({ id, author }) => {
        try {
            if (!await AuthorModel.findById(id)) {
                throw new Error('No author exists with id: ' + id);
            }

            const updateAuthor = { name: author.name, surname: author.surname };
            await AuthorModel.findByIdAndUpdate(id, updateAuthor);
            
            const getUpdatedAuthor = await AuthorModel.findById(id);
            return new Author(getUpdatedAuthor._id, getUpdatedAuthor.name, getUpdatedAuthor.surname);
        } catch(error) {
            throw new Error(error.message);
        }
    },

    deleteAuthor: async ({ id }) => {
        try {
            const author = await AuthorModel.findById(id);
            if (!author) {
                throw new Error('No author exists with id: ' + id);
            }
            
            await Book.deleteMany({ author: author._id });
            await AuthorModel.findByIdAndDelete(id);

            return 'Deleted author with id ' + id;
        } catch(error) {
            throw new Error(error.message);
        }
    },

    getAuthors: async () => {
        try {
            const authors = await AuthorModel.find();
            const authorsList = [];

            authors.forEach(author => {
                authorsList.push(new Author(author._id, author.name, author.surname));
            });

            return authorsList;
        } catch(error) {
            throw new Error(error.message);
        }
    },

    getAuthor: async ({ id }) => {
        try {
            const author = await AuthorModel.findById(id);

            if (!author) {
                throw new Error('No author exists with id: ' + id);
            }
            
            return new Author(author._id, author.name, author.surname);
        } catch(error) {
            throw new Error(error.message);
        }
    },

    getAuthorByBook: async ({ id }) => {
        try {
            const book = await BookModel.findById(id).populate('author');

            if (!book) {
                throw new Error('No book exists with id: ' + id);
            }

            return new Author(book.author._id, book.author.name, book.author.surname);
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