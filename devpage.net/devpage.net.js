/*eslint-env node*/

var express = require('express');
var http = require('http');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// static resource
app.use(express.static(__dirname + '/assets'));

app.get('/*', function(req, res){
    gateway(req, res, "GET");
});

app.put('/*', function(req, res){
	gateway(req, res, "PUT");
});

app.post('/*', function(req, res){
	gateway(req, res, "POST");
});

app.delete('/*', function(req, res){
	gateway(req, res, "DELETE");
});

function gateway(req, res, httpMethod){
	try{
		console.log( "-------------------" );
		console.log( httpMethod );
		console.log( "req.get('X-Forwarded-Protocol')=" + req.get('X-Forwarded-Protocol') );
		console.log( "req.get('host')=" + req.get('host') );
		console.log( "req.originalUrl=" + req.originalUrl );
		console.log( "req.url=" + req.url );
		console.log( "req.protocol=" + req.protocol );
		console.log( "-------------------" );

		var host = req.get('host');
		var domainMain = 'devpage.net';
		var domainBlog = 'blog.devpage.net';
		var domainAuth = 'auth.devpage.net';

		if(host == domainMain){
			res.redirect('/work_in_progress/work_in_progress.html');

		}else if(host == domainBlog){
		    var options = {
				host: '127.0.0.1',
				port: '7030',
				path: req.url
			};
			
			internalRequest(req, res, httpMethod, options);

		}else if(host == domainAuth){
			var options = {
				host: '127.0.0.1',
				port: '7010',
				path: req.url
			};
			
			// Add headers
			res.setHeader('Access-Control-Allow-Origin', '*');
			
			internalRequest(req, res, httpMethod, options);

		}else{
			console.log('no matchig host : '+ host);
			res.redirect('http://devpage.net');
		}

	} catch (err) {
	    console.log('gateway() error!!!');
		console.log(err);
		res.redirect('http://devpage.net');	
	}
}

function internalRequest(req, res, httpMethod, options){
    console.log("[internalRequest] start");
    
    var requestUri = 'http://' + options.host + ':' + options.port + options.path;
    console.log("\t"+"requestUri : "+requestUri);
    
    if(httpMethod == "GET"){
        
    }else if(httpMethod == "POST"){
        request.post(  
        	{ 
        		uri: requestUri,
        		form : req.body
        	},   
        	function (error, response, body) {
        	    if(error){
        	        console.log("\t"+"request.post error!");
        	        console.log(error);
        	        res.send(500);
        	    }
        	    
        	    res.send(body);
        	}
        ); 

    }    
}


app.listen('7000');
