function openLoginBlock(){
    top.location.href='/web/login/loginIndex.action';
 }
$(function(){
	//?    ?  
	$(".font_underline").click(function(){
		$("#validateCode").click();
	});
}); 

//     ?ajax ?   
 function clickButton(id){

	// ? ?  ?  ??         ?  ?    
	$("#loginsubmit").show();
	$("#logingbutton").show();
	$("#loginbutton").hide();
	$("#errorInfo").hide();
	//        
	$(".login_type li").unbind('click');
	//                ajax    
	var randomnumber=Math.floor(Math.random()*100000);
	$("#randomnumber").val(randomnumber);
	$.getJSON($("#loginform").attr("action"),$("#loginform").serializeArray(),function(data){
		var dataObj=eval("("+data+")");//?  ?json    

		if((dataObj.returnCode!="4") && (dataObj.returnCode!="3") && (dataObj.returnCode!="9")){
			if(dataObj.isShowRandom=="truec"){
				$("#"+id+"bussY").show();
				$("#"+id+"isShowRandom").val("truec");
			}
			//alert(dataObj.returnCode);
			if(dataObj.returnCode=='100001')
			{
				 setErrorMsg(1," ?          ");
			}else	if(dataObj.returnCode=='111111')
			{
				 setErrorMsg(1," ?          ");
			}else
				{
					if(typeof(dataObj.errorMsg)== "undefined")
					{
						 setErrorMsg(1,"???     ? ");
					}else
						{
					setErrorMsg(1,dataObj.errorMsg);
				    }
				}
			//setErrorMsg(1,dataObj.errorMsg);
			$("#"+id+"number").focus();
			$("#loginsubmit").hide();
			$("#logingbutton").hide();
			$("#loginbutton").show();
			$('#presrand').val("");
			$('#validateCode2New').click();
		}else{
			$.unblockUI();
			$("#number").focus();
			$("#loginsubmit").hide();
			$("#logingbutton").hide();
			$("#loginbutton").show();
			var forwordpage = dataObj.forwordpage;//  ??    ?  ?

			if(forwordpage=="account"){// ?   ?
				window.location.href="/web/self/accountHomeIndex.action";
			}else if(forwordpage=="accountV2" || forwordpage=="indexV2"||forwordpage=="V2"){//2.0 ?   ?
				window.location.href="/webV2/self/accountHomeIndex.action";
			}else if(forwordpage=="simplepwd"){//      
				window.location.href="/web/self/accountMgrIndex.action?id=turnResetPage&tipType=reset";
			}else if(forwordpage=="simplepwdV2"){
				window.location.href="/webV2/self/accountMgrIndex.action?id=turnResetPage&tipType=reset";
			}else if(forwordpage=="schoolCardSuccess"){//§µ? ?
				window.location.href="/web/school/schoolCardInfoShow.action";
			}else if(forwordpage=="schoolCardSuccessV2"){
				window.location.href="/webV2/school/schoolCardInfoShow.action";
			}else if(forwordpage=="agreement"){//    §¿  
				window.location.href="/web/agreement/agreementIndex.action";
			}else if(forwordpage=="agreementV2"){
				window.location.href="/webV2/agreement/agreementIndex.action";
			}else if(forwordpage=="weibofly"){//?   ??   
				window.location.href="/web/servlet/BindNumberValidateReqServlet";
			}else if(forwordpage=="weiboflyV2"){
				window.location.href="/webV2/servlet/BindNumberValidateReqServlet";
			}else if(forwordpage=="shopOrderNew"){// ? ?    
				$("#packagesOrderFrom").submit();
			}else if(forwordpage=="shopOrderNewV2"){// ? ?    
				$("#packagesOrderFrom").submit();
			}else if(forwordpage=="index"){//?    ?
				//  ?  ?
				var custtype = dataObj.custType;
				
				if(custtype==1){
					window.location.href="/index";
				}else{
					window.location.href="/biz";
				}
			}else{
				var url=window.location.href;
				//?  url     #  
				var index = url.length - url.indexOf("#");
				for(index;index > 0; index--){
					if(url.substr(url.length-1)=="#"){//?  url     #  
						url = url.substr(0,url.length-1);
					}
				}
				var parm = "";
				if($("#reLoginPrarm").length>0){
					parm = $("#reLoginPrarm").val();
				}else if(url.indexOf("?")!=-1){
					var strstrs = url.split("?");
					parm = strstrs[1];
				}
				if(url.indexOf("?")!=-1){//?  url    ?   
					var strstrs = url.split("?");
					url = strstrs[0];
				}
				//  ?         ?     ??  ?
				var urlCon=getParam("jthdFlag");
			    //      §³  
				if(urlCon=="light")
				{
				url="/web/light/goToLoginGroupByWtLogin.action";	
				}
				//   ??            
				if(urlCon=="jtyx2")
				{
				url="/web/channelhd/postLogin.action";	
				}
				var formurl = "<form action="+url+" method=post name=formxRefrah style='display:none'>";
				var pars = parm.split("&");
				for(i=0;i<pars.length;i++){
					var dd = pars[i].split("=");
					var name = dd[0];
					var value = dd[1];
					formurl+="<input type=hidden name='"+name+"' value='"+value+"'/>";
				}
				formurl+="</form>";

				$("#reloginRefrashMode").html(formurl);
				document.formxRefrah.submit();
			}
		}
		//  li     ?   ? 
		$(".login_type li").click(function(){
			$("#bussY").hide();
			$("#isShowRandom").val("falsec");
			var tablist=$(this).index();//  ?  ?  li ¡À 
			$("#formId").val(tablist);//  ?  ?   id
			$("#errorInfo").hide();//   ?     ?
			$("#okInfo").hide();//      ?  ?
			$(".login_content ul.form_main_input_item").filter(":visible").hide().parent().children().eq(tablist).show();
			$(this).addClass("on").siblings().removeClass("on");
			clearFormInput(tablist);
		});
		});
 }
 
 /*
  ??    URL    ?
URL:http://www.blogjava.net/blog?name=bainian
      paramName URL    
   ¡Â   :getParam("name")
    ?:bainian
*/
//1.
function getParam(paramName)
{
      var  paramValue = "";
      var  isFound = false;
        if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=")>1)
        {
            arrSource = unescape(this.location.search).substring(1,this.location.search.length).split("&");
            i = 0;
            while (i < arrSource.length && !isFound)
            {
                if (arrSource[i].indexOf("=") > 0)
                {
                     if (arrSource[i].split("=")[0].toLowerCase()==paramName.toLowerCase())
                     {
                        paramValue = arrSource[i].split("=")[1];
                        isFound = true;
                     }
                }
                i++;
            }   
        }
   return paramValue;
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   