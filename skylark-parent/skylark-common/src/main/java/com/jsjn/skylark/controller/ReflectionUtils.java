package com.jsjn.skylark.controller;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.springframework.util.Assert;

/**
 * 反射工具类
 * @author lilong
 *
 */
public final class ReflectionUtils {

    private ReflectionUtils(){}


    /**
     * Attempt to find a {@link Field field} on the supplied {@link Class} with
     * the supplied <code>name</code>. Searches all superclasses up to {@link}
     * @param clazz the class to introspect
     * @param name the name of the field
     * @return the corresponding Field object, or <code>null</code> if not found
     */
    public static Field findField(Class<?> clazz, String name) {
        return findField(clazz, name, null);
    }

    /** 根据类和属性名称查找属性字段
    // Attempt to find a {@link Field field} on the supplied {@link Class} with
    // the supplied <code>name</code> and/or {@link Class type}. Searches all
    // superclasses up to {@link Object}.
    // @param clazz the class to introspect
    // @param name the name of the field (may be <code>null</code> if type is
    // specified)
    // @param type the type of the field (may be <code>null</code> if name is
    // specified)
    // @return the corresponding Field object, or <code>null</code> if not found
    */
    public static Field findField(Class<?> clazz, String name, Class<?> type) {
        Assert.notNull(clazz, "Class must not be null");
        Assert.isTrue(name != null || type != null,
                "Either name or type of the field must be specified");
        Class<?> searchType = clazz;
        while (!Object.class.equals(searchType) && searchType != null) {
            Field[] fields = searchType.getDeclaredFields();
            for (int i = 0; i < fields.length; i++) {
                Field field = fields[i];
                if ((name == null || name.equals(field.getName()))
                        && (type == null || type.equals(field.getType()))) {
                    return field;
                }
            }
            searchType = searchType.getSuperclass();
        }
        return null;
    }

    /**  根据属性字段和对象，设置对象的值
    // Set the field represented by the supplied {@link Field field object} on
    // the specified {@link Object target object} to the specified
    // <code>value</code>. In accordance with
    // {@link Field#set(Object, Object)} semantics, the new value is
    // automatically unwrapped if the underlying field has a primitive type.
    // <p>Thrown exceptions are handled via a call to
    // {@link #handleReflectionException(Exception)}.
    // @param field the field to set
    // @param target the target object on which to set the field
    // @param value the value to set; may be <code>null</code>
    */
    public static void setField(Field field, Object target, Object value) {
        try {
            field.set(target, value);
        } catch (IllegalAccessException ex) {
            handleReflectionException(ex);
            throw new IllegalStateException(
                    "Unexpected reflection exception - "
                            + ex.getClass().getName() + ": " + ex.getMessage());
        }
    }

    /**  根据属性字段和对象，获取的对象中字段的值
    // Get the field represented by the supplied {@link Field field object} on
    // the specified {@link Object target object}. In accordance with
    // {@link Field#get(Object)} semantics, the returned value is
    // automatically wrapped if the underlying field has a primitive type.
    // <p>Thrown exceptions are handled via a call to
    // {@link #handleReflectionException(Exception)}.
    // @param field the field to get
    // @param target the target object from which to get the field
    // @return the field's current value
     */
    public static Object getField(Field field, Object target) {
        try {
            return field.get(target);
        } catch (IllegalAccessException ex) {
            handleReflectionException(ex);
            throw new IllegalStateException(
                    "Unexpected reflection exception - "
                            + ex.getClass().getName() + ": " + ex.getMessage());
        }
    }

    /**  根据类，方法名称和参数类型查找方法
    // Attempt to find a {@link Method} on the supplied class with the supplied
    // name
    // and no parameters. Searches all superclasses up to <code>Object</code>.
    // <p>Returns <code>null</code> if no {@link Method} can be found.
    // @param clazz the class to introspect
    // @param name the name of the method
    // @return the Method object, or <code>null</code> if none found
     */
    public static Method findMethod(Class clazz, String name) {
        return findMethod(clazz, name, new Class[0]);
    }

