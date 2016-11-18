document.domain = 'devpage.net';
var tkn = null;

$("#form-signin").submit(function(){
    $.ajax({
        url:"http://auth.devpage.net/login",
        type:"POST",
        data:{
            "uValue":$("#inputEmail").val(),
            "pValue":$("#inputPassword").val()
        },
        dataType:"text",
        success:function(rtnValue, textStatus, xhr){
            
            if(xhr.status!=200){
                alert("Login Fail :"+rtnValue);
                console.log("Login Fail :"+rtnValue);
                console.log("status :"+xhr.status);
            }else{
                console.log("Login Success : " +rtnValue);
                tkn = rtnValue;            
                
                try{
                    opener.setTkn(tkn);
                    window.close();
                    
                }catch(error){
                    alert('opener access error');
                    console.log('opener access error');
                    console.log("error:"+error);
                }
            }
            
            
        }, 
        error:function(request, status, error){
            alert('Login Error');
            console.log("code:"+request.status);
            console.log("message:"+request.responseText);
            console.log("error:"+error);
        }
    });
    return false;
});