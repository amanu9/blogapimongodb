const errorHandler=require("./errorhandler");

const authenticate = require("./isAuthenticated"); 
module.exports = { errorHandler, authenticate } // Now exported as 'authenticate'// exporting the middle ware here