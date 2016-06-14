import axios from "axios";
import Book from "../models/books.js";
import User from "../models/users.js";

module.exports = {

    search(query, title, author, req, res) {
        if (title) title = '+intitle:' + title;
        if (author) author = '+inauthor:' + author;
        var link = 'https://www.googleapis.com/books/v1/volumes?q=' + query + title + author + '&key=' + process.env.Google_api;
        axios.get(link)
            .then(function(response) {
                var bookLink = response.data.items[0].volumeInfo.imageLinks.smallThumbnail;
                Book.findOneAndUpdate({
                    image: bookLink,
                    user: req.user.id
                }, {}, { upsert: true, new: true }, function(err, book) {
                    if (err) console.log(err);
                    if (!req.user.books.some(function(id) {
                            return id.equals(book._id)
                        })) {
                        req.user.books.push(book._id);
                        req.user.save();
                    }
                    res.json(book);
                });
            })
            .catch(function(response) {
                res.json({ error: "invalid search" });
            });
    },

    delete(req, res) {
        var book = req.body;
        if (req.user.books.some(function(id) {
                return id.equals(book._id)
            })) {
            req.user.books.remove(book._id);
            req.user.save();
            Book.remove({ _id: book._id }, function(err, book) {
                if (err) console.log(err);
                res.json({ message: 'book removed' });
            });
        }
    },

    getMyBooks(req, res) {
        User.findOne({ _id: req.user._id }).populate('books').exec(function(err, user) {
            res.json({ books: user.books });
        });
    },

    getAllBooks(req, res) {
        Book.find({}).exec(function(err, books) {
            res.json({ books: books, user_id: req.user._id });
        });
    }
}
