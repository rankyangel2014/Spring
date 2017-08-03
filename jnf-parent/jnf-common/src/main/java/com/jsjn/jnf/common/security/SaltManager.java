package com.jsjn.jnf.common.security;

import java.io.FileInputStream;
import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.ResourceUtils;

import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.common.utils.Encodes;
import com.jsjn.jnf.common.utils.StreamUtils;

/**
 * 盐管理类
 * 
 * @author lilong
 *
 */
public class SaltManager {

	private final static Logger logger = LoggerFactory.getLogger(SaltManager.class);

	private String filePath;

	private boolean debugMode = false;

	/**
	 * 对称加密盐
	 */
	private static String encryptionSalt;

	/**
	 * 摘要加密盐
	 */
	private static String digestSalt;

	public void init() {
		try {
			if (debugMode) {
				SaltManager.setDigestSalt(Global.getConfig("salt.digest"));
				SaltManager.setEncryptionSalt(Global.getConfig("salt.encryption"));
			} else {
				FileInputStream fis = new FileInputStream(ResourceUtils.getFile(filePath));
				byte[] bytes = StreamUtils.InputStreamTOByte(fis);
				String codes = Encodes.encodeBase64(bytes);
				String hex = Encodes.encodeHex(bytes);
				SaltManager.setDigestSalt(codes.substring(12, 44));
				SaltManager.setEncryptionSalt(hex.substring(100, 132));
			}
			logger.info("Initializing SaltManager success...");
		} catch (IOException e) {
			logger.error("Initializing SaltManager failure...," + e.getMessage());
		}
	}

	public static String getEncryptionSalt() {

		return encryptionSalt;
	}

	public static String getDigestSalt() {

		return digestSalt;
	}

	public static void setEncryptionSalt(String encryptionSalt) {
		SaltManager.encryptionSalt = encryptionSalt;
	}

	public static void setDigestSalt(String digestSalt) {
		SaltManager.digestSalt = digestSalt;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public boolean isDebugMode() {
		return debugMode;
	}

	public void setDebugMode(boolean debugMode) {
		this.debugMode = debugMode;
	}

	

}
