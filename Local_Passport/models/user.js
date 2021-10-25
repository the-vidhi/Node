var mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
var Schema = mongoose.Schema;

var myuser = new Schema({
    username: String,
    password: String
});

myuser.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',myuser);