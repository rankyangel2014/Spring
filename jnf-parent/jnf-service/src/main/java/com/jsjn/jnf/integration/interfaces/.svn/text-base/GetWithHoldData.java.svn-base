/**
 * 
 */
package com.jsjn.jnf.integration.interfaces;

import org.apache.log4j.Logger;

import com.jsjn.jnf.bean.bo.trade.WithHoldSecCheckReqBO;
import com.jsjn.jnf.bean.bo.trade.WithHoldSecCheckReqDataBO;
import com.jsjn.jnf.bean.bo.trade.WithHoldSecCheckResBO;
import com.jsjn.jnf.bean.bo.trade.WithHoldSecCheckResDataBO;
import com.jsjn.jnf.bean.dto.assist.BizConfigDto;
import com.jsjn.jnf.common.mapper.JaxbMapper;
import com.jsjn.jnf.common.security.RSAUtils;
import com.jsjn.jnf.common.security.SignatureServiceHandler;
import com.jsjn.jnf.common.utils.DateUtils;
import com.jsjn.jnf.common.utils.HttpUtils;
import com.jsjn.jnf.common.utils.StringUtils;
import com.jsjn.jnf.dao.assist.DictDao;
import com.jsjn.jnf.service.assist.BusinessConfigService;
import com.jsjn.panda.setup.ParseSpring;

/**
 * @author ZSMJ 商户提供接口 反查商户代扣数据
 * 
 */
public class GetWithHoldData {
	private final static Logger logger = Logger.getLogger(GetWithHoldData.class);
	private static DictDao dao = (DictDao) ParseSpring.context.getBean("dictDao");
	
	private static String PROXY_IP;			//代理服务器IP
	private static String PROXY_PORT;		//代理服务器端口
	private static String WS_URL_WITHHOLD;		//商户提供的反查代扣数据URL
	
	static{
		PROXY_IP = dao.findByType("PROXY_IP");
		PROXY_PORT = dao.findByType("PROXY_PORT");
		WS_URL_WITHHOLD = dao.findByType("WS_URL_WITHHOLD");
	}

	/**
	 * 商户提供的代扣二次握手接口
	 * 
	 * @param mid
	 *            商户ID
	 * @param serialNo
	 *            实际业务编号
	 * @return
	 * @throws Exception
	 */
	public static WithHoldSecCheckResDataBO getWithHoldData(String mid, String serialNo) throws Exception {
		// 用到的内部接口
		BusinessConfigService busConService = (BusinessConfigService) ParseSpring.context
				.getBean("businessConfigServiceImpl");
		SignatureServiceHandler signatureServiceHandler = (SignatureServiceHandler) ParseSpring.context
				.getBean("signatureServiceHandler");

		
		//封装请求内容
		WithHoldSecCheckReqDataBO secCheckReqDto = new WithHoldSecCheckReqDataBO();
		secCheckReqDto.setSerialNo(serialNo);
		String reqXMLData = JaxbMapper.toXml(secCheckReqDto,false);
		
		WithHoldSecCheckReqBO reqDto = new WithHoldSecCheckReqBO();
		reqDto.setService("queryWithHolding");
		reqDto.setCharset("UTF-8");
		reqDto.setSignType("RSA");
		reqDto.setTimeStamp(DateUtils.getDate("yyyy-MM-dd hh:mm:ss"));
		reqDto.setReqData(secCheckReqDto);
		
		String signContent = reqDto.getCharset() + reqXMLData + reqDto.getService() + reqDto.getSignType() + reqDto.getTimeStamp();
		reqDto.setSign(signatureServiceHandler.sign(signContent));

		String reqXML = JaxbMapper.toXml(reqDto,false);


		// 调用商户提供反查数据接口
		String resXML = HttpUtils.sendPostViaProxy(WS_URL_WITHHOLD, reqXML, PROXY_IP, PROXY_PORT);
		WithHoldSecCheckResBO secCheckResDto = new WithHoldSecCheckResBO();
		try {
			secCheckResDto = JaxbMapper.fromXml(resXML, WithHoldSecCheckResBO.class);
		} catch (Exception e) {
			logger.error("商户业务编号为" + serialNo + "代扣二次握手反查商户代扣信息出错,请求XML报文为" + resXML + "响应报文为" + resXML, e);
			throw new Exception("代扣二次握手反查商户代扣信息出错！");
		}
		
		//查看返回码
		if(!secCheckResDto.getResCode().equals("0")){
			logger.error("商户业务编号为" + serialNo + "代扣二次握手失败" + secCheckResDto.getResMsg());
			throw new Exception("代扣二次握手失败！" + secCheckResDto.getResMsg());
		}
		
		//获取公钥
		BizConfigDto config = new BizConfigDto();
		config.setMid(mid);
		String publicKey = busConService.queryBussinessConfig(config).getRsaPubKey();
		
		
		String resData = StringUtils.getXmlTagValue(resXML, "resData");
		signContent = secCheckResDto.getResCode() +resData + secCheckResDto.getResMsg();
		
		if (!RSAUtils.verify(signContent, publicKey, secCheckResDto.getSign())) {
			logger.error("商户业务编号为" + serialNo + "代扣二次握手验签失败！商户签名" + secCheckResDto.getSign());
			throw new Exception("代扣二次握手验签失败！");
		}
		
		return secCheckResDto.getResData();

	}
}
