const bodyParser = require('body-parser');
const booksModel = require('./booksModel'); 
const urlEncodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){

    app.get('/', function(_req, res) {
        booksModel.renderBooks(res);
    }),
    
    app.post('/add/', urlEncodedParser, async function(req, res) {
        try {
            var book = new booksModel.BookModel({ title: req.body.addBookTitle, author: req.body.addBookAuthor });
            await book.save();
            res.status(201);
            return res.redirect('../');
        } catch {
            return res.sendStatus(400);
        }
    }),
    
    app.post('/del/', urlEncodedParser, async function(req, res) {
        try {
            await booksModel.BookModel.findByIdAndDelete(req.body.delBookId);
            res.status(200);
            return res.redirect('../');
        } catch {
            return res.sendStatus(400);
        }
    }),
    
    app.post('/edit/', urlEncodedParser, async function(req, res) {
        try {
            var book = { title: req.body.editBookTitle, author: req.body.editBookAuthor };
            await booksModel.BookModel.findByIdAndUpdate(req.body.editBookId, book);
            res.status(200);
            return res.redirect('../');
        } catch {
            return res.sendStatus(400);  
        }
    });
}