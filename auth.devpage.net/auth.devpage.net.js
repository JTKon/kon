var express = require('express');
var http = require('http');
var app = express();

app.get('/test', function(req, res){
	res.send('auth.devpage.net ...');
});

app.listen('7010');