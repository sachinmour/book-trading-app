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

    acceptApproval(req, res) {
        var request_id = req.body.request_id;
        Request.findOne({ _id: request_id }, function(err, request) {
            if (err) throw err;
            if (request.to.equals(req.user._id)) {
                request.approved = true;
                request.save();
                res.json({ approvalAccepted: true });
            } else {
                res.json({ approvalAccepted: false });
            }
        });
    },

    getRequests(req, res) {
        var user_id = req.user._id
        Request.find({ $or: [{ from: user_id }, { to: user_id }] }).populate('book', 'image').exec(function(err, requests) {
            if (err) throw err;
            if (requests.length) {
                res.json({ requests: requests });
            } else {
                res.json({ requests: [] });
            }
        });
    },

    cancelRequest(req, res) {
        var request_id = req.body.request_id;
        Request.findOne({ _id: request_id }, function(err, request) {
            if (err) throw err;
            if (request.from.equals(req.user._id)) {
                Book.findOne({ _id: request.book }, function(err, book) {
                    if (err) throw err;
                    book.requested = false;
                    book.save();
                    request.remove();
                    res.json({ requestCancelled: true });
                })
            } else {
                res.json({ requestCancelled: false });
            }
        });
    },

    rejectApproval(req, res) {
        var request_id = req.body.request_id;
        Request.findOne({ _id: request_id }, function(err, request) {
            if (err) throw err;
            if (request.to.equals(req.user._id)) {
                Book.findOne({ _id: request.book }, function(err, book) {
                    if (err) throw err;
                    book.requested = false;
                    book.save();
                    request.remove();
                    res.json({ approvalRejected: true });
                })
            } else {
                res.json({ approvalRejected: false });
            }
        });
    },

    deleteRequest(req, res) {
        var request_id = req.body.request_id;
        Request.findOne({ _id: request_id }, function(err, request) {
            if (err) throw err;
            if (request.from.equals(req.user._id) || request.to.equals(req.user._id)) {
                Book.findOne({ _id: request.book }, function(err, book) {
                    if (err) throw err;
                    book.requested = false;
                    book.save();
                    request.remove();
                    res.json({ requestDeleted: true });
                })
            } else {
                res.json({ requestDeleted: false });
            }
        });
    }

}
