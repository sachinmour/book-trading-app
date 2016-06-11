var serverRender = require("../utils/serverRendering");

module.exports = function(app, passport) {
    
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        serverRender.handleRender(req, res);
    });
    
    app.get('/getUser', LoggedInAjax, function(req, res) {
        res.json(req.user);
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
    res.json({redirect: "/auth/twitter"});
}