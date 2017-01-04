/*eslint-env node*/

// module
var express = require('express');
var http = require('http');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');


//*************************************************************************************************************


// gateway 에서 허용하는 도메인들
var domainMain = 'devpage.net';
var domainBlog = 'blog.devpage.net';
var domainAuth = 'auth.devpage.net';


//*************************************************************************************************************


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// static resource
app.use(express.static(__dirname + '/assets'));


//*************************************************************************************************************


// http method 별 처리
app.get('/*', function(req, res){
    requestLog(req, res, "GET");
    gateway(req, res, "GET");
});

app.put('/*', function(req, res){
    requestLog(req, res, "PUT");
	gateway(req, res, "PUT");
});

app.post('/*', function(req, res){
    requestLog(req, res, "POST");
	gateway(req, res, "POST");
});

app.delete('/*', function(req, res){
    requestLog(req, res, "DELETE");
	gateway(req, res, "DELETE");
});

app.options('/*', function(req, res){
    requestLog(req, res, "OPTIONS");
    
    // http://mohwaproject.tistory.com/entry/Ajax-%EC%A0%84%EC%86%A1-%EA%B5%AC%EB%B6%84%ED%95%98%EA%B8%B0
    // CORS 요청시 custom header+POST가 들어가면 1차적으로 OPTIONS로 호출해서 아래 2개를 체크하고, 다시 요청을 날리게 된다.
    
    // origin확인 
    if("http://static.devpage.net" != req.get('origin')){//현재는 static.devpage.net에서만 cors요청을 하고 있음
        res.send(401, 'Unauthorized');    
    }else{
        // Add headers
    	res.setHeader('Access-Control-Allow-Origin', req.get('origin'));
    	res.setHeader('Access-Control-Allow-Headers', 'content-type, x-auth, uId');
    	res.send(200);
    }
    
});

// request log
function requestLog(req, res, httpMethod){
	console.log( "-------------------" );
	console.log( httpMethod );
	console.log( "req.get('origin')=" + req.get('origin') );
	console.log( "req.get('X-Forwarded-Protocol')=" + req.get('X-Forwarded-Protocol') );
	console.log( "req.get('Access-Control-Request-Method')=" + req.get('Access-Control-Request-Method') );
	console.log( "req.get('host')=" + req.get('host') );
	console.log( "req.originalUrl=" + req.originalUrl );
	console.log( "req.url=" + req.url );
	console.log( "req.protocol=" + req.protocol );
	console.log( "req.get('X-Auth')=" + req.get('X-Auth') );
	console.log( "req.get('content-type')=" + req.get('content-type') );
	console.log( "-------------------" );    
}


//*************************************************************************************************************

