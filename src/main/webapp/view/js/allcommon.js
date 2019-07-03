var COOKIE_CMSCITY="cmscity";
var COOKIE_CMSCITYNAME="login_cityName";
var COOKIE_CMSCITYPIN="login_citypin";
//=================??????=======================
var COOKIE_LOGIN_NO="login_no";
var COOKIE_LOGIN_CITY="login_city";
var COOKIE_LOGIN_ORGID="login_orgid";
var COOKIE_LOGIN_TYPE="login_type";
var COOKIE_LOGIN_NAME="login_name";
var COOKIE_LOGIN_CITYNAME="login_cityName";
var COOKIE_LOGIN_WARING="login_waring";
var COOKIE_LOGIN_WARING1="login_waring1";
var COOKIE_LOGIN_CITYPIN="login_citypin";
var COOKIE_DOMAIN="gs.189.cn";

//getLoginInfo();  //??????????

//========================???г????????=======================
function initcityInfo()
{
//???????
//$("#cityName").html("????");
//$("#cityPin").html("gansu");

var orgid=getCookie(COOKIE_CMSCITY);
if(typeof(orgid)=="undefined"||orgid=="a"||orgid=="_0"||orgid=="_undefined")
{
	//??cookie
	addCookie(COOKIE_CMSCITY,'_1',0);        //?????id
	addCookie(COOKIE_CMSCITYNAME,'????',0);  //?????????
	addCookie(COOKIE_CMSCITYPIN,"lanzhou",0);  //????????
} 

//???cookie ???ж??????

if(typeof(getCookie(COOKIE_LOGIN_NO))!="undefined"&&getCookie(COOKIE_LOGIN_NO)!="a")
{

	//??cookie
	addCookie(COOKIE_CMSCITY,'_'+getCookie(COOKIE_LOGIN_ORGID),0);        //?????id
	addCookie(COOKIE_CMSCITYNAME,getCookie(COOKIE_LOGIN_CITYNAME),0);  //?????????
	addCookie(COOKIE_CMSCITYPIN,getCookie(COOKIE_LOGIN_CITYPIN),0);  //????????

$("#cityName").html(getCookie(COOKIE_LOGIN_CITYNAME));
$("#cityPin").html(getCookie(COOKIE_LOGIN_CITYPIN));

$("#area_btn").html("");
$(".dishi_frame").attr("id","area_btn_1");
//getShopCarInfo();//  ????????
//??????????
//addCookie(COOKIE_LOGIN_WARING1,'<li class="login_in">'+getCookie(COOKIE_LOGIN_WARING)+'??[<a href="/web/self/accountMgrIndex.action?id=passwrodModifyTurn" target="_blank">???????</a>] [<a href="#" onclick="exitLogin();">???</a>]</li>',0);  //??????  
addCookie(COOKIE_LOGIN_WARING1,' <span style="margin-right: 15px;">'+getCookie(COOKIE_LOGIN_WARING)+'??</span><a href="http://www.189.cn/dqmh/my189/initMy189home.do?fastcode=10000590" target="_blank">???????</a><span style="margin-right: 7px;">|</span><a href="#" onclick="exitLogin();">???</a>',0);  //?????? 

		  


$("#area_btn").hide();
}else     //??е??
{
//$("#area_btn").show();
//getLoginInfo();  //??????????
getWaringInfo();
//?δ???cookie ???
if(getCookie(COOKIE_CMSCITYNAME)!='')
{
$("#cityName").html(getCookie(COOKIE_CMSCITYNAME));
$("#cityPin").html(getCookie(COOKIE_CMSCITYPIN));
}

}

}

//**************?????л?***********************
function updateCity()
{

//???г????????
initcityInfo();
//??????

$("#loginShow").html(getCookieForClient(COOKIE_LOGIN_WARING1));
$("#loginShow2").html(getCookieForClient(COOKIE_LOGIN_WARING1));

//getShopCarInfo();//  ????????  ?°????? 

//?????????
showDaohang();

$("#city_btn").hover(function(){
$("#city").show();
},function(){
$("#city").hide();
});
$("#area_btn").hover(function(){
$("#area").show();
},function(){
$("#area").hide();
});

//statAccessCounts();

}
  

//**************???????**************
function formsubmit1() {
var keyWord = $("#word").val();
formsubmit(keyWord);
} 

//**************??????**************
function fowardUrl(flag,url){
if(flag==1){//qq
$("#serviceType").val(1);
$("#forwardURL").val("http://bizapp.qq.com/webc.htm?new=0&sid=800010000&o=gs.ct10000.com&q=7");
$("#funcCode").val("11001");
}else if(flag==2){//??????
$("#serviceType").val(2);
$("#funcCode").val("11002");
$("#forwardURL").val(url);
}else if(flag==3){//??????
$("#serviceType").val(3);
$("#funcCode").val("11003");
$("#forwardURL").val("http://weibo.com/gsct10000");
}else if(flag==4){//?й???????????????
$("#serviceType").val(4);
$("#funcCode").val("11004");
$("#forwardURL").val("http://weibo.com/u/1904252747?wvr=3.6&lf=reg");
}
$("#statForm").submit();
} 

