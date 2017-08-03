package com.jsjn.jnf.integration.bank.impl;

import java.util.Map;

import com.jsjn.jnf.bean.bo.integration.tfb.request.TfbReqWithHoldQuery;
import com.jsjn.jnf.bean.bo.integration.tfb.response.TfbResWithHoldQuery;
import com.jsjn.jnf.bean.pojo.integration.SingleWithHoldQueryPojo;
import com.jsjn.jnf.bean.pojo.integration.SingleWithHoldResPojo;
import com.jsjn.jnf.common.config.TradeCode;
import com.jsjn.jnf.common.mapper.JaxbMapper;
import com.jsjn.jnf.common.utils.BeanUtils;
import com.jsjn.jnf.common.utils.HttpClientUtils;
import com.jsjn.jnf.common.utils.JSONUtil;
import com.jsjn.jnf.common.utils.Logger;
import com.jsjn.jnf.common.utils.StringUtils;
import com.jsjn.jnf.integration.bank.SingleWithHoldQueryInterface;
import com.jsjn.jnf.integration.bank.utils.TfbUtils;
import com.jsjn.jnf.service.assist.DictService;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 国彩支付(国彩集团)天付宝 代扣状态查询 实现类--> 【国彩支付】更名为【天下支付】
 * 
 * @author yincy
 * 
 */
public class TfbWithHoldResultQueryImpl implements SingleWithHoldQueryInterface {

	private final static Logger logger = Logger.getLogger(TfbWithHoldResultQueryImpl.class);

	private static DictService dictService = (DictService) ParseSpring.context.getBean("dictServiceImpl");

	@Override
	public SingleWithHoldResPojo withHoldResultQuery(SingleWithHoldQueryPojo pojo) {

		String url = dictService.findByType("TFB_URL_WITHHOLD_QUERY");

		/**
		 * 1.构建查询参数信息
		 */
		logger.debug("天下支付代扣查询构建开始....");
		TfbReqWithHoldQuery tfbReqDto = new TfbReqWithHoldQuery();
		String spid = pojo.getInvestorAccount();
		String spKey = pojo.getInvestorKey();
		String spbillno = StringUtils.substring(pojo.getTranNo(), 1);// 必须为数字，现在做法：将paymentNo的第一位字母T删除
		tfbReqDto.setSpid(spid);
		tfbReqDto.setSpbillno(spbillno);
		// 生成sign值
		tfbReqDto.setMd5_sign(TfbUtils.getReqSign(tfbReqDto, spKey));
		logger.debug("天下支付代扣查询构建结束....");

		String resXml = null;
		try {

			/**
			 * 2.发送http post请求
			 */
			logger.info("天下支付代扣查询发送post请求开始，请求报文信息：" + JSONUtil.toJSONString(tfbReqDto));
			Map<String, String> params = BeanUtils.objectToMap(tfbReqDto);
			resXml = HttpClientUtils.httpPostWithProxy(url,
					params,
					dictService.findByType("PROXY_IP"),
					dictService.findByType("PROXY_PORT"));
			logger.info("天下支付代扣查询发送post请求结束，返回结果信息：" + resXml);

			/**
			 * 3.处理返回结果
			 */
			TfbResWithHoldQuery tfbResDto = JaxbMapper.fromXml(resXml, TfbResWithHoldQuery.class);

			// 校验 response 签名，若不合法，则置为正在处理中状态
			String resSign = TfbUtils.getResSign(tfbResDto, spKey);
			String retMsg = StringUtils.EMPTY;//返回信息
			String resMsg = tfbResDto.getRetmsg();
			//返回码为以下两种情况，需要置为【处理中】: 207594：交易超时  200001：系统繁忙
			if (tfbResDto.getRetcode().equalsIgnoreCase("207594") || tfbResDto.getRetcode().equalsIgnoreCase("200001")) {
				retMsg = "代扣处理中，请稍后再试！【天下支付： " + resMsg + "】";
				logger.error(retMsg);
				return new SingleWithHoldResPojo(TradeCode.TRADE_DEAL.getCode(), retMsg);
			}

			// 如返回结果中没有签名，则说明查询失败。
			if (StringUtils.isEmpty(tfbResDto.getMd5_sign())) {
				retMsg = "代扣失败，【天下支付： " + resMsg + "】";
				logger.error(retMsg);
				return new SingleWithHoldResPojo(TradeCode.TRADE_ERROR.getCode(), retMsg);
			}

			if (!resSign.equals(tfbResDto.getMd5_sign())) {
				retMsg = "代扣处理中，请稍后再试(返回报文签名不合法)！【天下支付： " + resMsg + "】";
				logger.error(retMsg);
				return new SingleWithHoldResPojo(TradeCode.TRADE_DEAL.getCode(), retMsg);
			}
			if ("1".equals(tfbResDto.getResult())) {
				retMsg = "代扣成功，【天下支付： " + resMsg + "】";
				logger.info(retMsg);
				return new SingleWithHoldResPojo(TradeCode.TRADE_SUCCESS.getCode(), retMsg);
			}
			if ("2".equals(tfbResDto.getResult())) {
				retMsg = "代扣处理中，请稍后再试！【天下支付： " + resMsg + "】";
				logger.error(retMsg);
				return new SingleWithHoldResPojo(TradeCode.TRADE_DEAL.getCode(), retMsg);
			}
			if ("3".equals(tfbResDto.getResult())) {
				retMsg = "代扣失败，【天下支付： " + resMsg + "】";
				logger.error(retMsg);
				return new SingleWithHoldResPojo(TradeCode.TRADE_ERROR.getCode(), retMsg);
			}
			throw new Exception("天下支付天付宝代扣查询失败");
		} catch (Exception e) {
			// 交易异常均置为处理中
			logger.error("天下支付代扣系统异常，原因为： " + e.getMessage());
			return new SingleWithHoldResPojo(TradeCode.TRADE_DEAL.getCode(), e.getMessage());
		}
	}
}
