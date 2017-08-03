package com.jsjn.jnf.common.security;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.Signature;
import java.security.SignatureException;
import java.security.UnrecoverableKeyException;
import java.security.cert.Certificate;
import java.security.cert.CertificateException;
import java.util.Enumeration;

import org.apache.log4j.Logger;
import org.springframework.util.ResourceUtils;

import com.jsjn.jnf.common.exception.SignatureServiceHandlerException;
import com.jsjn.jnf.common.utils.Encodes;

/**
 * 金农付内部通用加签验签类
 * 
 * @author lilong
 *
 */
public class SignatureServiceHandler {

	private final static Logger logger = Logger.getLogger(SignatureServiceHandler.class);

	public static final String SIGNATURE_ALGORITHM = RSAUtils.SIGNATURE_ALGORITHM;

	private String filePath;

	private String keystorePasswd;

	public String getKeystorePasswd() {
		return keystorePasswd;
	}

	public void setKeystorePasswd(String keystorePasswd) {
		this.keystorePasswd = keystorePasswd;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	private PublicKey publicKey;

	private PrivateKey privateKey;

	public PublicKey getPublicKey() {
		return publicKey;
	}

	public void setPublicKey(PublicKey publicKey) {
		this.publicKey = publicKey;
	}

	public PrivateKey getPrivateKey() {
		return privateKey;
	}

	public void setPrivateKey(PrivateKey privateKey) {
		this.privateKey = privateKey;
	}

	/**
	 * 初始化
	 * 
	 * @throws SignatureServiceHandlerException
	 */
	public void init() throws SignatureServiceHandlerException {
		try {
			KeyStore ks = KeyStore.getInstance("PKCS12");
			FileInputStream fis = new FileInputStream(ResourceUtils.getFile(this.getFilePath()));
			char[] password = this.getKeystorePasswd().toCharArray();
			ks.load(fis, password);
			fis.close();
			Enumeration<?> enumas = ks.aliases();
			String keyAlias = null;
			if (enumas.hasMoreElements()) {
				keyAlias = (String) enumas.nextElement();
			}
			PrivateKey prikey = (PrivateKey) ks.getKey(keyAlias, password);
			this.setPrivateKey(prikey);
			Certificate cert = ks.getCertificate(keyAlias);
			PublicKey pubkey = cert.getPublicKey();
			this.setPublicKey(pubkey);
		} catch (KeyStoreException e) {
			throw new SignatureServiceHandlerException(e);
		} catch (FileNotFoundException e) {
			throw new SignatureServiceHandlerException(e);
		} catch (NoSuchAlgorithmException e) {
			throw new SignatureServiceHandlerException(e);
		} catch (CertificateException e) {
			throw new SignatureServiceHandlerException(e);
		} catch (IOException e) {
			throw new SignatureServiceHandlerException(e);
		} catch (UnrecoverableKeyException e) {
			throw new SignatureServiceHandlerException(e);
		}
		logger.info("Initializing Common Signature ...");
	}

	/**
	 * 签名
	 * 
	 * @param data
	 * @return java.lang.String
	 */
	public String sign(String data) {
		Signature signature;
		try {
			signature = Signature.getInstance(SIGNATURE_ALGORITHM);
			signature.initSign(privateKey);
			signature.update(data.getBytes());
			return Encodes.encodeBase64(signature.sign());
		} catch (NoSuchAlgorithmException e) {
			logger.error(e);
		} catch (InvalidKeyException e) {
			logger.error(e);
		} catch (SignatureException e) {
			logger.error(e);
		}
		return "";
	}

	/**
	 * 验签
	 * 
	 * @param sign
	 * @param data
	 * @return java.lang.boolean
	 * @throws SignatureServiceHandlerException
	 */
	public boolean verify(String sign, String data) throws SignatureServiceHandlerException {
		Signature signature;
		try {
			signature = Signature.getInstance(SIGNATURE_ALGORITHM);
			signature.initVerify(this.publicKey);
			signature.update(data.getBytes());
			// 验证签名是否正常
			return signature.verify(Encodes.decodeBase64(sign));
		} catch (NoSuchAlgorithmException e) {
			throw new SignatureServiceHandlerException(e);
		} catch (InvalidKeyException e) {
			throw new SignatureServiceHandlerException(e);
		} catch (SignatureException e) {
			throw new SignatureServiceHandlerException(e);
		}
	}

	public static String aes(String data) {
		return data;
	}
}