//**************???????  ??????**************
function formsubmit(keyWord) {
var param = keyWord;
param = Trim(param);
if (param=="?????????????/??/?????") {
param = "";
$("#word").val(param);
return;
}
$("#word").val(param);
$("#formweb").target="_blank";
$("#formweb").submit();
} 


/** LTrim(string):????????? */
function LTrim(str){
var whitespace = new String(" \t\n\r");
var s = new String(str);
if (whitespace.indexOf(s.charAt(0)) != -1){
var j=0, i = s.length;
while (j < i && whitespace.indexOf(s.charAt(j)) != -1){
j++;
}
s = s.substring(j, i);
}
return s;
}
/** RTrim(string):?????????*/
function RTrim(str){
var whitespace = new String(" \t\n\r");
var s = new String(str);
if (whitespace.indexOf(s.charAt(s.length-1)) != -1){
var i = s.length - 1;
while (i >= 0 && whitespace.indexOf(s.charAt(i)) != -1){
i--;
}
s = s.substring(0, i+1);
}
return s;
}

/** Trim(string):???????????????*/
function Trim(str){
return RTrim(LTrim(str));
}


//**************???????  ?????????**************
function onkeypress111(event) {

if (event.keyCode == 13) {
formsubmit();
}
}

//**************?????????************************
function showDaohang()
  {
   
	$(".common_quick").hover(function(){
		$(".common_quickpo").show();
		},function(){
			$(".common_quickpo").hide();
			});

	$(".common_quickpo li").hover(function(){
		$(this).find("div").show();
		$(this).addClass("common_leftnavtxf");
		},function(){
		$(this).find("div").hide();
		$(this).removeClass("common_leftnavtxf");	
		});

  }


//**************????????? :allCatalogId  ???????id,nowCatalogId ??????*********
  function resetDaohang(allCatalogId,nowCatalogId)
  {
  	nowCatalogId.find("h2").addClass("arrow_on");

	allCatalogId.hover(function(){
	        nowCatalogId.find("h2").removeClass("arrow_on");
			$(this).find("div").show();
			//$(this).addClass("common_left_li_on");
			$(this).find("h2").addClass("arrow_on");
			
		},function(){
			$(this).find("div").hide();
			$(this).removeClass("common_left_li_on");
			$(this).find("h2").removeClass("arrow_on");
			nowCatalogId.find("h2").addClass("arrow_on");
		 
	     });			
	
   }

//**************????????? :allCatalogId  ???????id,nowCatalogId ??????**?????????????******
  function resetDaohangforChlid(allCatalogId,nowCatalogId)
  {
  	nowCatalogId.find("h2").addClass("arrow_on");

	allCatalogId.hover(function(){
	        nowCatalogId.find("h2").removeClass("arrow_on");
			$(this).find("div").show();
			$(this).addClass("common_left_li_on");
			$(this).find("h2").addClass("arrow_on");
			
		},function(){
			$(this).find("div").hide();
			$(this).removeClass("common_left_li_on");
			$(this).find("h2").removeClass("arrow_on");
			nowCatalogId.find("h2").addClass("arrow_on");
		 
	     });			
	
   }

//**************???cookie**************
function addCookie(objName,objValue,objHours){//???cookie
var str = objName + "=" + escape(objValue)+";path=/;domain="+COOKIE_DOMAIN;
if(objHours > 0){//?0????趨????????????????cookie??????
var date = new Date();
var ms = objHours*3600*1000;
date.setTime(date.getTime() + ms);
str += "; expires=" + date.toGMTString(); 

}
document.cookie = str;

}

//**************???????????cookie???*************
function getCookie(objName){//???????????cookie???
allCookie();
var arrStr = document.cookie.split("; ");
for(var i = 0;i < arrStr.length;i ++){
var temp = arrStr[i].split("=");
if(temp[0] == objName) return unescape(temp[1]);

} 
}

//**************???????????cookie???*************
function getCookieForClient(objName){//???????????cookie???
allCookie();
var arrStr = document.cookie.split("; ");
for(var i = 0;i < arrStr.length;i ++){
var temp = arrStr[i].split("=");
if(temp[0] == objName) return unescape(temp[1]);

} 
}

//??????????????cookie????????????????趨????????????
function delCookie(name){
var date = new Date();
date.setTime(date.getTime() - 10000);
document.cookie = name + "=a; expires=" + date.toGMTString();
}

function allCookie(){//??????б????cookie?????
var str = document.cookie;
if(str == ""){
str = "??б????κ?cookie";
}
}

//**************??ping?????磬????????????**************
  function NetPing3(urlStr,oldStr)
        {
    urlStr=urlStr.replace("#","");
    oldStr=oldStr.replace("#","");
              $.ajax({
               type: "post",
               cache: false,
               url: urlStr,
             //  data: "",
               success: function(){
                 window.location.href=urlStr;
                
               },
               error:function(){
        //        alert("??治????");
                window.location.href=oldStr;
               }
             });
        }


