const Book = require('../models/Book');
const Author = require('../models/Author');
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({ extended: false});

module.exports = function(app) {

    app.post('/mhwwbooks/create/', urlEncodedParser, async function(req, res) {
        try {
            if (!await AuthorModel.findById(req.body.author)) {
                throw new Error(`No author exists with id: ${req.body.author}`);
            }

            await new BookModel({ 
                title: req.body.title, 
                author: req.body.author 
            }).save();

            return res.sendStatus(201);
        } catch {
            return res.sendStatus(400);
        }                               
    }),
    
    app.delete('/mhwwbooks/delete/:id', urlEncodedParser, async function(req, res) {
        try {
            if (!await BookModel.findById(req.params.id)) {
                throw new Error(`No book exists with id: ${req.params.id}`);
            }

            await BookModel.findByIdAndDelete(req.params.id);
            return res.sendStatus(200);
        } catch {
            return res.sendStatus(400);
        }                               
    }),
    
    app.put('/mhwwbooks/update/:id', urlEncodedParser, async function(req, res) {
        try {
            if (!await BookModel.findById(req.params.id)) {
                throw new Error(`No book exists with id: ${req.params.id}`);
            }

            const book = { title: req.body.title, author: req.body.author };
            await BookModel.findByIdAndUpdate(req.params.id, book);
            return res.sendStatus(200);
        } catch (error) {
            return res.sendStatus(400);
        }                               
    }),
    
    app.get('/mhwwbooks/get/', urlEncodedParser, async function(_req, res) {
        try {

            const books = await BookModel.find().sort({ title: 1 }).populate('author');
            const jsonContent = JSON.stringify(books);
            res.status(200);
            return res.send(jsonContent);
        } catch (error) {
            return res.sendStatus(400);
        }                      
    }),
    
    app.get('/mhwwbooks/get/:id', urlEncodedParser, async function(req, res) {
        try {
            const book = await BookModel.findById(req.params.id);
            const jsonContent = JSON.stringify(book);
            res.status(200);
            return res.send(jsonContent);
        } catch (error) {
            return res.sendStatus(400);
        }         
    }),
    
    app.get('/mhwwbooks/get/:author', urlEncodedParser, async function(req, res) {
        try {
            const books = await BookModel.find({ author: req.params.author }).sort({ title: 1 }).populate('author');
            const jsonContent = JSON.stringify(books);
            res.status(200);
            return res.send(jsonContent);
        } catch (error) {
            return res.sendStatus(400);
        }         
    }),

    app.post('/mhwwauthor/create/', urlEncodedParser, async function(req, res) {
        try {
            await new AuthorModel({ 
                name: req.body.name, 
                surname: req.body.surname 
            }).save();

            return res.sendStatus(201);
        } catch {
            return res.sendStatus(400);
        }                               
    }),
    
    app.delete('/mhwwauthor/delete/:id', urlEncodedParser, async function(req, res) {
        try {
            const author = await AuthorModel.findById(req.params.id);
            if (!author) {
                throw new Error(`No author exists with id: ${req.params.id}`);
            }

            await Book.deleteMany({ author: author._id });
            await AuthorModel.findByIdAndDelete(req.params.id);
            return res.sendStatus(200);
        } catch {
            return res.sendStatus(400);
        }                               
    }),
    
    app.put('/mhwwauthor/update/:id', urlEncodedParser, async function(req, res) {
        try {
            if (!await AuthorModel.findById(req.params.id)) {
                throw new Error(`No author exists with id: ${req.params.id}`);
            }

            const author = { name: req.body.name, surname: req.body.surname };
            await AuthorModel.findByIdAndUpdate(req.params.id, author);
            return res.sendStatus(200);
        } catch (error) {
            return res.sendStatus(400);
        }                               
    }),
    
    app.get('/mhwwauthor/get/', urlEncodedParser, async function(_req, res) {
        try {

            const authors = await AuthorModel.find().sort({ title: 1 });
            const jsonContent = JSON.stringify(authors);
            res.status(200);
            return res.send(jsonContent);
        } catch (error) {
            return res.sendStatus(400);
        }                      
    }),
    
    app.get('/mhwwauthor/get/:id', urlEncodedParser, async function(req, res) {
        try {
            const author = await AuthorModel.findById(req.params.id);
            const jsonContent = JSON.stringify(author);
            res.status(200);
            return res.send(jsonContent);
        } catch (error) {
            return res.sendStatus(400);
        }         
    }),
    
    app.get('/mhwwauthor/get/:book', urlEncodedParser, async function(req, res) {
        try {
            const book = await BookModel.findById(req.params.book).populate('author');
            const author = { name: book.author.name, surname: book.author.surname };
            const jsonContent = JSON.stringify(author);
            res.status(200);
            return res.send(jsonContent);
        } catch (error) {
            return res.sendStatus(400);
        }         
    });
}