//  ?  ?   ?   ? inputCode - ? ?         ?   1-  ??   0-  ?  ?  
function checkValidateCode(inputCode,id,type){
		if(inputCode==""){
    		alert("        ?  ");
    		return false;
    	}
   
    	if(inputCode!="SPWD"){
	    	var url = "/web/commonJson/checkValidateCode.action?rand="+Math.random();
	    	var result;
	    	$.ajax({
               type: "get",
               cache: false,
               url: url,
               dataType:"json",
               data:"inputCode="+inputCode,
               async: false,  
               success: function(msg){
	            	 	var json = eval("("+msg+")");
	                    if(json.resultCode == "0"){
	                    	result=0;
	                	}else{
	                	 	result=1;
	    				}
	            },
                error:function(){
                	 result = 0;
                     window.alert(" ?  ??     ?     ?    ? ");
                   	
                } 
            });
	    	
         }else{
         	result=1;
         }
         return result;
}

//  ?  ?   ?   ? inputCode - ? ?         ?   1-  ??   0-  ?  ?   id  ?  div  id isShow 1-  ?  ? 0-    ? clazz-?    ?
function checkValidateCodeHtml(inputCode,id,isShow,clazz){
		if(inputCode==""){
			$("#"+id).removeClass();
			$("#"+id).addClass(clazz);
			if(isShow==1){
				$("#"+id).html("        ?  ");
				$("#"+id).show();
			}
    		return false;
    	}
    	if(inputCode!="SPWD"){
	    	var url = "/web/commonJson/checkValidateCode.action?rand="+Math.random();
	    	var result;
	    	$.ajax({
               type: "get",
               cache: false,
               url: url,
               dataType:"json",
               data:"inputCode="+inputCode,
               async: false,
               success: function(msg){
	            	 	var json = eval("("+msg+")");
	                    if(json.resultCode == "0"){
	                    	result=0;
	                	}else{
	                	 	result=1;
	    				}
	            },
                error:function(){
                	 result = 0;
                     window.alert(" ?  ??     ?     ?    ? ");
                   	
                } 
            });
	    	
         }else{
         	result=1;
         }
         return result;
}
//   ?           ?    smskey:  sms.properties     ?  §Ö name   type:1§³  ?  0 ?    recivPhone:   ?     rmdType:?      0     1  ?      2        3   ?      4?      5     ?  6? ?    7        8 ??    9  ?     10      11         13 ýw  ?  
function sendRmd(type,recivPhone,rmdType,smsKey){
		var re;
    	$.ajax({
               type: "get",
               cache: false,
               url:'/web/commonJson/randomNum.action',
               dataType:"json",
               data:"phs="+type+"&recivPhone="+recivPhone+"&rmdType="+rmdType+"&smsKey="+smsKey,
               async: false,
               success:function(json) {  
                if(json.resultRmd == "1"){
               			re = 1;
                       //window.alert("   ?       ?               ? ? ");
               			
               			$("#checkMsgShowCont").html("   ?       ?               ? ? ");
               			
               			$("#oneContent").block({ 
				            message: $('#checkMsg'), 
				            constrainTabKey:true,
				            fadeOut:0,
				            applyPlatformOpacityRules:1,
				            centerY: 0,
				            css: { 
						        top:		'200px',
						        left:		'200px',
						        width:      '520px',
						        border:  	'none'
				            },
				            overlayCSS: { backgroundColor: '#fff' }
				        }); 
               			
                       
                   }else{
                      re = 0;
                     // window.alert("        ?  ? ?    ?    ? ");
                      
                       $("#checkMsgShowCont").html("        ?  ? ?    ?    ? ");
               			
               			$("#oneContent").block({ 
				            message: $('#checkMsg'), 
				            constrainTabKey:true,
				            fadeOut:0,
				            applyPlatformOpacityRules:1,
				            centerY: 0,
				            css: { 
						        top:		'200px',
						        left:		'200px',
						        width:      '520px',
						        border:  	'none'
				            },
				            overlayCSS: { backgroundColor: '#fff' }
				        }); 
                      
                   }                  
                },
                error:function(){
                	 re = 0;
                    // window.alert(" ?  ??     ?     ?    ? ");
                	 
                	 $("#checkMsgShowCont").html(" ?  ??     ?     ?    ? ");
               			
               			$("#oneContent").block({ 
				            message: $('#checkMsg'), 
				            constrainTabKey:true,
				            fadeOut:0,
				            applyPlatformOpacityRules:1,
				            centerY: 0,
				            css: { 
						        top:		'200px',
						        left:		'200px',
						        width:      '520px',
						        border:  	'none'
				            },
				            overlayCSS: { backgroundColor: '#fff' }
				        }); 
                   	
                }
            });
            return re;
    }