//*************??ping?????磬????????????**********
function NetPing(urlStr)
        {
    urlStr=urlStr.replace("#","");
              $.ajax({
               type: "post",
               cache: false,
               url: urlStr,
             //  data: "",
               success: function(){
                 window.location.href=urlStr;
                
               },
               error:function(){
        //        alert("??治????");
                if(urlStr.lastIndexOf("shtml")==-1)
                {
                  window.location.reload();   
                }else
                {
                  
                   var newUrl=urlStr.substring(0,urlStr.lastIndexOf("/"));
                     
                   $.ajax({
               type: "post",
               cache: false,
               url: newUrl,
             //  data: "",
               success: function(){
                 window.location.href=newUrl;
                
               },
               error:function(){
                var orgid=getCookie(COOKIE_CMSCITY);
                window.location.href=newUrl.replace("/"+orgid+"/","/_0/");
                } 
               });
                  
                }
               }
             });
  }


//*************??????л??????******************
function goToCity()
{  
   
   var orgid=getCookie(COOKIE_CMSCITY);
   var oldhref=window.location.href;
   if(orgid!='')
   { 
     var newhref=oldhref.replace("/_0/","/"+orgid+"/").replace("/_1/","/"+orgid+"/").replace("/_2/","/"+orgid+"/").replace("/_3/","/"+orgid+"/").replace("/_4/","/"+orgid+"/").replace("/_5/","/"+orgid+"/").replace("/_6/","/"+orgid+"/").replace("/_7/","/"+orgid+"/").replace("/_8/","/"+orgid+"/").replace("/_9/","/"+orgid+"/").replace("/_10/","/"+orgid+"/").replace("/_11/","/"+orgid+"/").replace("/_12/","/"+orgid+"/").replace("/_13/","/"+orgid+"/").replace("/_14/","/"+orgid+"/");
     NetPing(newhref);
   }

}

//*************??????л??????*******************
function cataGoToCity(url)
{
var orgid=getCookie(COOKIE_CMSCITY);
 if(typeof(orgid)== "undefined")
 {
  orgid='_0';
 }
var oldhref=url;
if(orgid!='')
{
var newhref=oldhref.replace("/_0/","/"+orgid+"/").replace("/_1/","/"+orgid+"/").replace("/_2/","/"+orgid+"/").replace("/_3/","/"+orgid+"/").replace("/_4/","/"+orgid+"/").replace("/_5/","/"+orgid+"/").replace("/_6/","/"+orgid+"/").replace("/_7/","/"+orgid+"/").replace("/_8/","/"+orgid+"/").replace("/_9/","/"+orgid+"/").replace("/_10/","/"+orgid+"/").replace("/_11/","/"+orgid+"/").replace("/_12/","/"+orgid+"/").replace("/_13/","/"+orgid+"/").replace("/_14/","/"+orgid+"/");

 NetPing3(newhref,url);
}
} 

//*************?л?????  id,????????******
function changeCityFun(site,regionId,regionName,regionPin)
{

if(typeof(getCookie(COOKIE_LOGIN_NO))!="undefined"&&getCookie(COOKIE_LOGIN_NO)!="a")
{

	//??cookie
	addCookie(COOKIE_CMSCITY,'_'+getCookie(COOKIE_LOGIN_ORGID),0);        //?????id
	addCookie(COOKIE_CMSCITYNAME,getCookie(COOKIE_LOGIN_CITYNAME),0);  //?????????
	addCookie(COOKIE_CMSCITYPIN,getCookie(COOKIE_LOGIN_CITYPIN),0);  //????????
}else
{

	//??cookie
	addCookie(COOKIE_CMSCITY,regionId,0);        //?????id
	addCookie(COOKIE_CMSCITYNAME,regionName,0);  //?????????
	addCookie(COOKIE_CMSCITYPIN,regionPin,0);  //????????
}


	//????л????в????
	goToCity();
	
	//????????????sesion
	//resetNowCity(site,regionId);

	
}

 
//**************?л????????????μ??б?? res:9999???  ??????????**************
function resetNowCity(site,orgId)
{
     var res = "9999";
          $.ajax({
               type: "post",
               url:site+'/valentinedayajax/addTimeGroupWaring.action',
               dataType:"json",
               //data:"cityVo.orgId="+orgId,
                            data:{"cityVo.orgId":orgId},
               success: function(json){   
			   res = json.returnCode;
			    
           },
                error:function(){
                       res = "9999";            
                }
            });  
			
	  return res;
}

//**************?????????  1??????  0 δ???**************
function qryCurrentUser(site)
{

if(typeof(getCookie(COOKIE_LOGIN_NO))!="undefined"&&getCookie(COOKIE_LOGIN_NO)!="a")
{
queryShopCarList(getCookie(COOKIE_LOGIN_CITY),getCookie(COOKIE_LOGIN_TYPE),getCookie(COOKIE_LOGIN_NO));
$("#loginShow").html('????????????????￡?[<a href="">???????</a>] [<a href="">???</a>]');
$("#loginShow2").html('????????????????￡?[<a href="">???????</a>] [<a href="">???</a>]');
}else
{
 
}

}

//**************????????????**************
function hrefUrl(url){

//??cookie???????
        var orgid=getCookie(COOKIE_CMSCITY);
     //  alert("??cookie???????:"+orgid);
       if(typeof(orgid)!= "undefined")
       {
        
if(typeof(getCookie(COOKIE_LOGIN_NO))!="undefined"&&getCookie(COOKIE_LOGIN_NO)!="a")
{
if(url.indexOf("/service")!=-1)
{
  top.location.href='/web/self/accountHomeIndex.action';
  return;
}
}        



        var newhref=url+'/'+orgid;
         //???
	      NetPing1(newhref,orgid);
       }else
       {
         top.location.href=url;

        } 
}


