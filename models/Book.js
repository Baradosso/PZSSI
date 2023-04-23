const mongo = require('../mongo');

const BookModelSchema = new mongo.Schema({
    title: String,
    author: { 
        type: mongo.mongoose.Types.ObjectId, 
        ref: 'AuthorModel' 
    } 
});

module.exports = mongo.mongoose.model('BookModel', BookModelSchema);
