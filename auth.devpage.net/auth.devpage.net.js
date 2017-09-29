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
            console.log("\t"+"account not found");
            return res.send(204);//204 no content
        }
        
        bcrypt.compare(req.body.pValue, account.pw, function(err, valid){
            if(err){
                console.log("\t"+"bcrypt compare error");
                return next(err);
            }
            if(!valid){
                console.log("\t"+"account invalid");
                return res.send(401);//401 not authorised
            }
            var token = jwt.encode({id: account.id}, secretKey);
            
            //redis insert
            redisClient.setex(account.id, 600, token, function(err, data){ //expire 600 sec
                if(err){
                    console.log("\t"+"redis insert error");
                    console.log(err);
                    res.send("err : "+err);
                    return;
                }
                
                console.log("\t"+"redis set success");
                console.log("\t"+"key : "+account.id);
                console.log(data);
                
            });
            
            console.log("\t"+"send token : " + token);
            res.send({'id': account.id,'token':token});
        });
        
    });
});

app.post('/validation', function(req, res){
     console.log("[/validation start]");
     console.log("\t"+"req.body.uId : "+req.body.uId);
     console.log("\t"+"req.body.xAuth : "+req.body.xAuth);    
    
     Account.findOne({id: req.body.uId}, function(err, account){
        if(err){
            console.log("\t"+"account find err");
            return next(err);
        }
        if(!account){
            console.log("\t"+"account not found");
            return res.send(204);//204 no content
        }
        
        //redis get
    	redisClient.get(req.body.uId, function (err, data) {
    	    if(err){
                console.log("\t"+"token find err");
                return next(err);
            }
            
            console.log("\t"+"saved token : "+data);
            
            if(!data){
               console.log("\t"+"no redis data. return 440."); 
               return res.send(440); //440 Login Time-out, The client's session has expired and must log in again.
            }
            
            if(req.body.xAuth == data){
                console.log("\t"+"redis value:"+data); 
                console.log("\t"+"success. return 200"); 
                return res.send(200);
            }
    	    
        });
        
    });
    
});

app.get('/test', function(req, res){
	res.send('auth.devpage.net ...');
	
	//redis get test
	redisClient.get("kon@devpage.net", function (err, reply) {
        console.log(reply); 
    });
    
    //redis set test
	redisClient.set("kon@devpage.net", "1234abcd", function (err, data) {
        console.log(data); 
    });
});

/* 
//user add test
app.get('/add/kon', function(req, res, next){
	var account = new Account({id:'kon@devpage.net', role:'admin'});
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
