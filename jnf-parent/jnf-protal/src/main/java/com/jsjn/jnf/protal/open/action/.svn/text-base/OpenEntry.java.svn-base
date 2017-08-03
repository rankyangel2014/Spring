package com.jsjn.jnf.protal.open.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.alibaba.fastjson.JSONObject;
import com.jsjn.jnf.bean.bo.bank.BatchWithHoldReqBO;
import com.jsjn.jnf.bean.bo.bank.BatchWithHoldResBO;
import com.jsjn.jnf.bean.bo.bank.QuerySignInfoReqBo;
import com.jsjn.jnf.bean.bo.bank.QuerySignInfoResBo;
import com.jsjn.jnf.bean.bo.bank.QueryWithholdReqBo;
import com.jsjn.jnf.bean.bo.bank.QueryWithholdResBo;
import com.jsjn.jnf.bean.bo.bank.RealtimeBalQueryReqBO;
import com.jsjn.jnf.bean.bo.bank.RealtimeBalQueryResBO;
import com.jsjn.jnf.bean.bo.bank.SingleFlowStateQueryReqBO;
import com.jsjn.jnf.bean.bo.bank.SingleFlowStateQueryResBO;
import com.jsjn.jnf.bean.bo.bank.SinglePaymentTradeReqBO;
import com.jsjn.jnf.bean.bo.bank.SinglePaymentTradeResBO;
import com.jsjn.jnf.bean.bo.bank.SingleWithHoldReqBO;
import com.jsjn.jnf.bean.bo.bank.SingleWithHoldResBO;
import com.jsjn.jnf.bean.bo.bankCard.BankCardValidateReqBO;
import com.jsjn.jnf.bean.bo.bankCard.BankCardValidateResBO;
import com.jsjn.jnf.bean.bo.bankCard.CardInfoQueryReqBO;
import com.jsjn.jnf.bean.bo.bankCard.CardInfoQueryResBO;
import com.jsjn.jnf.bean.bo.base.BaseOpenReqBO;
import com.jsjn.jnf.bean.bo.base.BaseOpenResBO;
import com.jsjn.jnf.bean.bo.base.ErrorOpenResBO;
import com.jsjn.jnf.bean.bo.cardBin.CardBinQueryReqBO;
import com.jsjn.jnf.bean.bo.cardBin.CardBinQueryResBO;
import com.jsjn.jnf.bean.bo.contract.ContractUnbindReqBO;
import com.jsjn.jnf.bean.bo.contract.ContractUnbindResBO;
import com.jsjn.jnf.bean.bo.orgBusiness.OrgBusinessReqBO;
import com.jsjn.jnf.bean.bo.orgBusiness.OrgBusinessResBO;
import com.jsjn.jnf.bean.bo.paymentTransaction.PaymentTransactionReqBO;
import com.jsjn.jnf.bean.bo.paymentTransaction.PaymentTransactionResBO;
import com.jsjn.jnf.bean.bo.realname.RealNameReqBO;
import com.jsjn.jnf.bean.bo.realname.RealNameResBO;
import com.jsjn.jnf.bean.bo.signWithhold.SignWithholdReqBO;
import com.jsjn.jnf.bean.bo.signWithhold.SignWithholdResBO;
import com.jsjn.jnf.bean.bo.statement.StatementReqBO;
import com.jsjn.jnf.bean.bo.statement.StatementResBO;
import com.jsjn.jnf.bean.bo.trade.SinglPayStatusReqBO;
import com.jsjn.jnf.bean.bo.trade.SinglPayStatusResBO;
import com.jsjn.jnf.bean.bo.trade.TradeFlowReqBO;
import com.jsjn.jnf.bean.bo.trade.TradeFlowResBO;
import com.jsjn.jnf.bean.bo.trade.WithHoldReqBO;
import com.jsjn.jnf.bean.bo.trade.WithHoldResBO;
import com.jsjn.jnf.bean.bo.withhold.QueryOrgCardNoReqBo;
import com.jsjn.jnf.bean.bo.withhold.QueryOrgCardNoResBo;
import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.common.config.SecurityReturnCode;
import com.jsjn.jnf.common.mapper.JaxbMapper;
import com.jsjn.jnf.common.utils.HttpUtils;
import com.jsjn.jnf.protal.security.RequestVerifyedFilter;
import com.jsjn.jnf.protal.security.SecurityCheck;
import com.jsjn.log4p.pandaclient.Log4pPandaClient;
import com.jsjn.panda.client.Result;

/**
 * 
 * @author ZSMJ OPENAPI 入口处理类(唯一)
 */
