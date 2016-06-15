import axios from "axios";
import Book from "../models/books.js";
import User from "../models/users.js";
import Request from "../models/requests.js"

module.exports = {

    newRequest(req, res) {
        var book_id = req.body.book_id;
        Book.findOne({ _id: book_id }, function(err, book) {
            if (err) throw err;
            if (!book) {
                res.json({ requestMade: false });
            } else {
                Request.findOne({ book: book._id }, function(err, request) {
                    if (err) throw err;
                    if (!request) {
                        request = Request.create({ from: req.user._id, book: book_id, to: book.user });
                        book.requested = true;
                        book.save();
                    }
                    res.json({ requestMade: true });
                });
            }
        });
    },

    approveRequest(req, res) {
        var request_id = req.body.request_id;
        Request.findOne({ _id: request_id }, function(err, request) {
            if (err) throw err;
            if (request.to.equals(req.user._id)) {
                request.approved = true;
                request.save();
                res.json({ requestApproved: true });
            }
        });
    },

    getRequests(req, res) {
        Request.find({ $or: [{ from: req.user._id }, { to: req.user._id }] }).populate('book', 'image').exec(function(err, requests) {
            if (err) throw err;
            if (requests.length) {
                res.json({ requests: requests });
            }
        });
    }

}
