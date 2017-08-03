/**
 * 
 */
package com.jsjn.jnf.common.validator.constraintvalidators;

import java.math.BigDecimal;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;


import com.jsjn.jnf.common.validator.constraints.CheckAmount;

/**
 * @author ZSMJ
 *
 */
public class CheckAmountValidator implements ConstraintValidator<CheckAmount,BigDecimal> {
	private String min;
	private String max;

	@Override
	public boolean isValid(BigDecimal value, ConstraintValidatorContext context) {
		//禁用默认的message的值
		context.disableDefaultConstraintViolation();
		if(value == null){
			context.buildConstraintViolationWithTemplate("代扣金额不能为空且应为数字类型").addConstraintViolation();
			return false;
		}
			
		
		if(value.compareTo(new BigDecimal(min)) < 0 || value.compareTo(new BigDecimal(max)) > 0){
			context.buildConstraintViolationWithTemplate("代扣金额不在规定范围").addConstraintViolation();
			return false;
		}
		
		Pattern pattern = Pattern.compile("\\d{1,10}\\.\\d{2}");
		Matcher matcher = pattern.matcher(value.toString());
		if(!matcher.matches()){
			context.buildConstraintViolationWithTemplate("代扣金额格式不合法").addConstraintViolation();
			return false;
		}
		
		return true;
		
	}

	@Override
	public void initialize(CheckAmount constraintAnnotation) {
		this.min = constraintAnnotation.min();
		this.max = constraintAnnotation.max();
	}


}