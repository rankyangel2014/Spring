package com.jsjn.jnf.common;

import java.text.MessageFormat;

import com.jsjn.jnf.bean.bo.realname.RealNameReqBO;
import com.jsjn.jnf.bean.bo.realname.RealNameReqDataBO;
import com.jsjn.jnf.bean.bo.trade.WithHoldReqBO;
import com.jsjn.jnf.bean.bo.trade.WithHoldReqDataBO;
import com.jsjn.jnf.common.security.RSAUtils;

public class GenReqXML {
	
	/**
	 * 商户私钥
	 */
	private static final String privateKey = "MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBALm04KdrHNk83bfB"
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
	
	//商户
	String publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC5tOCnaxzZPN23w"+
			"W8aubrBeklBLKjZgl3GCT8UozukY1g2efkUuN/GXx1zvAFadfZJ61"+
			"EYyw1uvPG2Q2BBrmz699Dho50aaOyvgWhzvu1YfV/ugJsjCx1IZRr"+
			"PfBd1GbQ8kT4M9O63hi5SVfK+DuR/tveCV+vLi8Eq9wXE8K4eowIDAQAB";
	
	/**
	 * 生成实名认证请求报文
	 * @param req
	 * @return
	 */
	public static String genRealNameXML(RealNameReqBO req) {
		String reqXMLTpl = "";
		String reqXMl = "";
		String reqXMLDataTpl = "";
		String reqXMLData = "";
		String service = req.getService();
		if (service.equals("realNameAuthBy4Element")) {
			RealNameReqDataBO reqData = req.getReqData();
			reqXMLDataTpl = "<reqData><custName>{0}</custName><idNo>{1}</idNo><bankCardNo>{2}</bankCardNo><mobile>{3}</mobile></reqData>";
			reqXMLData = MessageFormat.format(reqXMLDataTpl, reqData.getCustName(), reqData.getIdNo(),
					reqData.getBankCardNo(), reqData.getMobile());

		} else if (service.equals("realNameAuthByMessage")) {
			RealNameReqDataBO reqData = req.getReqData();
			reqXMLDataTpl = "<reqData><custName>{0}</custName><idNo>{1}</idNo><bankCardNo>{2}</bankCardNo><mobile>{3}</mobile><token>{4}</token><code>{5}</code></reqData>";
			reqXMLData = MessageFormat.format(reqXMLDataTpl, reqData.getCustName(), reqData.getIdNo(),
					reqData.getBankCardNo(), reqData.getMobile(), reqData.getToken(), reqData.getCode());

		}

		String signContent = req.getAppkey() + req.getCharset() + reqXMLData + req.getService() + req.getSignType()
				+ req.getTimeStamp();
		String sign = RSAUtils.sign(signContent, privateKey);
		req.setSign(sign);

		reqXMLTpl = "<message><service>{0}</service><appkey>{1}</appkey><charset>{2}</charset><signType>{3}</signType>"
				+ "<sign>{4}</sign><timeStamp>{5}</timeStamp>{6}</message>";
		reqXMl = MessageFormat.format(reqXMLTpl, req.getService(), req.getAppkey(), req.getCharset(),
				req.getSignType(), req.getSign(), req.getTimeStamp(), reqXMLData);

		return reqXMl;
	}
	
	
	/**
	 * 生成代扣XML
	 * @param req
	 * @return
	 */
	public static String genWithHoldXML(WithHoldReqBO req) {
		
		WithHoldReqDataBO reqData = req.getReqData();
		String reqXMLDataTpl = "<reqData><serialNo>{0}</serialNo><loanNo>{1}</loanNo><cardSignNo>{2}</cardSignNo><custNo>{3}</custNo>" +
				"<custName>{4}</custName><bankName>{5}</bankName><bankCardNo>{6}</bankCardNo><amount>{7}</amount></reqData>";
		String reqXMLData = MessageFormat.format(reqXMLDataTpl, reqData.getSerialNo(), reqData.getLoanNo(),
				reqData.getCardSignNo(), reqData.getCustNo(),reqData.getCustName(),reqData.getBankName(),reqData.getBankCardNo(),reqData.getAmount());

		String signContent = req.getAppkey() + req.getCharset() + reqXMLData + req.getService() + req.getSignType()
				+ req.getTimeStamp();
		String sign = RSAUtils.sign(signContent, privateKey);
		req.setSign(sign);

		String reqXMLTpl = "<message><service>{0}</service><appkey>{1}</appkey><charset>{2}</charset><signType>{3}</signType>"
				+ "<sign>{4}</sign><timeStamp>{5}</timeStamp>{6}</message>";
		String reqXMl = MessageFormat.format(reqXMLTpl, req.getService(), req.getAppkey(), req.getCharset(),
				req.getSignType(), req.getSign(), req.getTimeStamp(), reqXMLData);

		return reqXMl;
	}
	
	public static String genWithHoldXML(WithHoldReqBO req,String sign){
		WithHoldReqDataBO reqData = req.getReqData();
		String reqXMLDataTpl = "<reqData><serialNo>{0}</serialNo><loanNo>{1}</loanNo><cardSignNo>{2}</cardSignNo><custNo>{3}</custNo>" +
				"<custName>{4}</custName><bankName>{5}</bankName><bankCardNo>{6}</bankCardNo><amount>{7}</amount></reqData>";
		String reqXMLData = MessageFormat.format(reqXMLDataTpl, reqData.getSerialNo(), reqData.getLoanNo(),
				reqData.getCardSignNo(), reqData.getCustNo(),reqData.getCustName(),reqData.getBankName(),reqData.getBankCardNo(),reqData.getAmount());

		req.setSign(sign);

		String reqXMLTpl = "<message><service>{0}</service><appkey>{1}</appkey><charset>{2}</charset><signType>{3}</signType>"
				+ "<sign>{4}</sign><timeStamp>{5}</timeStamp>{6}</message>";
		String reqXMl = MessageFormat.format(reqXMLTpl, req.getService(), req.getAppkey(), req.getCharset(),
				req.getSignType(), req.getSign(), req.getTimeStamp(), reqXMLData);

		return reqXMl;
	}
	

}
