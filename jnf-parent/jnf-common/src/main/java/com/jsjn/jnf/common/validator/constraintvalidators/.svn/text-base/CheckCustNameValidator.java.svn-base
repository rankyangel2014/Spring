package com.jsjn.jnf.common.validator.constraintvalidators;

import java.util.regex.Pattern;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.jsjn.jnf.common.validator.constraints.CheckCustName;

public class CheckCustNameValidator implements ConstraintValidator<CheckCustName, String> {

	private boolean filterSpecialChar;

	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		//禁用默认的message
		context.disableDefaultConstraintViolation();
		if ("".equals(value) || value == null) {
			context.buildConstraintViolationWithTemplate("用户名不能为空").addConstraintViolation();
			return false;
		}
		int length = value.length();
		if (length > 16) {
			context.buildConstraintViolationWithTemplate("用户名不能超过16个字符").addConstraintViolation();
			return false;
		}
		if (filterSpecialChar
				&& (Pattern.compile("[\\`~!@#$%^&*+=|{}':;',\\[\\].<>/?~！@#￥%……&*——+|{}【】‘；：”“’。，、？]").matcher(value).find())) {
			context.buildConstraintViolationWithTemplate("用户名不能包含特殊字符").addConstraintViolation();
			return false;
		}

		return true;
	}

	@Override
	public void initialize(CheckCustName constraintAnnotation) {
		this.filterSpecialChar = constraintAnnotation.filterSpecialChar();
	}
}
