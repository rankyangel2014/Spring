package com.jsjn.jnf.integration.bank.impl;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.Date;
import java.util.Map;

import com.alibaba.fastjson.JSONObject;
import com.jsjn.jnf.bean.bo.integration.yfb.CardInfoBO;
import com.jsjn.jnf.bean.bo.integration.yfb.PaymentOrderQueryReqBO;
import com.jsjn.jnf.bean.bo.integration.yfb.PaymentOrderReqBO;
import com.jsjn.jnf.bean.bo.integration.yfb.PaymentOrderResBO;
import com.jsjn.jnf.bean.bo.integration.yfb.RefundOrderReqBo;
import com.jsjn.jnf.bean.dto.assist.InterfaceXmlDto;
import com.jsjn.jnf.bean.pojo.integration.SingleWithHoldPojo;
import com.jsjn.jnf.bean.pojo.integration.SingleWithHoldQueryPojo;
import com.jsjn.jnf.bean.pojo.integration.SingleWithHoldResPojo;
import com.jsjn.jnf.common.config.TradeCode;
import com.jsjn.jnf.common.security.Digests;
import com.jsjn.jnf.common.security.SignatureServiceHandler;
import com.jsjn.jnf.common.utils.BeanUtils;
import com.jsjn.jnf.common.utils.CryptoUtil;
import com.jsjn.jnf.common.utils.DateUtils;
import com.jsjn.jnf.common.utils.Encodes;
import com.jsjn.jnf.common.utils.HttpClientUtils;
import com.jsjn.jnf.common.utils.IdGen;
import com.jsjn.jnf.common.utils.JSONUtil;
import com.jsjn.jnf.common.utils.Logger;
import com.jsjn.jnf.common.utils.StringUtils;
import com.jsjn.jnf.integration.bank.SingleWithHoldInterface;
import com.jsjn.jnf.integration.bank.SingleWithHoldQueryInterface;
import com.jsjn.jnf.service.assist.DictService;
import com.jsjn.jnf.service.assist.InterfaceXmlService;
import com.jsjn.jnf.service.assist.utils.SequenceUtils;
import com.jsjn.panda.setup.ParseSpring;
import com.jsjn.panda.util.DateUtil;

/**
 * 苏宁易付宝 代扣接口 状态查询 实现类
 * 
 * @author lilong
 * 
 */
public class YfbSingleWithHoldImpl implements SingleWithHoldInterface, SingleWithHoldQueryInterface {

	private final static Logger logger = Logger.getLogger(YfbSingleWithHoldImpl.class);

	private final DictService dictService = (DictService) ParseSpring.context.getBean("dictServiceImpl");
	/**
	 * 报文流水
	 */
	private final InterfaceXmlService interfaceXmlService = (InterfaceXmlService) ParseSpring.context.getBean("interfaceXmlServiceImpl");

	private final SignatureServiceHandler signatureServiceHandler = ParseSpring.context.getBean(SignatureServiceHandler.class);

	/**
	 * 代扣接口 测试环境
	 * https://ebanksandbox.suning.com/epps-ebpg/singleWithhold/paymentOrder.do
	 * 生产环境 https://ebankpay.suning.com/epps-ebpg/singleWithhold/paymentOrder.do
	 */
	@Override
	public SingleWithHoldResPojo singleWithHold(SingleWithHoldPojo pojo) {

		// 订单信息
		String merchantNo = dictService.findByType("YFB_JNF_MERCHANTNO");// "70057166";
		if (StringUtils.isEmpty(merchantNo)) {
			logger.error("易付宝商户号未配置");
			return new SingleWithHoldResPojo(TradeCode.TRADE_ERROR.getCode(), "易付宝商户号未配置");
		}
		String salerMerchantNo = pojo.getInvestorAccount();
		String orderNo = pojo.getTradeNo();
		String orderTime = pojo.getTradeTime();
		String goodsType = dictService.findByType("YFB_JNF_GOODSTYPE"); // 商品类型  "541111"
		String goodsName = "贷款还款"; // 商品名称
		String remark = pojo.getPostScript();

		// 个人信息
		String bankCode = pojo.getBankCode();
		String cardHolderName = pojo.getCustName();
		String certType = "01";
		String certNo = pojo.getCustIdNo();
		String mobileNo = pojo.getMobile();
		String cardNo = pojo.getCardNo();

		// 处理金额
		BigDecimal x = pojo.getAmount().multiply(new BigDecimal(100));
		DecimalFormat df = new DecimalFormat("#");
		String amount = df.format(x);

		// 有效期等信息可不填写
		String expYear = "";
		String expMonth = "";
		String cvv = "";

		return singleWithHold(merchantNo,
				bankCode,
				orderNo,
				orderTime,
				amount,
				salerMerchantNo,
				goodsType,
				goodsName,
				remark,
				cardHolderName,
				certType,
				certNo,
				mobileNo,
				cardNo,
				expYear,
				expMonth,
				cvv);
	}

