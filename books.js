const mongo = require('./mongo');

var BookModelSchema = new mongo.Schema({
    title: String,
    author: String
});

var BookModel = mongo.mongoose.model('BookModel', BookModelSchema);

async function renderBooks(res) {
    try {
        var books = await BookModel.find();
        res.status(200);
    } catch {
        res.status(400);
    } finally {
        res.render('index', { viewBooks:books });
    }
}

module.exports = {
    BookModel,
    renderBooks
}