

var mongoose      = require("mongoose");
var passportLM    = require("passport-local-mongoose");


var User = new mongoose.Schema({
    username: String,
    password: String
});
 
// plug passport local mongoose to the schema 
User.plugin(passportLM);


module.exports = mongoose.model("user", User);