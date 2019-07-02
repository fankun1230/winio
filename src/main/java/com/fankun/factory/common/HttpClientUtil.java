package com.fankun.factory.common;

import java.nio.charset.Charset;

import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.params.CoreConnectionPNames;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.alibaba.fastjson.JSON;
/* 
 * 利用HttpClient请求的工具类 
 */  
public class HttpClientUtil {  
	
	private static final Logger logger = LoggerFactory.getLogger(HttpClientUtil.class);
	
    public static String doPost(String url, Object obj) throws Exception{  
    	String result = "";
    	try{
    		//POST的URL
    		HttpPost httppost=new HttpPost(url);
    		httppost.setHeader("Content-type", "application/json; charset=utf-8");
    		if(obj != null){
				StringEntity entity = new StringEntity(JSON.toJSONString(obj), Charset.forName("utf-8"));
				entity.setContentType("application/json");
				httppost.setEntity(entity);  
    		}
    		//设置编码
    		DefaultHttpClient dhc = new DefaultHttpClient();
    		dhc.getParams().setIntParameter(CoreConnectionPNames.CONNECTION_TIMEOUT, 20000);
    		dhc.getParams().setIntParameter(CoreConnectionPNames.SO_TIMEOUT, 180000);
    		HttpResponse response=dhc.execute(httppost);
    		//发送Post,并返回一个HttpResponse对象
    		result=EntityUtils.toString(response.getEntity());
    		if(response.getStatusLine().getStatusCode()!=200){//如果状态码不为200,直接抛出异常
    			throw new Exception();
    		}	  
    		return result;
    	}catch(Exception e){
    		logger.error("内容【httpclient请求异常】", e);
    		throw e;
    	}
    }
    
    public static String doGet(String url) throws Exception{  
    	String result = "";
    	try{
    		//POST的URL
    		HttpGet httpget=new HttpGet(url);
    		//设置编码
    		HttpResponse response=new DefaultHttpClient().execute(httpget);
    		//发送Post,并返回一个HttpResponse对象
    		result=EntityUtils.toString(response.getEntity());
    		if(response.getStatusLine().getStatusCode()!=200){//如果状态码为200,就是正常返回
    			throw new Exception(result);
    		}	  
    		return result;
    	}catch(Exception e){
    		logger.error("内容【httpclient请求异常】", e);
    		throw new Exception(e.getMessage());
    	}
    }
}  
