var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/devpage');

var account = mongoose.Schema({
    id : String,
    pw : String
});

module.exports = mongoose.model('Account', account);