    /**  根据类，方法名称和参数类型查找方法
    // Attempt to find a {@link Method} on the supplied class with the supplied
    // name
    // and parameter types. Searches all superclasses up to <code>Object</code>.
    // <p>Returns <code>null</code> if no {@link Method} can be found.
    // @param clazz the class to introspect
    // @param name the name of the method
    // @param paramTypes the parameter types of the method
    // (may be <code>null</code> to indicate any signature)
    // @return the Method object, or <code>null</code> if none found
     */
    public static Method findMethod(Class clazz, String name, Class[] paramTypes) {
        Assert.notNull(clazz, "Class must not be null");
        Assert.notNull(name, "Method name must not be null");
        Class searchType = clazz;
        while (!Object.class.equals(searchType) && searchType != null) {
            Method[] methods = searchType.getDeclaredMethods();
            if(searchType.isInterface()){
                methods = searchType .getMethods();
            }
            for (int i = 0; i < methods.length; i++) {
                Method method = methods[i];
                if (name.equals(method.getName())
                        && (paramTypes == null || Arrays.equals(paramTypes,
                                method.getParameterTypes()))) {
                    return method;
                }
            }
            searchType = searchType.getSuperclass();
        }
        return null;
    }

    /** 调用方法的应用
    // Invoke the specified {@link Method} against the supplied target object
    // with no arguments. The target object can be <code>null</code> when
    // invoking a static {@link Method}.
    // <p>Thrown exceptions are handled via a call to {@link #handleReflectionException}.
    // @param method the method to invoke
    // @param target the target object to invoke the method on
    // @return the invocation result, if any
    // @see #invokeMethod(java.lang.reflect.Method, Object, Object[])
     */
    public static Object invokeMethod(Method method, Object target) {
        return invokeMethod(method, target, null);
    }

    /**  调用方法的应用
    // Invoke the specified {@link Method} against the supplied target object
    // with the supplied arguments. The target object can be <code>null</code>
    // when invoking a static {@link Method}.
    // <p>Thrown exceptions are handled via a call to {@link #handleReflectionException}.
    // @param method the method to invoke
    // @param target the target object to invoke the method on
    // @param args the invocation arguments (may be <code>null</code>)
    // @return the invocation result, if any
     */
    public static Object invokeMethod(Method method, Object target,
            Object[] args) {
        try {
            return method.invoke(target, args);
        } catch (Exception ex) {
            handleReflectionException(ex);
        }
        throw new IllegalStateException("Should never get here");
    }

    /** Invoke the specified JDBC API {@link Method} against the supplied
    // target object with no arguments.
    // @param method the method to invoke
    // @param target the target object to invoke the method on
    // @return the invocation result, if any
    // @throws SQLException the JDBC API SQLException to rethrow (if any)
    // @see #invokeJdbcMethod(java.lang.reflect.Method, Object, Object[])
     */
    public static Object invokeJdbcMethod(Method method, Object target)
        throws SQLException {
        return invokeJdbcMethod(method, target, null);
    }

    /**Invoke the specified JDBC API {@link Method} against the supplied
    // target object with the supplied arguments.
    // @param method the method to invoke
    // @param target the target object to invoke the method on
    // @param args the invocation arguments (may be <code>null</code>)
    // @return the invocation result, if any
    // @throws SQLException the JDBC API SQLException to rethrow (if any)
    // @see #invokeMethod(java.lang.reflect.Method, Object, Object[])
     */
    public static Object invokeJdbcMethod(Method method, Object target,
            Object[] args) throws SQLException {
        try {
            return method.invoke(target, args);
        } catch (IllegalAccessException ex) {
            handleReflectionException(ex);
        } catch (InvocationTargetException ex) {
            if (ex.getTargetException() instanceof SQLException) {
                throw (SQLException) ex.getTargetException();
            }
            handleInvocationTargetException(ex);
        }
        throw new IllegalStateException("Should never get here");
    }

    /** 处理异常的方法//使用反射处理异常的将异常信息输出但不抛出方法以外
    // Handle the given reflection exception. Should only be called if
    // no checked exception is expected to be thrown by the target method.
    // <p>Throws the underlying RuntimeException or Error in case of an
    // InvocationTargetException with such a root cause. Throws an
    // IllegalStateException with an appropriate message else.
    // @param ex the reflection exception to handle
     */
    public static void handleReflectionException(Exception ex) {
        if (ex instanceof NoSuchMethodException) {
            throw new IllegalStateException("Method not found: "
                    + ex.getMessage());
        }
        if (ex instanceof IllegalAccessException) {
            throw new IllegalStateException("Could not access method: "
                    + ex.getMessage());
        }
        if (ex instanceof InvocationTargetException) {
            handleInvocationTargetException((InvocationTargetException) ex);
        }
        if (ex instanceof RuntimeException) {
            throw (RuntimeException) ex;
        }
        handleUnexpectedException(ex);
    }

