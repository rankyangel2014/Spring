/**
 * 
 */
package com.jsjn.jnf.common.validator.constraintvalidators;

import java.util.regex.Pattern;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.apache.commons.lang3.StringUtils;

import com.jsjn.jnf.common.validator.constraints.CheckRange;

/**
 * @author xiekx
 * 
 */
public class CheckRangeValidator implements ConstraintValidator<CheckRange, String> {

	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		if (StringUtils.isBlank(value)) {
			context.buildConstraintViolationWithTemplate("不能为空").addConstraintViolation();
			return false;
		}
		return Pattern.compile("[0-7]").matcher(value).matches();

	}

	@Override
	public void initialize(CheckRange constraintAnnotation) {
	}

}