var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/devpage', function(){
    console.log('mongodb connected....');
});

module.exports = mongoose;