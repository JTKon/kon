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
        $('#blogContents').html('<div style="height:600px;"><iframe id="test_write" src="http://blog.devpage.net/static/blog/html/write/write.html?tkn='+encodeURIComponent(tkn.token)+'&id='+encodeURIComponent(tkn.id)+'" style="width:100%; height:100%;" frameborder="0" style="" allowtransparency="true" scrolling="no" ></iframe></div>');    
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

//facebook comment 달기
function setComment(archive, seq){
     var fbCommentButton = '<div class="fbCommentBtn pointer">Comment <span class="glyphicon glyphicon-menu-down" aria-hidden="true"></span></div>';
     var fbCommentFrame = '<div id="fb-commentFrame-'+seq+'" class="fbCommentFrame" style="width:100%;"></div>';
     
     var blogPost = $("#blog-post-"+archive+"-"+seq);
     blogPost.find(".commentArea").html(fbCommentButton+fbCommentFrame);
     blogPost.find(".commentArea .fbCommentBtn").click(function(){
        var commentBtn = $(this);
        var commentIcon = commentBtn.find('span.glyphicon');
        
        if(commentBtn.hasClass("ShowComment")){//닫기
            //blogPost.find(".commentArea .fbCommentFrame").empty();//자식 노드 모두 삭제
            blogPost.find(".commentArea .fbCommentFrame").hide();
            commentBtn.removeClass("ShowComment");
            commentIcon.removeClass("glyphicon-menu-up");
            commentIcon.addClass("glyphicon-menu-down");
            
        }else{//열기
            
            //기존에 한번이라도 열어본 경우
            if(blogPost.find(".commentArea .fbCommentFrame .fb-comments").length>0){
                blogPost.find(".commentArea .fbCommentFrame").show();
            
            }else{//처음 여는 경우
                var fbCommentDiv = '<div class="fb-comments" data-href="http://blog.devpage.net/redirect/'+seq+'" data-width="100%" data-numposts="5"></div>';
                blogPost.find(".commentArea .fbCommentFrame").html(fbCommentDiv);
                FB.XFBML.parse($("#fb-commentFrame-"+seq)[0]);
            }
            
            commentBtn.addClass("ShowComment");
            commentIcon.removeClass("glyphicon-menu-down");
            commentIcon.addClass("glyphicon-menu-up");
            
        }
       
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
                
                for(var i=0; i<rtnValue.length; i++){
                    setComment(rtnValue[i].archive, rtnValue[i].seq);
                }
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

//seq에 해당하는 글 표기
function getSeqContent(seq){
    $.ajax({
        url:"http://blog.devpage.net/content/"+seq,
        type:"GET",
        dataType:"json",
        success:function(rtnValue, textStatus, xhr){
            
            if(xhr.status!=200){
                alert("/content/"+seq+" Fail :"+rtnValue);
                console.log("/content/"+seq+" Fail :"+rtnValue);
                console.log("status :"+xhr.status);
            }else{
                console.log("/content/"+seq+" Success : ");
                console.log(rtnValue);
                
                $("#blogContents").html(convertHtmlBlogContents(rtnValue));
                SyntaxHighlighter.highlight();
                
                for(var i=0; i<rtnValue.length; i++){
                    setComment(rtnValue[i].archive, rtnValue[i].seq);
                }
            }

        }, 
        error:function(request, status, error){
            alert("/content/"+seq+" Error");
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
                    var content = $(this).parent().find(".blog-post-content");
                    content.toggle();
                });
                $(".blog-post-title").addClass("pointer");
                SyntaxHighlighter.highlight();
                
                for(var i=0; i<rtnValue.length; i++){
                    setComment(rtnValue[i].archive, rtnValue[i].seq);
                }
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

// use facebook comment plugin
function fbInit (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v2.8&appId=752926071522086";
  fjs.parentNode.insertBefore(js, fjs);
}

//시작
$(document).ready(function(){
    goHome();// 상단 홈버튼 이벤트
    setArchivesEvent();// archive-list 클릭시 해당 리스트 보여줌
    
    var seq = urlParam("seq");
    if(seq){
        getSeqContent(seq);//seq에 해당하는 글 표기
    }else{
        getLastContent();//마지막으로 쓴 글 표기
    }
        
    $("#blog-description").text(getWiseSaying());
    
    fbInit(document, 'script', 'facebook-jssdk');
});