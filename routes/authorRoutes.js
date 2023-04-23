const bodyParser = require('body-parser');
const Author = require('../models/Author'); 
const Book = require('../models/Book');
const urlEncodedParser = bodyParser.urlencoded({ extended: false });

async function reloadData(res) {
    try {
        const authors = await Author.find().sort({ title: 1 });
        return res.json({ 
            authors: authors,
        });
    } catch {
        return res.json({ 
            authors: [],
            statusCode: 400
        });
    }
}

module.exports = function(app) {

    app.get('/authors/', async function(_req, res) {
        return res.render('authors');
    }),

    app.get('/authors/fetch/', async function(_req, res) {
        return reloadData(res);
    }),

    app.post('/authors/create/', urlEncodedParser, async function(req, res) {
        var statusCode;
        try {
            await new Author({ 
                name: req.body.name, 
                surname: req.body.surname 
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
    
    app.delete('/authors/delete/:id', urlEncodedParser, async function(req, res) {
        var statusCode;
        try {
            const author = await Author.findById(req.params.id);
            if (!author) {
                throw new Error(`No author exists with id: ${req.params.id}`);
            }

            await Book.deleteMany({ author: author._id });
            await Author.findByIdAndDelete(req.params.id);

            statusCode = 202;
        } catch {
            statusCode = 402;
        } finally {
            return res.json({ 
                statusCode: statusCode
            });
        }
    }),

    app.put('/authors/update/:id', urlEncodedParser, async function(req, res) {
        var statusCode;
        try {
            if (!await Author.findById(req.params.id)) {
                throw new Error(`No author exists with id: ${req.params.id}`);
            }

            const author = { name: req.body.name, surname: req.body.surname };
            await Author.findByIdAndUpdate(req.params.id, author);

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