    /** Handle the given invocation target exception. Should only be called if
    // no checked exception is expected to be thrown by the target method.
    // <p>Throws the underlying RuntimeException or Error in case of such
    // a root cause. Throws an IllegalStateException else.
    // @param ex the invocation target exception to handle
     */
    public static void handleInvocationTargetException(
            InvocationTargetException ex) {
        rethrowRuntimeException(ex.getTargetException());
    }

    /** Rethrow the given {@link Throwable exception}, which is presumably the
    // <em>target exception</em> of an {@link InvocationTargetException}.
    // Should only be called if no checked exception is expected to be thrown by
    // the target method.
    // <p>Rethrows the underlying exception cast to an {@link RuntimeException}
    // or {@link Error} if appropriate; otherwise, throws an
    // {@link IllegalStateException}.
    // @param ex the exception to rethrow
    // @throws RuntimeException the rethrown exception
     */
    public static void rethrowRuntimeException(Throwable ex) {
        if (ex instanceof RuntimeException) {
            throw (RuntimeException) ex;
        }
        if (ex instanceof Error) {
            throw (Error) ex;
        }
        handleUnexpectedException(ex);
    }

    /** Rethrow the given {@link Throwable exception}, which is presumably the
    // <em>target exception</em> of an {@link InvocationTargetException}.
    // Should only be called if no checked exception is expected to be thrown by
    // the target method.
    // <p>Rethrows the underlying exception cast to an {@link Exception} or
    // {@link Error} if appropriate; otherwise, throws an
    // {@link IllegalStateException}.
    // @param ex the exception to rethrow
    // @throws Exception the rethrown exception (in case of a checked exception)
     */
    public static void rethrowException(Throwable ex) throws Exception {
        if (ex instanceof Exception) {
            throw (Exception) ex;
        }
        if (ex instanceof Error) {
            throw (Error) ex;
        }
        handleUnexpectedException(ex);
    }

    /** Throws an IllegalStateException with the given exception as root cause.
    // @param ex the unexpected exception
     */
    private static void handleUnexpectedException(Throwable ex) {
        // Needs to avoid the chained constructor for JDK 1.4 compatibility.
        IllegalStateException isex = new IllegalStateException(
                "Unexpected exception thrown");
        isex.initCause(ex);
        throw isex;
    }

    /** Determine whether the given method explicitly declares the given
    // exception
    // or one of its superclasses, which means that an exception of that type
    // can be propagated as-is within a reflective invocation.
    // @param method the declaring method
    // @param exceptionType the exception to throw
    // @return <code>true</code> if the exception can be thrown as-is;
    // <code>false</code> if it needs to be wrapped
     */
    public static boolean declaresException(Method method, Class exceptionType) {
        Assert.notNull(method, "Method must not be null");
        Class[] declaredExceptions = method.getExceptionTypes();
        for (int i = 0; i < declaredExceptions.length; i++) {
            Class declaredException = declaredExceptions[i];
            if (declaredException.isAssignableFrom(exceptionType)) {
                return true;
            }
        }
        return false;
    }

    /** 判断方法，属性字段等的修饰符的方法
    // Determine whether the given field is a "public static final" constant.
    // @param field the field to check
     * @return boolean
     */
    public static boolean isPublicStaticFinal(Field field) {
        int modifiers = field.getModifiers();
        return Modifier.isPublic(modifiers) && Modifier.isStatic(modifiers) && Modifier
                .isFinal(modifiers);
    }

    /** Determine whether the given method is an "equals" method.
    // @see java.lang.Object#equals
     * @param method Method
     * @return boolean
     */
    public static boolean isEqualsMethod(Method method) {
        if (method == null || !"equals".equals(method.getName())) {
            return false;
        }
        Class[] paramTypes = method.getParameterTypes();
        return paramTypes.length == 1 && paramTypes[0] == Object.class;
    }

    /**
     *  Determine whether the given method is a "hashCode" method.
     * @param method Method
     * @return boolean
     */
    public static boolean isHashCodeMethod(Method method) {
        return method != null && "hashCode".equals(method.getName()) && method
                .getParameterTypes().length == 0;
    }

    /** Determine whether the given method is a "toString" method.
    // @see java.lang.Object#toString()
     * @param method Method
     * @return boolean
     */
    public static boolean isToStringMethod(Method method) {
        return method != null && "toString".equals(method.getName()) && method
                .getParameterTypes().length == 0;
    }

