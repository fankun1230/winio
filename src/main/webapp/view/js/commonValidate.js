/**
* ??  ? ? ㏊       ㏊ 
  f_check_telephone      ? ? 는    
  f_check_mobile      ㎔  ?      ? ?  ?    ?     
  f_check_allMobile   ㎔  ?      ? ?    ?     
  f_check_IDno         ?   ?     ?   ㏏
  f_check_email             ? ?    E-Mail  ?
  f_check_number      ㎔  ? ?    
  f_check_zh                 ?    ? ? ?      
  f_check_zipcode     ㎔  ? ?        
  f_check_userID      ? ID      ?   ?   ?   ?  ?    
  f_check_date        ㎔  ? ?    (  ?:yyyy  MM  dd  ,yyyy-MM-dd,yyyy/MM/dd,yyyyMMdd)
  LTrim(string)      ?    ??? 
  RTrim(string)      ?   ???? 
  Trim(string)       ?   ?      ??? 
  f_check_phonenew(String)   ?    는    
*/


/**     ? ? 는   ?true ?   false   ?  */
function f_check_telephone(TEL){
 var i,j,strTemp;
 strTemp="0123456789-+()# ";
 for (var i=0;i<TEL.length;i++) {
  j=strTemp.indexOf(TEL.charAt(i)); 
  if (j==-1) {
   return false;//?     ?    ? 
  }
 }
 return true; //?   ? 
}

/**  ㎔?    ??   는   ?    09318888888*/
function f_check_phonenew(obj){
	var regu =/^09(30|31|32|33|34|35|36|37|38|39|41|43|45|47)\d{7,8}/;
	var re = new RegExp(regu);
	if (re.test( obj)) {
	  return true;
	}
	return false;
}

/**  ㎔  ?      ? ?  ?    ?       true ?   false   ?  */
 function f_check_mobile(mobile){   
	var regu =/(^(133|153|180|181|189)[0-9]{8}$)|(^0(133|153|180|181|189)[0-9]{8}$)/;
	
	var re = new RegExp(regu);
	if (re.test(mobile)) {
	
	  return true; // ? 
	}
	return false;	//   ? 
}

 /**  ㎔  ?      ? ?    ?       true ?   false   ?  */
 function f_check_allMobile(mobile){   
	var regu =/(^0{0,1}13[0-9]{9}$)|(13\d{9}$)|(147\d{8}$)|(15[01235-9]\d{8}$)|(17\d{9}$)|(18[01235-9]\d{8}$)/;
	
	var re = new RegExp(regu);
	if (re.test(mobile)) {
	
	  return true; // ? 
	}
	return false;	//   ? 
}
/**   ? 는  ㎡  ? */
function f_check_phone(obj) 
{
	var regu =/^((0\d{2,3})-)?([2-8]\d{6,7})(-(\d{1,}))?$/;
	var re = new RegExp(regu);
	if (re.test( obj)) {
	  return true;
	}
	return false;
}

/**   ?   ?     ?   ㏏ true ?   false   ?  */
function f_check_IDno(obj)
{ 
	var aCity={11:"    ",12:"   ",13:" ? ",14:"?  ",15:"   ? ",21:"    ",22:"    ",23:"      ",31:" ? ",32:"    ",33:" ?",34:"    ",35:"    ",36:"    ",37:"?  ",41:"    ",42:"    ",43:"    ",44:" ?",45:"    ",46:"    ",50:"    ",51:" ? ",52:"    ",53:"    ",54:"    ",61:"    ",62:"    ",63:" ?",64:"    ",65:" ? ",71:"?  ",81:"   ",82:"    ",91:"    "};
 
	var iSum = 0;
	var info = "";
	var strIDno = obj;
	var idCardLength = strIDno.length;  
	if(!/^\d{17}(\d|x)$/i.test(strIDno)&&!/^\d{15}$/i.test(strIDno)) 
	{
		return false;
	}
 
	// ?          x ?      10,    ?    a
	strIDno = strIDno.replace(/x$/i,"a");

	if(aCity[parseInt(strIDno.substr(0,2))]==null)
	{
		return false;
	}
	
	if (idCardLength==18)
	{
		sBirthday=strIDno.substr(6,4)+"-"+Number(strIDno.substr(10,2))+"-"+Number(strIDno.substr(12,2));
		var d = new Date(sBirthday.replace(/-/g,"/"))
		if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))
		{		
			return false;
		}

		for(var i = 17;i>=0;i --)
			iSum += (Math.pow(2,i) % 11) * parseInt(strIDno.charAt(17 - i),11);

		if(iSum%11!=1)
		{
			return false;
		}
	}
	else if (idCardLength==15)
	{
		sBirthday = "19" + strIDno.substr(6,2) + "-" + Number(strIDno.substr(8,2)) + "-" + Number(strIDno.substr(10,2));
		var d = new Date(sBirthday.replace(/-/g,"/"))
		var dd = d.getFullYear().toString() + "-" + (d.getMonth()+1) + "-" + d.getDate();   
		if(sBirthday != dd)
		{
			return false;
		}
	}
	return true; 
}

/**        ? ?    E-Mail  ?  true ?   false   ?  */
function f_check_email(obj){  
	var myReg = /^([-_A-Za-z0-9\.]+)@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/; 
	if(myReg.test( obj )) return true; 
	return false; 
}