function hrefUrl_index(url){

//??cookie???????
        var orgid=getCookie(COOKIE_CMSCITY);
     //  alert("??cookie???????:"+orgid);
       if(typeof(orgid)!= "undefined")
       {
        
if(typeof(getCookie(COOKIE_LOGIN_NO))!="undefined"&&getCookie(COOKIE_LOGIN_NO)!="a")
{
if(url.indexOf("/service")!=-1)
{
  window.open('/web/self/accountHomeIndex.action');
  return;
}
}        



        var newhref=url+'/'+orgid;
         //???
	      NetPing1_index(newhref,orgid);
       }else
       {
         window.open(url);

        } 
}


//**************??ping?????磬????????????**************
function NetPing1(urlStr,orgid)
{
  urlStr=urlStr.replace("#","");
              $.ajax({
               type: "post",
               cache: false,
               url: urlStr,
             //  data: "",
               success: function(){
                 top.location.href=urlStr;
                
               },
               error:function(){
        //        alert("??治????");
               top.location.href=urlStr.replace(orgid,"");
               }
             });
 }
	
function NetPing1_index(urlStr,orgid)
{
  urlStr=urlStr.replace("#","");
              $.ajax({
               type: "post",
               cache: false,
               url: urlStr,
             //  data: "",
               success: function(){
                 window.open(urlStr);
                
               },
               error:function(){
        //        alert("??治????");
               window.open(urlStr.replace(orgid,""));
               }
             });
 }
	
//**************????????????????????**************
function catalogUrl(url)
{
  window.location.href=replaceall(url,"\\../","");
}

//**************??????????????????(?????)**************
function writeHtml(html_url,divId)
{ 
	 $.ajax({
                      
					url:html_url,
					type: 'get',
                   dataType: 'html',
                   cache:false,
                   contentType: "application/x-www-form-urlencoded;charset=utf-8", 
					success:function(result){
					alert(result);
                    divId.html(result);    
					},
					error:function(){
					
						
						}
				});

} 

//********************????????*********************
var AddFavorite = function (obj, url, title) {
var e = window.event || arguments.callee.caller.arguments[0];
var B = {
IE : /MSIE/.test(window.navigator.userAgent) && !window.opera
, FF : /Firefox/.test(window.navigator.userAgent)
, OP : !!window.opera
};
obj.onmousedown = null;
if (B.IE) {
obj.attachEvent("onmouseup", function () {
try {
window.external.AddFavorite(url, title);
window.event.returnValue = false;
} catch (exp) {alert("????????????????Ctrl+D???????");}
});
} else {
if (B.FF || obj.nodeName.toLowerCase() == "a") {
obj.setAttribute("rel", "sidebar"), obj.title = title, obj.href = url;
} else if (B.OP) {
var a = document.createElement("a");
a.rel = "sidebar", a.title = title, a.href = url;
obj.parentNode.insertBefore(a, obj);
a.appendChild(obj);
a = null;
}
}
}; 

//************????**********************
function shoppingCar()
{
$(".nav_car_po ul h6 code").click(function(){
$(this).parent().hide();
});
$(".nav_car_podiv a").click(function(){
$(".nav_car_po").hide();
$("#car").removeClass("nav_car_sanjiaotwo");
});
$("#car").click(function(){
$(this).toggleClass("nav_car_sanjiaotwo");
$(".nav_car_po").toggle();
}); 

}

//************????ж?***????????????????*******************
function isLogin(url)
{
        var res = "0";
		  var loginStr="";
          $.ajax({
               type: "post",
              // url:site+'/valentinedayajax/addTimeGroupWaring.action',
               dataType:"json",
              // data:"cityVo.orgId="+orgId,
               success: function(json){   
			      res = json.returnCode;  //?? 1??????  0 δ???
			       if(res=="1")  //????????????????url
			         {
					     top.location.href=url;
					  }

			    
           },
                error:function(){
                   res = "0";            
                }
            });  
			
	  return res;
}


//************????***????????????*******************
function getShopCarInfo()
{

if(typeof(getCookie(COOKIE_LOGIN_NO))!="undefined"&&getCookie(COOKIE_LOGIN_NO)!="a")
{
//queryShopCarList(getCookie(COOKIE_LOGIN_ORGID),getCookie(COOKIE_LOGIN_TYPE),getCookie(COOKIE_LOGIN_NO));
 queryShopCarList('0');  
}else
{
 queryShopCarList('0');  
}
  
}


//*******************???  ???cookie*************************
function exitLogin()
{
// delCookie(COOKIE_LOGIN_WARING);
//delCookie(COOKIE_LOGIN_WARING1);
// delCookie(COOKIE_LOGIN_NO);
// delCookie(COOKIE_LOGIN_CITY);
// delCookie(COOKIE_LOGIN_ORGID);
// delCookie(COOKIE_LOGIN_TYPE);
// delCookie(COOKIE_LOGIN_NAME);
// delCookie(COOKIE_LOGIN_CITYNAME);

// delCookie(COOKIE_LOGIN_CITYPIN);

var orgid=getCookie(COOKIE_CMSCITY);

//delCookie(COOKIE_CMSCITY);
addCookie(COOKIE_CMSCITY,'a',0);        //?????id
delCookie(COOKIE_CMSCITYNAME);
delCookie(COOKIE_CMSCITYPIN);




if(orgid=='_13' || orgid=='_8' || orgid=='_10' || orgid=='_4' || orgid=='_3' || orgid=='_5' || orgid=='_6'|| orgid=='_7'|| orgid=='_2'|| orgid=='_11'|| orgid=='_12'|| orgid=='_14'|| orgid=='_9')
{
 top.location.href='/web/login/logOut.action';
}else
{
 top.location.href='/web/login/logOut.action';
}

}



