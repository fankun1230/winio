var apiHostName='http://10.3.51.155:9098/xueXinAssist';
//var apiHostName='http://10.3.104.34:8040/xueXinAssist';
//var apiHostName='https://education.chinatopcredit.com/xueXinAssist';
//var apiHostName='https://policyquery.chinatopcredit.com/xueXinAssist';

/*消息提示框*/
   function showAlert(msg,showTime){
   /* if($("#showAlert").length>0){
        return;
    }*/
   $("#showAlert").remove();
    var showTime = showTime||1000;
    var that="body";//.login_list
    var _html = '<div id="showAlert" class="showAlert">'+msg+'</div>'
    $(document).find(that).append(_html);
    $("#showAlert").css({"left":($(window).width()-$("#showAlert").outerWidth())/2+"px",
        "top":	($(window).height()-$("#showAlert").outerHeight())/2+"px"});
    setTimeout(function(){
        $("#showAlert").animate({opacity:"0"},800,function(){$(this).remove()})
    },showTime);
}

var keyID;
var codeLock=false;

function changeCode(typeOfOperator,oElement,loginName){
	if(codeLock==true){
		return
	}
	codeLock=true;
	$(oElement+" img").attr("src","?"+Math.random());
   // document.getElementById("checkCode").src="?"+Math.random();
    var projectUrl;
	var parameter={};

    $.ajax({
        url:apiHostName+'/'+typeOfOperator,
        type:"get",
      //  data:'',
        dataType:"json",
        contentType:"application/json",

        beforeSend:function(){
            $(oElement).siblings(".loading").show();
        },
        success:function(data){
            if(data.status==0){
				showAlert("验证码获取失败请刷新再试");
                return;
            }
            else if(data.status==1){
                keyID = data.keyID;		             
                var imagePath = "data:image/jpg;base64," + data.imageContent;
                $(oElement).attr("src",imagePath);
            //    document.getElementById("checkCode").src= imagePath;
                return;
            }
        },error:function(data){
        },complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
        	codeLock=false;
            $(oElement).siblings(".loading").hide();
          $(oElement).siblings("input").html("");		  
            var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus");
            if(sessionstatus=="timeout"){
                var rediredUrl=XMLHttpRequest.getResponseHeader("rediredUrl");
                window.open(rediredUrl,'_top');
            }
            return false;
        }
    })
}	
function trim(str){ //删除左右两端的空格 
	return str.replace(/(^\s*)|(\s*$)/g, ""); 
} 

	var isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if(!isiOS){
		$(".form_list input").on('input',function(){
		    if($(this).val()==""){
		        $(this).parents("li").children("span").hide();
		    }
		    else{
		        $(this).parents("li").children("span").show();
		    }
		})
		$(".form_list span").on('click',function(e){	
		    $(this).parents("li").find("input").val("");
		    $(this).hide();
		})
	}

