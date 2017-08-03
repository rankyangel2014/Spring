/**
 * Copyright (c) 2005-2012 springside.org.cn
 */
package com.jsjn.jnf.common.security;

import java.io.IOException;
import java.io.InputStream;
import java.security.GeneralSecurityException;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;

import org.apache.commons.lang3.Validate;

import com.jsjn.jnf.common.utils.Exceptions;

/**
 * 支持SHA-1/MD5消息摘要的工具类.
 * 
 * 返回ByteSource，可进一步被编码为Hex, Base64或UrlSafeBase64
 * 
 * @author calvin
 */
public class Digests {

	/**
	 * 等于符号标志
	 */
	public static final String EQ_SYMBOL = "=";

	/**
	 * 并且符号标志
	 */
	public static final String AND_SYMBOL = "&";

	private static final String SHA1 = "SHA-1";
	private static final String MD5 = "MD5";
	private static final char hexDigits[] = { '0', '1', '2', '3', '4', '5',
			'6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F' };

	private static SecureRandom random = new SecureRandom();

	/**
	 * 对输入字符串进行md5散列.
	 */
	public static byte[] md5(byte[] input) {
		return digest(input, MD5, null, 1);
	}

	public static byte[] md5(byte[] input, int iterations) {
		return digest(input, MD5, null, iterations);
	}

	/**
	 * 对输入字符串进行sha1散列.
	 */
	public static byte[] sha1(byte[] input) {
		return digest(input, SHA1, null, 1);
	}

	public static byte[] sha1(byte[] input, byte[] salt) {
		return digest(input, SHA1, salt, 1);
	}

	public static byte[] sha1(byte[] input, byte[] salt, int iterations) {
		return digest(input, SHA1, salt, iterations);
	}

	/**
	 * 对字符串进行散列, 支持md5与sha1算法.
	 */
	private static byte[] digest(byte[] input, String algorithm, byte[] salt,
			int iterations) {
		try {
			MessageDigest digest = MessageDigest.getInstance(algorithm);

			if (salt != null) {
				digest.update(salt);
			}

			byte[] result = digest.digest(input);

			for (int i = 1; i < iterations; i++) {
				digest.reset();
				result = digest.digest(result);
			}
			return result;
		} catch (GeneralSecurityException e) {
			throw Exceptions.unchecked(e);
		}
	}

	/**
	 * 生成随机的Byte[]作为salt.
	 * 
	 * @param numBytes
	 *            byte数组的大小
	 */
	public static byte[] generateSalt(int numBytes) {
		Validate.isTrue(numBytes > 0,
				"numBytes argument must be a positive integer (1 or larger)",
				numBytes);

		byte[] bytes = new byte[numBytes];
		random.nextBytes(bytes);
		return bytes;
	}

	/**
	 * 对文件进行md5散列.
	 */
	public static byte[] md5(InputStream input) throws IOException {
		return digest(input, MD5);
	}

	/**
	 * 对文件进行sha1散列.
	 */
	public static byte[] sha1(InputStream input) throws IOException {
		return digest(input, SHA1);
	}

	private static byte[] digest(InputStream input, String algorithm)
			throws IOException {
		try {
			MessageDigest messageDigest = MessageDigest.getInstance(algorithm);
			int bufferLength = 8 * 1024;
			byte[] buffer = new byte[bufferLength];
			int read = input.read(buffer, 0, bufferLength);

			while (read > -1) {
				messageDigest.update(buffer, 0, read);
				read = input.read(buffer, 0, bufferLength);
			}

			return messageDigest.digest();
		} catch (GeneralSecurityException e) {
			throw Exceptions.unchecked(e);
		}
	}

	public static String toHexString(byte[] bytes) {
		if (bytes == null)
			return "";
		StringBuilder hex = new StringBuilder(bytes.length * 2);
		for (byte b : bytes) {
			hex.append(hexDigits[(b >> 4) & 0x0F]);
			hex.append(hexDigits[b & 0x0F]);
		}
		return hex.toString();
	}

	/**
	 * 对字符进行MD5散列
	 * 
	 * @param str
	 * @return java.lang.String
	 */
	public static String md5(String str) {

		return toHexString(md5(str.getBytes()));
	}

	/**
	 * 参数MD5散列
	 * 
	 * @param params
	 * @return java.lang.String
	 */
	public static String md5(String... params) {
		StringBuffer sb = new StringBuffer("");
		Arrays.sort(params);
		for (String o : params) {
			if (o != null) {
				sb.append(o);
			}
		}
		String str = sb.toString();
		return toHexString(md5(str.getBytes()));

	}

	/**
	 * 对字符串进行SHA1散列
	 * 
	 * @param str
	 * @return java.lang.String
	 */
	public static String sha1(String str) {

		return toHexString(sha1(str.getBytes()));
	}

	/**
	 * 1.根据key对传来的map数据排序 2.生成a1=b1&a2=b2&a3=b3形式的字符串，排除某些字符串Key值
	 * 3.调用digest方法进行md5编码 功能描述: <br>
	 * 〈功能详细描述〉
	 * 
	 * @param map
	 *            要排序的字符串
	 * @param key
	 *            要排序的key值
	 * @return
	 * @throws UnsupportedEncodingException
	 * @see [相关类/方法](可选)
	 * @since [产品/模块版本](可选)
	 */
	public static String digest(Map<String, String> map, String... keys) {

		TreeMap<String, String> treeMap = treeMap(map, keys);
		return md5(mapToString(treeMap));
	}

	/**
	 * 
	 * 功能描述: <br>
	 * 将map按key字符串排序的treeMap
	 * 
	 * @param map
	 * @param keys
	 * @return
	 * @see [相关类/方法](可选)
	 * @since [产品/模块版本](可选)
	 */
	public static TreeMap<String, String> treeMap(Map<String, String> map,
			String... keys) {
		// 初始化字符串比较器
		Comparator<String> stringComparator = new StringComparator();

		TreeMap<String, String> treeMap = new TreeMap<String, String>(
				stringComparator);
		treeMap.putAll(map);
		// 移除非摘要的key
		for (String key : keys) {
			treeMap.remove(key);
		}
		return treeMap;
	}

	/**
	 * 
	 * 功能描述: <br>
	 * 将map转成a1=b1&a2=b2&a3=b3形式的字符串
	 * 
	 * @param map
	 * @return
	 * @see [相关类/方法](可选)
	 * @since [产品/模块版本](可选)
	 */
	public static String mapToString(Map<String, String> map) {
		StringBuilder result = new StringBuilder();
		for (Entry<String, String> entry : map.entrySet()) {
			String value = entry.getValue() == null ? "" : entry.getValue()
					.trim();
			result.append(entry.getKey()).append(EQ_SYMBOL).append(value)
					.append(AND_SYMBOL);
		}
		if (result.length() > 0) {
			result.deleteCharAt(result.length() - 1);
		}
		return result.toString().trim();
	}

}
