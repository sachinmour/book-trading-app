var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    displayName: String,
    username: String,
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});

var User = mongoose.model('User', userSchema);

module.exports = User;
