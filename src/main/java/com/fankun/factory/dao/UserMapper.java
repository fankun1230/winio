package com.fankun.factory.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.fankun.factory.entity.UserEntity;


@Mapper
public interface UserMapper {
	
	public void insert(UserEntity entity);
	
	public void delete(int id);
	
	public void update(UserEntity entity);
	
	public UserEntity query(Map<String, Object> map);
	
	public List<UserEntity> queryList(Map<String, Object> map);

}
