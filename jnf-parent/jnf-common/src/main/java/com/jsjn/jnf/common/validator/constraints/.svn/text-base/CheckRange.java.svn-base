/**
 * 
 */
package com.jsjn.jnf.common.validator.constraints;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

import com.jsjn.jnf.common.validator.constraintvalidators.CheckRangeValidator;

/**
 * @author xiekx
 * 
 */
@Constraint(validatedBy = CheckRangeValidator.class)
@Target({ java.lang.annotation.ElementType.FIELD })
@Retention(java.lang.annotation.RetentionPolicy.RUNTIME)
@Documented
public @interface CheckRange {
	String message() default "必须为0-7";

	//下面这两个属性必须添加  
	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};
}