/**  ㎔  ? ?   ?    ?? true,   ?? false */
function f_check_number(obj)
{   	
	if (/^\d+$/.test(obj)){
	   return true;
	} 
	else {
	   return false;
	}
}

/**         ?    ? ? ?          ?    ?    true,   ?? false	*/
function f_check_zh(obj){
	if (/^[\u4e00-\u9fa5]+$/.test(obj)) {
	  return true;
	}
	return false;
}

/**  ㎔  ? ?          true ?   false   ? */
function f_check_zipcode(obj)
{
	if(!f_check_number(obj))
		return false;
	if(obj.length!=6){
		return false;
	}
	return true;
}

/**  ? ID      ?   ?   ?   ?  ?   ? true ?   false   ? */
function f_check_userID(obj)
{
	var userID = obj;
	if(!/^\w{1,20}$/.test(userID)) {
		return false;
	}
	return true;
}

/**  ㎔  ? ?    (  ?:yyyy  MM  dd  ,yyyy-MM-dd,yyyy/MM/dd,yyyyMMdd) true ?   false   ?  */
function f_check_date(obj,format)
{
	var date = Trim(obj);
	if(date.length==0) return true;

	var year,month,day,datePat,matchArray;
	
	if(/^(y{4})(-|\/)(M{1,2})\2(d{1,2})$/.test(format))
		datePat = /^(\d{4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
	else if(/^(y{4})(  )(M{1,2})(  )(d{1,2})(  )$/.test(format))
		datePat = /^(\d{4})  (\d{1,2})  (\d{1,2})  $/;
	else if(format=="yyyyMMdd")
		datePat = /^(\d{4})(\d{2})(\d{2})$/;
	else
	{
		return false;
	}
	matchArray = date.match(datePat);
	if(matchArray == null) 
	{
		return false;
	}
	if(/^(y{4})(-|\/)(M{1,2})\2(d{1,2})$/.test(format))
	{
		year = matchArray[1];
		month = matchArray[3];
		day = matchArray[4];
	} else
	{
		year = matchArray[1];
		month = matchArray[2];
		day = matchArray[3];
	}
	if (month < 1 || month > 12)
	{			  
		return false;
	}
	if (day < 1 || day > 31)
	{
		return false;
	}     
	if ((month==4 || month==6 || month==9 || month==11) && day==31)
	{
		return false;
	}     
	if (month==2)
	{
		var isleap=(year % 4==0 && (year % 100 !=0 || year % 400==0));
		if (day>29)
		{				
			return false;
		}
		if ((day==29) && (!isleap))
		{				
			return false;
		}
	}
	return true;
}


/** ㏊  ? ??yyyy  MM  dd  HH?mm  ss  ,yyyy-MM-dd HH:mm:ss,yyyy/MM/dd HH:mm:ss,yyyyMMddHHmmss  true ?   false   ? */
function f_check_time(obj,format)
{
	var time = Trim(obj);
	if(time.length==0) return true;

	var datePat,matchArray,year,month,day,hour,minute,second;

	if(/^(y{4})(-|\/)(M{1,2})\2(d{1,2}) (HH:mm:ss)$/.test(format))
		datePat = /^(\d{4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
	else if(/^(y{4})(  )(M{1,2})(  )(d{1,2})(  )(HH?mm  ss  )$/.test(format))
		datePat = /^(\d{4})  (\d{1,2})  (\d{1,2})  (\d{1,2})?(\d{1,2})  (\d{1,2})  $/;
	else if(format == "yyyyMMddHHmmss")
		datePat = /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/;
	else
	{
		return false;
	}
	matchArray = time.match(datePat);
	if(matchArray == null) 
	{
		return false;
	}
	if(/^(y{4})(-|\/)(M{1,2})\2(d{1,2}) (HH:mm:ss)$/.test(format))
	{
		year = matchArray[1];
		month = matchArray[3];
		day = matchArray[4];
		hour = matchArray[5];
		minute = matchArray[6];
		second = matchArray[7];
	} else
	{
		year = matchArray[1];
		month = matchArray[2];
		day = matchArray[3];
		hour = matchArray[4];
		minute = matchArray[5];
		second = matchArray[6];
	}
	if (month < 1 || month > 12)
	{			  
		return false;
	}
	if (day < 1 || day > 31)
	{			
		return false;
	}     
	if ((month==4 || month==6 || month==9 || month==11) && day==31)
	{		  
		return false;
	}     
	if (month==2)
	{
		var isleap=(year % 4==0 && (year % 100 !=0 || year % 400==0));
		if (day>29)
		{				
			return false;
		}
		if ((day==29) && (!isleap))
		{				
			return false;
		}
	}
	if(hour<0 || hour>23)
	{
		return false;
	}
	if(minute<0 || minute>59)
	{
		return false;
	}
	if(second<0 || second>59)
	{
		return false;
	}
    return true;
}

/** LTrim(string):?    ???  */
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
/** RTrim(string):?   ???? */
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
/** Trim(string):?   ?      ??? */
function Trim(str){
    return RTrim(LTrim(str));
}                                                                                                                                                                                                                                                              