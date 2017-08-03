package com.jsjn.jnf.persistence.aspect;


import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;

import com.jsjn.jnf.common.utils.SensitiveInfoUtils;

/**
 * 数据脱敏处理切面
 * 
 * @author lilong
 * 
 */
public class SensitiveDataAspect {

	public Object doAround(ProceedingJoinPoint pjp) throws Throwable {
		Object retVal = pjp.proceed();

		retVal = SensitiveInfoUtils.getObject(retVal);

		return retVal;
	}

	public void doThrowing(JoinPoint jp, Throwable ex) throws Throwable {

		throw ex;
	}

}
