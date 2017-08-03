package com.jsjn.jnf.integration.bank.impl;

import java.util.Map;

import com.jsjn.jnf.bean.bo.integration.tfb.request.TfbReqSingleWithHold;
import com.jsjn.jnf.bean.bo.integration.tfb.response.TfbResSingleWithHold;
import com.jsjn.jnf.bean.dto.assist.InterfaceXmlDto;
import com.jsjn.jnf.bean.pojo.integration.SingleWithHoldPojo;
import com.jsjn.jnf.bean.pojo.integration.SingleWithHoldResPojo;
import com.jsjn.jnf.common.config.TradeCode;
import com.jsjn.jnf.common.mapper.JaxbMapper;
import com.jsjn.jnf.common.utils.BeanUtils;
import com.jsjn.jnf.common.utils.HttpClientUtils;
import com.jsjn.jnf.common.utils.JSONUtil;
import com.jsjn.jnf.common.utils.Logger;
import com.jsjn.jnf.common.utils.StringUtils;
import com.jsjn.jnf.integration.bank.SingleWithHoldInterface;
import com.jsjn.jnf.integration.bank.utils.TfbUtils;
import com.jsjn.jnf.service.assist.DictService;
import com.jsjn.jnf.service.assist.InterfaceXmlService;
import com.jsjn.jnf.service.assist.utils.SequenceUtils;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 国彩支付(国彩集团)天付宝 代扣接口 实现类 --> 【国彩支付】更名为【天下支付】
 * 
 * 此处开启新事务
 * 
 * @author yincy
 * 
 */
public class TfbSingleWithHoldImpl implements SingleWithHoldInterface {

	private final static Logger logger = Logger.getLogger(TfbSingleWithHoldImpl.class);

	/**
	 * 字典表T12
	 */
	private DictService dictService = (DictService) ParseSpring.context.getBean("dictServiceImpl");

	/**
	 * 报文流水
	 */
	private InterfaceXmlService interfaceXmlService = (InterfaceXmlService) ParseSpring.context.getBean("interfaceXmlServiceImpl");