    /** 判断一个属性是否可以访问的方法
    // Make the given field accessible, explicitly setting it accessible if
    // necessary.
    // The <code>setAccessible(true)</code> method is only called when actually
    // necessary,
    // to avoid unnecessary conflicts with a JVM SecurityManager (if active).
    // @param field the field to make accessible
    // @see java.lang.reflect.Field#setAccessible
     */
    public static void makeAccessible(Field field) {
        if (!Modifier.isPublic(field.getModifiers())
                || !Modifier.isPublic(field.getDeclaringClass().getModifiers())) {
            field.setAccessible(true);
        }
    }

    /** 判断一个方法是否可以访问的方法
    // Make the given method accessible, explicitly setting it accessible if
    // necessary.
    // The <code>setAccessible(true)</code> method is only called when actually
    // necessary,
    // to avoid unnecessary conflicts with a JVM SecurityManager (if active).
    // @param method the method to make accessible
    // @see java.lang.reflect.Method#setAccessible
     */
    public static void makeAccessible(Method method) {
        if (!Modifier.isPublic(method.getModifiers())
                || !Modifier
                        .isPublic(method.getDeclaringClass().getModifiers())) {
            method.setAccessible(true);
        }
    }

    /** 判断一个构造函数是否可以访问的方法
    // Make the given constructor accessible, explicitly setting it accessible
    // if necessary.
    // The <code>setAccessible(true)</code> method is only called when actually
    // necessary,
    // to avoid unnecessary conflicts with a JVM SecurityManager (if active).
    // @param ctor the constructor to make accessible
    // @see java.lang.reflect.Constructor#setAccessible
     */
    public static void makeAccessible(Constructor ctor) {
        if (!Modifier.isPublic(ctor.getModifiers())
                || !Modifier.isPublic(ctor.getDeclaringClass().getModifiers())) {
            ctor.setAccessible(true);
        }
    }

    /** Perform the given callback operation on all matching methods of the
    // given class and superclasses.
    // <p>The same named method occurring on subclass and superclass will
    // appear twice, unless excluded by a {@link MethodFilter}.
    // @param targetClass class to start looking at
    // @param mc the callback to invoke for each method
    // @see #doWithMethods(Class, MethodCallback, MethodFilter)
     * @throws IllegalArgumentException IllegalArgumentException
     */
    public static void doWithMethods(Class targetClass, MethodCallback mc)
        throws IllegalArgumentException {
        doWithMethods(targetClass, mc, null);
    }

    /** Perform the given callback operation on all matching methods of the
    // given class and superclasses.
    // <p>The same named method occurring on subclass and superclass will
    // appear twice, unless excluded by the specified {@link MethodFilter}.
    // @param targetClass class to start looking at
    // @param mc the callback to invoke for each method
    // @param mf the filter that determines the methods to apply the callback to
     * @throws IllegalArgumentException IllegalArgumentException
     */
    public static void doWithMethods(Class targetClass, MethodCallback mc,
            MethodFilter mf) throws IllegalArgumentException {
        // Keep backing up the inheritance hierarchy.
        Class targetCls = targetClass;
        do {
            Method[] methods = targetCls.getDeclaredMethods();
            for (int i = 0; i < methods.length; i++) {
                if (mf != null && !mf.matches(methods[i])) {
                    continue;
                }
                try {
                    mc.doWith(methods[i]);
                } catch (IllegalAccessException ex) {
                    throw new IllegalStateException(
                            "Shouldn't be illegal to access method '"
                                    + methods[i].getName() + "': " + ex);
                }
            }
            targetCls = targetCls.getSuperclass();
        } while (targetCls != null);
    }

    /**
     *  获取类的所有的方法的
     * @param leafClass Class
     * @return Method[]
     * @throws IllegalArgumentException IllegalArgumentException
     */
    public static Method[] getAllDeclaredMethods(Class leafClass)
        throws IllegalArgumentException {
        final List list = new ArrayList(32);
        doWithMethods(leafClass, new MethodCallback() {
            public void doWith(Method method) {
                list.add(method);
            }
        });
        return (Method[]) list.toArray(new Method[list.size()]);
    }

    /**调用字段时执行的回调的方法
    // Invoke the given callback on all fields in the target class,
    // going up the class hierarchy to get all declared fields.
    // @param targetClass the target class to analyze
    // @param fc the callback to invoke for each field
     * @throws IllegalArgumentException IllegalArgumentException
     */
    public static void doWithFields(Class targetClass, FieldCallback fc)
        throws IllegalArgumentException {
        doWithFields(targetClass, fc, null);
    }

