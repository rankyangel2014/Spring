package com.jsjn.jnf.persistence.aspect;


import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;

import com.jsjn.jnf.bean.dto.base.BaseDTO;
import com.jsjn.jnf.common.utils.AesDataUtils;

/**
 * AES数据加解密切面处理
 * @author lilong
 *
 */
public class AesCryptosDataAspect {

	public void doBefore(JoinPoint jp) throws Throwable {
		Object[] args = jp.getArgs();
		//此处规则应该定义清晰
		if (args != null && args.length > 0) {
			for (int i = 0; i < args.length; i++) {
				if(args[i] instanceof BaseDTO){
					args[i] = AesDataUtils.aesEncryptObject(args[i]);
				}
			}
		}
	}

	/**
	 * 处理AES数据解密
	 * 
	 * @param pjp
	 * @return
	 * @throws Throwable
	 */
	public Object doAround(ProceedingJoinPoint pjp) throws Throwable {
		Object retVal = pjp.proceed();
		retVal = AesDataUtils.aesDecryptObject(retVal);
		return retVal;
	}

	public void doThrowing(JoinPoint jp, Throwable ex) throws Throwable {
		throw ex;
	}
}
