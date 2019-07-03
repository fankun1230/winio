/**
 * This jQuery plugin displays pagination links inside the selected elements.
 *
 * @author Ren Zongjie 
 * @version 1.0
 */
             function jumpPage(custType){
                 var goPage = $("#goPage").val();
                 goPages(goPage,custType);
             }
              //  ?
             function goPages(pageNum,custType){  
                var itemsPerPage = 10;     
                var totalRecord = $('#hiddenresult tr').length;
		        totalRecord = totalRecord>0?totalRecord:0;
		        var totalPage = 0;
			    var temp =  Math.floor(totalRecord/itemsPerPage);
			    totalPage = totalRecord%itemsPerPage==0?temp:temp+1; 
			    var proc = processPage(pageNum,totalPage); 
                if(proc == 100000){
	                window.alert("?      ? ? ");
	                $("#goPage").val("");
	                $("#goPage").focus();
	                return;
	            }else if(proc == 100001){
	                window.alert("              ");
	                $("#goPage").val("");
	                $("#goPage").focus();
	                return;
	            }else{
	                pageNum = proc;
	                if(pageNum <= 0 ||pageNum > totalPage){
	                    window.alert("        งน  ?    ");
	                    $("#goPage").val("");
	                    $("#goPage").focus();
	                    return;
	                 }
	            }        
			    var startIndex = (pageNum - 1) * itemsPerPage;
			    var currentEndRecord = startIndex + itemsPerPage - 1;		        
			    var endIndex = totalRecord-1 < currentEndRecord ? totalRecord-1: currentEndRecord;
			    var new_content = "";
			    for(var i = startIndex;i <= endIndex;i++){
			        new_content += "<tr>";
			        new_content += $('#hiddenresult tr:eq('+i+')').html(); 
			        new_content += "</tr>";
			    } 
			    $('#searchResult').html(new_content);
			    //stripeAjax();			    
			    $("#totalRecords").text("   "+totalRecord+"   ");
			    $("#totalPages").text("   "+totalPage+" ?");
			    $("#goPage").val(pageNum);
                $("#pagination").html(paginationNew(pageNum,totalPage,3,2,custType));
                iframeHeightPay();                
             }
               
            function paginationNew(currentPage,totalPage,midNum,edgeNum,custType){
                var pageHtml = "";
                if(currentPage == 1){
                    pageHtml += "<li><a class=\"btn_prev\">&lt;   ?? </a></li>";
                }else{
                     pageHtml += "<li><a href=\"javascript:void(0);\" onclick=\"goPages("+(currentPage-1)+",'"+custType+"')\" class=\"btn_prev\">&lt;   ?? </a></li>";
                }
                for(var i =1;i<=totalPage;i++){
                    if(totalPage <= edgeNum*2 + midNum + 1){//?  ? ??    
                        if(currentPage == i){
                            pageHtml +="<li class=\"on\"><a href=\"javascript:void(0);\">"+i+"</a></li>";
                        }else{
                            pageHtml += "<li><a href=\"javascript:void(0);\" onclick=\"goPages("+i+",'"+custType+"')\">"+i+"</a></li>";
                        }
                    }else{
                        if(currentPage <= edgeNum + midNum){//? ?   ?     
                            if(i<= currentPage +1){                            
                                if (currentPage == i){
							        pageHtml += "<li class=\"on\"><a href=\"javascript:void(0);\">"+i+"</a></li>";
							    }else{
							        pageHtml +="<li><a href=\"javascript:void(0);\" onclick=\"goPages("+i+",'"+custType+"')\">"+i+"</a></li>";
							    }
							 }else if(i == currentPage + 2){
							     pageHtml +="<li>...</li>";
							 }else if(i > totalPage - edgeNum){
							     if (currentPage == i){
							         pageHtml += "<li class=\"on\"><a href=\"javascript:void(0);\">"+i+"</a></li>"; 
							     }else{
							         pageHtml += "<li><a href=\"javascript:void(0);\" onclick=\"goPages("+i+",'"+custType+"')\">"+i+"</a></li>"; 
							     }						
							 }					
						 }else if(currentPage > totalPage - edgeNum - midNum){//? ?  ?     
						     if (i<= edgeNum){
						         if (currentPage == i){
							         pageHtml +="<li class=\"on\"><a href=\"javascript:void(0);\">"+i+"</a></li>";
							     }else{
							         pageHtml += "<li><a href=\"javascript:void(0);\" onclick=\"goPages("+i+",'"+custType+"')\">"+i+"</a></li>";
							     }
							 }else if(i == edgeNum + 1){
							     pageHtml +="<li>...</li>";
							 }else if(i > totalPage - edgeNum - midNum && i >= currentPage - 1){
							     if (currentPage == i){
							         pageHtml +="<li class=\"on\"><a href=\"javascript:void(0);\">"+i+"</a></li>";
							     }else{
							         pageHtml += "<li><a href=\"javascript:void(0);\" onclick=\"goPages("+i+",'"+custType+"')\">"+i+"</a></li>";
							     }
							 }	
						 }else{//? ?      ?    
						     if (i<= edgeNum){
						         if (currentPage == i){
							         pageHtml +="<li class=\"on\"><a href=\"javascript:void(0);\">"+i+"</a></li>";
							     }else{
							         pageHtml += "<li><a href=\"javascript:void(0);\" onclick=\"goPages("+i+",'"+custType+"')\">"+i+"</a></li>";
							     }
							 }else if(i == edgeNum + 1){
							     pageHtml +="<li>...</li>";
							 }else if ((i >= currentPage - 1) && (i <= currentPage + 1)){
							     if (currentPage == i){
							         pageHtml +="<li class=\"on\"><a href=\"javascript:void(0);\">"+i+"</a></li>";
							     }else{
							         pageHtml += "<li><a href=\"javascript:void(0);\" onclick=\"goPages("+i+",'"+custType+"')\">"+i+"</a></li>";
							     }
							 }else if (i == currentPage+ 2){
							     pageHtml +="<li>...</li>";
							 }else if(i > totalPage - edgeNum){
							     if (currentPage == i){
							         pageHtml +="<li class=\"on\"><a href=\"javascript:void(0);\">"+i+"</a></li>";
							     }else{
							         pageHtml += "<li><a href=\"javascript:void(0);\" onclick=\"goPages("+i+",'"+custType+"')\">"+i+"</a></li>";
							     }
							 }
						 }
			        }
                }//end of for
                if (currentPage == totalPage){
		            pageHtml+="<li><a class=\"btn_next\">  ?? &gt;</a></li>";
		        }else{
		            pageHtml +="<li><a href=\"javascript:void(0);\" onclick=\"goPages("+(currentPage+1)+",'"+custType+"')\" class=\"btn_next\">  ?? &gt;</a></li>";
		        }
		        return pageHtml;		     
            }
        //    ? ?    
        function isDigit(str){
	        var reg = /^(0|[1-9]\d{0,})$/;
	        return reg.test(str);
	    }
	    //processPage
	    function processPage(pageNum){
	        var str = new String(pageNum);
	        str = str.replace(/(^\s*)|(\s*$)/g, "");
	        if(str.length == 0){
	            return 100000;
	        }else if(!isDigit(str)){
	            return 100001;
	        }else{
	            return Number(str);
	        }
	    }
	    
	function iframeHeightPay(){
	    var height = parseInt($(document.body).height())+'px';
        parent.$("#tag_form_1").height(height); //    iframe ?     
        parent.$("#content_myInfo").height(height); 
    }                                                                                                                                                                                                                                                                                                                                            