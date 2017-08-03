import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.SignatureException;
import java.security.UnrecoverableKeyException;
import java.security.cert.CertificateException;
import java.text.MessageFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import com.jsjn.jnf.common.exception.SignatureServiceHandlerException;
import com.jsjn.jnf.common.security.RSAUtils;
import com.jsjn.jnf.common.utils.Collections3;
import com.jsjn.jnf.common.utils.DateUtils;
import com.jsjn.jnf.common.utils.HttpUtils;
import com.jsjn.jnf.common.utils.Logger;
import com.jsjn.jnf.common.utils.StringUtils;

public class HttpUtilsTest {

	private final static Logger logger = Logger.getLogger(HttpUtilsTest.class);

	public final static String JN_PUBLICKEY = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC90R6jn7RUmnPEgRk3y4mAhjE+"
			+ "ylRol17mccXisiduw2bQ4wI7O8Rtkftsxh6QrT+zefRxqSdKLfjcDZ92lB9YvAJ6"
			+ "dwYljLuY4EEBTJ/kRzABt9CTHMM3+n7uihcAzO52wAfEsPFEgD9aOcW7jXuE4qFeVN1Cn72G2kJZbbtiXQIDAQAB";

	public final static String TG_PRIVATEKEY = "MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBALm04KdrHNk83bfB"
			+ "bxq5usF6SUEsqNmCXcYJPxSjO6RjWDZ5+RS438ZfHXO8AVp19knrURjLDW688bZD"
			+ "YEGubPr30OGjnRpo7K+BaHO+7Vh9X+6AmyMLHUhlGs98F3UZtDyRPgz07reGLlJV"
			+ "8r4O5H+294JX68uLwSr3BcTwrh6jAgMBAAECgYBbTI3WQVbhhocKvFK/NOiYDmLN"
			+ "ZANvTCSGJC2bG9VKsHzB652Fjo6VnFWCfL+9lZkMJmCsa8ei1cmP7ff40qRIt7TS"
			+ "Las1+hUo4ZhcpTi+JzBw/h65isleNm3IwaduW2gC+HYDGbbKlBR3dACbysLelt/a"
			+ "1lYWYEFp7xjgaWoDQQJBAOXReaJPPpmDSthJHYSSTXCBsPANZESlNH+VFs62/ajX"
			+ "aC6XzJ9nMhArc54pISMQMkbFgN4RLGJtRQhbHkCBPDsCQQDO3OiKnvfEhHqx8qJd"
			+ "JTXUJjlhhPHFx00StzYv1qFObKdhBVAx+42jRpF8Ml3O4xH2EkYztHJMkzinzaV+"
			+ "e0i5AkEAv2fqzUMA2SxfTqn+mqabNqPdcOFGbGHHyqaqWzpPI6tcSsoFE5IIQS1f"
			+ "Ww/YWHKp3QWrochd1hA52Y7CMGkydwJBAJvr2sORqwPPL4QtdMBsqbQs05dz06DV"
			+ "5nwy6H8Kci9gqpDwpk/mYg4txL8uX5LviLxHbe7PFlAtr8ibsyAw4NECQB9Y/7Tb"
			+ "3v+XLP+7uGnUOwadyW+msUAyXWhMswhSG9bVXHlmPUjUW8vMz03sWItleDVjr/BS" + "2Rg+Y+1cTRzlsR0=";

	public final static String TG_APPKEY = "3ae1214cb072428094a471ca7f7e2509";

	public final static String WD_PUBLICKEY = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCwFZ1JKwcZlNuSqlOUFvoMk51k"
			+ "qjYTsTOHwSYQs7c4eCBPSes/4wKLkhGJ5QXtc2JTFSSLAx2NU2UoRIozWutBSlnh"
			+ "/gdnwvSXCrolWLtuGroWkJHL+jt/f79I/734NlC3w0bF1zh4JXm2noWKjdZQuBYt" + "aobZAK8kwgBm9ggbPwIDAQAB";

	public final static String WD_PRIVATEKEY = "MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBALAVnUkrBxmU25Kq"
			+ "U5QW+gyTnWSqNhOxM4fBJhCztzh4IE9J6z/jAouSEYnlBe1zYlMVJIsDHY1TZShE"
			+ "ijNa60FKWeH+B2fC9JcKuiVYu24auhaQkcv6O39/v0j/vfg2ULfDRsXXOHglebae"
			+ "hYqN1lC4Fi1qhtkAryTCAGb2CBs/AgMBAAECgYBeXkccNn4onJmModIHFMVPxjDd"
			+ "CUfQB/DY+Y/f9aDlF6QhOjlk1NHBYTgbEe26U1NHuZYLFlFZM2+MRCdY3IolYREO"
			+ "ImSWmzt2774SaD6n+R6LttmgsvgmJmQr0qH+fTjh5MrFnyZhAgdBmKRzGt7N5qKj"
			+ "GSsSXXR8rBNnDfdskQJBANZU7G4048YR6VKFY1CsYsZqKTjME8jVF/CMWjnxl/60"
			+ "sJ4WS72VlwKhaGpokXmBLID+ttSoGNqXTH0Yd2jxh4kCQQDSUSkrbENHwu9pLMpS"
			+ "3Kf1DYOS9g3Q4JOMwx94Pa1nFc5iKzgDqw5hl1gjhhlsmVuZPohOPF6jGitA/c7f"
			+ "khKHAkApwngibNmoQNsmAek80amZIRwQ/eoo6iP08VOvEHxd2xTCaHOvZ5L5pzsx"
			+ "6FfXxaxHIdm7i1j0ViBIC1lQsCaJAkBPg0GmWgrhsZAj2jwvsZ6KJe7Ne9rjUlRW"
			+ "TlqycdcB9xuMv7wwntYUDUzUOVmZVi1sNVkBAw/gZ/9cVdiFa8s3AkAgjTeJsy+x"
			+ "t1UoqXBHkAnF8gDabTw+tEpyYhStgC/LwGjxaQ0Kbft0TIwZjlnfFD7NtFUG2QXP" + "367+5PhAzPOd";

