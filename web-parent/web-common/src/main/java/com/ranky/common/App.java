package com.ranky.common;

import java.security.MessageDigest;

/**
 * Hello world!
 *
 */
public class App {
	public static void main(String[] args) throws Exception {
		//		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		//		long lt = new Long("1494992448237");
		//		Date date = new Date(lt);
		//		System.out.println(simpleDateFormat.format(date));
		//		long lt1 = new Long("1494992343888");
		//		Date date1 = new Date(lt1);
		//		System.out.println(simpleDateFormat.format(date1));
		md5("456");
	}

	public static void md5(String str) throws Exception {
		MessageDigest md5 = MessageDigest.getInstance("MD5");
		//加密后的字符串
		System.out.println(new String(md5.digest(str.getBytes("utf-8")), "utf-8"));
	}
}
