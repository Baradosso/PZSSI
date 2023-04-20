const books = require('./books');
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({ extended: false});

module.exports = function(app) {

    app.post('/create/', urlEncodedParser, async function(req, res) {
        try {
            var book = new books.BookModel({title: req.body.title, 
                                                author: req.body.author
                                            });

            await book.save();
            return res.sendStatus(201);
        } catch {
            return res.sendStatus(400);
        }                               
    }),
    
    app.delete('/delete/:id', urlEncodedParser, async function(req, res) {
        try {
            await books.BookModel.findByIdAndDelete(req.params.id);
            return res.sendStatus(200);
        } catch {
            return res.sendStatus(400);
        }                               
    }),
    
    app.put('/update/:id', urlEncodedParser, async function(req, res) {
        try {
            var book = { title: req.body.title, author: req.body.author };
            await books.BookModel.findByIdAndUpdate(req.params.id, book);
            return res.sendStatus(200);
        } catch (error) {
            return res.sendStatus(400);
        }                               
    }),
    
    app.get('/get/', urlEncodedParser, async function(_req, res) {
        try {
            var books = await books.BookModel.find();
            const jsonContent = JSON.stringify(books);
            res.status(200);
            return res.send(jsonContent);
        } catch (error) {
            return res.sendStatus(400);
        }                      
    }),
    
    app.get('/get/:author', urlEncodedParser, async function(req, res) {
        try {
            var books = await books.BookModel.find({author: req.params.author});
            const jsonContent = JSON.stringify(books);
            res.status(200);
            return res.send(jsonContent);
        } catch (error) {
            return res.sendStatus(400);
        }         
    });
}