@Controller
@RequestMapping(value = "/jnf")
public class OpenEntry {

	private final static Logger logger = Logger.getLogger(OpenEntry.class);

	/**
	 * OpenApi入口处理函数
	 * 
	 * @param req
	 * @param rsp
	 */
	@SuppressWarnings({ "rawtypes" })
	@RequestMapping(value = "/getway", method = RequestMethod.POST)
	public void openEntry(HttpServletRequest req, HttpServletResponse rsp) {

		// 请求合法性校验
		String returnCode = securityCheck(req, rsp);
		if (!returnCode.equals(SecurityReturnCode.SUCCESS.getCode())) {
			returnError(rsp, returnCode);
			return;
		}

		// 接口名称
		String service = req.getAttribute("service").toString();
		// 商户号
		String mid = req.getAttribute("mid").toString();
		// 初始请求XML报文
		String reqXMLData = req.getAttribute("reqXMLData").toString();

		logger.info("请求开始，输出请求报文：" + reqXMLData);

		// 请求DTO
		BaseOpenReqBO inDto = new BaseOpenReqBO();
		// 响应DTO
		BaseOpenResBO outDto = new BaseOpenResBO();
		// PandaCLient调用Service
		Result result = null;
		if (service.equals("realNameAuthBy4Element")) {
			inDto = JaxbMapper.fromXml(reqXMLData, RealNameReqBO.class);
			outDto = new RealNameResBO();
		} else if (service.equals("realNameAuthByMessage")) {
			inDto = JaxbMapper.fromXml(reqXMLData, RealNameReqBO.class);
			outDto = new RealNameResBO();
		} else if (service.equals("cardBINQuery")) {//卡BIN查询
			inDto = JaxbMapper.fromXml(reqXMLData, CardBinQueryReqBO.class);
			outDto = new CardBinQueryResBO();
		} else if (service.equals("tradeFlowQuery")) {
			inDto = JaxbMapper.fromXml(reqXMLData, TradeFlowReqBO.class);
			outDto = new TradeFlowResBO();
		} else if (service.equals("singlePaymentQuery")) {
			inDto = JaxbMapper.fromXml(reqXMLData, SinglPayStatusReqBO.class);
			outDto = new SinglPayStatusResBO();
		} else if (service.equals("withHolding")) {
			inDto = JaxbMapper.fromXml(reqXMLData, WithHoldReqBO.class);
			outDto = new WithHoldResBO();
		} else if (service.equals("contractUnbinding")) {
			inDto = JaxbMapper.fromXml(reqXMLData, ContractUnbindReqBO.class);
			outDto = new ContractUnbindResBO();
		} else if (service.equals("bankSinglePaymentTrade")) {
			inDto = JaxbMapper.fromXml(reqXMLData, SinglePaymentTradeReqBO.class);
			outDto = new SinglePaymentTradeResBO();
		} else if (service.equals("bankSingleFlowStateQuery")) {
			inDto = JaxbMapper.fromXml(reqXMLData, SingleFlowStateQueryReqBO.class);
			outDto = new SingleFlowStateQueryResBO();
		} else if (service.equals("bankRealtimeBalanceQuery")) {
			inDto = JaxbMapper.fromXml(reqXMLData, RealtimeBalQueryReqBO.class);
			outDto = new RealtimeBalQueryResBO();
		} else if (service.equals("bankSingleFlowStateQuery")) {
			inDto = JaxbMapper.fromXml(reqXMLData, SingleFlowStateQueryReqBO.class);
			outDto = new SingleFlowStateQueryResBO();
		} else if (service.equals("bankRealtimeBalanceQuery")) {
			inDto = JaxbMapper.fromXml(reqXMLData, RealtimeBalQueryReqBO.class);
			outDto = new RealtimeBalQueryResBO();
		} else if (service.equals("querySignState")) {
			inDto = JaxbMapper.fromXml(reqXMLData, QuerySignInfoReqBo.class);
			outDto = new QuerySignInfoResBo();
		} else if (service.equals("queryWithholdState")) {
			inDto = JaxbMapper.fromXml(reqXMLData, QueryWithholdReqBo.class);
			outDto = new QueryWithholdResBo();
		} else if (service.equals("singleWithHold")) {
			inDto = JaxbMapper.fromXml(reqXMLData, SingleWithHoldReqBO.class);
			outDto = new SingleWithHoldResBO();
		} else if (service.equals("batchWithHold")) {
			//批量代扣
			inDto = JaxbMapper.fromXml(reqXMLData, BatchWithHoldReqBO.class);
			outDto = new BatchWithHoldResBO();
		} else if (service.equals("verifyAcct")) {
			//对账
			inDto = JaxbMapper.fromXml(reqXMLData, StatementReqBO.class);
			outDto = new StatementResBO();
		} else if (service.equals("queryInsttuCardNo")) {
			inDto = JaxbMapper.fromXml(reqXMLData, QueryOrgCardNoReqBo.class);
			outDto = new QueryOrgCardNoResBo();
		} else if (StringUtils.equals(service, "bankCardInfoQuery")) {//卡BIN查询
			inDto = JaxbMapper.fromXml(reqXMLData, CardInfoQueryReqBO.class);
			outDto = new CardInfoQueryResBO();
		} else if (StringUtils.equals(service, "bankCardValidate")) {//四要素认证
			inDto = JaxbMapper.fromXml(reqXMLData, BankCardValidateReqBO.class);
			outDto = new BankCardValidateResBO();
		} else if (StringUtils.equals(service, "orgBusinessTypeQry")) {//验证机构是否支持代扣或者代付
			inDto = JaxbMapper.fromXml(reqXMLData, OrgBusinessReqBO.class);
			outDto = new OrgBusinessResBO();
		} else if (StringUtils.equals(service, "signWithhold")) {//签代扣协议
			inDto = JaxbMapper.fromXml(reqXMLData, SignWithholdReqBO.class);
			outDto = new SignWithholdResBO();
		} else if (StringUtils.equals(service, "paymentTransaction")) {//放款（单笔转账交易）
			inDto = JaxbMapper.fromXml(reqXMLData, PaymentTransactionReqBO.class);
			outDto = new PaymentTransactionResBO();
		}

		// 将请求XML封装在inDTO中，支付二次验签时用到
		inDto.setXml(reqXMLData);
		inDto.setMid(mid);

		try {
			result = Log4pPandaClient.invoke(Global.SERVICE_PANDA_ID, service, inDto);
		} catch (Exception e) {
			logger.error("Panda远程调用" + service + "接口失败！,", e);
			returnError(rsp, SecurityReturnCode.SYS_BUSY.getCode());
			return;
		}

		// 获取响应数据
		outDto = JSONObject.parseObject(result.getResult(), outDto.getClass());
		// 响应业务数据
		String resDataXML = "";
		if (outDto.getResData() != null) {
			resDataXML = JaxbMapper.toXml(outDto.getResData(), false);
		} else if (outDto.getResDatas() != null) {
			resDataXML = JaxbMapper.toXml(outDto.getResDatas(), "resDatas", false);
		}

		// 加签(顺序不能调整)
		String signContent = outDto.getResCode() + resDataXML + outDto.getResMsg();
		outDto.setSign(sign(signContent));

		// 转换为XML格式报文
		String resXML = JaxbMapper.toXml(outDto, false);
		logger.info("请求结束，输出响应报文" + resXML);
		// 输出响应信息
		HttpUtils.writeRespToPage(resXML, rsp);
	}

