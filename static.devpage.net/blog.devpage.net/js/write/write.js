
document.domain = 'devpage.net';

// IE인지 확인한다.
function isIE(){
	if(document.body && document.body.contentEditable != undefined && window.ActiveXObject) return true;
	else return false;
}

//에디터를 리턴한다. (execCommand()를 실행할 때 사용)
function edit(){
	var iframe=document.getElementById(editorID);
	var content =(iframe.contentWindow || iframe.contentDocument);
	if (content.document)content=content.document;
	return content;
}


//에디터의 커서가 있는 부분에 html을 입력한다.
function insertHTML(html){
	var iframe = document.getElementById(editorID);
	iframe = (iframe.contentWindow || iframe.contentDocument);
	if(ieFlag){
		range.select();
		range.pasteHTML(html);
	}else{
		iframe.document.execCommand("Inserthtml",false,html);
	}		
}


//에디터에서 엔터 입력시 <p>를 <br />로 변경한다.
function convertEnter(){
	$(edit(editorID)).keydown(function(event){
		var el = event.srcElement ? event.srcElement : event.target;
		if(event.keyCode == 13) { 
			var range = el.parentNode.parentNode.selection.createRange();
			range.select();  
			range.pasteHTML(event.shiftKey? "<p>":"<br>"); 
			return false;
		}
	});
}


//테이블 버튼을 클릭했을때 테이블 구성을 선택할 팝업(#tableSelector)을 구현한다.
function tableMaker(tableSelector){
	
	//tableSelector를 레이어 팝업으로 만듦
	$(tableSelector).attr("style","position:absolute; BORDER-BOTTOM: #000000 1px solid; TEXT-ALIGN: center; BORDER-LEFT: #000000 1px solid; PADDING-BOTTOM: 2px; BACKGROUND-COLOR: white;WIDTH: 160px;  DISPLAY: inline; BORDER-TOP: #000000 1px solid; BORDER-RIGHT: #000000 1px solid; PADDING-TOP: 10px;");
	
	//줄,칸 선택용 테이블 생성 
	var tableSampler="<table border='1' id='tableSampler' style='margin-left:auto; margin-right:auto; BORDER-BOTTOM: #000000 1px solid; BORDER-LEFT: #000000 1px solid; BORDER-COLLAPSE: collapse; MARGIN-BOTTOM: 3px; BORDER-TOP: #000000 1px solid; BORDER-RIGHT: #000000 1px solid;' cellSpacing='0' cellPadding='0'>";
	for(var i=1; i<=10; i++){
		var tempTr="<tr>";
		for(j=1; j<=15; j++){
			tempTr+="<td style='border:solid 1px #000000' trNum='"+i+"' tdNum='"+j+"' class='tableSamplerBox' height='8' width='8'></td>"
		}
		tempTr+="</tr>";
		tableSampler += tempTr;
	}
	tableSampler+="<tbody></tbody></table>";
	tableSampler+="<div id='tableSamplerInfo' style='FONT: 9pt Arila'>0 X 0</div>";
	$(tableSelector).html(tableSampler);
	
	var tableSamplerTd = $("#tableSampler tbody td");
	
	//선택용 테이블에 mouseover시 만들어질 table의 열/칸을 실시간으로 보여줌
	$(".tableSamplerBox").mouseover(function(){

		var trNum = parseInt($(this).attr('trNum'));
		var tdNum = parseInt($(this).attr('tdNum'));

		tableSamplerTd.css('background-color','#FFFFFF');

		var tableSamplerTdCnt = 0;
		for(var i=1; i<=10; i++){
			for(j=1; j<=15; j++){
				if(i<=trNum && j<=tdNum){
					$(tableSamplerTd[tableSamplerTdCnt]).css('background-color','#BDBDBD');
				}
				tableSamplerTdCnt++;
			}
		}

		$("#tableSamplerInfo").html(tdNum+" X "+trNum);
	});
	
	//선택용 테이블 클릭시 에디터에 선택용 테이블을 만들어 붙인다.
	$(".tableSamplerBox").click(function(){
		$(tableSelector).hide();
		
		var trNum = parseInt($(this).attr('trNum'));
		var tdNum = parseInt($(this).attr('tdNum'));
		var table = "<table style='width:90%; BORDER-BOTTOM: #000000 1px solid; BORDER-LEFT: #000000 1px solid; BORDER-COLLAPSE: collapse; MARGIN-BOTTOM: 3px; BORDER-TOP: #000000 1px solid; BORDER-RIGHT: #000000 1px solid; margin-left:12px;' cellSpacing='0' cellPadding='0' border='1'>";
		for(var i=0; i<trNum; i++){
			table+="<tr>";
			for(var j=0; j<tdNum; j++){
				table+="<td style='height:20px; border:solid 1px #000000'></td>";
			}
			table+="</tr>";
		}
		table+="</table>";
		insertHTML(table);
	});
	
	$(tableSelector).hide();
}

