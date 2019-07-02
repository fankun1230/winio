package com.fankun.factory.exception;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.fankun.factory.common.RespEunm;
import com.fankun.factory.dao.TransactionMapper;

@ControllerAdvice
public class ExceptionHandle {

	private static final Logger logger = LoggerFactory.getLogger(ExceptionHandle.class);
	
	@Autowired
	private TransactionMapper transactionMapper;

  /**
   * 判断错误是否是已定义的已知错误，不是则由未知错误代替，同时记录在log�?
   * @param e
   * @return
   */
  @ExceptionHandler(value = Exception.class)
  @ResponseBody
  public String exceptionGet(Exception e){
	  Map<String, Object> map = new HashMap<String, Object>();
	  map.put("status", 0);
	  String errerMsg = "";
      if(e instanceof BaseException){
    	  BaseException myException = (BaseException) e;
    	 // logger.error("XueXinException异常："+myException.getRespCode()+"-->"+myException.getRespMsg());
    	  logger.error("XueXinException异常：",myException);

    	  map.put("errorMsg", myException.getRespMsg());
    	  map.put("errorCode",StringUtils.hasText(myException.getRespCode())==true?
    			  myException.getRespCode():getErrorCodeByMsg(myException.getRespMsg()));
      }else{
    	  logger.error("系统繁忙：", e);
    	  map.put("errorMsg", "系统繁忙!");
    	  map.put("errorCode", "901");
      }
      errerMsg = JSONObject.toJSONString(map);
//      transaction.setResponseBody(errerMsg);
//	  transaction.setResponseCode("500");
//      transactionMapper.insert(transaction);
      return errerMsg;
     
  }

private String getErrorCodeByMsg(String respMsg) {
	String respCode = "901";
	if(!StringUtils.hasText(respMsg)){
		return respCode;
	}else{
		respCode = RespEunm.getCodeByMsg(respMsg);
	}
	return respCode;
}
}
