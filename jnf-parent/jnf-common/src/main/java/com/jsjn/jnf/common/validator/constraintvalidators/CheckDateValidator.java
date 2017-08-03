/**
 * 
 */
package com.jsjn.jnf.common.validator.constraintvalidators;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.jsjn.jnf.common.utils.DateUtils;
import com.jsjn.jnf.common.validator.constraints.CheckDate;

/**
 * @author ZSMJ
 *
 */
public class CheckDateValidator implements ConstraintValidator<CheckDate,String> {
	private String pattern;

	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		return DateUtils.validateDate(value,pattern);
	}

	@Override
	public void initialize(CheckDate constraintAnnotation) {
		this.pattern = constraintAnnotation.pattern();
	}


}