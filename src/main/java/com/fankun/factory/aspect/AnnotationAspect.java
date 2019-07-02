package com.fankun.factory.aspect;

import java.lang.reflect.Method;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.alibaba.fastjson.JSONObject;
import com.fankun.factory.annotation.NotEmpty;
import com.fankun.factory.common.RespEunm;
import com.fankun.factory.exception.BaseException;
import com.fankun.factory.exception.ExceptionHandle;

@Aspect
@Component
public class AnnotationAspect {
	

	@Autowired
	private ExceptionHandle exceptionHandle;

	@Pointcut(value = "@annotation(com.fankun.factory.annotation.NotEmpty)")
	public void pointcut() {

	}


	@Around("pointcut()")
	public Object doAround(ProceedingJoinPoint proceedingJoinPoint)
			throws Throwable {
		String notEmptyResult = null;
		MethodSignature sign = (MethodSignature) proceedingJoinPoint.getSignature();
		Method method = sign.getMethod();
		NotEmpty notEmpty = method.getAnnotation(NotEmpty.class);
		notEmptyResult = verifNotEmpty(notEmpty,proceedingJoinPoint);
		Object obj = null;
		try {
			if (StringUtils.hasText(notEmptyResult)) {
				throw new BaseException(RespEunm.INPUT_ERROR.getResponseCode(),notEmptyResult);
			}
			obj = proceedingJoinPoint.proceed();
		} catch (Exception e) {
			return exceptionHandle.exceptionGet(e);
		}
		return obj;
	}


	private String verifNotEmpty(NotEmpty notEmpty,ProceedingJoinPoint proceedingJoinPoint) {
		if(notEmpty == null){
			return null;
		}
		String value = notEmpty.value();
		Object[] args = proceedingJoinPoint.getArgs();
		String inputArgs = "";
		// 获取参数
		if (args != null) {
			for (Object arg : args) {
				 if (!(arg instanceof HttpServletRequest)
						&& !(arg instanceof HttpServletResponse)) {
					inputArgs += JSONObject.toJSONString(arg);
				}
			}
		}
		if (StringUtils.hasText(inputArgs) && StringUtils.hasText(value)) {
			JSONObject jo = (JSONObject) JSONObject.parse(inputArgs);
			String[] v = value.split(",");
			for (String val : v) {
				if (!jo.containsKey(val)||!StringUtils.hasText((String)jo.get(val))) {
					return val + "不能为空";
				}
			}
		}
		return null;
	}

}
