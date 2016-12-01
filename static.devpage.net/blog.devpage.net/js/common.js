document.domain = 'devpage.net';
var tkn = null;

function test(){
    alert('this is common.js->test()');
}

function setTkn(_tkn){
    tkn = _tkn;
    //$("#btnSignin").remove();
    $("#btnSignin").removeAttr("href","#");
    $("#btnSignin").text("Write");
    $("#btnSignin").click(function(){
        $('#blog-middle').html('<div style="height:600px;"><iframe id="test_write" src="http://static.devpage.net/blog.devpage.net/html/write/write.html" style="width:100%; height:100%;" frameborder="0" style="" allowtransparency="true" scrolling="no" ></iframe></div>');    
    });
}