//********************************??????????*******************************************
function personToJt()
{
  var orgid=getCookie(COOKIE_CMSCITY);
var url="/web/ssoServlet?ssoFlag=JTWT";
if(orgid=='_13' || orgid=='_8' || orgid=='_10' || orgid=='_4' || orgid=='_3' || orgid=='_5' || orgid=='_6'|| orgid=='_7'|| orgid=='_2'|| orgid=='_11'|| orgid=='_12'|| orgid=='_14'|| orgid=='_9')
{
 url="/web/ssoServlet?ssoFlag=JTWT";
}

var tmp=window.open(url,"_blank");
tmp.moveTo(0,0);
tmp.resizeTo(screen.width,screen.height);
tmp.focus();

}

//*********************************???????????????******************************************
function zhengQiToJt()
{
 var orgid=getCookie(COOKIE_CMSCITY);
var url="/web/ssoServlet?ssoFlag=JTWTB";
if(orgid=='_13' || orgid=='_8' || orgid=='_10' || orgid=='_4' || orgid=='_3' || orgid=='_5' || orgid=='_6'|| orgid=='_7'|| orgid=='_2'|| orgid=='_11'|| orgid=='_12'|| orgid=='_14'|| orgid=='_9')
{
 url="/web/ssoServlet?ssoFlag=JTWTB";
}

var tmp=window.open(url,"_blank");
tmp.moveTo(0,0);
tmp.resizeTo(screen.width,screen.height);
tmp.focus();

}


//**********************?ж?????? ??????????????cookie*************************
function getLoginInfo()
{
         var res = "0";
		  var loginStr="";
 
var randomnumbers=Math.floor(Math.random()*100000);	

$.getJSON("/web/jsonlogin/getLoginInfo.action?aa="+randomnumbers,null,function(data){	
	                         var json=eval("("+data+")");//????json????	
                           res = json.isLogin;  //?? 1??????  0 δ???
 //  alert('json.isLogin--'+res);
                       if(res=="1")  //????????????????url
			         {
			                    var loginNumber=json.loginNumber; //??????? 

                               var  areaCode=json.areaCode;//????
                               var  orgId=json.orgId;//???б?? 
                               var  loginType=json.loginType; //???????9??????? 11У??? 12?????? 5???????? 1??? 3??? 4??? 
                               var  loginName=json.loginName; // ??????? 
                               var  orgName =json.orgName;//???????? 
                               var  cityPin=cityToPinyin(orgName);  //??????? 
                               var  custbrandtype=json.custbrandtype; //???????
							    var  custbrandname=custbrandtypeToName(custbrandtype);
                             var loginName1=loginName;
                              if(loginName.length>4)
                              {
                                 loginName1=loginName.substring(0,4)+'...';
                               }

                               var  timeDesc=json.timeDesc+'??'+custbrandname+'???'+loginName1+'??[<a href="/service/yhzx/mmxg/index.shtml" target="_blank">???????</a>] [<a href="#" onclick="exitLogin();">???</a>]';// ??????:????? 
							   
		                    
					      //??cookie
                               addCookie(COOKIE_LOGIN_NO,loginNumber,0); //????
                                addCookie(COOKIE_LOGIN_CITY,areaCode,0);  // ????????   
								addCookie(COOKIE_LOGIN_ORGID,orgId,0);  //???б???
								addCookie(COOKIE_LOGIN_TYPE,loginType,0);  //???????
								addCookie(COOKIE_LOGIN_NAME,loginName,0);  //???????
								addCookie(COOKIE_LOGIN_CITYNAME,orgName,0);  //????
								addCookie(COOKIE_LOGIN_WARING,timeDesc,0);  //??????
								addCookie(COOKIE_LOGIN_CITYPIN,cityPin,0);  //??????????
								
	                           getShopCarInfo();
					          
					     }else
                             {
        var  timeDesc='<span style="margin-right: 15px;">'+json.timeDesc+'???????????go???!</span><a href=/web/login/loginIndex.action">???</a><span style="margin-right: 7px;">|</span><a href="#">??????</a> ';// ??????:????? 
    	  addCookie(COOKIE_LOGIN_WARING,timeDesc,0);  //??????  
        delCookie(COOKIE_LOGIN_NO);
 delCookie(COOKIE_LOGIN_CITY);
 delCookie(COOKIE_LOGIN_ORGID);
 delCookie(COOKIE_LOGIN_TYPE);
 delCookie(COOKIE_LOGIN_NAME);
 delCookie(COOKIE_LOGIN_CITYNAME);

 delCookie(COOKIE_LOGIN_CITYPIN);
 getShopCarInfo();
                                }


	});
	  return res;
}

