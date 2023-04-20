const bookModel = require('./bookModel');

module.exports = {
    renderBooks
};

async function renderBooks(res) {
    var books = await bookModel.BookModel.find();
    res.render('index', { viewBooks:books })
}