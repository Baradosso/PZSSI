var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/books_db'

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
var Schema = mongoose.Schema;

function dbOn() {
    db.on('error', console.error.bind(console, 'MongoDb connection error:'));
}

module.exports = {
    Schema,
    mongoose,
    dbOn
}