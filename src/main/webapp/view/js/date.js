
function dateToStr(date){
	if(date==null || date==""|| date==undefined){
		return "";
	}
	var dateTime = new Date(date);
	var y = dateTime.getFullYear();
	var month = dateTime.getMonth()+1;
	var m = month>9?month.toString():'0'+month;
	var d = dateTime.getDate()>9?dateTime.getDate().toString():'0'+dateTime.getDate();
	var str = y.toString()+'-'+m+'-'+d;
	return str;
}  

function dateFomat(date,format){
	if(date==null || date==""|| date==undefined){
		return "";
	}
	var dateTime = new Date(date);
	var year = dateTime.getFullYear();
	var month = dateTime.getMonth()+1;
	month = month>9?month.toString():'0'+month;
	var dd = dateTime.getDate()>9?dateTime.getDate().toString():'0'+dateTime.getDate();
	var hh = dateTime.getHours()>9?dateTime.getHours().toString():'0'+dateTime.getHours();
	var mm = dateTime.getMinutes()>9?dateTime.getMinutes().toString():'0'+dateTime.getMinutes();
	var ss = dateTime.getSeconds()>9?dateTime.getSeconds().toString():'0'+dateTime.getSeconds();

	return  format.replace("yyyy", year).replace("MM", month).replace("dd", dd).replace("hh", hh).replace("mm", mm).replace("ss", ss);
} 