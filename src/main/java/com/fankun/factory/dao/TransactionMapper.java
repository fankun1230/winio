package com.fankun.factory.dao;

import org.apache.ibatis.annotations.Mapper;

import com.fankun.factory.entity.TransactionEntity;



@Mapper
public interface TransactionMapper {
	
	public void insert(TransactionEntity transaction);
	
}
