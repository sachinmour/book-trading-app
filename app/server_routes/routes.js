var serverRender = require("../utils/serverRendering");
var bookHandler = require("../utils/bookHandler");
var requestHandler = require("../utils/requestHandler");
var path = require('path');

module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================

    app.get('/getUser', LoggedInAjax, function(req, res) {
        res.json(req.user);
    });

    app.get('/auth/twitter', passport.authenticate('twitter'));

    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect: '/',
            failureRedirect: '/'
        }));

    app.get('/bookSearch', LoggedInAjax, function(req, res) {
        bookHandler.search(req.query.query, req.query.title, req.query.author, req, res);
    });

    app.post('/deleteBook', LoggedInAjax, function(req, res) {
        bookHandler.delete(req, res);
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/getmybooks', LoggedInAjax, function(req, res) {
        bookHandler.getMyBooks(req, res);
    });

    app.get('/getallbooks', LoggedInAjax, function(req, res) {
        bookHandler.getAllBooks(req, res);
    });

    app.post('/setting', LoggedInAjax, function(req, res) {
        bookHandler.updateUser(req, res);
    });

    app.get(['/all', '/my', '/settings', '/notifications'], isLoggedIn, function(req, res) {
        res.sendFile(path.join(__dirname, '../../public/index2.html'));
    });

    app.post('/newRequest', LoggedInAjax, function(req, res) {
        requestHandler.newRequest(req, res);
    });

    app.get('/getRequests', LoggedInAjax, function(req, res) {
        requestHandler.getRequests(req, res);
    });

    app.post('/cancelRequest', LoggedInAjax, function(req, res) {
        requestHandler.cancelRequest(req, res);
    });

    app.post('/rejectApproval', LoggedInAjax, function(req, res) {
        requestHandler.rejectApproval(req, res);
    });

    app.post('/acceptApproval', LoggedInAjax, function(req, res) {
        requestHandler.acceptApproval(req, res);
    });

    app.post('/deleteRequest', LoggedInAjax, function(req, res) {
        requestHandler.deleteRequest(req, res);
    });

    app.get('/*', function(req, res) {
        serverRender.handleRender(req, res);
        // res.sendFile(path.join(__dirname, '../../public/index2.html'));
    });

    // app.post('/removeStock', function(req, res) {
    //     stockHandler.removeStock(req, res);
    // });

    // app.get('/getStocks', function(req, res) {
    //     stockHandler.getStocks(req, res);
    // });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/auth/twitter');
}

function LoggedInAjax(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.json({ redirect: "/auth/twitter" });
}
