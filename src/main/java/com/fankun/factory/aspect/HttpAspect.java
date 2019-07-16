package com.fankun.factory.aspect;

import java.util.Enumeration;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.jboss.logging.MDC;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.alibaba.fastjson.JSONObject;
import com.fankun.factory.common.DateUtils;
import com.fankun.factory.common.SecUtil;
import com.fankun.factory.common.StringUtils;
import com.fankun.factory.dao.TransactionMapper;
import com.fankun.factory.entity.TransactionEntity;
import com.fankun.factory.exception.ExceptionHandle;

//@Aspect
//@Component
public class HttpAspect {
	
	private static final Logger logger = LoggerFactory.getLogger(HttpAspect.class);
	
	private static final String  BIG_OUT_PUT = "，参数存在，但内容太大，如果需要请从XUEXIN_TRANSACTION表中看";


    @Autowired
    private ExceptionHandle exceptionHandle;
    
    @Pointcut("execution(public * com.fankun.factory.controller.*.*(..))")
    public void log(){

    }
    @Autowired
    private TransactionMapper transactionMapper;
    
    private TransactionEntity transaction;
   
    private String getRandom(){
    	String result = "";
    	Random random=new Random();
        for(int i=0;i<3;i++){
            result+=random.nextInt(10);
        }
       return result;
    }
    
    
    @Before("log()")
    public void doBefore(JoinPoint joinPoint){
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
       HttpServletRequest request = attributes.getRequest();
       MDC.put("sessionID",DateUtils.getToday()+"_"+getRandom());
       transaction = new TransactionEntity();
        Object[] args = joinPoint.getArgs();
        String inputArgs = "";
        		//获取参数
        		if(args!=null){
        			for(Object arg: args){
        				if(arg instanceof HttpServletRequest){
        					HttpServletRequest req=(HttpServletRequest) arg;
        					Enumeration<String> enum1 = req.getHeaderNames();
        					boolean haveUserId = false;
            			    while (enum1.hasMoreElements()) {
            			        String key = (String) enum1.nextElement();
            			        String value = request.getHeader(key);
            			        if("systemid".equalsIgnoreCase(key)){
            			        	transaction.setSystemId(value);
            			        	MDC.put("systemId", value);
            			        }else if("transMessageId".equalsIgnoreCase(key)){
            			        	transaction.setTraceMessageId(value);
            			        }else if("protocalVersion".equalsIgnoreCase(key)){
            			        	transaction.setVersion(value);
            			        }else if("userId".equalsIgnoreCase(key)){
            			        	haveUserId = true;
            			        	transaction.setUserId(Integer.valueOf(value));
            			        }
            			    }
            			    if(!haveUserId){
            			    	transaction.setUserId(1);
            			    }
            				transaction.setTransactionId(StringUtils.getGeneralID().toPlainString());
        			    	transaction.setVersion("1.0");
       				     }
        				else if(!(arg instanceof HttpServletRequest) && !(arg instanceof HttpServletResponse) ){
        					if(arg instanceof String){
        						inputArgs = arg.toString();	
        					}else{
        					JSONObject inputLog = (JSONObject) JSONObject.toJSON(arg);
        					//将敏感信息加工password身份信息给过滤
        					if(inputLog.getString("password")!=null){
        						inputLog.put("password", SecUtil.encrypt(inputLog.getString("password")));
        					}
        					inputArgs = inputArgs + inputLog;
        					}
        				}
        			}
        		}
        		 //url
         logger.info("url={}",request.getRequestURL());
                //method
         logger.info("post,get type={}",request.getMethod());
                //ip
          logger.info("ip={}",request.getRemoteAddr());
          transaction.setTraceMessageId(request.getRemoteAddr());
                //class_method
         logger.info("class_method={}",joinPoint.getSignature().getDeclaringTypeName() + "," + joinPoint.getSignature().getName());
                //args[]
        logger.info("request={}",inputArgs);
        transaction.setRequestBody(inputArgs);
        
    }
    
    
 
    
	@Around("log()")
	public Object doAround(ProceedingJoinPoint proceedingJoinPoint)
			throws Throwable {
		Object obj = null;
		try {
			obj = proceedingJoinPoint.proceed();
		} catch (Exception e) {
			return exceptionHandle.exceptionGet(e);
		}
		return obj;
	}

    @AfterReturning(pointcut = "log()",returning = "object")//打印输出结果
    public void doAfterReturing(Object object){
    	transaction.setResponseBody(object.toString());
    	transaction.setResponseCode("200");
    //	transactionMapper.insert(transaction);
    	//对出参日志进行处理，将二进制文件，及大文件过滤
    	JSONObject outputLog = JSONObject.parseObject(object.toString());
    	if(outputLog.containsKey("imageContent")){
    		outputLog.put("imageContent","imageContent"+BIG_OUT_PUT);
    	}
    	if(outputLog.containsKey("data")&&outputLog.get("data")!=null){
    		JSONObject jsondata = JSONObject.parseObject(outputLog.getString("data"));
    		if(jsondata.containsKey("baseInfoPhoto")){
    			jsondata.put("baseInfoPhoto","baseInfoPhoto"+BIG_OUT_PUT);
        	}
    		if(jsondata.containsKey("photo")){
    			jsondata.put("photo","photo"+BIG_OUT_PUT);
        	}
    		outputLog.put("data", jsondata);
    	}
    	logger.info("response={}",outputLog);
    	MDC.clear();
    }
    
 

}
