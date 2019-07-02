package com.fankun.factory.common;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.codec.digest.DigestUtils;

public class EncryptUtil {
	
	public  static final String AUTH_ID="zhengxin02";
	public  static final String SYSTEM_ID="zhengxinpwd02";
	/**
	 * 获取签名
	 * @param authId
	 * @param authSecret
	 * @return
	 */
	public static String getTokenSignature(String authId, String authSecret){
		String stringToSign = AUTH_ID + SYSTEM_ID;
		return DigestUtils.md5Hex(stringToSign);
	}   
	
	public static void tokenVerify(String authToken,String systemId){
		Map<String,String> postMap = new HashMap<String, String>();
		postMap.put("authToken", authToken);
		postMap.put("systemId", systemId);
		try {
			HttpClientUtil.doPost("http://10.1.6.50:8082/auth-service/auth/tokenVerify", postMap);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
