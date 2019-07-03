//    ?    ?       ?   JS  ?
//   ? ?
 //  ?  ?
function goJtLogin(toStUrl){
	 if(toStUrl!=undefined&&toStUrl!=''&&toStUrl!='null'){
	   //toStUrl=decodeHtml(toStUrl);
	   toStUrl=repairLink(toStUrl);
	   window.location.href="http://www.189.cn/dqmh/ssoLink.do?method=linkTo&platNo=10028&toStUrl="+toStUrl;
	 }else{
	   window.location.href="http://www.189.cn/dqmh/ssoLink.do?method=linkTo&platNo=10028&toStUrl=http://gs.189.cn/service/yhzx/index.shtml";
	 }
}
function repairLink(toStUrl){
	if((toStUrl.indexOf('http://')<0)&&(toStUrl.indexOf('/')==0)){
	    return "http://gs.189.cn"+toStUrl;
	}else{
		return toStUrl;
	}
}
function decodeHtml(toStUrl){
	if(toStUrl.indexOf('>')>-1){
	  toStUrl=toStUrl.replace(/>/g,'&gt;');
	}
	if(toStUrl.indexOf('<')>-1){
	  toStUrl=toStUrl.replace(/</g,'&lt;');
	}
	if(toStUrl.indexOf('&')>-1){
	  toStUrl=toStUrl.replace(/&/g,'&amp;');
	}
	if(toStUrl.indexOf('>')>-1){
	  toStUrl=toStUrl.replace(/'/g,"&apos;");
	}
	if(toStUrl.indexOf('>')>-1){
	  toStUrl=toStUrl.replace(/"/g,'&quot;');
	}
	if(toStUrl.indexOf('/webShop')==0||toStUrl.indexOf('/activitys')==0){
	  toStUrl="http://gs.189.cn"+toStUrl;
	}
	
	return toStUrl;
}
/*
//   ?     ?
function goJtLogin(toStUrl){
 	if(toStUrl!=undefined&&toStUrl!=''&&toStUrl!='null'){
	  window.location.href="/web/jtsso/loginIndexWT.action?isInterceptor=1&forwordpage="+toStUrl;
	 }else{
	  window.location.href="/web/jtsso/loginIndexWT.action";
	 }
}
*/
//    ?  
function goJtRegister(){
	window.location.href="http://www.189.cn/dqmh/userCenter/userInfo/user_info_form_zc.jsp";
}
                                                                                                                                                                                                                                                                                                                                                                                                                                             