//******************????????????***********************
function cityToPinyin(cityname)
{
    var citypin='';
	if(cityname=='????')
     {
	   citypin='gansu';
	  }
	 if(cityname=='????')
     {
	   citypin='lanzhou';
	  }
	  if(cityname=='????')
     {
	   citypin='dingxi';
	  }
	  	  if(cityname=='????')
     {
	    citypin='linxia';
	  }
	  	  if(cityname=='???')
     {
	    citypin='pingliang';
	  }
	  	  if(cityname=='????')
     {  
	    citypin='qingyang';
	  }
	  	  if(cityname=='????')
     {
	     citypin='wuwei';
	  }
	  	  if(cityname=='???')
     {
	     citypin='zhangye';
	  }
	  	  if(cityname=='???')
     {
	    citypin='jiuquan';
	  }
	  	  if(cityname=='???')
     {
	    citypin='tianshui';
	  }	  if(cityname=='¤??')
     {
	   citypin='longnan';
	  }
	  	  if(cityname=='????')
     {
	   citypin='gannan';
	  }
	  	  if(cityname=='????')
     {
	   citypin='baiyin';
	  }	  if(cityname=='???')
     {
	   citypin='jinchang';
	  }
	  	  if(cityname=='??????')
     {  
	 citypin='jiayuguan';
	  }	 
    return citypin;
}

//***********************???????????????****************************
function custbrandtypeToName(CustBrandType)
{
    var name='';
   if (CustBrandType==0)
   { 
   }else if (CustBrandType==3 || CustBrandType==4 || CustBrandType==5 || CustBrandType==6 || CustBrandType==7 || CustBrandType==8 
   || CustBrandType==9 || CustBrandType==10 || CustBrandType==11 || CustBrandType==12 || CustBrandType==13 || CustBrandType==14 
   || CustBrandType==15 || CustBrandType==16 || CustBrandType==17 || CustBrandType==19 || CustBrandType==31 || CustBrandType==32 
   || CustBrandType==33 || CustBrandType==34 || CustBrandType==35 || CustBrandType==36 || CustBrandType==200)
   {
    name='??????';
   }else if (CustBrandType==1 || CustBrandType==2|| CustBrandType==18|| CustBrandType==20 || CustBrandType==21 || CustBrandType==22 
   || CustBrandType==24 || CustBrandType==37 || CustBrandType==39 || CustBrandType==100)
   {
    name='????e??';
   }else if (CustBrandType==25 || CustBrandType==26 || CustBrandType==27 || CustBrandType==28 || CustBrandType==29 || CustBrandType==30 ||CustBrandType==40 || CustBrandType==400)
   {
    name='????';
	}else if (CustBrandType==38 || CustBrandType==300)
	{
	name='???';
	}
	
	return name;
}

//********************?洢session  type  1?????2????**************************
function saveSessionTowt(type)
{
  var randomnumbers=Math.floor(Math.random()*100000);	
$.getJSON("/web/jsonlogin/ajaxPutSession.action?type="+type+"&aa="+randomnumbers,null,function(data){	
	   var json=eval("("+data+")");//????json????	
      var res = json.resultCode; // resultCode  1?????0???
      //alert('res:'+res);
   
	});
}

//***********************************???????????************************************
function GetQueryString(name) {

   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");

   var r = window.location.search.substr(1).match(reg);

   if (r!=null) return unescape(r[2]); return null;

}

function getWaringInfo()
{
var now = new Date();
var hourInt = now.getHours() ; 
var minitInt=now.getMinutes();

var 	timeDesc="";
 
if(hourInt>=0 && hourInt<11){
				timeDesc = "?????";
			}else if(hourInt==11 && minitInt<=30) {
				timeDesc = "?????";
			}else if(hourInt==11 && minitInt>30){
				timeDesc = "?????";
			}else if(hourInt>11 && hourInt<14){
				timeDesc = "?????";
			}else if(hourInt==14 && minitInt<=30){
				timeDesc = "?????";
			}else if(hourInt==14 && minitInt>30){
				timeDesc = "?????";
			}else if(hourInt>14 && hourInt<18){
				timeDesc = "?????";
			}else if(hourInt==18 && minitInt<=30){
				timeDesc = "?????";
			}else if(hourInt==18 && minitInt>30){
				timeDesc = "?????";
			}else if(hourInt>18){
				timeDesc = "?????";
			}else {
				timeDesc = "????";
			}

        var  timeDesc='<span style="margin-right: 15px;">'+timeDesc+'???????????go?????</span><a onclick="javascript:openLoginBlock();" href="###">???</a><span style="margin-right: 7px;">|</span><a href="/web/self/turnRegistPage.action">??????</a> ';// ??????:????? 
    	  addCookie(COOKIE_LOGIN_WARING1,timeDesc,0);  //??????  
  
}


//****************???б?????????б???*************************

