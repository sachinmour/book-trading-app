var serverRender = require("../utils/serverRendering");
var stockHandler = require("../utils/stockHandler");

module.exports = function(app, passport) {
    
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        serverRender.handleRender(req, res);
    });
    
    // app.post('/addStock', function(req, res) {
    //     stockHandler.addStock(req, res);
    // });
    
    // app.post('/removeStock', function(req, res) {
    //     stockHandler.removeStock(req, res);
    // });
    
    // app.get('/getStocks', function(req, res) {
    //     stockHandler.getStocks(req, res);
    // });

};