	/**
	 * 苏宁易付宝代扣订单查询接口 测试环境
	 * https://paymentsandbox.suning.com/epps-pag/apiGateway/merchantOrder
	 * /queryMerchantOrder.do 生产环境
	 * https://payment.suning.com/epps-pag/apiGateway
	 * /merchantOrder/queryMerchantOrder.do
	 */
	@Override
	public SingleWithHoldResPojo withHoldResultQuery(SingleWithHoldQueryPojo pojo) {
		String merchantNo = dictService.findByType("YFB_JNF_MERCHANTNO");// "70057166";
		if (StringUtils.isEmpty(merchantNo)) {
			logger.error("易付宝商户号未配置");
			return new SingleWithHoldResPojo(TradeCode.TRADE_ERROR.getCode(), "易付宝商户号未配置");
		}
		String outOrderNo = pojo.getTranNo();
		String orderTime = pojo.getTradeTime();
		return query(merchantNo, outOrderNo, orderTime);
	}

	/**
	 * 代扣退款接口
	 * 
	 * @param origOutOrderNo
	 * @param origOrderTime
	 * @param money
	 * @return
	 */
	public String refundOrder(String origOutOrderNo, String origOrderTime, BigDecimal money) {
		String merchantNo = dictService.findByType("YFB_JNF_MERCHANTNO");// "70057166";
		if (StringUtils.isEmpty(merchantNo)) {
			logger.error("易付宝商户号未配置");
			return TradeCode.TRADE_ERROR.getCode();
		}
		// 处理金额
		BigDecimal x = money.multiply(new BigDecimal(100));
		DecimalFormat df = new DecimalFormat("#");
		String amount = df.format(x);
		return refundOrder(merchantNo, origOutOrderNo, origOrderTime, amount);
	}

