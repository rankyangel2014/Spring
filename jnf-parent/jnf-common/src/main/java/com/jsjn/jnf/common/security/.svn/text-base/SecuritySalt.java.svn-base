package com.jsjn.jnf.common.security;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.jsjn.jnf.common.utils.Encodes;
import com.jsjn.jnf.common.utils.FileUtils;
import com.jsjn.jnf.common.utils.StreamUtils;

public class SecuritySalt {

	private static Logger log = LoggerFactory.getLogger(FileUtils.class);

	public static String generateSalt(String filePath, int index, int size) {
		String encodeStr = "";
		try {
			InputStream in = StreamUtils.getFileInputStream(filePath
					.replaceAll("\\\\", "/"));
			byte[] bytes = StreamUtils.InputStreamTOByte(in);
			encodeStr = Encodes.encodeBase64(bytes);
		} catch (FileNotFoundException e) {
			log.error(e.getMessage());
		} catch (IOException e) {
			log.error(e.getMessage());
		}

		return encodeStr.substring(index, index + size);
	}

}
