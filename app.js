const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')

const renderBooks = require('./renderBooks')
const bookModel = require('./bookModel')

const mongoose = require('./mongoose')
const swaggerOptions = require('./swaggerOptions')

// const graphql = require('./graphSchema')

mongoose.dbOn()
var urlEncodedParser = bodyParser.urlencoded({ extended: false })

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/css', express.static(__dirname + '/public/css'))
app.use('/js', express.static(__dirname + '/public/js'))
app.use('/bootstrap', express.static(__dirname + '/public/bootstrap'))
app.use('/api-docs', swaggerOptions.swaggerUi.serve, swaggerOptions.swaggerUi.setup(swaggerOptions.swaggerFile))


const server = http.createServer(app)
const port = 8000;
server.listen(port)

// Web page endpoints
app.get('/', function(req, res) {
    renderBooks.renderBooks(res)
});

app.post('/add/', urlEncodedParser, async function(req, res) {
    var book = new bookModel.BookModel({title: req.body.addBookTitle, 
                                        author: req.body.addBookAuthor
                                       })
    await book.save()
    return res.redirect('../')
});

app.post('/del/', urlEncodedParser, async function(req, res) {
    await bookModel.BookModel.findByIdAndDelete(req.body.delBookId)
    return res.redirect('../')
});

app.post('/edit/', urlEncodedParser, async function(req, res) {
    var book = { title: req.body.editBookTitle, author: req.body.editBookAuthor }
    await bookModel.BookModel.findByIdAndUpdate(req.body.editBookId, book)
    return res.redirect('../')
});

// Restfull endpoints
app.post('/create/', urlEncodedParser, async function(req, res) {
    if(!req.body.author || !req.body.title) {
        return res.sendStatus(400)
    }
    
    var book = new bookModel.BookModel({title: req.body.title, 
                                        author: req.body.author
                                      })
              
    try {
        await book.save()
    } catch (error) {
        return res.sendStatus(418)
    }                               
    
    res.sendStatus(201)
});

app.delete('/delete/:id', urlEncodedParser, async function(req, res) {
    if(!req.params.id) {
        return res.sendStatus(400)
    }
              
    try {
        await bookModel.BookModel.findByIdAndDelete(req.params.id)
    } catch (error) {
        return res.sendStatus(418)
    }                               
    
    res.sendStatus(200)
});

app.put('/update/:id', urlEncodedParser, async function(req, res) {
    if(!req.body.author || !req.body.title || !req.params.id) {
        return res.sendStatus(400)
    }

    var book = { title: req.body.title, author: req.body.author };

    try {
        await bookModel.BookModel.findByIdAndUpdate(req.params.id, book);
    } catch (error) {
        return res.sendStatus(418)
    }                               
    
    res.sendStatus(200);
});

app.get('/get/', urlEncodedParser, async function(req, res) {
    try {
        var books = await bookModel.BookModel.find()
        const jsonContent = JSON.stringify(books)
        res.send(jsonContent)
    } catch (error) {
        return res.sendStatus(418)
    }                      
});

app.get('/get/:author', urlEncodedParser, async function(req, res) {
    try {
        var books = await bookModel.BookModel.find({author: req.params.author})
        const jsonContent = JSON.stringify(books)
        res.send(jsonContent)
    } catch (error) {
        return res.sendStatus(418)
    }         
});