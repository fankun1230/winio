if($.cookie('loginName')){
	$("#loginName").val($.cookie('loginName'));	
    !isiOS&&$("#loginName").parents("li").children("span").show();
}
if($.cookie('password')){
	$("#password").val($.cookie('password'));
	!isiOS&&$("#password").parents("li").children("span").show();
}
var remindPwd=true;
if($.cookie('remindPwd')=='true'){
	remindPwd=true;
	$("#remindPwd").attr('checked','checked')
}
			 
changeCode("getVerificationCodeForDownLoad","#login_checkCode");
$("#login_checkCode").on('click',function(){
	changeCode("getVerificationCodeForDownLoad","#login_checkCode")
})

$("#remindPwd").click(function(){
	remindPwd=!remindPwd;
})
/*登录*/
$("#btn_submit").on('click',function(){
    var name  = trim($('#loginName').val()),
            pwd  = trim($('#password').val()),                
            inputCode  = trim($('#login_txt_code').val());
            identityCard  = trim($('#identityCard').val());
            
		if (!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(identityCard)) {
			$('#error_email').text('请输入有效的身份证号');
		} else {
			if (identityCard.length == 18) {
				var arryID = identityCard.split("");
				var ratio = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
				var x = 0;
				for (var i = 0; i < 17; i++) {
					x = x + arryID[i] * ratio[i];
				}
				x = x % 11;
				var arryL = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
				var last = arryL[x];
				if (arryID[17] != last) {
					//检验第18位                        
					$('#error_email').text('请输入有效的身份证号');
				}
			}
		}

		
        if (name.length <=0) {
            
            $('#error_email').text('用户名不能为空或空格');
            return false;
        } 
        else if(name.length < 6 && name.length>0){
        	
            $('#error_email').text('用户名不能小于6位字符');
            return false;	
        }
        else if(!/^(\w|\d|\_|\/)*$/.test(name)){
        	
            $('#error_email').text('用户名只能包含字母、数字、_、-、/');
            return false;	
        }
         
        if (pwd.length <=0) {
            
            $('#error_email').text('密码不能为空或空格');
            return false;
        }
        else if(pwd.length < 6 && pwd.length>0){
        	
            $('#error_email').text('密码不能小于6位字符');
            return false;	
        }
           
        if (inputCode.length <= 0) {
            
            $('#error_email').text('验证码不能为空或空格');
            return;
        }      
  	$('#error_email').text('');
    var parameter = {"identityCard":identityCard,"loginName":name,"password":pwd,"isAutoIdentification":"false","verificationCode":inputCode,"keyID":keyID};
    $.ajax({
        url:apiHostName+"/download",
        type:"post",
        data:JSON.stringify(parameter),
        dataType:"json",
        contentType:"application/json",
        beforeSend:function(){
            $(this).addClass("on");
            $(".fadeBox").show();
        },
        success:function(data){ 
        	
            if(data.status==0){
              //  showAlert(data.errorMsg);
            	$('#error_email').text(data.errorMsg);
                 changeCode("getVerificationCodeForDownLoad","#login_checkCode");
        		$("#login_txt_code").val("");
                return;
            }else if(data.status==1){   
            	$.cookie('loginName',name,{expires:7});	                		
            	if(remindPwd){
            		$.cookie('password',pwd,{expires:7});
            		$.cookie('remindPwd','true',{expires:7});	
            	}
            	else{
            		$.cookie('password',null,{expires:-7});
            		$.cookie('remindPwd',null,{expires:-7});		
            	}
            //    showAlert('您的信息提交成功！');
            	$('#error_email').text('您的信息提交成功！');
            }

        },error:function(data){
			 changeCode("getVerificationCodeForDownLoad","#login_checkCode");
        	$("#login_txt_code").val("");   
        },complete : function(XMLHttpRequest,status){ 			
			$(".fadeBox").hide();
            $(this).removeClass("on");
                                   
            var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus");
            if(sessionstatus=="timeout"){
                var rediredUrl=XMLHttpRequest.getResponseHeader("rediredUrl");
                window.open(rediredUrl,'_top');
                }
                return false;
            }
        });
  
	});