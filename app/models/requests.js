var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema ({
  from  : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  book : { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  to  : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  approved: { type: Boolean, default: false }
});

var Request = mongoose.model('Request', bookSchema);

module.exports = Request;