	public final static String WD_APPKEY = "526f968454c14984d53b77fd3d26d119";

	public static void test(String service, String reqData) throws IOException, KeyStoreException,
			NoSuchAlgorithmException, CertificateException, SignatureServiceHandlerException,
			UnrecoverableKeyException, InvalidKeyException, SignatureException {

		String timestamp = DateUtils.formatDate(new Date(), "yyyy-MM-dd HH:mm:ss:SSS");
		String appkey = WD_APPKEY;
		String charset = "UTF-8";
		String signType = "RSA";

		Map<String, String> map = new HashMap<String, String>();
		map.put("service", service);
		map.put("appkey", appkey);
		map.put("charset", charset);
		map.put("signType", signType);
		map.put("reqData", reqData);
		map.put("timestamp", String.valueOf(timestamp));
		String signContent = Collections3.getValuesOrderByKey(map);
		String sign = RSAUtils.sign(signContent, WD_PRIVATEKEY);
		String reqXMLDataTpl = "<message><service>{0}</service><appkey>{1}</appkey><charset>{2}</charset><signType>{3}</signType>"
				+ "<sign>{4}</sign><timeStamp>{5}</timeStamp>{6}</message>";
		String reqXMLData = MessageFormat.format(reqXMLDataTpl,
				service,
				appkey,
				charset,
				signType,
				sign,
				timestamp,
				reqData);

		logger.info("********************* request start **********************");
		logger.info(reqXMLData);
		logger.info("********************* request end **********************");

		map.put("sign", sign);

		//		String url = "https://www.xwjrxy.com/jnf-protal/jnf/getway";
		String url = "http://127.0.0.1:8080/jnf-protal/jnf/getway";
		String data = HttpUtils.sendPost(url, reqXMLData);

		logger.info("********************* response start **********************");
		logger.info(data);
		logger.info("********************* response end **********************");

		String resCode = "";
		String resMsg = "";
		String signx = "";
		String resData = "";

		try {
			SAXReader reader = new SAXReader();
			Document doc = reader.read(new ByteArrayInputStream(data.getBytes("UTF-8")));
			Element root = doc.getRootElement();

			resCode = root.element("resCode").getText();
			resMsg = root.element("resMsg").getText();
			signx = root.element("sign").getText();
			if (data.indexOf("resDatas") > -1) {
				resData = StringUtils.getXmlTagValue(data, "resDatas");
			} else {
				resData = StringUtils.getXmlTagValue(data, "resData");
			}

		} catch (Exception e) {
			logger.error("解析报文" + reqXMLData + "失败！", e);
		}

		String signcoent = resCode + resData + resMsg;
		System.out.println(signcoent);
		System.out.println(JN_PUBLICKEY);
		System.out.println(signx);

		System.out.println(RSAUtils.verify(signcoent, JN_PUBLICKEY, signx));

	}

	public static void main(String[] args) {
		String signcoent = "000000<resData><bankCardNo>1231235</bankCardNo></resData>查询银行卡号成功";

		String signx = "lO2D1Uy0dPeOsLrGqtrRgW5LlxoNpuWIXTNuiJo5sMyyMYcm957oDXzhr8rHNgEbNZ5oMMaR408hk45yf177CscNuP2mil6qlMCeYCUJQXCcTMRet9rdDv5yZDI+IrRoKUXBJYh9dkTO+1ClHKVZV4x3rhgokh+j665qYz5dfWM=";

		String pubSyr = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC90R6jn7RUmnPEgRk3y4mAhjE+ylRol17mccXisiduw2bQ4wI7O8Rtkftsxh6QrT+zefRxqSdKLfjcDZ92lB9YvAJ6dwYljLuY4EEBTJ/kRzABt9CTHMM3+n7uihcAzO52wAfEsPFEgD9aOcW7jXuE4qFeVN1Cn72G2kJZbbtiXQIDAQAB";

		System.out.println(RSAUtils.verify(signcoent, pubSyr, signx));
	}

}