	/**
	 * 代扣接口实现
	 * 
	 * @param merchantNo
	 * @param bankCode
	 * @param orderNo
	 * @param amount
	 * @param salerMerchantNo
	 * @param goodsType
	 * @param goodsName
	 * @param remark
	 * @param cardHolderName
	 * @param certType
	 * @param certNo
	 * @param mobileNo
	 * @param cardNo
	 * @param expYear
	 * @param expMonth
	 * @param cvv
	 * @return
	 */
	public SingleWithHoldResPojo singleWithHold(String merchantNo, String bankCode, String orderNo, String orderTime,
			String amount, String salerMerchantNo, String goodsType, String goodsName, String remark,
			String cardHolderName, String certType, String certNo, String mobileNo, String cardNo, String expYear,
			String expMonth, String cvv) {
		String url = dictService.findByType("YFB_URL_WITHHOLD");
		// "https://ebanksandbox.suning.com/epps-ebpg/singleWithhold/paymentOrder.do";
		if (StringUtils.isEmpty(url)) {
			logger.error("易付宝代扣接口请求地址未配置");
			return new SingleWithHoldResPojo(TradeCode.TRADE_ERROR.getCode(), "易付宝代扣接口请求地址未配置");
		}

		// 流水表sequence
		String interfaceXmlSeq = SequenceUtils.getInterfaceXmlSeq();
		String result = null;

		try {
			/**
			 * 1、构建订单信息
			 */
			logger.info("苏宁代扣订单构建开始....");
			PaymentOrderReqBO orderBO = buildPaymentOrderReqBO(merchantNo,
					bankCode,
					orderNo,
					orderTime,
					amount,
					salerMerchantNo,
					goodsType,
					goodsName,
					remark,
					cardHolderName,
					certType,
					certNo,
					mobileNo,
					cardNo,
					expYear,
					expMonth,
					cvv);
			logger.debug("订单编号：" + orderBO.getOutOrderNo() + " ,订单时间：" + orderBO.getOrderTime());
			logger.info("苏宁代扣订单构建结束...");

			/**
			 * 2、签名
			 */
			logger.info("苏宁代扣订单数据签名开始...");
			Map<String, String> map = BeanUtils.objectToMap(orderBO);
			// 将这些数据按字典顺序（从a到z，首字母相同则看第二个字母）排序并拼接 字符串
			String digestStr = Digests.digest(map, "signature", "signAlgorithm");
			String signature = signatureServiceHandler.sign(digestStr);
			orderBO.setSignature(signature);
			logger.info("苏宁代扣订单数据签名结束...");

			// 插入报文流水表
			insertInterfaceXml(interfaceXmlSeq, JSONUtil.toJSONString(orderBO));

			/**
			 * 3、发送post请求
			 */
			logger.info("苏宁代扣订单发送post请求开始，请求报文信息：" + JSONUtil.toJSONString(orderBO));
			Map<String, String> reqMap = BeanUtils.objectToMap(orderBO);
			// result = HttpClientUtil.post(url, reqMap, false);
			result = HttpClientUtils.httpsPostWithProxy(url,
					reqMap,
					dictService.findByType("PROXY_IP"),
					dictService.findByType("PROXY_PORT"));
			logger.info("苏宁代扣订单发送post请求结束，返回结果信息：" + result);

			/**
			 * 4、构建返回结果集
			 */
			PaymentOrderResBO res = JSONUtil.parseObject(result, PaymentOrderResBO.class);
			String resMessage = res.getResponseMsg();//易付宝响应消息
			String resCode = res.getResponseCode();//易付宝响应码
			String payResult = res.getPayResult();//易付宝代扣结果

			String resState = "1";// 0：成功 ，1：失败
			String retMsg = StringUtils.EMPTY;//默认返回消息为空
			String retCode = TradeCode.TRADE_DEAL.getCode();//默认为处理中
			if (StringUtils.equals("S", payResult)) {//成功
				resState = "0";
				retMsg = "代扣成功，【苏宁易付宝： （" + resCode + "）" + resMessage + "】";
				retCode = TradeCode.TRADE_SUCCESS.getCode();
			}
			if (StringUtils.equals("F", payResult)) {//失败
				retCode = TradeCode.TRADE_ERROR.getCode();
				retMsg = "代扣失败，【苏宁易付宝： （" + resCode + "）" + resMessage + "】";
			}
			if (StringUtils.equals("P", payResult)) {//处理中
				retMsg = "代扣正在处理中，请稍后...！【苏宁易付宝：（" + resCode + "）" + resMessage + "】";
			}

			//			if ("0000".equals(res.getResponseCode()) && "S".equals(res.getPayResult())) {
			//				resState = "0";
			//				retMsg = "代扣成功，【苏宁易付宝： " + resMessage + "】";
			//				retCode = TradeCode.TRADE_SUCCESS.getCode();
			//			} else if ("6218".equals(res.getResponseCode())) {
			//				resState = "1";
			//				retCode = TradeCode.TRADE_DEAL.getCode();
			//				retMsg = "代扣正在处理中，请稍后再试！【苏宁易付宝： " + resMessage + "】";
			//			} else {
			//				resState = "1";
			//				retCode = TradeCode.TRADE_ERROR.getCode();
			//				retMsg = "代扣失败，【苏宁易付宝： " + resMessage + "】";
			//			}
			// 更新报文流水表
			updateInterfaceXml(interfaceXmlSeq, result, resState, retMsg);
			return new SingleWithHoldResPojo(retCode, retMsg);

		} catch (Exception e) {
			/**
			 * 6、异常处理
			 */
			logger.error("苏宁易付宝代扣出现异常：" + e.getMessage(), e);
			// 更新报文流水表
			updateInterfaceXml(interfaceXmlSeq, result, "1", "苏宁易付宝代扣出现异常：" + e.getMessage());
			return new SingleWithHoldResPojo(TradeCode.TRADE_DEAL.getCode(), "苏宁易付宝代扣出现异常：" + e.getMessage());
		}

	}

