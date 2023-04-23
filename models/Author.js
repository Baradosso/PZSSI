const mongo = require('../mongo');
const Book = require('./Book');

const AuthorModelSchema = new mongo.Schema({
    name: String,
    surname: String
});

module.exports = mongo.mongoose.model('AuthorModel', AuthorModelSchema);