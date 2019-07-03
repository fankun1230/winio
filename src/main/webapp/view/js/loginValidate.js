 var smsFlag=0;//  ?          ?  ? ? ?    ???     ㎋              ? ? 30  ? ?     ? ?     ?        
 var dySmsFlag=0;//  ? ?       ?  ? ? ?    ???     ㎋              ? ? 30  ? ?     ? ?     ?        
 var formFlag=0;//  ?? ㎒? ?  ?

//  input      ?  ?  ?
function validatenCode(id){
	var usernumber=$("#"+id+"number");
	$("#"+id+"number").val($("#"+id+"number").val().replace(/^\s*|\s*$/g,''));
	if(isEmpty(usernumber.val())){
		hideContent(1,id);
	}
}

// ㎋  ?         
function changedtype(id){
	
	var type_value =  $("input[name='"+id+"pwdtype']:checked").val(); 
	$("#errorInfo").hide();
	$("#okInfo").hide();
	if(id==0){
		if(type_value=='1'){
			$("#"+id+"pwdprompt").html("");
			$("#remPwdLi").show();//  ?  ?    
		}else{
			$("#remPwdLi").hide();//   ? ?    
			if(smsFlag == 1){// ?    ??    ?   ?  ?  ??  30  ? ?
				$("#"+id+"pwdprompt").html('<label><a href="javascript:void(0)" class="gray">  ?        </a></label>');
			}else{
				$("#"+id+"pwdprompt").html('<label><a href="###" onclick="javascript:getSmspwd('+id+');">  ?        </a></label>');
			}
		}
	}else if(id==1){
		if(type_value=='1'){
			$("#"+id+"pwdprompt").html("");
		}else{
			if(smsFlag == 1){// ?    ??    ?   ?  ?  ??  30  ? ?
				$("#"+id+"pwdprompt").html('<label><a href="###" class="gray">  ?       </a></label>');
			}else{
				$("#"+id+"pwdprompt").html('<label><a href="###" onclick="javascript:sendDynamicPsw('+id+');">  ?       </a></label>');
			}
		}
	}
}

//     ??    ?
function form_do(websource,usernumber,password){ 

	var validatecode=$("#presrand").val();
	var validatecodeInfo = validatecode.replace(/^\s*|\s*$/g,'');
	$("#srand").val(validatecodeInfo);
 	if (validatecodeInfo==""){
 		setErrorMsg(1,"        ? ?");
		setErrorInput("","presrand",1);
		$("#presrand").val("");
		return false;
	}
	if(validatecodeInfo.length!=4){
		setErrorMsg(1,"        ?    ? ?");
		setErrorInput("","presrand",1);
		return false;
	}
	// ? ?  ?  ??         ?  ?    
	$("#loginsubmit").show();
	$("#logingbutton").show();
	$("#loginbutton").hide();
	$("#errorInfo").hide();
	window.open(websource+"/staticJsp/bussessTurnVnetJsp.jsp?loginName="+usernumber+"&loginPwd="+password,"newpage","height=500,width=400,status=no,toolbar=no,menubar=no,location=no,resizable=yes"); 
	return false;
}
	
//    ?      ?  
function form_account(websource){
	window.open(websource+"/self/turnRegistPage.action");
}
//    ?   ?     
function findPassword(websource){
	window.open(websource+"/self/turnFindPassword.action");
}
	
//  ?        
function getOnLineUsers(websource){
	var urllink = websource+"/jsonlogin/onLineUsers.action";
	$.ajax({
		url: urllink,
		type: "POST",
		dataType: "json",
		beforeSend : function(){
			$("#online_num").html('<img src="'+websource+'/images/family/wait.gif"  />');
		},
		success: function(json){
			var onLineUsers = json.onLineUsers;
			$("#online_num").html(onLineUsers);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			$("#online_num").html('0');
		}
	});
}
	
// ?  ?
function autoSubmit(websource,id){

	var logintype = $("#logintype").val();
	if(logintype=="12"){//  ?     ?   ?     ?
		if(!form_do(websource)){
			return false;
		}
	}else{
		if(!clickButton(id)){
			return false;
		}
	}
}
	
