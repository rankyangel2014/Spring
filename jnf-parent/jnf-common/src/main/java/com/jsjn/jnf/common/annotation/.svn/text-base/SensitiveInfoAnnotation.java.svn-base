package com.jsjn.jnf.common.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.jsjn.jnf.common.utils.SensitiveInfoUtils;

/**
 * 
 * @author lilong
 */
@Target({ ElementType.FIELD, ElementType.METHOD })
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
public @interface SensitiveInfoAnnotation {

	public SensitiveInfoUtils.SensitiveType type();
}