    /** 调用字段时执行的回调的并过滤的方法
    // Invoke the given callback on all fields in the target class,
    // going up the class hierarchy to get all declared fields.
    // @param targetClass the target class to analyze
    // @param fc the callback to invoke for each field
    // @param ff the filter that determines the fields to apply the callback to
     * @throws IllegalArgumentException IllegalArgumentException
     */
    public static void doWithFields(Class targetClass, FieldCallback fc,
            FieldFilter ff) throws IllegalArgumentException {
        // Keep backing up the inheritance hierarchy.
        Class targetCls = targetClass;
        do {
            // Copy each field declared on this class unless it's static or
            // file.
            Field[] fields = targetCls.getDeclaredFields();
            for (int i = 0; i < fields.length; i++) {
                // Skip static and final fields.
                if (ff != null && !ff.matches(fields[i])) {
                    continue;
                }
                try {
                    fc.doWith(fields[i]);
                } catch (IllegalAccessException ex) {
                    throw new IllegalStateException(
                            "Shouldn't be illegal to access field '"
                                    + fields[i].getName() + "': " + ex);
                }
            }
            targetCls = targetCls.getSuperclass();
        } while (targetCls != null && targetCls != Object.class);
    }

    /** 用于对象的拷贝的方法（类必须是同一类或子类）
    // Given the source object and the destination, which must be the same class
    // or a subclass, copy all fields, including inherited fields. Designed to
    // work on objects with public no-arg constructors.
     * @param src src
     * @param dest dest
    // @throws IllegalArgumentException if the arguments are incompatible
     */
    public static void shallowCopyFieldState(final Object src, final Object dest)
        throws IllegalArgumentException {
        if (src == null) {
            throw new IllegalArgumentException(
                    "Source for field copy cannot be null");
        }
        if (dest == null) {
            throw new IllegalArgumentException(
                    "Destination for field copy cannot be null");
        }
        if (!src.getClass().isAssignableFrom(dest.getClass())) {
            throw new IllegalArgumentException("Destination class ["
                    + dest.getClass().getName()
                    + "] must be same or subclass as source class ["
                    + src.getClass().getName() + "]");
        }

        doWithFields(src.getClass(), new FieldCallback() {
            public void doWith(Field field) throws IllegalArgumentException,
                    IllegalAccessException {
                makeAccessible(field);
                Object srcValue = field.get(src);
                field.set(dest, srcValue);
            }
        }, copyAbleFields);
    }

    // Action to take on each method.
    public static interface MethodCallback {
        /** Perform an operation using the given method.
        // @param method the method to operate on
         * @throws IllegalArgumentException IllegalArgumentException
         * @throws IllegalAccessException IllegalAccessException
         */
        void doWith(Method method) throws IllegalArgumentException,
                IllegalAccessException;
    }

    // Callback optionally used to method fields to be operated on by a method
    // callback.
    public static interface MethodFilter {
        /** Determine whether the given method matches.
        // @param method the method to check
         * @return boolean
         */
        boolean matches(Method method);
    }

    // Callback interface invoked on each field in the hierarchy.
    public static interface FieldCallback {
        /** Perform an operation using the given field.
        // @param field the field to operate on
         * @throws IllegalArgumentException IllegalArgumentException
         * @throws IllegalAccessException IllegalAccessException
         */
        void doWith(Field field) throws IllegalArgumentException,
                IllegalAccessException;
    }

    // Callback optionally used to filter fields to be operated on by a field
    // callback.
    public static interface FieldFilter {
        /** Determine whether the given field matches.
        // @param field the field to check
         * @return boolean
         */
        boolean matches(Field field);
    }

    /**
     *  Pre-built FieldFilter that matches all non-static, non-final fields.
     */
    private static FieldFilter copyAbleFields = new FieldFilter() {
        public boolean matches(Field field) {
            return !(Modifier.isStatic(field.getModifiers()) || Modifier
                    .isFinal(field.getModifiers()));
        }
    };

    /**
     *是否为JAVA基本类型或String类型
     * @param clazz Class
     * @return boolean
     * @throws Exception Exception
     */
    public static boolean isBaseDataType(Class clazz) throws Exception {
        boolean isSimpleBaseType =  clazz.equals(Integer.class)
                || clazz.equals(Byte.class) || clazz.equals(Long.class)
                || clazz.equals(Double.class) || clazz.equals(Float.class)
                || clazz.equals(Character.class) || clazz.equals(Short.class);
        boolean isHighBaseType = clazz.equals(String.class)  || clazz.equals(BigDecimal.class)
                || clazz.equals(BigInteger.class)
                || clazz.equals(Boolean.class) || clazz.equals(Date.class) || clazz
                    .isPrimitive();
        return isSimpleBaseType || isHighBaseType;
    }
}
