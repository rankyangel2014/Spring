package com.jsjn.jnf.common.validator.constraintvalidators;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.jsjn.jnf.common.utils.IdcardUtils;
import com.jsjn.jnf.common.validator.constraints.CheckIdNo;

public class CheckIdNoValidator implements ConstraintValidator<CheckIdNo,String> {

	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		return IdcardUtils.validateCard(value);
	}

	@Override
	public void initialize(CheckIdNo constraintAnnotation) {}

}