//기능버튼 클릭시 range(커서 위치)를 저장해 둔다.
function saveRange(){
	var iframe = document.getElementById(editorID);
	iframe = (iframe.contentWindow || iframe.contentDocument);
	if(ieFlag){
		iframe.focus();//먼저 포커스를 주지 않으면 에러
		range = iframe.document.selection.createRange();
	}			
}

//click된 bgcolor로 font color를 변경한다.
function fontColorSelector(){
	$("#fontColor .colorTd").click(function(){
		var color = $(this).attr("bgcolor");
		if(ieFlag)range.select();
		edit().execCommand('ForeColor', false, color);
		$("#fontColorSelector").hide();
		//$("#"+editorID).focus();
		focusEditor();
	});
}

//click된 bgcolor로 back color를 변경한다.
function backColorSelector(){
	$("#backColor .colorTd").click(function(){
		var color = $(this).attr("bgcolor");
		if(ieFlag)range.select();
		edit().execCommand("BackColor",false,color);
		$("#backColorSelector").hide();
		focusEditor();
	});
}

//선택된 곳에 link를 준다
function urlLink(){
	$("#btnInsertUrl").click(function(){
		var url = $("#inputUrl").val(); 
		$("#divUrl").hide();
		if(ieFlag)range.select();
		edit().execCommand("Createlink",false,url);
	});
}

//ifram editor에 focus를 준다.
function focusEditor(){
	// jQuery focus를 사용 할 경우 오작동함.
	var iframe=document.getElementById(editorID);
	var content = iframe.contentWindow;
	content.focus();
}