	/**
	 * 代扣订单查询接口
	 * 
	 * @param merchantNo
	 * @param outOrderNo
	 * @param orderTime
	 * @return
	 */
	public SingleWithHoldResPojo query(String merchantNo, String outOrderNo, String orderTime) {
		String url = dictService.findByType("YFB_URL_WITHHOLD_QUERY");
		// "https://paymentsandbox.suning.com/epps-pag/apiGateway/merchantOrder/queryMerchantOrder.do";
		if (StringUtils.isEmpty(url)) {
			logger.error("易付宝代扣查询接口请求地址未配置");
			return new SingleWithHoldResPojo(TradeCode.TRADE_ERROR.getCode(), "易付宝代扣查询接口请求地址未配置");
		}
		try {
			/**
			 * 1、构建订单信息
			 */
			logger.info("苏宁代扣查询订单构建开始....");
			PaymentOrderQueryReqBO queryReqBO = new PaymentOrderQueryReqBO();
			queryReqBO.setMerchantNo(merchantNo);
			queryReqBO.setInputCharset("UTF-8");
			queryReqBO.setPublicKeyIndex("0001");
			queryReqBO.setSignAlgorithm("RSA");
			queryReqBO.setSubmitTime(DateUtils.formatDate(new Date(), "yyyyMMddHHmmss"));
			queryReqBO.setVersion("2.0");
			queryReqBO.setOutOrderNo(outOrderNo);
			queryReqBO.setOrderTime(orderTime);
			logger.debug("订单编号：" + queryReqBO.getOutOrderNo() + " ,订单时间：" + queryReqBO.getOrderTime());
			logger.info("苏宁代扣查询订单构建结束....");

			/**
			 * 2、签名
			 */
			logger.info("苏宁代扣查询订单数据签名开始...");
			Map<String, String> map = BeanUtils.objectToMap(queryReqBO);
			// 将这些数据按字典顺序（从a到z，首字母相同则看第二个字母）排序并拼接 字符串
			String digestStr = Digests.digest(map, "signature", "signAlgorithm");

			String signature = signatureServiceHandler.sign(digestStr); // CryptoUtil.sign(digestStr,privateKey);
			queryReqBO.setSignature(signature);
			logger.info("苏宁代扣查询订单数据签名结束...");

			/**
			 * 3、发送post请求
			 */
			logger.info("苏宁代扣查询订单发送post请求开始，请求报文信息：" + JSONUtil.toJSONString(queryReqBO));
			Map<String, String> reqMap = BeanUtils.objectToMap(queryReqBO);
			// String result = HttpClientUtil.post(url, reqMap, true);
			String result = HttpClientUtils.httpsPostWithProxy(url,
					reqMap,
					dictService.findByType("PROXY_IP"),
					dictService.findByType("PROXY_PORT"));
			logger.info("苏宁代扣查询订单发送post请求结束，返回结果信息：" + result);

			/**
			 * 4、构建返回结果集
			 */
			PaymentOrderResBO res = JSONUtil.parseObject(result, PaymentOrderResBO.class);
			String payResult = res.getPayResult();
			String resCode = res.getResponseCode();
			String resMsg = res.getResponseMsg();
			/**
			 * S： 支付成功 
			 * 
			 * F： 支付失败  C：订单关闭， 表示在订单有效期内订单未支付成功（失败） N： 支付请求未提交银行（
			 * 商户不重新提交支付的情况下， 可当做支付失败） （失败）
			 * 
			 * P： 银行支付处理中 W： 等待银行返回结果 (处理中)
			 * 
			 */
			String code = TradeCode.TRADE_DEAL.getCode();//默认受理中
			if (StringUtils.equals("0000", resCode)) {//受理成功
				if (StringUtils.equals("S", payResult)) {//代扣成功
					code = TradeCode.TRADE_SUCCESS.getCode();
				} else if (StringUtils.equals("F", payResult) || StringUtils.equals("N", payResult)
						|| StringUtils.equals("C", payResult)) {//代扣失败
					code = TradeCode.TRADE_ERROR.getCode();
				}
			}
			return new SingleWithHoldResPojo(code, resMsg);
		} catch (Exception e) {
			/**
			 * 6、异常处理
			 */
			logger.error("苏宁易付宝代扣查询异常：" + e.getMessage(), e);
			return new SingleWithHoldResPojo(TradeCode.TRADE_DEAL.getCode());
		}

	}