function orgidToOrgCityCode(orgid)
{
    var orgCity="9999";
    if(orgid=="0")
    {
      orgCity="9999";
    }
    if(orgid=="1")
    {
      orgCity="0931";
    }
    if(orgid=="2")
    {
      orgCity="0932";
    }
    if(orgid=="3")
    {
      orgCity="0933";
    }
    if(orgid=="4")
    {
      orgCity="0934";
    }
    if(orgid=="5")
    {
      orgCity="0935";
    }
    if(orgid=="6")
    {
      orgCity="0936";
    }
    if(orgid=="7")
    {
      orgCity="0937";
    }
    if(orgid=="8")
    {
      orgCity="0938";
    }  
    if(orgid=="9")
    {
      orgCity="0939";
    }
    if(orgid=="10")
    {
      orgCity="0941";
    }
    if(orgid=="11")
    {
      orgCity="0943";
    }
    if(orgid=="12")
    {
      orgCity="0945";
    }
    if(orgid=="13")
    {
      orgCity="0947";
    }
    if(orgid=="14")
    {
      orgCity="0930";
    }
    return orgCity;
}
//******************???????????????μ????*******flagId 1??????????? ??????е??????*****************
function goToNewHref(url,flagId)
{
 
  if(flagId==1)
   {
var orgCode='9999';
var orgid=getCookie(COOKIE_CMSCITY);
if(typeof(orgid)!="undefined"&&orgid!="a")
{  
orgCode=orgidToOrgCityCode(orgid.replace('_',''));
}

 //  top.location.href=url+orgCode;
    var tmp=window.open(url+"="+orgCode,"_blank");
tmp.moveTo(0,0);
tmp.resizeTo(screen.width,screen.height);
tmp.focus();
   }else
   {
//    top.location.href=url;
  var tmp=window.open(url,"_blank");
tmp.moveTo(0,0);
tmp.resizeTo(screen.width,screen.height);
tmp.focus();
   }
}


//********************???????????????μ????*******flagId 1??????????? pid?????λ ??????е??????*****************
function goToNewHrefPid(url,flagId,pid)
{
 
  if(flagId==1)
   {
var orgCode='9999';
var orgid=getCookie(COOKIE_CMSCITY);
if(typeof(orgid)!="undefined"&&orgid!="a")
{  
orgCode=orgidToOrgCityCode(orgid.replace('_',''));
}

 //  top.location.href=url+orgCode;
    var tmp=window.open(url+"="+orgCode+"_"+pid,"_blank");
tmp.moveTo(0,0);
tmp.resizeTo(screen.width,screen.height);
tmp.focus();
   }else
   {
//    top.location.href=url;
  var tmp=window.open(url,"_blank");
tmp.moveTo(0,0);
tmp.resizeTo(screen.width,screen.height);
tmp.focus();
   }
}

//********************????????????в???*****************
function goToNewHrefCombo(url,flagId,combo)
{
 
  if(flagId==1)
   {
var orgid=getCookie(COOKIE_CMSCITY);
    if(orgid=="_1"){
		orgid="_0";
		}

 //  top.location.href=url+orgCode;
    var tmp=window.open(url+orgid+"/"+combo,"_blank");
tmp.moveTo(0,0);
tmp.resizeTo(screen.width,screen.height);
tmp.focus();
   }else
   {
//    top.location.href=url;
  var tmp=window.open(url,"_blank");
tmp.moveTo(0,0);
tmp.resizeTo(screen.width,screen.height);
tmp.focus();
   }
}

//********************??????????????????в???*****************
function goToNewHrefMessage(url,flagId)
{
 
  if(flagId==1)
   {
var orgid=getCookie(COOKIE_CMSCITY);
    if(orgid=='_13' || orgid=='_8' || orgid=='_10' || orgid=='_4' || orgid=='_3' || orgid=='_5' || orgid=='_6'|| orgid=='_7'|| orgid=='_2'|| orgid=='_11'|| orgid=='_12'|| orgid=='_14'|| orgid=='_9'){
		url=url.replace('/web/','/web/');
		}

 //  top.location.href=url+orgCode;
    var tmp=window.open(url,"_self");
tmp.moveTo(0,0);
tmp.resizeTo(screen.width,screen.height);
tmp.focus();
   }else
   {
//    top.location.href=url;
  var tmp=window.open(url,"_blank");
tmp.moveTo(0,0);
tmp.resizeTo(screen.width,screen.height);
tmp.focus();
   }
}

//********************???????????????***********************************
function showKuaijiedaohangForZQ()
{
  $(".zqquick_navtwo").hover(function(){
		$(".zqquick_navpo").show();
		},function(){
			$(".zqquick_navpo").hide();
			});	

$(".zqindex_leftnav dd").hover(function(){
		$(this).addClass("zqindex_leftnavon");
		$(this).find("div").show();
		},function(){
		$(this).find("div").hide();	
		$(this).removeClass("zqindex_leftnavon");
		});
}


//*********************?y???????***************************************************
function statAccessCounts()
{
var orgCode='9999';
var orgid=getCookie(COOKIE_CMSCITY);
if(typeof(orgid)!="undefined"&&orgid!="a")
{  
orgCode=orgidToOrgCityCode(orgid.replace('_',''));
}
	if(1==1)_zcms_stat("SiteID="+orgCode+"&Type=Article&CatalogInnerCode=111&AccessWay=1&Dest=/web/statisticsServlet");
}

//================??????????????????????У????2.0??????================


