package com.jsjn.jnf.common.validator.constraintvalidators;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import com.jsjn.jnf.common.validator.constraints.CheckMobileNumber;

public class CheckMobileNumberValidator implements ConstraintValidator<CheckMobileNumber,String> {
	Pattern pattern = Pattern.compile("^1[34578]\\d{9}$");

	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		if (value==null){
			return false;
		}
		Matcher matcher = pattern.matcher(value);
		return matcher.matches();
	}

	@Override
	public void initialize(CheckMobileNumber constraintAnnotation) {}
}
