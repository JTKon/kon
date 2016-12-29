//서브도메인들끼리 통신할때 필요
document.domain = 'devpage.net';

// 타임스탬프 날짜 변환
function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

// url parameter 검색
function urlParam (name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (results==null){
	   return null;
	}else{
	   return results[1] || 0;
	}
}

// jsonBlogContent을 html로 변환
function convertHtmlBlogContents(jsonBlogContent){
    var contentTemplet = '<div class="blog-post"><span class="blog-post-title">${title}</span><span class="blog-post-archive">${archive}</span><p class="blog-post-meta">${wDate} by <a href="#">${wId}</a></p><div class="blog-post-content">${content}</div></div>';
    var templet = "";
    
    for(var i=0; i<jsonBlogContent.length; i++){
        templet += contentTemplet
            .replace("${title}",jsonBlogContent[i].title)
            .replace("${archive}",jsonBlogContent[i].archive+"-"+jsonBlogContent[i].seq)
            .replace("${wDate}",timeConverter(jsonBlogContent[i].wDate))
            .replace("${wId}",jsonBlogContent[i].wId)
            .replace("${content}",jsonBlogContent[i].content);
    }
    
    console.log(templet);
    return templet;
}

// 꺽쇠랑 엔드표시 HtmlCharacter로 변경
function replaceHtmlCharacters(sContent){
   sContent = sContent.replace(/&/gi,'&amp;').replace(/</gi,'&lt;').replace(/>/gi,'&gt;'); 
   return sContent;
}