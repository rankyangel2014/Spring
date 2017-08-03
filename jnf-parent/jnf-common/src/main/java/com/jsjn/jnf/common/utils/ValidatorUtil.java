package com.jsjn.jnf.common.utils;

import java.util.List;
import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Validation;
import javax.validation.Validator;

import com.jsjn.jnf.common.validator.BeanValidators;
import com.jsjn.platform.util.StringUtil;

/**
 * validator 辅助类 
 * @author qiangl
 *
 */
public class ValidatorUtil {
	
	private static Logger log=Logger.getLogger(ValidatorUtil.class);
	
	private static Validator getValidator(){
		return  Validation.buildDefaultValidatorFactory().getValidator();
	}
	
	/**
	 * 校验某个bean中所有字段校验
	 * @param bean
	 * @return
	 */
	public static String validObj(Object o){
		Validator val=getValidator();
		try{
			BeanValidators.validateWithException(val, o);
		}catch (ConstraintViolationException e) {
			List<String> list=BeanValidators.extractPropertyAndMessageAsList((ConstraintViolationException)e);
			log.info(list.toString());
			return list.get(0);
		}
		
		return "";
	}
	
	/**
	 * 校验bean中某个属性
	 * @param bean
	 * @param property
	 * @return
	 */
	public static String validproperty(Object o,String property){
		Validator val=getValidator();
		Set<ConstraintViolation<Object>> constraintViolations=val.validateProperty(o, property);
		if (!constraintViolations.isEmpty()) {
			List<String> list= BeanValidators.extractPropertyAndMessageAsList(constraintViolations);
			log.info(list.toString());
			return list.get(0);
		}
		return "";
		
	}
	/**
	 * 校验bean中一组属性，返回此组中第一个校验错误的
	 * @param bean
	 * @param propertys
	 * @return
	 */
	public static String validpropertys(Object o,String[] propertys){
		String tmp="";
		for(String t:propertys){
			tmp=validproperty(o,t);
			if(!StringUtil.isEmpty(tmp)){
				return tmp;
			}
		}
		return tmp;
		
	}

}