	/**
	 * 加签
	 * 
	 * @param signContent
	 * @return
	 */
	public String sign(String signContent) {
		Result result = null;
		try {
			result = Log4pPandaClient.invoke(Global.SERVICE_PANDA_ID, "RSASign", signContent, "log");
		} catch (Exception e) {
			logger.error("Panda远程调用加签程序接口失败！", e);
			return "";
		}
		return result.getResult();

	}

	/**
	 * 封装失败信息
	 * 
	 * @param dto
	 *            封装返回信息的DTO
	 * @param returnCode
	 *            响应码
	 */
	private void returnError(HttpServletResponse rsp, String returnCode) {
		ErrorOpenResBO dto = new ErrorOpenResBO();
		dto.setResCode(returnCode);
		dto.setResMsg(SecurityReturnCode.getMsg(returnCode));
		dto.setResData("");

		String signContent = dto.getResCode() + "<resData></resData>" + dto.getResMsg();
		dto.setSign(sign(signContent));
		String resXML = JaxbMapper.toXml(dto, false);
		logger.info("请求结束，输出响应报文" + resXML);
		HttpUtils.writeRespToPage(resXML, rsp);
	}

	/**
	 * 请求合法性校验
	 * 
	 * @param req
	 * @param rsp
	 * @param dto
	 * @return
	 * @throws Exception
	 */
	public String securityCheck(HttpServletRequest req, HttpServletResponse rsp) {
		return SecurityCheck.verify(req,
				SecurityCheck.VERIFY_TYPE_OPEN,
				RequestVerifyedFilter.table,
				RequestVerifyedFilter.list);
	}

}
