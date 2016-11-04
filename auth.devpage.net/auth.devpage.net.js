/*eslint-env node*/

var express = require('express');
var http = require('http');
var app = express();
var Account = require('./models/account');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');

var secretKey = 'ommanipadmehum';

app.post('/login', function (req, res, next){
    Account.findOne({id: req.body.uValue}, function(err, account){
        if(err){
            return next(err);
        }
        if(!account){
            return res.send(401);
        }
        
        bcrypt.compare(req.body.pValue, account.pw, function(err, valid){
            if(err){
                return next(err);
            }
            if(!valid){
                return res.send(401);
            }
            var token = jwt.encode({id: account.id}, secretKey);
        });
        
    });
    
    req.body.uValue   
});

app.get('/test', function(req, res){
	res.send('auth.devpage.net ...');
});

app.get('/add/kon', function(req, res){
	var account = new Account({id:'kon'});
	bcrypt.hash('kon123$', null, null, function(err, hash){
	   account.pw = hash;
	   account.save(function(err, account){
	       if(err){
	           throw next(err);
	       }
	       res.send(201);
	   });
	});
});


app.listen('7010');
