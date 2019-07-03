 	//?????????
    function getWide()
 	{
 	var winWidth=1000;
 	if (window.innerWidth)
	winWidth = window.innerWidth;
	else if ((document.body) && (document.body.clientWidth))
	winWidth = document.body.clientWidth;
	return winWidth; 
 	}
    //????id?????????
	function popWindows(id)
	{
		$.blockUI({
		message: id,
		constrainTabKey:true,
		fadeOut:0,
		applyPlatformOpacityRules:1,
		centerY: 0,
		css: {
		top: 100,
		left: (getWide()-300)/2,
		width: '100%',
		border: 'none'
	     },
	      overlayCSS: { backgroundColor: '#fff' }
	      });
	}
        //????????
		function unblockDIV(){
		$.unblockUI();
		}
		
		//??????????
		function blockDIV(top,left){
		$.blockUI({
		message: $('#waitcover'),
		constrainTabKey:true,
		fadeOut:0,
		applyPlatformOpacityRules:1,
		centerY: 0,
		css: {
		top: top,
		left: left,
		width: '300px',
		border: 'none'
		},
		overlayCSS: { backgroundColor: '#fff' }
		});
		} 
		
		
		//??????
		function qckg(string) {
		var temp = "";
		splitstring = string.split(" ");
		for(i = 0; i < splitstring.length; i++)
		temp += splitstring[i];
		return temp;
		}                                                                                                                                                                                                                                                                                                                                                                                           