	/**
	 * 苏宁代扣退款订单申请
	 * 
	 * @return 测试环境
	 *         https://paymentsandbox.suning.com/epps-pag/apiGateway/refundOrder
	 *         /createRefundOrder.do 生产环境
	 *         https://payment.suning.com/epps-pag/apiGateway
	 *         /refundOrder/createRefundOrder.do
	 */
	public String refundOrder(String merchantNo, String origOutOrderNo, String origOrderTime, String amount) {
		String url = dictService.findByType("YFB_URL_REFUNDORDER");
		// "https://ebanksandbox.suning.com/epps-ebpg/singleWithhold/paymentOrder.do";
		if (StringUtils.isEmpty(url)) {
			logger.error("易付宝退款请求地址未配置");
			return TradeCode.TRADE_ERROR.getCode();
		}
		try {
			/**
			 * 1、构建退款订单信息
			 */
			logger.info("苏宁代扣退款订单构建开始....");
			RefundOrderReqBo refundOrder = new RefundOrderReqBo();
			refundOrder.setInputCharset("UTF-8");
			refundOrder.setMerchantNo(merchantNo);
			refundOrder.setNotifyUrl(""); // 服务器异步通知URL 暂时为空
			refundOrder.setOperator(""); // 操作者暂时为空
			refundOrder.setOrigOrderTime(origOrderTime); // 原订单时间
			refundOrder.setOrigOutOrderNo(origOutOrderNo);
			refundOrder.setPublicKeyIndex("0001");
			refundOrder.setRefundAmount(amount);
			refundOrder.setRefundOrderNo(IdGen.uuid()); // 退款订单编号 uuid
			refundOrder.setRefundOrderTime(DateUtils.formatDate(new Date(), "yyyyMMddHHmmss"));
			refundOrder.setRefundReason(""); // 退款理由
			refundOrder.setRemark(Encodes.encodeBase64("贷款扣款退款" + origOutOrderNo));
			refundOrder.setSignAlgorithm("RSA");
			refundOrder.setSignature("");
			refundOrder.setSubmitTime(DateUtils.formatDate(new Date(), "yyyyMMddHHmmss"));
			refundOrder.setTunnelData("");
			refundOrder.setVersion("1.1");
			logger.debug("退款订单编号：" + refundOrder.getRefundOrderNo() + " ,订单时间：" + refundOrder.getRefundOrderTime());
			logger.info("苏宁代扣退款订单构建结束....");

			/**
			 * 2、签名
			 */
			logger.info("苏宁代扣退款订单数据签名开始...");
			Map<String, String> map = BeanUtils.objectToMap(refundOrder);
			// 将这些数据按字典顺序（从a到z，首字母相同则看第二个字母）排序并拼接 字符串
			String digestStr = Digests.digest(map, "signature", "signAlgorithm");

			String signature = signatureServiceHandler.sign(digestStr); // CryptoUtil.sign(digestStr,privateKey);
			refundOrder.setSignature(signature);
			logger.info("苏宁代扣退款订单数据签名结束...");

			/**
			 * 3、发送post请求
			 */
			logger.info("苏宁代扣退款订单发送post请求开始，请求报文信息：" + JSONUtil.toJSONString(refundOrder));
			Map<String, String> reqMap = BeanUtils.objectToMap(refundOrder);
			// String result = HttpClientUtil.post(url, reqMap, true);
			String result = HttpClientUtils.httpsPostWithProxy(url,
					reqMap,
					dictService.findByType("PROXY_IP"),
					dictService.findByType("PROXY_PORT"));
			logger.info("苏宁代扣退款订单发送post请求结束，返回结果信息：" + result);

			/**
			 * 4、构建返回结果集
			 */
			JSONObject json = JSONObject.parseObject(result);
			if ("0000".equals(json.getString("responseCode"))) {
				return TradeCode.TRADE_DEAL.getCode();
			} else {
				return TradeCode.TRADE_ERROR.getCode();
			}

		} catch (Exception e) {
			logger.error("苏宁代扣退款接口异常：" + e.getMessage(), e);
			return TradeCode.TRADE_DEAL.getCode();
		}
	}

