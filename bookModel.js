const mongoose = require('./mongoose');

var BookModelSchema = new mongoose.Schema({
    title: String,
    author: String
})

var BookModel = mongoose.mongoose.model('BookModel', BookModelSchema);

module.exports = {
    BookModel
};