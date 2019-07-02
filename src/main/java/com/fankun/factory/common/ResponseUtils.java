package com.fankun.factory.common;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import com.alibaba.fastjson.JSONObject;

/**
 * 返回结果包装类
 *
 * @param <T>
 */
public class ResponseUtils implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private static String result;

	static {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("status", 1);
		resultMap.put("errorMsg", "成功");
		resultMap.put("errorCode", "000");
		result = JSONObject.toJSONString(resultMap);
	}
	

	public static String succ(JSONObject obj) {
		if (obj == null) {
			return succ();
		}
		if (!obj.containsKey("status")) {
			obj.put("status", 1);
			obj.put("errorMsg", "成功");
			obj.put("errorCode", "000");
		}
		return JSONObject.toJSONString(obj);
	}

	public static String succ() {
		return result;
	}

}