// ?         
function PasswordReset(websource){
	window.open(websource+"/self/accountMgrIndex.action?id=turnResetPage&tipType=find");
}
	
//  ?        
var smshuoqu =0;//   ?? ??
function getSmspwd(id){
	if(smshuoqu==0){
		var logintype = getLoginType(id);

		if(logintype!=4){//     ?     
			alert("  ?    ? ?    ? ?    ?");
			return false;
		}
		var usernumber=$("#"+id+"number");
		if (usernumber.val()==""||usernumber.val()==" ?     "){
			setErrorMsg(1,"       ?    ?");
			setErrorInput(id,"number",1);
			return false;
	 	}
	 	if(usernumber.val().length!=11){
	 		setErrorMsg(1," ?     ?   ?  ?11┡  ");
			setErrorInput(id,"number",1);
			return false;
	 	}
		if(f_check_mobile(usernumber.val())==false)	{
			setErrorMsg(1,"        ? ?    ?     ");
			setErrorInput(id,"number",1);
		    return false;
		}
		if(smshuoqu==0){
			var re = sendRmdNew(0,usernumber.val(),1,'msg16',"okInfo","1");//   ㉣  ?? ?     
			if(re==1){//   ?? 
				smsFlag = 1;//   ?? ?     ?    ㎋     ?     ?  ?  ?  ?
		 	   	smsWait(id);
		 	}
		}
	}
}
	
