import axios from "axios";
import Book from "../models/books.js";

module.exports = function(query, title, author, req, res) {
    if (title) title = '+intitle:' + title;
    if (author) author = '+inauthor:' + author;
    var link = 'https://www.googleapis.com/books/v1/volumes?q=' + query + title + author + '&key=' + process.env.Google_api;
    console.log(link);
    axios.get(link)
        .then(function(response) {
            var bookLink = response.data.items[0].volumeInfo.imageLinks.smallThumbnail;
            Book.findOneAndUpdate({
                image: bookLink,
                user: req.user.id
            }, {}, { upsert: true, new: true }, function(err, book) {
                if (err) console.log(err);
                req.user.books.push(book.id);
                req.user.save();
                res.json(book);
            });
        })
        .catch(function(response) {
            console.log(response);
            res.json({ error: "invalid search" });
        });
}