function fontSelector(){
	//fontSelect
	$(".fontSelect").mouseover(function(){
		$(".fontSelect").css("background-color","#FFFFFF");
		$(this).css("background-color","#D5D4FF");
	});
	
	$(".fontSelect").click(function(){
		//브라우저에 따라 ''가 붙어나오는 것과 아닌것이 있다.
		var font = $(this).css("font-family").replace(/'/g,"");
		$("#fontSelector").hide();
		if(ieFlag)range.select();
		focusEditor();
		edit().execCommand("Fontname",false,font);
	});
}

function fontSizeSelector(){
	//fontSizeSelect
	$(".fontSizeSelect").mouseover(function(){
		$(".fontSizeSelect").css("background-color","#FFFFFF");
		$(this).css("background-color","#D5D4FF");
	});
	
	$(".fontSizeSelect").click(function(){
		var fontSize = $(this).find("font").attr("size");
		$("#fontSizeSelector").hide();
		if(ieFlag)range.select();
		focusEditor();
		edit().execCommand("Fontsize",false,fontSize);
	});
}



var ieFlag;// IE인지 확인

var range;//기능버튼 클릭시 IE에서는 ifrm editor의 focus를 읽어 버림으로 range(커서 위치)를 저장해 둔다.

var editorID = "editor";// editable된 iframe의 id 

var sourceFlag = false; // wysiwyg모드 <-> html모드

$(document).ready(function(){
	
	ieFlag = isIE();// IE인지 확인
	
	//convertEnter();// enter <p> -> <br /> //일단 보류
	
	tableMaker("#tableSelector");//테이블 버튼을 클릭했을때 보여줄 셈플 팝업(#tableSelector)을 구현한다.
	
	fontColorSelector();//fontcolor선택 이벤트
	
	backColorSelector();//backcolor선택 이벤트
	
	fontSelector();//font 선택 이벤트
	
	fontSizeSelector();//font size 선택 이벤트
	
	urlLink();//url link 입력 이벤트
	
	//Table
	$("#btnTable").click(function(){
		if(sourceFlag)return;
		saveRange();//range 저장
		$("#tableSelector").toggle();
	});
	
	//BackColor
	$("#btnBackColor").click(function(){
		if(sourceFlag)return;
		saveRange();//range 저장
		$("#backColorSelector").toggle();
	});

	//FontColor
	$("#btnFontColor").click(function(){
		if(sourceFlag)return;
		saveRange();//range 저장
		$("#fontColorSelector").toggle();
	});
	
	//Bold
	$("#btnBold").click(function(){
		if(sourceFlag)return;
		saveRange();//range 저장
		edit().execCommand("Bold");
		focusEditor();
	});
	
	//Strike
	$("#btnStrike").click(function(){
		if(sourceFlag)return;
		saveRange();//range 저장
		edit().execCommand("StrikeThrough");
		focusEditor();
	});
	
	//Italic
	$("#btnItalic").click(function(){
		if(sourceFlag)return;
		saveRange();//range 저장
		edit().execCommand("Italic");
		focusEditor();
	});
	
	//Underline
	$("#btnUnderline").click(function(){
		if(sourceFlag)return;
		saveRange();//range 저장
		edit().execCommand("Underline");
		focusEditor();
	});
	
	//JustifyLeft
	$("#btnJustifyLeft").click(function(){
		if(sourceFlag)return;
		saveRange();//range 저장
		edit().execCommand("JustifyLeft");
		focusEditor();
	});

	//JustifyCenter
	$("#btnJustifyCenter").click(function(){
		if(sourceFlag)return;
		saveRange();//range 저장
		edit().execCommand("JustifyCenter");
		focusEditor();
	});

	//JustifyRight
	$("#btnJustifyRight").click(function(){
		if(sourceFlag)return;
		saveRange();//range 저장
		edit().execCommand("JustifyRight");
		focusEditor();
	});

	//ordered list
	$("#btnListDot").click(function(){
		if(sourceFlag)return;
		saveRange();//range 저장
		edit().execCommand("Insertorderedlist");
		focusEditor();
	});
	
	//unordered list
	$("#btnListNumber").click(function(){
		if(sourceFlag)return;
		saveRange();//range 저장
		edit().execCommand("Insertunorderedlist");
		focusEditor();
	});
	
	//Indent
	$("#btnIndent").click(function(){
		if(sourceFlag)return;
		saveRange();//range 저장
		edit().execCommand("Indent");
		focusEditor();
	});
	
	//Outdent
	$("#btnOutdent").click(function(){
		if(sourceFlag)return;
		saveRange();//range 저장
		edit().execCommand("Outdent");
		focusEditor();
	});
	
	//font name
	$("#btnFont").click(function(){
		if(sourceFlag)return;
		saveRange();//range 저장
		$("#fontSelector").toggle();
	});
	
	//font size
	$("#btnFontSize").click(function(){
		if(sourceFlag)return;
		saveRange();//range 저장
		$("#fontSizeSelector").toggle();
	});
	
	//url link
	$("#btnUrl").click(function(){
		if(sourceFlag)return;
		saveRange();//range 저장
		$("#divUrl").toggle();
	});
	
	//source view
	$("#btnSource").click(function(){
		if(!sourceFlag){
			//$("#divEditor").css("border","2px solid blue");
			$(".editorIcon").addClass("opacity");
			$("#editor").hide();
			$("#sourceView").show();
			$("#sourceView").val($(edit()).contents().find("body").html());
			sourceFlag=true;
		}else{
			//$("#divEditor").css("border","2px solid green");
			$(".editorIcon").removeClass("opacity");
			$("#editor").show();
			$("#sourceView").hide();
			
			$(edit()).contents().find("body").html($("#sourceView").val());
			
			sourceFlag=false;
		}
	});
	
	//code block
	$("#btnInsertCodeBlock").click(function(){
    	if($("#codeBlockTextArea").val()!=""){
    	    insertHTML("</br>");
    	    var codeBlock = "<pre class='brush:"+$("#codeBlockStyle").val()+"'>"+replaceHtmlCharacters($("#codeBlockTextArea").val())+"</pre></br>";
    		insertHTML(codeBlock);
    		$("#codeBlockStyle").val("");
    	}
    	$("#codeBlockInsert").hide();
    });
    
    $("#btnCodeBlock").click(function(){
        $("#codeBlockInsert").toggle();
    });
	
	//title 옆 archive 선택시 선택한 값을 보여줌
	$(".archive_name").click(function(){
	    $("#archives_selector").html($(this).text()+" <span class='caret'></span>");
	});
	
	//작성한 글 저장
	$("#save_write").click(function(){
	    
	    var id = decodeURIComponent(urlParam('id'));
	    
	    var content = {
	       "archive" : $("#archives_selector").text().trim(),
	       "title" : $("#title").val(),
	       "content" : $(edit()).contents().find("body").html().trim(),
	       "wId" : id
	    };

	    console.log('tkn:'+decodeURIComponent(urlParam('tkn')));
	    console.log(content);
	    
	    var tkn = decodeURIComponent(urlParam('tkn'));
	    if(tkn==null){
	        alert('Log In First');
	        return false;
	    }
	    
	    if(content=="Archives"){
	        alert('select Archive');
	        return false;
	    }
	    
        $.ajax({
            url: 'http://blog.devpage.net/content/',
            headers: {
                'X-Auth':tkn,
                'uId': id
            },
            contentType: "application/json; charset=UTF-8",
            method: 'POST',
            dataType: 'json',
            data: JSON.stringify(content),
            success: function(data){
                alert('Write Success');
                console.log('succes: '+data);
            }, 
            error:function(request, status, error){
                alert('Write Error');
                console.log("code:"+request.status);
                console.log("message:"+request.responseText);
                console.log("error:"+error);
            }
        });
	});
});