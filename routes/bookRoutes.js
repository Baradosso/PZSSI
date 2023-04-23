const bodyParser = require('body-parser');
const Book = require('../models/Book'); 
const Author = require('../models/Author'); 
const urlEncodedParser = bodyParser.urlencoded({ extended: false });

async function reloadData(res) {
    try {
        const books = await Book.find().sort({ title: 1 }).populate('author');
        const authors = await Author.find().sort({ name: 1 });
        return res.json({ 
            books: books,
            authors: authors
        });
    } catch {
        return res.json({ 
            books: [],
            authors: [],
            statusCode: 400
        });
    }
}

module.exports = function(app) {

    app.get('/books/', async function(_req, res) {
        return res.render('books');
    }),

    app.get('/books/fetch/', async function(_req, res) {
        return reloadData(res);
    }),
    
    app.post('/books/create/', urlEncodedParser, async function(req, res) {
        var statusCode;
        try {
            if (!await Author.findById(req.body.author)) {
                throw new Error(`No author exists with id: ${req.body.author}`);
            }

            await new Book({ 
                title: req.body.title, 
                author: req.body.author 
            }).save();

            statusCode = 201;
        } catch {
            statusCode = 401;
        } finally {
            return res.json({ 
                statusCode: statusCode
            });
        }
    }),
    
    app.delete('/books/delete/:id', urlEncodedParser, async function(req, res) {
        var statusCode;
        try {
            if (!await Book.findById(req.params.id)) {
                throw new Error(`No book exists with id: ${req.params.id}`);
            }

            await Book.findByIdAndDelete(req.params.id);

            statusCode = 202;
        } catch {
            statusCode = 402;
        } finally {
            return res.json({ 
                statusCode: statusCode
            });
        }
    }),
    
    app.put('/books/update/:id', urlEncodedParser, async function(req, res) {
        var statusCode;
        try {
            if (!await Book.findById(req.params.id)) {
                throw new Error(`No book exists with id: ${req.params.id}`);
            }

            const book = { title: req.body.title, author: req.body.author };
            await Book.findByIdAndUpdate(req.params.id, book);
            statusCode = 203;
        } catch {
            statusCode = 403;
        } finally {
            return res.json({ 
                statusCode: statusCode
            });
        }
    });
}