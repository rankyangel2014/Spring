/**
 * 
 */
package com.jsjn.jnf.common.validator.constraintvalidators;

import java.util.regex.Pattern;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.apache.commons.lang3.StringUtils;

import com.jsjn.jnf.common.validator.constraints.CheckFlag;

/**
 * @author xiekx
 * 
 */
public class CheckFlagValidator implements ConstraintValidator<CheckFlag, String> {

	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		if (StringUtils.isBlank(value)) {
			context.buildConstraintViolationWithTemplate("不能为空").addConstraintViolation();
			return false;
		}
		return Pattern.compile("Y|N").matcher(value).matches();

	}

	@Override
	public void initialize(CheckFlag constraintAnnotation) {
	}

}