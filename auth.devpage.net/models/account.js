var db = require('../mongoDB');

var account = db.model('account', {
    id : {type: String, required: true},
    pw : {type: String, required: true},
    role : {type: String, required: true}
});

module.exports = account;