// 시스템간 통신을 위한 정보 세팅
function gateway(req, res, httpMethod){
	try{
	    
		//static.devpage.net 에서 CORS 요청을 하는 경우 허용 
		if("http://static.devpage.net" == req.get('origin')){
               res.setHeader('Access-Control-Allow-Origin', req.get('origin'));
        }
	    
		var host = req.get('host');

        //devpage.net
		if(host == domainMain){
			res.redirect('/work_in_progress/work_in_progress.html');


        //blog.devpage.net
		}else if(host == domainBlog){
		    var options = {
				host: '127.0.0.1',
				port: '7030',
				path: req.url
			};
			internalRequest(req, res, httpMethod, options);


        //auth.devpage.net
		}else if(host == domainAuth){
			var options = {
				host: '127.0.0.1',
				port: '7010',
				path: req.url
			};
			internalRequest(req, res, httpMethod, options);

        // domain no matchig
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


//*************************************************************************************************************


// 시스템간 통신
function internalRequest(req, res, httpMethod, options){
    console.log("[internalRequest()]");
    
    var requestUri = 'http://' + options.host + ':' + options.port + options.path;
    console.log("\t"+"requestUri : "+requestUri);
    
    if(httpMethod == "GET"){
        request(
        	{ method: 'GET', uri: requestUri, json : req.body, followRedirect: false},// 내부 redirect는 안함. 아래서 301/302 처리.
        	function (error, response, body) {
        		if(error){
        			console.log("\t"+"request.get error!");
        			console.log(error);
        			res.send('internalRequest Error', 500);
        		}else{
        			try{
        			   console.log("\t"+"request.get success!");
        			   console.log("\t"+"response.statusCode:"+response.statusCode);
                       console.log("\t"+"response.headers.location:"+response.headers.location);
                       res.statusCode = response.statusCode;
                       
                       //redirect 처리
                       if(response.statusCode == 302 || response.statusCode == 301){
                            res.statusCode = 301;
                            res.setHeader('Location', response.headers.location);
                       }
                       
        			   res.send(body);
        			}catch(exception){
        			   console.log("\t"+"response.statusCode read exception :"+httpMethod);
        			   console.log(exception);
        			   res.send('internalRequest Error', 500);
        			}
        		}
        	}
        );
    }else if(httpMethod == "POST"){
        
        // blog.devpage.net으로 POST 요청 인경우
        // X-Auth Header 확인
        // auth.devpage.net으로 인증 확인
        // 정상인경우 POST요청 진행
        
        authValidation(req, httpMethod, function(pass){// authValidation 인증 확인 절차 시행
            if(pass){
                console.log( "\t -------------------" );
                console.log('\t req.body:');
                console.log(req.body);
                console.log( "\t -------------------" );
        
                request(
                	{ method: 'POST', uri: requestUri, json : req.body},
                	function (error, response, body) {
                		if(error){
                			console.log("\t"+"request.post error!");
                			console.log(error);
                			res.send('internalRequest Error', 500);
                		}else{
                			try{
                			   console.log("\t"+"request.post success!");
                			   console.log("\t"+"response.statusCode:"+response.statusCode);
                			   res.statusCode = response.statusCode;
                			   res.send(body);
                			}catch(exception){
                			   console.log("\t"+"response.statusCode read exception :"+httpMethod);
                			   console.log(exception);
                			   res.send('internalRequest Error', 500);
                			}
                		}
                	}
                );    
            }else{
                console.log("\t"+"auth validation failed");
                res.send(401); // 401 not authorised
            }
        });        
        

    }    
}

// 인증 확인이 필요한 경우 사용
function authValidation(req, httpMethod, callBack){
    console.log("\t\t"+"[authValidation()]");
    
    // 요청 domain확인 
    if( req.get('host') == domainBlog && httpMethod == 'POST'){ // blog.devpage.net에 post로 요청시 
        console.log("\t\t"+"need valid");
        
        var xAuth = req.get('X-Auth');
        var uid = req.get('uId');
        
        console.log("\t\t"+"xAuth:"+xAuth);
        console.log("\t\t"+"uid:"+uid);
        
        var data = { 'xAuth' : xAuth, 'uId' : uid };
        
        request(
        	{ method: 'POST', uri: 'http://127.0.0.1:7010/validation', json : data},
        	function (error, response, body) {
        		if(error){
        			console.log("\t"+"auth validation request error!");
        			console.log(error);
        			res.send('authValidation Error', 500);
        		}else{
        		    
        			try{
        			   console.log("\t\t"+"authValidation success!");
        			   console.log("\t\t"+"response.statusCode:"+response.statusCode);
        			   console.log("\t\t"+"response.body:"+response.body);
        			   
        			   if(response.statusCode==200){
        			       console.log("\t\t"+"valid success");
        			       callBack(true);
        			   }else{
        			       console.log("\t\t"+"valid fail");
        			       callBack(false);
        			   }
        			   
        			}catch(exception){
        			   console.log("\t"+"authValidation exception : "+httpMethod);
        			   console.log(exception);
        			   callBack(false);
        			}
        		}
        	}
        );
    }else{
        console.log("\t\t"+"not need valid");
        callBack(true);
    }
}

app.listen('7000');