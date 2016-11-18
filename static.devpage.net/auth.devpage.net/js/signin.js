$("#form-signin").submit(function(){
    $.ajax({
        url:"http://auth.devpage.net/login",
        type:"POST",
        data:{
            "uValue":$("#inputEmail").val(),
            "pValue":$("#inputPassword").val()
        },
        dataType:"text",
        success:function(rtnValue){
            alert("JWT Token is : " +rtnValue);
        }
    });
    return false;
});