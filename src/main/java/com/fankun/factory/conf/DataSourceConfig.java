package com.fankun.factory.conf;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import com.mchange.v2.c3p0.ComboPooledDataSource;

@Configuration
public class DataSourceConfig {

    @Bean(name="dataSource")
    @Qualifier(value="dataSource")//限定描述符除了能根据名字进行注入，但能进行更细粒度的控制如何选择候选者
    @Primary//用@Primary区分主数据源
    @ConfigurationProperties(prefix="c3p0")//指定配置文件中，前缀为c3p0的属性值
    public DataSource dataSource(){
        return DataSourceBuilder.create().type(ComboPooledDataSource.class).build();//创建数据源
    }
}