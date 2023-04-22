const bodyParser = require('body-parser');
const AuthorModel = require('../models/Author'); 
const Book = require('../models/Book');
const urlEncodedParser = bodyParser.urlencoded({ extended: false });

function getLink(statusCode, operationType) {
    return `..?statusCode=${statusCode}&operationType=${operationType}`
}

module.exports = function(app) {

    app.get('/authors/', async function(req, res) {
        const statusCode = req.query.statusCode;
        try {
            const authors = await AuthorModel.find().sort({ title: 1 });
            return res.render('authors', { 
                viewAuthors: authors,
                statusCode: statusCode,
                operationType: req.query.operationType 
            });
        } catch {
            return res.render('authors', { 
                viewAuthors: [],
                statusCode: 500,
                operationType: 'get'
            });
        }
    }),
    
    app.post('/authors/create/', urlEncodedParser, async function(req, res) {
        var statusCode;

        try {
            await new AuthorModel({ 
                name: req.body.postAuthorName, 
                surname: req.body.postAuthorSurname 
            }).save();

            statusCode = 200;
        } catch {
            statusCode = 400;
        } finally {
            return res.redirect(getLink(statusCode, 'create'));
        }
    }),
    
    app.post('/authors/delete/:id', urlEncodedParser, async function(req, res) {
        var statusCode;

        try {
            const author = await AuthorModel.findById(req.params.id);
            if (!author) {
                throw new Error(`No author exists with id: ${req.params.id}`);
            }

            await Book.deleteMany({ author: author._id });
            await AuthorModel.findByIdAndDelete(req.params.id);
            statusCode = 200;
        } catch {
            statusCode = 400;
        } finally {
            return res.redirect(getLink(statusCode, 'delete'));
        }
    }),
    
    app.post('/authors/update/:id', urlEncodedParser, async function(req, res) {
        var statusCode;

        try {
            if (!await AuthorModel.findById(req.params.id)) {
                throw new Error(`No author exists with id: ${req.params.id}`);
            }

            const author = { name: req.body.postAuthorName, surname: req.body.postAuthorSurname };
            await AuthorModel.findByIdAndUpdate(req.params.id, author);
            statusCode = 200;
        } catch {
            statusCode = 400;
        } finally {
            return res.redirect(getLink(statusCode, 'update'));
        }
    });
}