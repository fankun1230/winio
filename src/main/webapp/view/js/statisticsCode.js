
(function(){
  	// ? ? ? 
  	var _hmt = _hmt || [];
	var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?a38ce459d2fbb2fd20009ef718362572";
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(hm, s);
    
    //body ?   ?   
    setTimeout("statisJT()",500);
})()

var sfjc='gs';
function statisJT(){
	//    ? ?   ?     body ?     
	var oscript1 = document.createElement("script");
	oscript1.type="text/javascript";
	oscript1.language="JavaScript";
	oscript1.src="http://image2.chinatelecom-ec.com/js/s_code.js";
	var oBody = document.body; 
	if(oBody==null){
		var s = document.getElementsByTagName("script")[0]; 
	    s.parentNode.insertBefore(oscript1, s); 
	}else{
		oBody.appendChild(oscript1); 
	}
}
                                                                                                                                                                                                                                    