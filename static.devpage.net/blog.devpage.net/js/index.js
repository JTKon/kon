// 로그인했을때 토큰
var tkn = null;

// 로그인 토큰 받으면 로그인 버튼 대신 쓰기 버튼 표기(로그인창에서 불림)
function setTkn(_tkn){
    tkn = _tkn;
    $("#btnSignin").removeAttr("href","#");
    $("#btnSignin").text("Write");
    $("#btnSignin").click(function(){
        $('#blog-sidebar').hide();
        $('#blog-main').removeClass("col-sm-8");
        $('#blog-main').addClass("col-sm-13");
        $('#blogContents').html('<div style="height:600px;"><iframe id="test_write" src="http://static.devpage.net/blog.devpage.net/html/write/write.html?tkn='+encodeURIComponent(tkn.token)+'&id='+encodeURIComponent(tkn.id)+'" style="width:100%; height:100%;" frameborder="0" style="" allowtransparency="true" scrolling="no" ></iframe></div>');    
    });
}

// 상단 홈버튼
function goHome(){
    $("#goHome").click(function(){
        $('#blog-main').removeClass("col-sm-13");
        $('#blog-main').addClass("col-sm-8");
        $('#blog-sidebar').show();
        getLastContent();
    });
}

//마지막으로 쓴 글 표기
function getLastContent(){
    $.ajax({
        url:"http://blog.devpage.net/content/findLastWDate",
        type:"GET",
        dataType:"json",
        success:function(rtnValue, textStatus, xhr){
            
            if(xhr.status!=200){
                alert("/content/findLastWDate Fail :"+rtnValue);
                console.log("/content/findLastWDate Fail :"+rtnValue);
                console.log("status :"+xhr.status);
            }else{
                console.log("/content/findLastWDate Success : ");
                console.log(rtnValue);
                $("#blogContents").html(convertHtmlBlogContents(rtnValue));
                SyntaxHighlighter.highlight();
            }

        }, 
        error:function(request, status, error){
            alert('/content/findLastWDate Error');
            console.log("code:"+request.status);
            console.log("message:"+request.responseText);
            console.log("error:"+error);
        }
    });
}

// archive에 맞는 contents 리스트를 가져온다.
function findArchiveContents(archive){
    $.ajax({
        url:"http://blog.devpage.net/archive/"+encodeURIComponent(archive),
        type:"GET",
        dataType:"json",
        success:function(rtnValue, textStatus, xhr){
            
            if(xhr.status!=200){
                alert("/blog.devpage.net/archive/"+encodeURIComponent(archive)+" Fail :"+rtnValue);
                console.log("/blog.devpage.net/archive/"+encodeURIComponent(archive)+" Fail :"+rtnValue);
                console.log("status :"+xhr.status);
            }else{
                console.log("/blog.devpage.net/archive/"+encodeURIComponent(archive)+" Success :"+rtnValue);
                console.log(rtnValue);
                $("#blogContents").html(convertHtmlBlogContents(rtnValue));
                $(".blog-post-content").hide();
                $(".blog-post-title").click(function(){
                    console.log('clicked');
                    var content = $(this).parent().find(".blog-post-content");
                    content.toggle();
                });
                $(".blog-post-title").addClass("pointer");
                SyntaxHighlighter.highlight();
            }

        }, 
        error:function(request, status, error){
            alert("/blog.devpage.net/archive/"+encodeURIComponent(archive)+" Error");
            console.log("code:"+request.status);
            console.log("message:"+request.responseText);
            console.log("error:"+error);
        }
    });
}

// archive-list 클릭시 각각의 Archive에 맞게 findArchiveContents()를 부르도록 이벤트를 걸어준다.
function setArchivesEvent(){
    $("#archive-list li").each(function(){
        var archiveNameObj = $(this);
        archiveNameObj.click(function(){
            var archive = archiveNameObj.text();
            console.log(archive);
            findArchiveContents(archive);
        });
    });
}

//시작
$(document).ready(function(){
    goHome();// 상단 홈버튼 이벤트
    setArchivesEvent();// archive-list 클릭시 해당 리스트 보여줌
    getLastContent();//마지막으로 쓴 글 표기
     $("#blog-description").text(getWiseSaying());
});