	/**
	 * 构建苏宁代扣订单
	 * 
	 * @param merchantNo
	 *            一级商户好
	 * @param bankCode
	 *            银行代码
	 * @param orderNo
	 *            订单编号
	 * @param amount
	 *            金额
	 * @param salerMerchantNo
	 *            二级商户号
	 * @param goodsType
	 *            商品类型
	 * @param goodsName
	 *            商品每次
	 * @param remark
	 *            备注
	 * @param cardHolderName
	 *            持卡人信息
	 * @param certType
	 *            证件类型
	 * @param certNo
	 *            证件编号
	 * @param mobileNo
	 *            电话号码
	 * @param cardNo
	 *            银行卡号
	 * @param expYear
	 *            银行卡有效期-过期时间(年)
	 * @param expMonth
	 *            银行卡有效期-过期时间(月)
	 * @param cvv
	 *            银行卡校验值
	 * @return
	 * @throws Exception
	 */
	protected PaymentOrderReqBO buildPaymentOrderReqBO(String merchantNo, String bankCode, String orderNo,
			String orderTime, String amount, String salerMerchantNo, String goodsType, String goodsName, String remark,
			String cardHolderName, String certType, String certNo, String mobileNo, String cardNo, String expYear,
			String expMonth, String cvv) throws Exception {

		// 基本信息
		PaymentOrderReqBO bo = new PaymentOrderReqBO();
		bo.setMerchantNo(merchantNo);
		bo.setPublicKeyIndex("0001"); // 商户公钥索引
		bo.setVersion("2.0"); // 默认版本号为1.0
		bo.setSignature("");
		bo.setSignAlgorithm("RSA"); // 签名算法
		bo.setInputCharset("UTF-8"); // 编码类型
		bo.setSubmitTime(DateUtil.format(new Date(), "yyyyMMddHHmmss"));
		bo.setBankCode(bankCode);
		bo.setCardType("1"); // 目前仅支持储蓄卡
		bo.setOutOrderNo(orderNo); //
		bo.setOrderType("01"); // 即时倒档
		bo.setOrderAmount(amount); // 金额 单位为分
		bo.setCurrency("CNY"); // 人民币
		bo.setOrderTime(orderTime); // 订单发生时间
		bo.setSalerMerchantNo(salerMerchantNo);
		bo.setGoodsType(goodsType);
		bo.setGoodsName(Encodes.encodeBase64(goodsName)); // BASE64转码
		bo.setPayTimeout("7d"); // 订单有效期
		bo.setRoyaltyParameters(""); // 70056575^10^分你的|70056575^20^你也有
		bo.setTunnelData("");
		bo.setRemark(Encodes.encodeBase64(StringUtils.defaultIfEmpty(remark, "")));// 透传给商户的内容

		// 构建持卡人信息
		CardInfoBO cardInfo = new CardInfoBO();
		cardInfo.setCardHolderName(cardHolderName);
		cardInfo.setCardNo(cardNo);
		cardInfo.setCertNo(certNo);
		cardInfo.setCertType(certType);
		cardInfo.setCvv(cvv);
		cardInfo.setExpMonth(expMonth);
		cardInfo.setExpYear(expYear);
		cardInfo.setMobileNo(mobileNo);

		String jsonStr = JSONUtil.toJSONString(cardInfo);
		logger.debug("持卡人信息：" + jsonStr);
		// 苏宁易付宝公钥加密
		String cryptoStr = CryptoUtil.encryptJson(jsonStr);
		bo.setCardInfo(cryptoStr);
		return bo;
	}

	/**
	 * 插入报文流水表
	 * 
	 * @param id
	 * @param inputXml
	 *            输入报文
	 */
	public void insertInterfaceXml(String id, String inputXml) {
		InterfaceXmlDto dto = new InterfaceXmlDto();
		dto.setId(id);
		dto.setMethod("YfbSingleWithHoldImpl.singleWithHold");
		dto.setInputXml(inputXml);
		try {
			interfaceXmlService.insertXml(dto);
		} catch (Exception e) {
			logger.error("插入报文流水表失败", e);
		}
	}

	/**
	 * 更新报文流水表
	 * 
	 * @param id
	 * @param outputXml
	 *            输出报文
	 * @param state
	 *            状态 0：成功 1：失败
	 * @param exception
	 *            异常原因
	 */
	public void updateInterfaceXml(String id, String outputXml, String state, String exception) {
		InterfaceXmlDto dto = new InterfaceXmlDto();
		dto.setId(id);
		dto.setOutputXml(outputXml);
		dto.setState(state);
		dto.setException(exception);

		try {
			interfaceXmlService.updateXml(dto);
		} catch (Exception e) {
			logger.error("更新报文流水表失败", e);
		}
	}
}
