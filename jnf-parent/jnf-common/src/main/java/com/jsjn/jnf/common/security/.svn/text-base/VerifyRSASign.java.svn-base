/**
 * 
 */
package com.jsjn.jnf.common.security;

import java.io.ByteArrayInputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import com.jsjn.jnf.common.config.SecurityReturnCode;
import com.jsjn.jnf.common.utils.Collections3;
import com.jsjn.jnf.common.utils.DateUtils;
import com.jsjn.jnf.common.utils.StringUtils;

/**
 * @author ZSMJ 商户请求验签操作
 */
public class VerifyRSASign {

	private final static Logger logger = Logger.getLogger(VerifyRSASign.class);

	/**
	 * 获取XML基本参数
	 * 
	 * @param request
	 * @param map
	 * @return
	 */
	public static Map<String, String> getBaseParamFromOpen(String reqXMLData) throws Exception {
		Map<String, String> map = new HashMap<String, String>();

		String service 		= "";
		String appkey 		= "";
		String charset 		= "";
		String signType 	= "";
		String sign 		= "";
		String timeStamp 	= "";
		String reqData 		= "";

		try {
			SAXReader reader = new SAXReader();
			Document doc = reader.read(new ByteArrayInputStream(reqXMLData.getBytes("UTF-8")));
			Element root = doc.getRootElement();

			logger.info("SQL注入检测开始,输出请求报文" + reqXMLData);
			if(sqlInjectTest(root)){
				logger.error("SQL注入检测结束，检测到SQL注入关键词，请求拒绝！");
				throw new Exception("检测到SQL注入关键词");
			}
			logger.info("SQL注入检测结束,未检测到SQL注入关键词！");
				

			service 	= root.element("service").getText();
			appkey 		= root.element("appkey").getText();
			charset 	= root.element("charset").getText();
			signType 	= root.element("signType").getText();
			sign 		= root.element("sign").getText();
			timeStamp 	= root.element("timeStamp").getText();
			reqData 	= StringUtils.getXmlTagValue(reqXMLData, "reqData");
		} catch (Exception e) {
			logger.error("解析报文" + reqXMLData + "失败！"+"|"+ e.getMessage());
			throw new Exception();
		}

		if (StringUtils.isEmpty(service) || StringUtils.isEmpty(appkey) || StringUtils.isEmpty(charset)
				|| StringUtils.isEmpty(signType) || StringUtils.isEmpty(sign) || StringUtils.isEmpty(timeStamp)
				|| !DateUtils.validateDate(timeStamp, "yyyy-MM-dd HH:mm:ss:SSS")) {
			logger.error("请求中参数不合法，请求拒绝！");
			throw new Exception();
		}

		map.put("service", service);
		map.put("appkey", appkey);
		map.put("charset", charset);
		map.put("signType", signType);
		map.put("sign", sign);
		map.put("timeStamp", timeStamp);

		map.put("reqData", reqData);

		return map;

	}

	/**
	 * 验签
	 * 
	 * @param signContent
	 * @param publicKey
	 * @param sign
	 * @return
	 */
	public static String verifySign(Map<String, String> map, String publicKey) {
		String sign = map.get("sign").toString();
		// 验签时需要按照去除sign剩余的字段排序
		map.remove("sign");
		// 获取所有请求参数，并按照key值升序的方式排序Map
		String signContent = Collections3.getValuesOrderByKey(map);
		if (!RSAUtils.verify(signContent, publicKey, sign)) {
			logger.error("验签失败，请求拒绝！验签内容" + signContent + " 商户公钥" + publicKey + " 签名" + sign);
			return SecurityReturnCode.INVALID_SIGN.getCode();
		}

		return SecurityReturnCode.SUCCESS.getCode();

	}

	/**
	 * 验签通用（二次多次验签）
	 * 
	 * @param reqXMLData
	 * @param publicKey
	 * @param sign
	 * @return
	 */
	public static boolean verifySign(String reqXMLData, String publicKey) {
		// 获取请求报文参数
		Map<String, String> map = null;
		try {
			map = getBaseParamFromOpen(reqXMLData);
		} catch (Exception e) {
			return false;
		}

		String returnCode = verifySign(map, publicKey);
		if (!returnCode.equals(SecurityReturnCode.SUCCESS.getCode()))
			return false;

		return true;
	}

	/**
	 * 针对service、appkey、reqData下节点内容 进行防SQL注入检测
	 * 
	 * @param node
	 */
	@SuppressWarnings("unchecked")
	public static boolean sqlInjectTest(Element node) {
		// 当下节点内容SQL注入检测
		String nodeName = node.getName();
		if (nodeName.equals("service") || nodeName.equals("appkey") || node.getParent() == null 
				|| node.getParent() != null && node.getParent().getName().equals("reqData"))
			if(SQLInjection.containKeyWord(node.getText())){
				return true;
			}
		// 递归遍历当前节点所有的子节点
		List<Element> listElement = node.elements();
		for (Element e : listElement) {
			if(sqlInjectTest(e))
				return true;
		}
		return false;
	}
	
}