const bodyParser = require('body-parser');
const BookModel = require('../models/Book'); 
const AuthorModel = require('../models/Author'); 
const urlEncodedParser = bodyParser.urlencoded({ extended: false });

function getLink(statusCode, operationType) {
    return `..?statusCode=${statusCode}&operationType=${operationType}`
}

module.exports = function(app) {

    app.get('/books/', async function(req, res) {
        const statusCode = req.query.statusCode;
        try {
            const books = await BookModel.find().sort({ title: 1 }).populate('author');
            const authors = await AuthorModel.find().sort({ name: 1 });
            return res.render('books', { 
                viewBooks: books, 
                viewAuthors: authors,
                statusCode: statusCode,
                operationType: req.query.operationType 
            });
        } catch {
            return res.render('books', { 
                viewBooks: [], 
                viewAuthors: [],
                statusCode: 500,
                operationType: 'get'
            });
        }
    }),
    
    app.post('/books/create/', urlEncodedParser, async function(req, res) {
        var statusCode;

        try {
            if (!await AuthorModel.findById(req.body.postBookAuthor)) {
                throw new Error(`No author exists with id: ${req.body.postBookAuthor}`);
            }

            await new BookModel({ 
                title: req.body.postBookTitle, 
                author: req.body.postBookAuthor 
            }).save();

            statusCode = 200;
        } catch {
            statusCode = 400;
        } finally {
            return res.redirect(getLink(statusCode, 'create'));
        }
    }),
    
    app.post('/books/delete/:id', urlEncodedParser, async function(req, res) {
        var statusCode;

        try {
            if (!await BookModel.findById(req.params.id)) {
                throw new Error(`No book exists with id: ${req.params.id}`);
            }

            await BookModel.findByIdAndDelete(req.params.id);
            statusCode = 200;
        } catch {
            statusCode = 400;
        } finally {
            return res.redirect(getLink(statusCode, 'delete'));
        }
    }),
    
    app.post('/books/update/:id', urlEncodedParser, async function(req, res) {
        var statusCode;

        try {
            if (!await BookModel.findById(req.params.id)) {
                throw new Error(`No book exists with id: ${req.params.id}`);
            }

            const book = { title: req.body.postBookTitle, author: req.body.postBookAuthor };
            await BookModel.findByIdAndUpdate(req.params.id, book);
            statusCode = 200;
        } catch {
            statusCode = 400;
        } finally {
            return res.redirect(getLink(statusCode, 'update'));
        }
    });
}