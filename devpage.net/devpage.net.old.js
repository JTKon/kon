/*eslint-env node*/

var express = require('express');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');
var Account = require('./models/account');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var redis = require('redis');

var secretKey = 'ommanipadmehum';

var redisClient = redis.createClient(6379,'127.0.0.1');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post('/login', function (req, res, next){
    console.log("[/login start]");
    console.log("\t"+"req.body.uValue : "+req.body.uValue);
    console.log("\t"+"req.body.pValue : "+req.body.pValue);
    
    Account.findOne({id: req.body.uValue}, function(err, account){
        if(err){
            console.log("\t"+"account find err");
            return next(err);
        }
        if(!account){
            return res.send(401);
        }
        
        bcrypt.compare(req.body.pValue, account.pw, function(err, valid){
            if(err){
                console.log("\t"+"bcrypt compare");
                return next(err);
            }
            if(!valid){
                console.log("\t"+"account invalid");
                return res.send(401);//401 not authorised
            }
            var token = jwt.encode({id: account.id}, secretKey);
            
            //redis insert
            redisClient.set(account.id, token, function(err, data){
                if(err){
                    console.log("\t"+"redis insert error");
                    console.log(err);
                    res.send("err : "+err);
                    return;
                }
                redisClient.set.expire(account.id, 600);// expire 600 sec
            });
            
            console.log("\t"+"send token : " + token);
            res.send(token);
        });
        
    });
});

app.get('/test', function(req, res){
	res.send('auth.devpage.net ...');
});

/* 
//user add test
app.get('/add/kon', function(req, res, next){
	var account = new Account({id:'kon', role:'admin'});
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
*/


app.listen('7010');
