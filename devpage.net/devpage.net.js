var express = require('express');
var http = require('http');
var app = express();

app.use(express.static(__dirname + '/assets'));

app.get('/*', function(req, res){
	gateway(req, res, "PUT");
});

app.put('/*', function(req, res){
	gateway(req, res, "PUT");
});

app.post('/*', function(req, res){
	gateway(req, res, "PUT");
});

app.delete('/*', function(req, res){
	gateway(req, res, "PUT");
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
			
			internalRequest(req, res, httpMethod, options);

		}else{
			console.log('no matchig host : '+ host);
			res.redirect('http://devpage.net');
		}

	} catch (err) {
		console.log(err);
		res.redirect('http://devpage.net');	
	}
}

function internalRequest(req, res, httpMethod, options){
    var reqInner = http.get(options, function(resInner) {
		console.log('STATUS: ' + resInner.statusCode);
		console.log('HEADERS: ' + JSON.stringify(resInner.headers));

		// Buffer the body entirely for processing as a whole.
		var bodyChunks = [];
		resInner.on('data', function(chunk) {
			// You can process streamed parts here...
			bodyChunks.push(chunk);

		}).on('end', function() {
			var body = Buffer.concat(bodyChunks);
			console.log('BODY: ' + body);
			// ...and/or process the entire body here.
			res.contentType(resInner.headers["content-type"]);	
			res.send(body);	
		});
	});

	reqInner.on('error', function(e) {
		console.log('ERROR: ' + e.message);
	});
}


app.listen('7000');