//   ?      ?      ㎔   ?   ?   ?  ?   true  ?  false     ?
function checkRandShow(id,websource){
}
function checkRandShow_old(id,websource){

	var isShowRandom = $("#isShowRandom").val();

	if(isShowRandom!="truec"){//  ?    ?    ?  ?  
		var logintype = $("#logintype").val();

		if(logintype==12){
			return false;
		}
		var usernumber=$("#"+id+"number");
		var type_value = getLoginType(id);
		var city = $("#selectcity").val();
	
		var usernumberInfo = usernumber.val().replace(/^\s*|\s*$/g,'');
	    $("#number").val(usernumberInfo);
	    
		if((type_value!="") && (usernumberInfo!="")){
			if(type_value==1 && (city==null||city=="")){
				return false;
			}
			var urllink = websource+"/jsonlogin/checkRandShow.action";
			var data = "logintype="+type_value+"&number="+usernumberInfo+"&city="+city;
			$.ajax({
					url: urllink,
					type: "POST",
					data: data,
					dataType: "json",
					beforeSend : function(){
					},
					success: function(json){
						var isShowRandom = json.isShowRandom;

						if(isShowRandom=="truec"){
							//  ?  ?  
							$("#presrand").val("");
							$('#validateCode2New').click();
					    	$("#bussY").show();
					    }
					    if(isShowRandom=="falsec"){
					    	//      ?  
					    	$("#presrand").val("");
					    	$("#bussY").hide();
					    }
					    $("#isShowRandom").val(isShowRandom);
					},
					error: function(XMLHttpRequest, textStatus, errorThrown){
					}
			});
		}
	}
}
// ??    ?
function loginCheckForm(){
	var tabid = $("#formId").val();
	if(tabid==0){
		mobileCheckForm(tabid);
	}else if(tabid==1){
		phoneCheckForm(tabid);
	}else if(tabid==2){
		adslCheckForm(tabid);
	}else if(tabid==3){
		otherCheckForm(tabid);
	}
}
//  ? ?    
function mobileCheckForm(id){

	var number = $("#"+id+"number").val().replace(/^\s*|\s*$/g,'');
	var pwdType = $("input[name='"+id+"pwdtype']:checked").val();
	var password = $("#"+id+"password").val();
	var city = "9999";
	var srand = $("#presrand");
	var logintype = getLoginType(id);

	//  ? ? 
	if(number==null || number==""){
		$("#"+id+"tip").hide();
		setErrorMsg(1,"       ?    ?");
		setErrorInput(id,"number",1);
		return false;
	}
	if(number.length!=11){
		setErrorMsg(1," ?     ?   ?  ?11┡  ");
		setErrorInput(id,"number",1);
		return false;
	}
	if(f_check_mobile(number)==false){
		setErrorMsg(1,"        ? ?    ?     ");
		setErrorInput(id,"number",1);
		return false;
	}
	//  ?    
	if(password==null || password.replace(/^\s*|\s*$/g,'')==""){
		setErrorMsg(1,"       ?   ?");
		setErrorInput(id,"password",1);
		$("#"+id+"password").val("");
		return false;
	}
	if(!f_check_userID(password)){
		setErrorMsg(1,"      ?       ");
		setErrorInput(id,"password",1);
		return false;
	}
	var isShowRandom = $("#isShowRandom").val();
	if(isShowRandom=="truec"){
		var validatecodeInfo = srand.val().replace(/^\s*|\s*$/g,'');
		$("#srand").val(validatecodeInfo);
		if (validatecodeInfo==""){
			setErrorMsg(1,"        ? ?");
			setErrorInput(id,"srand",1);
			srand.val("");
			return false;
		}
		if(validatecodeInfo.length!=4){
			setErrorMsg(1,"        ?    ? ?");
			setErrorInput(id,"srand",1);
			return false;
		}
		//  ? ? ?    
		if(!f_check_number(validatecodeInfo)){
			setErrorMsg(1,"        ?    ? ?");
			setErrorInput(id,"srand",1);
			return false;
		}
		//  ?  ?   ?   ?
		var error = checkValidateCode(validatecodeInfo,'','');
		if(error==1){
			
		}else{
			setErrorMsg(1,"  ?              ?");
			setErrorInput(id,"srand",1);
			return false;
			$('#validateCodeNew').click();
			return false;
		}
	}
	//   ?      
	setLoginForm(number,city,logintype,pwdType,password);
	clickButton(id);
}
//  ? ? ㎡  ?   
function phoneCheckForm(id){
	var city =  $("#selectcity").val();
	var number = $("#"+id+"number").val().replace(/^\s*|\s*$/g,'');
	var pwdType = "1";//$("input[name='"+id+"pwdtype']:checked").val();
	var password = $("#"+id+"password").val().replace(/^\s*|\s*$/g,'');
	var logintype = getLoginType(id);
	var srand = $("#presrand");
	
	if(isEmpty(city)||city=="9999"){
		setErrorMsg(1,"  ?         ?     ");
		setErrorInput(id,"city",1);
		$("#selectcity").focus();
		return false;
	}
	//  ? 는    
	if(number==null || number==""){
		setErrorMsg(1,"      는   ?");
		setErrorInput(id,"number",1);
		return false;
	}
	if(number.length<7 && number.length>0){
		setErrorMsg(1," 는    ?   ?  ?7┡  ");
		setErrorInput(id,"number",1);
		return false;
	}
	if(!f_check_telephone(number)){
		setErrorMsg(1,"        ? ?는   ?");
		setErrorInput(id,"number",1);
		$("#"+id+"number").focus();
		return false;
	}
	//  ?    
	if(password==null || password==""){
		setErrorMsg(1,"       ?   ?");
		setErrorInput(id,"password",1);
		$("#"+id+"password").val("");
		return false;
	}
	if(!f_check_userID(password)){
		setErrorMsg(1,"      ?      ?");
		setErrorInput(id,"password",1);
		return false;
	}
	var isShowRandom = $("#isShowRandom").val();
	if(isShowRandom=="truec"){
		var validatecodeInfo = srand.val().replace(/^\s*|\s*$/g,'');
		$("#srand").val(validatecodeInfo);
		if (validatecodeInfo==""){
			setErrorMsg(1,"        ? ?");
			setErrorInput("","presrand",1);
			srand.val("");
			return false;
		}
		if(validatecodeInfo.length!=4){
			setErrorMsg(1,"        ?    ? ?");
			setErrorInput("","presrand",1);
			return false;
		}
		//  ? ? ?    
		if(!f_check_number(validatecodeInfo)){
			setErrorMsg(1,"        ?    ? ?");
			setErrorInput(id,"presrand",1);
			return false;
		}
		//  ?  ?   ?   ?
		var error = checkValidateCode(validatecodeInfo,'','');
		if(error==1){
			
		}else{
			setErrorMsg(1,"  ?              ?");
			setErrorInput("","presrand",1);
			return false;
		}
	}
	//   ?      
	setLoginForm(number,city,logintype,pwdType,password);
	$("#okInfo").hide();
	clickButton(id);
}
//  ?      
function adslCheckForm(id){

	var city =  $("#adslcity").val();
	var number = $("#"+id+"number").val().replace(/^\s*|\s*$/g,'');
	var pwdType = "";
	var password = $("#"+id+"password").val().replace(/^\s*|\s*$/g,'');
	var logintype = getLoginType(id);
	var srand = $("#presrand");

	//    
	if(isEmpty(city)||city=="9999"){
		setErrorMsg(1,"  ?         ?     ");
		setErrorInput(id,"city",1);
		$("#adslcity").focus();
		return false;
	}
	//  ?    
	if (number==null || number==""){
		setErrorMsg(1,"         ?? ");
		setErrorInput(id,"number",1);
		return false;
 	}
 	//  ?    
	if(password==null || password==""){
		setErrorMsg(1,"       ?   ?");
		setErrorInput(id,"password",1);
		$("#"+id+"password").val("");
		return false;
	}
	if(!f_check_userID(password)){
		setErrorMsg(1,"      ?       ");
		setErrorInput(id,"password",1);
		return false;
	}
	var isShowRandom = $("#isShowRandom").val();
	if(isShowRandom=="truec"){
		var validatecodeInfo = srand.val().replace(/^\s*|\s*$/g,'');
		$("#srand").val(validatecodeInfo);
		if (validatecodeInfo==""){
			setErrorMsg(1,"        ? ?");
			setErrorInput("","presrand",1);
			srand.val("");
			return false;
		}
		if(validatecodeInfo.length!=4){
			setErrorMsg(1,"        ?    ? ?");
			setErrorInput("","presrand",1);
			return false;
		}
		//  ? ? ?    
		if(!f_check_number(validatecodeInfo)){
			setErrorMsg(1,"        ?    ? ?");
			setErrorInput(id,"presrand",1);
			return false;
		}
		//  ?  ?   ?   ?
		var error = checkValidateCode(validatecodeInfo,'','');
		if(error==1){
			
		}else{
			setErrorMsg(1,"  ?              ?");
			setErrorInput("","presrand",1);
			return false;
		}
	}
 	//   ?      
	setLoginForm(number,city,logintype,pwdType,password);
	clickButton(id);
}
//         ?
function otherCheckForm(id){

	var logintype = $("input[name='otherLoginType']:checked").val();
	var city =  "9999";
	var number = $("#"+id+"number").val().replace(/^\s*|\s*$/g,'');
	var pwdType = "";
	var password = $("#"+id+"password").val().replace(/^\s*|\s*$/g,'');
	var title = getAcctitle(logintype);
	var srand = $("#presrand");

	//  ?    
	if (number==null || number==""){
		setErrorMsg(1,"      "+title+"  ");
		setErrorInput(id,"number",1);
		return false;
 	}
 	//  ?    
	if(password==null || password==""){
		setErrorMsg(1,"       ?   ?");
		setErrorInput(id,"password",1);
		$("#"+id+"password").val("");
		return false;
	}
	if(!f_check_userID(password)){
		setErrorMsg(1,"      ?       ");
		setErrorInput(id,"password",1);
		return false;
	}
	var isShowRandom = $("#isShowRandom").val();
	if(isShowRandom=="truec"){
		var validatecodeInfo = srand.val().replace(/^\s*|\s*$/g,'');
		$("#srand").val(validatecodeInfo);
		if (validatecodeInfo==""){
			setErrorMsg(1,"        ? ?");
			setErrorInput("","presrand",1);
			srand.val("");
			return false;
		}
		if(validatecodeInfo.length!=4){
			setErrorMsg(1,"        ?    ? ?");
			setErrorInput("","presrand",1);
			return false;
		}
		//  ? ? ?    
		if(!f_check_number(validatecodeInfo)){
			setErrorMsg(1,"        ?    ?  ");
			setErrorInput(id,"presrand",1);
			return false;
		}
		//  ?  ?   ?   ?
		var error = checkValidateCode(validatecodeInfo,'','');
		if(error==1){
			
		}else{
			setErrorMsg(1,"  ?               ");
			setErrorInput("","presrand",1);
			return false;
		}
	}
	if(logintype=="12"){//  ?     ?   ?     ?
		if(!form_do("/web",number,password)){
			return false;
		}
	}else{
		//   ?      
		setLoginForm(number,city,logintype,pwdType,password);
		clickButton(id);
	}
}
//              
function setAcctitle(logintype){

	$("#logintype").val(logintype);
	
	var title = "";
	var tip = "";
	if(logintype==9){
		title = "  ? ? ";
		tip = "  ??    ? ";
		$("#registButton").show();
	}else if(logintype==11){
		title = "㏊? ?  ";
		tip = "㏊?       ";
		$("#registButton").hide();
	}else if(logintype==12){
		title = "     ?  ";
		tip = "     ? ?   ";
		$("#registButton").hide();
	}else if(logintype==5){
		title = "     ?  ";
		tip = "     ?      ";
		$("#registButton").hide();
	}
	if(logintype==12){
		$("#bussY").show();
	}else{
		$("#bussY").hide();
	}
	$("#acctitle").html(title);
	$("#3tip").html(tip);
}

