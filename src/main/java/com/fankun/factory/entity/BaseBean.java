package com.fankun.factory.entity;

import java.io.Serializable;

import com.alibaba.fastjson.JSONObject;

public class BaseBean implements Serializable {

	
	private static final long serialVersionUID = 1L;
	
	public String createTime;
	
	public String updateTime;
	
	@Override
	public String toString() {
		return JSONObject.toJSONString(this);
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}
	
	
	
}

