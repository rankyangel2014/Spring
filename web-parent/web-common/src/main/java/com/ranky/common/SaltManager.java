package com.ranky.common;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.logging.Logger;

import org.springframework.util.ResourceUtils;

/**
 * 盐管理类
 * 
 * @author xiekx
 *
 */
public class SaltManager {

	private final static Logger logger = Logger.getLogger(SaltManager.class.getName());

	private static String filePath = "c:/salt.jpg";

	/**
	 * 对称加密盐
	 */
	private static String encryptionSalt;

	static {
		try {
			FileInputStream fis = new FileInputStream(ResourceUtils.getFile(filePath));
			byte[] bytes = StreamUtils.InputStreamTOByte(fis);
			String hex = Encodes.encodeHex(bytes);
			SaltManager.setEncryptionSalt(hex.substring(100, 132));
			logger.info("Initializing SaltManager success...");
		} catch (IOException e) {
			logger.warning("Initializing SaltManager failure...," + e.getMessage());
		}
	}

	public static String getEncryptionSalt() {

		return encryptionSalt;
	}

	public static void setEncryptionSalt(String encryptionSalt) {
		SaltManager.encryptionSalt = encryptionSalt;
	}

}