//   ?           ?    smskey:  sms.properties     ?  §Ö name   type:1§³  ?  0 ?    recivPhone:   ?     rmdType:?      0     1  ?      2        3   ?      4?      5     ?  6? ?    7        8 ??    9  ?     10      11         13 ýw  ?  
//isShow 0-    ?  ? 1-  ?  ?
//id         div  id
//clazz ?  div   class  ?
function sendRmdNew(type,recivPhone,rmdType,smsKey,id,isShow){
	var re;
    $.ajax({
	    type: "get",
	    cache: false,
	    url:'/web/commonJson/randomNum.action',
	    dataType:"json",
	    data:"phs="+type+"&recivPhone="+recivPhone+"&rmdType="+rmdType+"&smsKey="+smsKey+"&isCheckLocal=1",
	    async: false,
	    success:function(json) {
		    if(json.resultRmd == "1"){
			    re = 1;
			    $("#"+id).html("<p>   ?       ?               ? ? </p>");
				if(isShow==1){
					$("#"+id).show();
				}
				$("#errorInfo").hide();
		    }else if(json.resultRmd == "2"){
		    	re = json.resultRmd;
			    $("#errorInfo").html("<p>             ?    ?</p>");
			    $("#0number").focus();
				if(isShow==1){
					$("#errorInfo").show();
				}
		    }else{
			    re = 0;
			    $("#errorInfo").html("<p>        ?  ? ?    ?    ? </p>");
				if(isShow==1){
					$("#errorInfo").show();
				}
		    }
	    },
	    error:function(){
		    re = 0;
		    re = 0;
		    $("#"+id).removeClass();
		    $("#"+id).addClass(clazz);
		    $("#"+id).html(" ?  ??     ?     ?    ? ");
			if(isShow==1){
				$("#"+id).show();
			}
	    }
   });
   return re;
}
//   ??      
//accType-         2000001- ? ,2000004- ? 
//accNum       ?       +    
//msgType    ?    ? 0-alert 1-  §Õhtml    
//msgId htmlid msgType?1?, ¨°       ?  
function sendDynpassword(accType,accNum,msgType,msgId){
	var url = "";
	var accType1 = getAccType(accType);
	$.ajax({
		type: "get",
		cache: false,
		url:'/web/commonJson/sendDynamicPassword.action',
		dataType:"json",
		data:"accountType="+accType1+"&mobileNo="+accNum,
		async: false,
		success:function(msg){
		var json = eval("("+msg+")");
			if(json.resultCode == "1"){
				re = 1;
				if(msgType==1&&msgId!=null){
					$("#okInfo").html("<p>             ?               ? ? </p>");
					$("#okInfo").show();
					waitSend();
				}else{
					window.alert("             ?               ? ? ");
					waitSend();
				}
			}else{
				re = 0;
				if(msgType==1&&msgId!=null){
					$("#"+msgId).html("<p>        ?  ? ?    ?    ? </p>");
					$("#"+msgId).show();
				}else{
					window.alert("        ?  ? ?    ?    ? ");
				}
	        }                  
		},
		error:function(){
			re = 0;
			if(msgType==1&&msgId!=null){
				$("#"+msgId).html("<p>        ?  ? ?    ?    ? </p>");
				$("#"+msgId).show();
			}else{
				window.alert(" ?  ??     ?     ?    ? ");
			}
		}
	});
	return re;
}
//  ?          ?     
function getAccType(id){
	var accType = 0;
	if(id==0){
		accType="2000004";
	}else if(id==1){
		accType="2000001";
	}
	return accType;
}
function waitSend(){
	smshuoqu=9;
	var secs = 30;
	var wait = secs * 1000;
	$("#1pwdprompt").attr('disabled',true);
	$("#1pwdprompt").html('<label><a href="javascript:void(0)">  ?       </a></label>');
	window.setTimeout("waitSendTimer()", wait);
}

//  ?    
function waitSendTimer() {
	smshuoqu=0;
	$("#").attr('disabled',false);
	$("#").html('<label><a href="###" onclick="javascript:sendDynamicPsw('+id+');">  ?       </a></label>');
	smsFlag = 0;
}                                                                                                                                                                                                                                                                                                                                                                                                             