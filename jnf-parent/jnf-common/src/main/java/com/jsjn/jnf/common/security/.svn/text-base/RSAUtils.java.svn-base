package com.jsjn.jnf.common.security;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.Signature;
import java.security.SignatureException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;

import com.jsjn.jnf.common.utils.Encodes;

/**
 * RSA安全编码组件
 * 
 */
public class RSAUtils {

	// 加密算法
	public static final String KEY_ALGORITHM = "RSA";

	// 签名算法
	public static final String SIGNATURE_ALGORITHM = "SHA1WithRSA";

	// public static final String SIGNATURE_ALGORITHM = "SHA1WithRSA";

	/**
	 * 用私钥对信息生成数字签名
	 * 
	 * @param data
	 *            加密数据
	 * @param privateKey
	 *            私钥
	 * 
	 * @return
	 * @throws Exception
	 */
	public static String sign(String data, String privateKey) {
		String returnSign = "";
		try {
			// 解密由base64编码的私钥
			byte[] keyBytes = Encodes.decodeBase64(privateKey);

			// 构造PKCS8EncodedKeySpec对象
			PKCS8EncodedKeySpec pkcs8KeySpec = new PKCS8EncodedKeySpec(keyBytes);

			// KEY_ALGORITHM 指定的加密算法
			KeyFactory keyFactory = KeyFactory.getInstance(KEY_ALGORITHM);

			// 取私钥匙对象
			PrivateKey priKey = keyFactory.generatePrivate(pkcs8KeySpec);

			return sign(data, priKey);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (InvalidKeySpecException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return returnSign;

	}

	/**
	 * 用私钥对信息生成数字签名
	 * 
	 * @param data
	 *            加密数据
	 * @param privateKey
	 *            私钥
	 * 
	 * @return
	 * @throws Exception
	 */
	public static String sign(String data, PrivateKey privateKey) {
		String returnSign = "";
		// 用私钥对信息生成数字签名
		try {
			Signature signature = Signature.getInstance(SIGNATURE_ALGORITHM);
			signature.initSign(privateKey);
			signature.update(data.getBytes());
			returnSign = Encodes.encodeBase64(signature.sign());
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (InvalidKeyException e) {
			e.printStackTrace();
		} catch (SignatureException e) {
			e.printStackTrace();
		}
		return returnSign;

	}

	/**
	 * 校验数字签名
	 * 
	 * @param data
	 *            加密数据
	 * @param publicKey
	 *            公钥
	 * @param sign
	 *            数字签名
	 * 
	 * @return 校验成功返回true 失败返回false
	 * @throws Exception
	 * 
	 */
	public static boolean verify(String data, String publicKey, String sign) {
		boolean verifyFlg = false;
		try {
			// 解密由base64编码的公钥
			byte[] keyBytes = Encodes.decodeBase64(publicKey);

			// 构造X509EncodedKeySpec对象
			X509EncodedKeySpec keySpec = new X509EncodedKeySpec(keyBytes);

			// KEY_ALGORITHM 指定的加密算法
			KeyFactory keyFactory = KeyFactory.getInstance(KEY_ALGORITHM);

			// 取公钥匙对象
			PublicKey pubKey = keyFactory.generatePublic(keySpec);

			return verify(data, pubKey, sign);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (InvalidKeySpecException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return verifyFlg;

	}

	/**
	 * 校验数字签名
	 * 
	 * @param data
	 *            加密数据
	 * @param publicKey
	 *            公钥
	 * @param sign
	 *            数字签名
	 * 
	 * @return 校验成功返回true 失败返回false
	 * @throws Exception
	 * 
	 */
	public static boolean verify(String data, PublicKey publicKey, String sign) {
		boolean verifyFlg = false;
		try {
			Signature signature = Signature.getInstance(SIGNATURE_ALGORITHM);
			signature.initVerify(publicKey);
			signature.update(data.getBytes());
			// 验证签名是否正常
			verifyFlg = signature.verify(Encodes.decodeBase64(sign));
		} catch (InvalidKeyException e) {
			e.printStackTrace();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (SignatureException e) {
			e.printStackTrace();
		}

		return verifyFlg;
	}

	/**
	 * 加密 功能描述: <br>
	 * 〈功能详细描述〉
	 * 
	 * @param jsonStr
	 * @return
	 * @see [相关类/方法](可选)
	 */
	public static String encrypt(String str, PublicKey publicKey) throws Exception {

		byte[] encryptedData = RSAUtils.encrypt(str.getBytes("UTF-8"), publicKey, 2048, 11, "RSA");// 加密
		return bcdhexToAschex(encryptedData);

	}

	/**
	 * 加密
	 * 
	 * @param plainBytes
	 *            明文字节数组
	 * @param publicKey
	 *            公钥
	 * @param keyLength
	 *            密钥bit长度
	 * @param reserveSize
	 *            padding填充字节数，预留11字节
	 * @param cipherAlgorithm
	 *            加解密算法，一般为RSA/ECB/PKCS1Padding
	 * @return 加密后字节数组，不经base64编码
	 * @throws Exception
	 */
	private static byte[] encrypt(byte[] plainBytes, PublicKey publicKey, int keyLength, int reserveSize,
			String cipherAlgorithm) throws Exception {
		int keyByteSize = keyLength / 8; // 密钥字节数
		int encryptBlockSize = keyByteSize - reserveSize; // 加密块大小=密钥字节数-padding填充字节数
		int nBlock = plainBytes.length / encryptBlockSize;// 计算分段加密的block数，向上取整
		if ((plainBytes.length % encryptBlockSize) != 0) { // 余数非0，block数再加1
			nBlock += 1;
		}

		try {
			Cipher cipher = Cipher.getInstance(cipherAlgorithm);
			cipher.init(Cipher.ENCRYPT_MODE, publicKey);

			// 输出buffer，大小为nBlock个keyByteSize
			ByteArrayOutputStream outbuf = new ByteArrayOutputStream(nBlock * keyByteSize);
			// 分段加密
			for (int offset = 0; offset < plainBytes.length; offset += encryptBlockSize) {
				int inputLen = plainBytes.length - offset;
				if (inputLen > encryptBlockSize) {
					inputLen = encryptBlockSize;
				}
				// 得到分段加密结果
				byte[] encryptedBlock = cipher.doFinal(plainBytes, offset, inputLen);
				// 追加结果到输出buffer中
				outbuf.write(encryptedBlock);
			}

			outbuf.flush();
			outbuf.close();
			return outbuf.toByteArray();
		} catch (NoSuchAlgorithmException e) {
			throw new Exception(String.format("没有[%s]此类加密算法", cipherAlgorithm));
		} catch (NoSuchPaddingException e) {
			throw new Exception(String.format("没有[%s]此类填充模式", cipherAlgorithm));
		} catch (InvalidKeyException e) {
			throw new Exception("无效密钥");
		} catch (IllegalBlockSizeException e) {
			throw new Exception("加密块大小不合法");
		} catch (BadPaddingException e) {
			throw new Exception("错误填充模式");
		} catch (IOException e) {
			throw new Exception("字节输出流异常");
		}
	}

	/**
	 * 转为16进制 功能描述: <br>
	 * 〈功能详细描述〉
	 * 
	 * @param bcdhex
	 * @return
	 * @see [相关类/方法](可选)
	 * @since [产品/模块版本](可选)
	 */
	private static String bcdhexToAschex(byte[] bcdhex) {
		byte[] aschex = { 0, 0 };
		String res = "";
		String tmp = "";
		for (int i = 0; i < bcdhex.length; i++) {
			aschex[1] = hexLowToAsc(bcdhex[i]);
			aschex[0] = hexHighToAsc(bcdhex[i]);
			tmp = new String(aschex);
			res += tmp;
		}
		return res;
	}

	private static byte hexLowToAsc(byte xxc) {
		xxc &= 0x0f;
		if (xxc < 0x0a)
			xxc += '0';
		else
			xxc += 0x37;
		return (byte) xxc;
	}

	private static byte hexHighToAsc(int xxc) {
		xxc &= 0xf0;
		xxc = xxc >> 4;
		if (xxc < 0x0a)
			xxc += '0';
		else
			xxc += 0x37;
		return (byte) xxc;
	}

	//	public static void main(String[] args) {
	//		// 金农私钥
	//		String JNPrivateKey = "MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAL3RHqOftFSac8SB"
	//				+ "GTfLiYCGMT7KVGiXXuZxxeKyJ27DZtDjAjs7xG2R+2zGHpCtP7N59HGpJ0ot+NwN"
	//				+ "n3aUH1i8Anp3BiWMu5jgQQFMn+RHMAG30JMcwzf6fu6KFwDM7nbAB8Sw8USAP1o5"
	//				+ "xbuNe4TioV5U3UKfvYbaQlltu2JdAgMBAAECgYEAsbLY9SMopd9mK3sUSaiRFDIM"
	//				+ "XhT6SmQTIrc2IxDXW5kwYrNyPlOog08bymv650RZk0LDdbh+oLJC/HcAZvkqEcI1"
	//				+ "GeH4hv+YDydRLMf1YiKPDqF9q/juBOO14d4gzx6kgAdajn9PJldB3H/UC9OUUcRe"
	//				+ "/IpnRdepPMMHyfnGPl0CQQDhFE842hVKE6ogKM5S7brNHhEAyJTkmdNV434xe4B/"
	//				+ "de73V6B4a5+i69jf4F2LrqX5MmPKmPedz0I+DjXd3TezAkEA1+SvLNquhpB868Np"
	//				+ "d/lcyYgj5Ltv1xuNr4HESjnVKq+GvLsuyDodDty2jHHGm1EqO3elPiFtChIzUWIH"
	//				+ "Y/z1rwJBAJz+HYP6GX9h1/g2fjM5vmHz5sg1ICWTZeUymILLMgW1rMi5RiS4bNCm"
	//				+ "0M7XIGidmQcILrLRn2Vje0DtiIUIGCECQFjUIfNtosOBLbT/uSSA+Fl/Z21UZcb2"
	//				+ "8kwVM4Nq2jdu8xwyVCRULOKRk5ajtZjwQ1UmfFnc/PVY2b6RfAL68McCQDrwNHD9"
	//				+ "qCnJGoYX0fgYbVqMJQEQsUo/n79rDr5Wsk2XDwxvf12BuSeQvIoVVzLJbBbxbAx0"
	//				+ "cC2kmpsW16iGk18=";
	//		// 金农公钥
	//		String JNPublicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC90R6jn7RUmnPEgRk3y4mAhjE+"
	//				+ "ylRol17mccXisiduw2bQ4wI7O8Rtkftsxh6QrT+zefRxqSdKLfjcDZ92lB9YvAJ6"
	//				+ "dwYljLuY4EEBTJ/kRzABt9CTHMM3+n7uihcAzO52wAfEsPFEgD9aOcW7jXuE4qFe"
	//				+ "VN1Cn72G2kJZbbtiXQIDAQAB";
	//
	//		// PU公钥
	//		String PUPublicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC5tOCnaxzZPN23w"
	//				+ "W8aubrBeklBLKjZgl3GCT8UozukY1g2efkUuN/GXx1zvAFadfZJ61"
	//				+ "EYyw1uvPG2Q2BBrmz699Dho50aaOyvgWhzvu1YfV/ugJsjCx1IZRr"
	//				+ "PfBd1GbQ8kT4M9O63hi5SVfK+DuR/tveCV+vLi8Eq9wXE8K4eowIDAQAB";
	//		// PU私钥
	//		String PUPrivateKey = "MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBALm04KdrHNk83bfB"
	//				+ "bxq5usF6SUEsqNmCXcYJPxSjO6RjWDZ5+RS438ZfHXO8AVp19knrURjLDW688bZD"
	//				+ "YEGubPr30OGjnRpo7K+BaHO+7Vh9X+6AmyMLHUhlGs98F3UZtDyRPgz07reGLlJV"
	//				+ "8r4O5H+294JX68uLwSr3BcTwrh6jAgMBAAECgYBbTI3WQVbhhocKvFK/NOiYDmLN"
	//				+ "ZANvTCSGJC2bG9VKsHzB652Fjo6VnFWCfL+9lZkMJmCsa8ei1cmP7ff40qRIt7TS"
	//				+ "Las1+hUo4ZhcpTi+JzBw/h65isleNm3IwaduW2gC+HYDGbbKlBR3dACbysLelt/a"
	//				+ "1lYWYEFp7xjgaWoDQQJBAOXReaJPPpmDSthJHYSSTXCBsPANZESlNH+VFs62/ajX"
	//				+ "aC6XzJ9nMhArc54pISMQMkbFgN4RLGJtRQhbHkCBPDsCQQDO3OiKnvfEhHqx8qJd"
	//				+ "JTXUJjlhhPHFx00StzYv1qFObKdhBVAx+42jRpF8Ml3O4xH2EkYztHJMkzinzaV+"
	//				+ "e0i5AkEAv2fqzUMA2SxfTqn+mqabNqPdcOFGbGHHyqaqWzpPI6tcSsoFE5IIQS1f"
	//				+ "Ww/YWHKp3QWrochd1hA52Y7CMGkydwJBAJvr2sORqwPPL4QtdMBsqbQs05dz06DV"
	//				+ "5nwy6H8Kci9gqpDwpk/mYg4txL8uX5LviLxHbe7PFlAtr8ibsyAw4NECQB9Y/7Tb"
	//				+ "3v+XLP+7uGnUOwadyW+msUAyXWhMswhSG9bVXHlmPUjUW8vMz03sWItleDVjr/BS"
	//				+ "2Rg+Y+1cTRzlsR0=";
	//		String signContent = "<resData><serialNo>62</serialNo><loanNo>145619590531</loanNo><cardSignNo></cardSignNo><custNo>412332485</custNo><custName>孙小柯</custName><bankName>中信银行</bankName><bankCardNo>4659565649496565953</bankCardNo><amount>202.70</amount></resData>0响应成功";
	//
	//		String sign = sign(signContent, PUPrivateKey);
	//		System.out.println(sign);
	//		System.out.println(verify(signContent, PUPublicKey, sign));
	//
	//	}

}
