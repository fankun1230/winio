function getFrameHeight(){
				// http://zsc.189.cn/dqmh/web/zhidao/proxy.html 
 		 		var proxyUrl = new Array("http://www.189.cn/dqmh/web/zhidao/proxy.html");
				var iheight = 0;
				var bh = $("body").height() ? ($("body").height() + 5) : 0;
				var dh = $(document).height();
				if (bh && dh) {
					iheight = Math.min(bh, dh);
				} else {
					iheight = bh || dh;
				}
				for(var i=0;i<proxyUrl.length;i++){
					$("#_proxyFrame"+i).remove();
					var agent_iframe = document.createElement("iframe");
					agent_iframe.id = "_proxyFrame"+i;
					agent_iframe.src = proxyUrl[i] + "#" + iheight;
					document.body.appendChild(agent_iframe);
					agent_iframe.style.height = "0px";
					agent_iframe.style.width = "0px";
					agent_iframe.style.display = "none";
				}
 		 }                                                                                                                                                                                                                              