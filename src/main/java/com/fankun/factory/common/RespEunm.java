package com.fankun.factory.common;


public enum RespEunm {
	
	SUCC("000", "成功"),
	INPUT_ERROR("101", "参数异常"),
	SYSTEM_ERROR("901", "系统繁忙");
	private String responseCode;
	
	private String responseMsg;

	private RespEunm(String responseCode, String responseMsg) {
		this.responseCode = responseCode;
		this.responseMsg = responseMsg;
	}

	public String getResponseCode() {
		return responseCode;
	}

	public void setResponseCode(String responseCode) {
		this.responseCode = responseCode;
	}

	public String getResponseMsg() {
		return responseMsg;
	}

	public void setResponseMsg(String responseMsg) {
		this.responseMsg = responseMsg;
	}
	//错误信息找到对应的code，爬虫配置文件中的checkInfo中的label必须要定义在该类中，不能乱取
	public static String getCodeByMsg(String responseMsg){
		String result = null;
		for (RespEunm e : RespEunm.values()) {
			if(e.getResponseMsg().equals(responseMsg)){
				result = e.getResponseCode();
				break;
			}
		}
		if(result == null){
			result = "901";
		}
		return result;
	}

}