function setLoginType(type){
	
}

function getAcctitle(logintype){
	var title = "";
	if(logintype==9){
		title = "  ? ? ";
	}else if(logintype==11){
		title = "㏊? ?  ";
	}else if(logintype==12){
		title = "     ?  ";
	}else if(logintype==5){
		title = "     ?  ";
	}
	return title;
}

/**
*      ?    
*id   ?    ÷ 
*showAble    ? ? 0-      1-  ?
*content   ?    
*/
function setErrorMsg(showAble,content){
	if(showAble==1){
		$("#okInfo").hide();
		var innerhtml = "<p>"+content+"</p>";
		$("#errorInfo").html(innerhtml);
		$("#errorInfo").show();
	}else if(showAble==0){
		$("#errorInfo").hide();
	}
}
//showAble 0-       ㎑     ? 1-  ?     ?
function setErrorInput(id,inputMenu,showAble){
	//   ?    ㎑     ?,    ?     ?
	$("input").removeClass("input_error");
	if(showAble==1){
		$("#"+id+inputMenu).addClass("input_error");
		$("#"+id+inputMenu).focus();
	}
}

//  ?      ?  ?    
function setOtherForm(){

}
//               
function setInputContent(id,showAble){
	if(showAble==0){
		$("#"+id+"number").click();
		$("#"+id+"number").focus();
	}
	if(showAble==1){
		$("#"+id+"tip").show();
	}
}

