package com.jsjn.jnf.common.utils;

import java.math.BigDecimal;
import java.text.DecimalFormat;

/**
 * 
 * 由于 Java 的简单类型不能够精确的对浮点数进行运算，这个工具类提供精
 * 
 * 确的浮点数运算，包括加减乘除和四舍五入。
 * 
 */

public class ArithUtils {

	// 默认除法运算精度 v

	private static final int DEF_DIV_SCALE = 10;

	// 这个类不能实例化

	private ArithUtils() {

	}

	/**
	 * 
	 * 提供精确的加法运算。
	 * 
	 * @param v1
	 *            被加数
	 * 
	 * @param v2
	 *            加数
	 * 
	 * @return 两个参数的和
	 * 
	 */

	public static double add(double v1, double v2) {
		BigDecimal b1 = new BigDecimal(Double.toString(v1));
		BigDecimal b2 = new BigDecimal(Double.toString(v2));
		return b1.add(b2).doubleValue();

	}

	/**
	 * 提供精确的减法运算。
	 * 
	 * @param v1
	 *            被减数
	 * @param v2
	 *            减数
	 * @return 两个参数的差
	 */
	public static double sub(double v1, double v2) {
		BigDecimal b1 = new BigDecimal(Double.toString(v1));
		BigDecimal b2 = new BigDecimal(Double.toString(v2));
		return b1.subtract(b2).doubleValue();
	}

	/**
	 * 提供精确的乘法运算。
	 * 
	 * @param v1
	 *            被乘数
	 * @param v2
	 *            乘数
	 * @return 两个参数的积
	 */
	public static double mul(double v1, double v2) {
		BigDecimal b1 = new BigDecimal(Double.toString(v1));
		BigDecimal b2 = new BigDecimal(Double.toString(v2));
		return b1.multiply(b2).doubleValue();
	}

	/**
	 * 提供（相对）精确的除法运算，当发生除不尽的情况时，精确到 小数点以后 10 位，以后的数字四舍五入。
	 * 
	 * @param v1
	 *            被除数
	 * @param v2
	 *            除数
	 * @return 两个参数的商
	 */
	public static double div(double v1, double v2) {
		return div(v1, v2, DEF_DIV_SCALE);
	}

	/**
	 * 提供（相对）精确的除法运算。当发生除不尽的情况时，由 scale 参数指 定精度，以后的数字四舍五入。
	 * 
	 * @param v1
	 *            被除数
	 * @param v2
	 *            除数
	 * @param scale
	 *            表示表示需要精确到小数点以后几位。
	 * @return 两个参数的商
	 */
	public static double div(double v1, double v2, int scale) {
		if (scale < 0) {
			throw new IllegalArgumentException(
					"The scale must be a positive integer or zero");
		}
		BigDecimal b1 = new BigDecimal(Double.toString(v1));
		BigDecimal b2 = new BigDecimal(Double.toString(v2));
		return b1.divide(b2, scale, BigDecimal.ROUND_HALF_UP).doubleValue();
	}

	/**
	 * 提供精确的小数位四舍五入处理。
	 * 
	 * @param v
	 *            需要四舍五入的数字
	 * @param scale
	 *            小数点后保留几位
	 * @return 四舍五入后的结果
	 */
	public static double round(double v, int scale) {
		if (scale < 0) {
			throw new IllegalArgumentException(
					"The scale must be a positive integer or zero");
		}
		BigDecimal b = new BigDecimal(Double.toString(v));
		BigDecimal one = new BigDecimal("1");
		return b.divide(one, scale, BigDecimal.ROUND_HALF_UP).doubleValue();
	}

	/**
	 * 将小数按一定格式转化为字符串
	 * @param v
	 *            数字
	 * @param format
	 *            格式
	 * @return
	 */
	public static String format(double v, String format) {
		DecimalFormat df = new DecimalFormat(format);
		return df.format(v);
	}

	/**
	 * 根据精度截取将小数按一定格式转化为字符串
	 * @param v
	 *            数字
	 * @param scale
	 *            小数点后保留几位
	 * @return
	 */
	public static String format(double v, int scale) {
		if (scale < 0) {
			throw new IllegalArgumentException(
					"The scale must be a positive integer or zero");
		}
		String format = scale == 0 ? "###0" : "###0.";
		for (int i = 0; i < scale; i++) {
			format += "0";
		}
		DecimalFormat df = new DecimalFormat(format);
		return df.format(v);
	}
	
	/**
	 * 比较两个double类型的大小
	 * @param d1 
	 * @param d2
	 * @return  -1表示小于，0是等于，1是大于
	 */
	public static  int compareTo(double d1,double d2){
		BigDecimal b1 = new BigDecimal(d1);
		BigDecimal b2 = new BigDecimal(d2);
		return b1.compareTo(b2);
	}
	
	/**
	 * 返回数值的精度
	 * @param v
	 * @return
	 */
	public static int precision(String v){
		BigDecimal b = new BigDecimal(v);
		return b.precision();
	}
	
	/**
	 * 返回数值的标度。
	 * @param v
	 * @return
	 */
	public static int scale(String v){
		BigDecimal b = new BigDecimal(v);
		return b.scale();
	}
	
	
};