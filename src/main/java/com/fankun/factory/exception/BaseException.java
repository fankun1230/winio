package com.fankun.factory.exception;

import org.springframework.util.StringUtils;

import com.fankun.factory.common.RespEunm;


public class BaseException extends Exception {

	private static final long serialVersionUID = 1L;

	private String respCode;

	private String respMsg;

	public BaseException(String message) {
		super(message);
		this.respMsg = message;
	}

	public BaseException() {
          super();
	}

	public BaseException(String respCode, String respMsg) {
		super(respMsg);
		this.respCode = respCode;
		this.respMsg = respMsg;
	}

	public BaseException(RespEunm eunm) {
		super(eunm.getResponseMsg());
		this.respCode = eunm.getResponseCode();
		this.respMsg = eunm.getResponseMsg();
	}

	public BaseException(RespEunm eunm,String msg) {
		this.respCode = eunm.getResponseCode();
		if(StringUtils.hasText(msg))
			this.respMsg = msg;
		else
		this.respMsg = eunm.getResponseMsg();
	
	}
	
	public String getRespCode() {
		return respCode;
	}

	public String getRespMsg() {
		return respMsg;
	}

	public void setRespCode(String respCode) {
		this.respCode = respCode;
	}

	public void setRespMsg(String respMsg) {
		this.respMsg = respMsg;
	}
	
}