//         ?  
function clearRandCode(formFlag){
	
}
//        
function changePwdType(id){
	var pwdType = $("input[name='"+id+"pwdtype']:checked").val();
	if(pwdType==3){
		
	}else{
		
	}
}
// ?     ?        ?  
function smsWait(id){
	smshuoqu=9;
	var secs = 30;
	var wait = secs * 1000;
	$("#"+id+"pwdprompt").attr('disabled',true);
	$("#"+id+"pwdprompt").html('<label><a href="###" class="gray">  ?        </a></label>');
	window.setTimeout("smsTimer('"+id+"')", wait);
}
//  ?    
function smsTimer(id) {
	smshuoqu=0;
	$("#"+id+"pwdprompt").attr('disabled',false);
	$("#"+id+"pwdprompt").html('<label><a href="javascript:void(0)" onClick="javascript:getSmspwd('+id+');">  ?        </a></label>');
	smsFlag = 0;
}

function isEmpty(objVal){

	if(objVal==null || $.trim(objVal)==""){
		return true;
	}else{
		return false;
	}
}
//?    ?    
function getLoginType(id){
	var retVal = 0;
	if(id==0){
		retVal = "4";
	}else if(id==1){
		retVal = "1";
	}else if(id==2){
		retVal = "3";
	}else if(id==3){
		retVal = $("input[name='otherLoginType']:checked").val();
	}
	return retVal;
}
//              showAble 0-     1-  ?
function hideContent(showAble,id){
	if(showAble==0){
		$("#"+id+"tip").hide();
	}
	if(showAble==1){
		$("#"+id+"tip").show();
	}
}
//   ?     ? showAble 0-     1-  ?
function resetErrorInf(id,menuId,showAble){
	setErrorMsg(showAble,"");
	setErrorInput(id,menuId,showAble);
	$("#okInfo").hide();
}

