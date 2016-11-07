document.domain = 'devpage.net';
$("#form-signin").submit(function(){
    $.ajax({
        url:"http://auth.devpage.net/login",
        type:"POST",
        data:{
            "pValue":$("#inputEmail").val(),
            "uValue":$("#inputPassword").val()
        },
        dataType:"text",
        success:function(rtnValue){
            alert("JWT Token is : " +rtnValue);
        }
    });

    return false;
});