	@Override
	public SingleWithHoldResPojo singleWithHold(SingleWithHoldPojo reqPojo) {

		String url = dictService.findByType("TFB_URL_WITHHOLD");

		/**
		 * 1.构建代扣参数信息
		 */
		logger.info("天下支付代扣订单构建开始....");
		String ver = "1.0";// 默认1.0
		String spid = reqPojo.getInvestorAccount();
		String spKey = reqPojo.getInvestorKey();
		String spbillno = StringUtils.substring(reqPojo.getTradeNo(), 1);// 必须为数字，现在做法：将tradeNo的第一位字母T删除
		String businessType = "14901";// 业务类型：默认为 贷款
		String tranAmt = reqPojo.getAmount().movePointRight(2).toString(); // 单位为分
		String curType = "1";// 默认为人民币
		String trueName = reqPojo.getCustName();
		String mobile = reqPojo.getMobile();
		String creId = reqPojo.getCustIdNo();
		String creType = "1";// 默认为身份证
		String cardId = reqPojo.getCardNo();
		String cardType = "0";// 借记卡
		String bankName = reqPojo.getBankName();
		String bankInsCode = reqPojo.getBankCode();
		String cardProv = "江苏";// 开户行省份 默认：江苏 填错了没关系
		String postscript = reqPojo.getPostScript();
		String purpose = reqPojo.getPostScript();

		TfbReqSingleWithHold tfbReqDto = new TfbReqSingleWithHold();
		tfbReqDto.setVer(ver);
		tfbReqDto.setSpid(spid);
		tfbReqDto.setSpbillno(spbillno);
		tfbReqDto.setBusiness_type(businessType);
		tfbReqDto.setTran_amt(tranAmt);
		tfbReqDto.setCur_type(curType);
		tfbReqDto.setTrue_name(trueName);
		tfbReqDto.setMobile(mobile);
		tfbReqDto.setCre_id(creId);
		tfbReqDto.setCre_type(creType);
		tfbReqDto.setCard_id(cardId);
		tfbReqDto.setCard_type(cardType);
		tfbReqDto.setBank_name(bankName);
		tfbReqDto.setBank_ins_code(bankInsCode);
		tfbReqDto.setCard_prov(cardProv);
		tfbReqDto.setPurpose(purpose);
		tfbReqDto.setPostscript(postscript);
		// 生成sign值
		tfbReqDto.setMd5_sign(TfbUtils.getReqSign(tfbReqDto, spKey));
		logger.info("天下支付代扣订单构建结束....");

		// 获取报文流水表Sequence
		String interfaceXmlSeq = SequenceUtils.getInterfaceXmlSeq();
		String resXml = null;
		try {
			// 插入报文流水表
			insertInterfaceXml(interfaceXmlSeq, JSONUtil.toJSONString(tfbReqDto));

			/**
			 * 2.发送http post请求
			 */
			logger.info("天下支付代扣订单发送post请求开始，请求报文信息：" + JSONUtil.toJSONString(tfbReqDto));
			Map<String, String> params = BeanUtils.objectToMap(tfbReqDto);
			resXml = HttpClientUtils.httpPostWithProxy(url,
					params,
					dictService.findByType("PROXY_IP"),
					dictService.findByType("PROXY_PORT"));
			logger.info("天下支付代扣订单发送post请求结束，返回结果信息：" + resXml);

			/**
			 * 3.处理返回结果
			 */
			TfbResSingleWithHold tfbResDto = JaxbMapper.fromXml(resXml, TfbResSingleWithHold.class);

			String retCode = TradeCode.TRADE_DEAL.getCode();//返回的code,默认为【处理中】
			String retMsg = StringUtils.EMPTY;//返回信息
			String resMsg = tfbResDto.getRetmsg();//天付宝返回信息
			String state = "2";//报文表State,默认为【处理中】 0：成功，1：失败 2：处理中
			String resSign = TfbUtils.getResSign(tfbResDto, spKey);

			//返回码为以下两种情况，需要置为【处理中】: 207594：交易超时  200001：系统繁忙
			if (tfbResDto.getRetcode().equalsIgnoreCase("207594") || tfbResDto.getRetcode().equalsIgnoreCase("200001")) {
				retMsg = "代扣处理中，请稍后再试！【天下支付： " + resMsg + "】";
				retCode = TradeCode.TRADE_DEAL.getCode();
				state = "2";
			} else if (StringUtils.isEmpty(tfbResDto.getMd5_sign())) {// 如返回结果中没有签名，则置为【失败】
				retMsg = "代扣失败，【天下支付： " + resMsg + "】";
				retCode = TradeCode.TRADE_ERROR.getCode();
				state = "1";
			} else if (!resSign.equals(tfbResDto.getMd5_sign())) {// 校验 response 签名，若不合法，则置为【处理中】
				retMsg = "代扣处理中，请稍后再试(返回报文签名不合法)！【天下支付： " + resMsg + "】";
				retCode = TradeCode.TRADE_DEAL.getCode();
				state = "2";
			} else if (tfbResDto.getResult().equals("1")) {// 成功
				retMsg = "代扣成功【天下支付： " + resMsg + "】";
				retCode = TradeCode.TRADE_SUCCESS.getCode();
				state = "0";
			} else if (tfbResDto.getResult().equals("2")) {// 处理中
				retMsg = "代扣处理中，请稍后再试！【天下支付： " + resMsg + "】";
				retCode = TradeCode.TRADE_DEAL.getCode();
				state = "2";
			} else if (tfbResDto.getResult().equals("3")) {// 失败
				retMsg = "代扣失败，【天下支付： " + resMsg + "】";
				retCode = TradeCode.TRADE_ERROR.getCode();
				state = "1";
			}

			logger.info(retMsg);
			// 更新报文流水表
			updateInterfaceXml(interfaceXmlSeq, resXml, state, retMsg);
			return new SingleWithHoldResPojo(retCode, retMsg);
		} catch (Exception e) {
			logger.error("天下支付代扣系统异常！", e);
			// 更新报文流水表
			updateInterfaceXml(interfaceXmlSeq, resXml, "2", "天下支付代扣系统发生异常！,异常原因：" + e.getMessage());
			// 交易异常均置为处理中
			return new SingleWithHoldResPojo(TradeCode.TRADE_DEAL.getCode(), "系统异常，请联系管理员！");
		}
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
		dto.setMethod("TfbSingleWithHoldImpl.singleWithHold");
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
