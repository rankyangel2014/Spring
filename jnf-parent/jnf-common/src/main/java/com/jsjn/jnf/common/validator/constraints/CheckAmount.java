/**
 * 
 */
package com.jsjn.jnf.common.validator.constraints;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

import com.jsjn.jnf.common.validator.constraintvalidators.CheckAmountValidator;


/**
 * @author ZSMJ
 *
 */
@Constraint(validatedBy = CheckAmountValidator.class) //具体的实现  
@Target( { java.lang.annotation.ElementType.FIELD })  
@Retention(java.lang.annotation.RetentionPolicy.RUNTIME)  
@Documented
public @interface CheckAmount {
	String message() default "金额格式不正确";      
    //下面这两个属性必须添加  
    Class<?>[] groups() default {};  
    Class<? extends Payload>[] payload() default {};  
    
    String min();
    String max();
}