function setLoginForm(number,city,logintype,pwdtype,password,sand,isRmbPsw){
	$("#number").val(number);
	$("#pwdtype").val(pwdtype);
	$("#password").val(password);
	$("#logintype").val(logintype);
	$("#logincity").val(city);
	
}
//     ?  ?  
function clearSrand(id){
	$("#"+id+"bussY").hide();
	$("#"+id+"randCode").html("");
	$("#"+id+"isShowRandom").val("falsec");
}
//    ?  ?         ?
function checkRandCodeVal(){
	var validatecodeInfo = $("#presrand").val().replace(/^\s*|\s*$/g,'');

	if (validatecodeInfo==""){
		//setErrorMsg(1,"        ? ?");
		//setErrorInput("","presrand",1);
		return false;
	}
	if(validatecodeInfo!="" && validatecodeInfo.length!=4){
		setErrorMsg(1,"        ?    ? ?");
		setErrorInput("","presrand",1);
		return false;
	}
	//  ? ? ?    
	if(!f_check_number(validatecodeInfo)){
		setErrorMsg(1,"        ?    ?  ");
		setErrorInput("","presrand",1);
		return false;
	}
	var result = checkValidateCode(validatecodeInfo,'','');
	if(result!=1){
		setErrorMsg(1,"  ?               ");
		setErrorInput("","presrand",1);
		return false;
	}
}
//     ???
function clearLoginStatus(){
	$("#loginsubmit").hide();
	$("#logingbutton").hide();
	$("#loginbutton").show();
	$("#bussY").hide();
	$("#isShowRandom").val("falsec");
}
// ?          
function sendDynamicPsw(id){
	var number = $("#"+id+"number").val().replace(/^\s*|\s*$/g,'');
	var city = $("#selectcity").val();
	var accType = getLoginType(id);
	
	if(isEmpty(city)||city=="9999"){
		setErrorMsg(1,"  ?         ?     ");
		setErrorInput(id,"city",1);
		return false;
	}
	//  ? 는    
	if(number==null || number==""){
		setErrorMsg(1," 는   ?  ?  ");
		setErrorInput(id,"number",1);
		return false;
	}
	if(number.length<7 && number.length>0){
		setErrorMsg(1," 는   ?  ?  ?7┡");
		setErrorInput(id,"number",1);
		return false;
	}
	if(!f_check_telephone(number)){
		setErrorMsg(1,"        ? ?는    ");
		setErrorInput(id,"number",1);
		return false;
	}
	
	var re = sendDynpassword(accType,city+number,1,"errorInfo");
	if(re==1){//   ?? 
		dySmsFlag = 1;//   ?? ?     ?    ㎋     ?     ?  ?  ?  ?
	}
}
//            
function clearFormInput(id){
	if(id==0){
		clearPhoneForm();
		clearADSLForm();
		clearOtherForm();
	}else if(id==1){
		clearMobileForm();
		clearADSLForm();
		clearOtherForm();
	}else if(id==2){
		clearMobileForm();
		clearPhoneForm();
		clearOtherForm();
	}else{
		clearMobileForm();
		clearPhoneForm();
		clearADSLForm();
	}
       	$("#isShowRandom").val("truec");
}
//    ?            
function clearMobileForm(){
	$("#0number").val("");
	$("#0password").val("");
	$("#0tip").show();
	$("input[name='0pwdtype']").eq(0).attr("checked", true);
	$("#0pwdprompt").show();
	var clazz = $("#remPwdClick").attr("class");
	if(smsFlag == 1){// ?    ??    ?   ?  ?  ??  30  ? ?
		$("#0pwdprompt").html('<label><a href="javascript:void(0)" class="gray">  ?        </a></label>');
	}else{
		$("#0pwdprompt").html('<label><a href="###" onclick="javascript:getSmspwd(0);">  ?        </a></label>');
	}
	if(clazz=="zogo-form-checkbox-checked"){
		$("#remPwdContent").click();
	}
}
//   ㎡  ?       
function clearPhoneForm(){
	$("#1number").val("");
	$("#1password").val("");
	$("#1tip").show();
	$("#selectcity ").attr("value","9999");
	$("input[name='1pwdtype']").eq(0).attr("checked", true);
	var clazz = $("#remPwdClick").attr("class");
	if(clazz=="zogo-form-checkbox-checked"){
		$("#remPwdContent").click();
	}
}
//             
function clearADSLForm(){
	$("#2number").val("");
	$("#adslcity ").attr("value","9999");
	$("#2password").val("");
	$("#2tip").show();
	var clazz = $("#remPwdClick").attr("class");
	if(clazz=="zogo-form-checkbox-checked"){
		$("#remPwdContent").click();
	}
}
//        
function clearOtherForm(){
	$("#3number").val("");
	$("#3password").val("");
	$("#3tip").show();
	$('[name="otherLoginType"]:radio').each(function() {
		//      ?  ?
		if(this.value==9){
			$(this).click();
		}
	});
	var clazz = $("#remPwdClick").attr("class");
	if(clazz=="zogo-form-checkbox-checked"){
		$("#remPwdContent").click();
	}
}
//   ㉨ ?      ?
function remPwd(){
	var nowClazz = $("#remPwdClick").attr("class");
	if(nowClazz=="zogo-form-checkbox"){
		$("#remPwdClick").attr("class","zogo-form-checkbox-checked");
		$("#remPwdForm").val("1");
	}else if(nowClazz=="zogo-form-checkbox-checked"){
		$("#remPwdClick").attr("class","zogo-form-checkbox");
		$("#remPwdForm").val("0");
	}
}
//  ?       ▽ ?  ?   ?  
function setRemLoginForm(obj){
	
	var numberType = obj.remNumberType; //        
	var number = obj.remNumber;//    
	var pwd = obj.remPassword;//    
	var areaCode = obj.areaCode;//    
	var liId = 0;
	if(numberType==1 || numberType==2){// ? ㎡  ?
		liId = 1;
	}else if(numberType==3){//   
		liId = 2;
	}else if(numberType==4){// ? 
		liId = 0;
	}else if(numberType==9 ||numberType==11 ||numberType==12 ||numberType==5){//    
		liId = 3;
	}
	$(".tab_main li").parent().children().eq(liId).click();
	hideContent(0,liId);
	$("#"+liId+"number").val(number);
	$("#"+liId+"password").val(pwd);
	var nowClazz = $("#remPwdClick").attr("class");
	if(nowClazz=="zogo-form-checkbox"){
		$("#remPwdContent").click();
	}
	if(liId==0){// ?    �� ?    
		$('[name="0pwdtype"]:radio').each(function() {
			//      ?  ?
			if(1==this.value){
				$(this).click();
			}
		});
		$("#remPwdLi").show();//  ?  ?    
		$("#0pwdprompt").html("");//   ? ?         
	}else if(liId==1){// ? ㎡  ?        
		$("#selectcity").val(areaCode);
		$("#remPwdLi").show();//  ?  ?    
	}else if(liId==2){//           
		$("#adslcity").val(areaCode);
		$("#remPwdLi").show();//  ?  ?    
	}else if(liId==3){//    
		$('[name="otherLoginType"]:radio').each(function() {
			//      ?  ?
			if(numberType==this.value){
				$(this).click();
			}
		});
		$("#remPwdLi").show();//  ?  ?    
	}
}
//    ?  ?    
function checkRemPwd(){
	var dataObj = eval("("+getCookieByName("remPwdInfo")+")");
	if(dataObj!=null && dataObj!="" && (typeof dataObj!="undefind")){
		setRemLoginForm(dataObj);
	}
}

//    cookie    ??
function getCookieByName(cookieName){
	var arrStr = document.cookie.split("; ");
	for(var i=0;i<arrStr.length;i++){
		var temp = arrStr[i].split("=");
		if(temp[0] == cookieName) return unescape(temp[1]);
	}
}                                                                                                                                                                                                                                                                  