/**var  thisHREF = document.location.href;  
var current_orgid=getCookie(COOKIE_CMSCITY);
 if(typeof(current_orgid)!="undefined"&&(current_orgid=='_13' || current_orgid=='_8' || current_orgid=='_10' || current_orgid=='_4' || current_orgid=='_3' || current_orgid=='_5' || current_orgid=='_6'))
{ 
if(thisHREF.indexOf('/web/')!=-1)
{
   var newthisHREF=thisHREF.replace('/web/','/web/'); 
   window.location.href=newthisHREF;
}
}else
{
 if(thisHREF.indexOf('/web/')!=-1)
{
   var newthisHREF=thisHREF.replace('/web/','/web/'); 
   window.location.href=newthisHREF;
}
}*/


function onQQlogin(strFlag)
{  var url="";
   var current_orgid=getCookie(COOKIE_CMSCITY);
   if(typeof(current_orgid)!="undefined"&&(current_orgid!="_1" || current_orgid!="_0"))
   { 
      if(strFlag=="1")
      {
       url="/web/adslLogin/qqOnline.action";   //qq
       }else
       { 
        url="/web/adslLogin/imOnline.action";   //web
       }
    }else
    {
     if(strFlag=="1")
      {
       url="/web/adslLogin/qqOnline.action";   //qq
       }else
       { 
        url="/web/adslLogin/imOnline.action";   //web
       }
    }
    //tanchu
    window.open(url);
}

//================??????????================


//===============???????================
$(document).ready(function(){
 var share=document.getElementById("YXSHARE");
 
 if(share==undefined||share==null){
$(".bds_t163").after("<a  id='YXSHARE' style='background: url(http://gs.189.cn/images/yx_ico.gif) 3px 5px no-repeat !important;' onclick='shareYX()'></a>");
 }
});
function shareYX()
{
  
  var jsonStr=document.getElementById("bdshare").getAttribute("data");
  var tempData=eval('(' + jsonStr + ')'); 
  if(tempData.title==undefined||tempData.title==null||tempData.title==""){
   tempData.title=tempData.text;
  }
  var _shareData={
	   "appkey":"a3d769c7a48a4ad1a8d3b299a67a4f43",
	   "type":"webpage",
	   "title":tempData.title,
	   //"userdesc":tempData.text,
	   "desc":tempData.text,
	   "url":window.location.href,
	   "pic":tempData.pic
	 };
	var _s=[];
	for(var i in _shareData){
		if(_shareData.hasOwnProperty(i))
		{
         _shareData[i]!=null&&_s.push(i.toString()+'='+encodeURIComponent(_shareData[i].toString()||''));
		}
	}
	 var url="http://open.yixin.im/share?";
	 window.open(url+_s.join('&'));
};


//**************??????????
function queryBigDataV2() {
	$.ajax({
		type: "post",
		url: '/web/ajaxBigData/queryBigData.action',
		dataType: "json",
		success: function(json) {
			var jsonhtml = eval("(" + json.resultjson + ")");
			if (jsonhtml.successFlag == "00000") {
				$GO_LINK = jsonhtml.Link;
				var html = '<a name="actext" href="javascript:goBigDataLink();"  style="text-decoration: underline;margin-left:30px;color:#ff0054;"><b>????????' + jsonhtml.content + '</b></a>';
				$("[name=bigData]").html(html);
				colorful();
			}
		},
		error: function() {
			return;
		}
	});
}
function goBigDataLink() {
	top.location.href = $GO_LINK;
}
var iColor = 0;
function getColor() {
	iColor++;
	switch (iColor) {
		case 1:
			return "#ff0707";
		case 2:
			return "#ff0054";
		case 3:
			return "#ffba00";
		default:
			return "#ff0054";
	}
}
function colorful() {
	if (iColor > 3) {
		iColor = 0;
	}
	$("a[name=actext]").css("color",getColor());
	setTimeout('colorful()', 300);
} 	
//**************?????????


//iPhone6S??????????????
function queryActivityInfo(loginNum) {
	$.ajax({
		type: "post",
		data:{"phoneNum":loginNum},
		url: '/web/hdIphone/queryActivityInfo.action',
		dataType: "json",
		success: function(json) {
			if(json.result=="0"){
				
			}else if(json.result=="1"){
				var html = '<a href="/web/activity/goiPhone.action?source=wtts" target="_black"  style="text-decoration: underline;margin-left:30px;color:#ff0054;"><b>????????????iPhone6s??????2680??????????1000????????????1680???24?????????</b></a>';
				$("[name=iPhone6S]").html(html);
				colorful();
			}
		},
		error: function() {
			
		}
	});
}

//iPhone6S??????????????????????????棩
function queryActivityInfo_yzd(loginNum) {
	$.ajax({
		type: "post",
		data:{"phoneNum":loginNum},
		url: '/web/hdIphone/queryActivityInfo.action',
		dataType: "json",
		success: function(json) {
			if(json.result=="0"){
				$("h3.common_tit_name").append('<span name="bigData"></span>');
				queryBigDataV2();
			}else if(json.result=="1"){
				var html = '<a href="/web/activity/goiPhone.action?source=wtts" target="_black" style="text-decoration: underline;margin-left:30px;color:#ff0054;"><b>????????????iPhone6s??????2680??????????1000????????????1680???24?????????</b></a>';
				$("[name=iPhone6S]").html(html);
				colorful();
			}
		},
		error: function() {
			
		}
	});
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       