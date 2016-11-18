document.domain = 'devpage.net';
var tkn = null;

function test(){
    alert('this is common.js->test()');
}

function setTkn(_tkn){
    tkn = _tkn;
    $("#btnSignin").remove();
}