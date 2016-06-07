var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema ({
  name  : String,
  image : { type: String, default: "/default_book.jpg"},
  user  : { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;