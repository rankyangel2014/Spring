package com.jsjn.jnf.bussiness.trade.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.common.config.TabsConstant;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.jnf.common.security.Cryptos;
import com.jsjn.jnf.common.security.VerifyRSASign;
import com.jsjn.jnf.common.utils.DateUtils;
import com.jsjn.jnf.common.utils.SensitiveInfoUtils;
import com.jsjn.jnf.common.utils.StringUtils;
import com.jsjn.jnf.common.utils.ValidatorUtil;
import com.jsjn.jnf.integration.interfaces.IntermediateSystem;
import com.jsjn.jnf.integration.realname.CardBinInterface;
import com.jsjn.jnf.integration.withhold.WithHoldInterface;
import com.jsjn.jnf.bean.bo.contract.ContractUnbindReqBO;
import com.jsjn.jnf.bean.bo.contract.ContractUnbindReqDataBO;
import com.jsjn.jnf.bean.bo.contract.ContractUnbindResBO;
import com.jsjn.jnf.bean.bo.integration.CardBinRspDto;
import com.jsjn.jnf.bean.bo.integration.WhiteListSignReqDto;
import com.jsjn.jnf.bean.bo.integration.WhiteListSignRspDto;
import com.jsjn.jnf.bean.bo.integration.WithholdStatusRspDto;
import com.jsjn.jnf.bean.bo.trade.SinglPayStatusDataBO;
import com.jsjn.jnf.bean.bo.trade.SinglPayStatusReqBO;
import com.jsjn.jnf.bean.bo.trade.SinglPayStatusResBO;
import com.jsjn.jnf.bean.bo.trade.TradeFlowReqDataBO;
import com.jsjn.jnf.bean.bo.trade.TradeFlowReqBO;
import com.jsjn.jnf.bean.bo.trade.TradeFlowResBO;
import com.jsjn.jnf.bean.bo.trade.TradeFlowResDataBO;
import com.jsjn.jnf.bean.bo.trade.WithHoldReqBO;
import com.jsjn.jnf.bean.bo.trade.WithHoldReqDataBO;
import com.jsjn.jnf.bean.bo.trade.WithHoldResBO;
import com.jsjn.jnf.bean.bo.trade.WithHoldResDataBO;
import com.jsjn.jnf.bean.dto.account.BindCardDto;
import com.jsjn.jnf.bean.dto.assist.BizConfigDto;
import com.jsjn.jnf.bean.dto.member.MemberDto;
import com.jsjn.jnf.bean.dto.payment.PaymentDto;
import com.jsjn.jnf.bean.dto.trade.TransactionDto;
import com.jsjn.jnf.service.account.BindCardService;
import com.jsjn.jnf.service.assist.BusinessConfigService;
import com.jsjn.jnf.service.assist.DictService;
import com.jsjn.jnf.service.assist.LockService;
import com.jsjn.jnf.service.assist.ReqXmlService;
import com.jsjn.jnf.service.assist.utils.SequenceUtils;
import com.jsjn.jnf.service.member.MemberService;
import com.jsjn.jnf.service.payment.PaymentService;
import com.jsjn.jnf.service.trade.TransactionService;
import com.jsjn.jnf.bussiness.trade.TradeService;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 交易SERVICE实现
 * 作废
 * 
 * @author ZSMJ
 * 
 */
@Service
@Transactional(readOnly = true)
public class TradeServiceImpl implements TradeService {

	private final static Logger logger = Logger.getLogger(TradeServiceImpl.class);
	private MemberService ms = (MemberService) ParseSpring.context.getBean("memberServiceImpl");
	private LockService ls = (LockService) ParseSpring.context.getBean("lockServiceImpl");
	private ReqXmlService rxs = (ReqXmlService) ParseSpring.context.getBean("reqXmlServiceImpl");
	private PaymentService ps = (PaymentService) ParseSpring.context.getBean("paymentServiceImpl");
	private BusinessConfigService bcs = (BusinessConfigService) ParseSpring.context.getBean("businessConfigServiceImpl");
	private DictService ds = (DictService)ParseSpring.context.getBean("dictServiceImpl");
	private TransactionService ts = (TransactionService) ParseSpring.context.getBean("transactionServiceImpl");
	private BindCardService bs = (BindCardService) ParseSpring.context.getBean("bindCardServiceImpl");
	private CardBinInterface ci = (CardBinInterface) ParseSpring.context.getBean("cardBinInterfaceImpl");

	@Override
	public SinglPayStatusResBO singlePaymentQuery(SinglPayStatusReqBO dto) {
		// 获取业务请求主体
		SinglPayStatusDataBO reqDataDto = dto.getReqData();
		// 返回DTO
		SinglPayStatusResBO resDto = new SinglPayStatusResBO();
		SinglPayStatusDataBO resDataDto = new SinglPayStatusDataBO();
		
		// 插入报文表，防止一次报文多次发送（防直接调用SERVICE层）
		if(!rxs.insertReqXML(dto.getXml())){
			logger.error("插入请求报文表失败" + dto.getXml());
			return returnSinglPayError(ReturnCode.FAIL,"请求报文重复,请核实！");
		}

		// 校验必送字段
		String[] propertys = { "tranNo" };
		String errMsg = ValidatorUtil.validpropertys(reqDataDto, propertys);
		if (!StringUtils.isBlank(errMsg)) {
			logger.error("校验查询单笔代扣状态请求参数错误" + errMsg);
			return returnSinglPayError(ReturnCode.FAIL,errMsg);
		}

		// 获取查询结果集
		String tradeNo = reqDataDto.getTranNo();
		String mid = dto.getMid();
		TransactionDto tmp = null;
		try{
			tmp = ts.queryTransactionByTradeNo(mid, tradeNo);
		}catch(BussinessException e){
		    logger.error("查询交易信息出错！" + e.getMessage());
			return returnSinglPayError(e.getErrorCode(),e.getMessage());
		}

		resDto.setResCode(ReturnCode.SUCCESS);
		resDto.setResMsg("查询支付状态成功");
		resDataDto.setTranNo(tmp.getTradeNo());
		resDataDto.setStatus(tmp.getStatus());

		resDto.setResData(resDataDto);

		return resDto;
	}
	
	private SinglPayStatusResBO returnSinglPayError(String errCode , String errMsg){
		SinglPayStatusResBO resDto = new SinglPayStatusResBO();
		SinglPayStatusDataBO resDataDto = new SinglPayStatusDataBO();
		
		resDto.setResCode(errCode);
		resDto.setResMsg(errMsg);
		resDto.setResData(resDataDto);
		return resDto;
	}
	
	@Override
	public TradeFlowResBO tradeFlowQuery(TradeFlowReqBO dto) {
		// 获取业务请求主体
		TradeFlowReqDataBO reqDataDto = dto.getReqData();
		// 返回DTO
		TradeFlowResBO resDto = new TradeFlowResBO();
		List<TradeFlowResDataBO> resDatasDto = new ArrayList<TradeFlowResDataBO>();
		
		// 插入报文表，防止一次报文多次发送（防直接调用SERVICE层）
		if(!rxs.insertReqXML(dto.getXml())){
			logger.error("插入请求报文表失败" + dto.getXml());
			return returnTradeFlowError(ReturnCode.FAIL,"请求报文重复,请核实！");
		}

		String mid = dto.getMid();
		String startDt = reqDataDto.getStartDt();
		String endDt = reqDataDto.getEndDt();

		// 校验必送字段（只支持一天交易流水）
		String[] propertys = { "startDt", "endDt" };
		String errMsg = ValidatorUtil.validpropertys(reqDataDto, propertys);
		if (!StringUtils.isBlank(errMsg) || !startDt.equals(endDt)) {
			logger.error("校验查询交易流水请求参数错误" + (!StringUtils.isBlank(errMsg) ? errMsg : "只支持查询一日交易流水"));
			return returnTradeFlowError(ReturnCode.FAIL,!StringUtils.isBlank(errMsg) ? errMsg : "只支持查询一日交易流水");
		}

		List<TransactionDto> list = null;
		
		try{
			list = ts.tradeFlowQuery(mid, startDt, endDt);
		}catch(BussinessException e){
		    logger.error("查询交易流水失败!" + e.getMessage());
			return returnTradeFlowError(e.getErrorCode(),e.getMessage());
		}

		TransactionDto tmp = null;
		for (int i = 0; i < list.size(); i++) {
			tmp = list.get(i);
			// 封装返回业务数据
			TradeFlowResDataBO tradeTmp = new TradeFlowResDataBO();
			tradeTmp.setTranNo(tmp.getTradeNo());
			tradeTmp.setRecType(tmp.getTradeType());
			tradeTmp.setCustNo(tmp.getPayer());
			tradeTmp.setCustName(tmp.getPayerName());
			tradeTmp.setAmount(tmp.getAmount());
			tradeTmp.setStatus(tmp.getStatus());
//			tradeTmp.setStartTime(DateUtils.formatDate(tmp.getCreated(), "yyyyMMdd"));
//			tradeTmp.setEndTime(DateUtils.formatDate(tmp.getModified(), "yyyyMMdd"));
			tradeTmp.setBankCardNo(Cryptos.aesDecrypt(tmp.getPayerBankCardNo()));

			resDatasDto.add(tradeTmp);
		}
		
		resDto.setResCode(ReturnCode.SUCCESS);
		resDto.setResMsg("查询交易流水成功");
		resDto.setResDatas(resDatasDto);

		return resDto;
	}
	
	private TradeFlowResBO returnTradeFlowError(String errCode , String errMsg){
		TradeFlowResBO resDto = new TradeFlowResBO();
		List<TradeFlowResDataBO> resDatasDto = new ArrayList<TradeFlowResDataBO>();
		resDto.setResCode(errCode);
		resDto.setResMsg(errMsg);
		resDto.setResDatas(resDatasDto);
		return resDto;
	}

	@Override
	public WithHoldResBO withHolding(WithHoldReqBO dto) {
		TradeService transService = (TradeService) ParseSpring.context.getBean("tradeServiceImpl");
		// 响应DTO
		WithHoldResBO resDto = new WithHoldResBO();
		WithHoldResDataBO resDataDto = new WithHoldResDataBO();
		try {
			resDataDto = transService.getSinglPayResData(dto);
			resDto.setResCode(ReturnCode.SUCCESS);
			resDto.setResMsg("业务编号为" + resDataDto.getSerialNo() + "代扣受理成功！");
		} catch (Exception e) {
			resDto.setResCode(ReturnCode.FAIL);
			resDto.setResMsg(e.getMessage());
		}
		resDto.setResData(resDataDto);
		return resDto;
	}

	/**
	 * 此处需要开启一个新的事物，而不采用延续上一个事物的策略
	 * 防止此事物抛出异常后将事物标记为roll-back only
	 * 获取代扣响应数据 代扣接口流程如下： 
	 * 1、二次验签 
	 * 2、校验该用户是否进行签约绑卡 
	 * 3、锁表（交易表） 
	 * 4、插入交易表 
	 * 5、插入支付表
	 * 6、调用集成层（代扣接口）
	 * 
	 * @throws Exception
	 */
	@Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW,rollbackFor = { RuntimeException.class,Exception.class })
	@Override
	public WithHoldResDataBO getSinglPayResData(WithHoldReqBO reqDto) throws Exception {
		// 获取业务请求主体
		WithHoldReqDataBO reqDataDto = reqDto.getReqData();
		WithHoldResDataBO resDataDto = new WithHoldResDataBO();

		// 插入报文表，防止一次报文多次发送（防直接调用SERVICE层）
		if(!rxs.insertReqXML(reqDto.getXml())){
			logger.error("插入请求报文表失败" + reqDto.getXml());
			throw new Exception("请求报文重复,请核实！");
		}
		
		// 校验必送字段
		String[] propertys = { "serialNo", "loanNo", "cardSignNo", "custNo",
				"custName", "bankName", "bankCardNo", "amount" };
		String errMsg = ValidatorUtil.validpropertys(reqDataDto, propertys);
		if (!StringUtils.isBlank(errMsg)) {
			logger.error("执行代扣操作请求参数不合法！" + errMsg);
			throw new Exception(errMsg);
		}

		/**
		 * ******************************二次验签****************************
		 */
		String reqXMLData = reqDto.getXml();
		BizConfigDto config = new BizConfigDto();
		config.setMid(reqDto.getMid());
		String publicKey = bcs.queryBussinessConfig(config).getRsaPubKey();
		if (!VerifyRSASign.verifySign(reqXMLData, publicKey)) {
			logger.error("验签失败，请求拒绝！！");
			throw new Exception("二次验签失败，本次交易存在风险！");

		}

		/**
		 * *************************校验该户用是否绑卡*************************
		 */
		// 用户绑卡信息
		BindCardService bindCardService = (BindCardService) ParseSpring.context.getBean("bindCardServiceImpl");
		String custId = reqDataDto.getCustNo();
		String mid = reqDto.getMid();
		String payerBankCardNo = reqDataDto.getBankCardNo();

		BindCardDto bindCDDto = bindCardService.queryBindCardInfo(custId, mid, Cryptos.aesEncrypt(payerBankCardNo));
		
		if (!bindCDDto.getAid().equals(reqDataDto.getCardSignNo())) {
		    logger.error("签约号" + reqDataDto.getCardSignNo() + "与实际不符！");
			throw new Exception("请求报文中签约号" + reqDataDto.getCardSignNo() + "与实际签约号不符！");
		}
		
		/**
         * 校验银行名称是否正确
         */
		if (!bindCDDto.getBankName().equals(reqDataDto.getBankName())) {
		    logger.error("银行名称" + reqDataDto.getBankName() + "与实际不符！");
            throw new Exception("请求报文中银行名称" + reqDataDto.getBankName() + "与实际签约签约银行名称不符！");
        }

		/**
		 * ****************************锁表(交易表)***************************
		 */
		try {
			ls.insertLock(mid, TabsConstant.LOCK_TYPE_TRANSACTION.val(), reqDataDto.getSerialNo());
		} catch (Exception e) {
			logger.error("存在相同商户业务编号为" + reqDataDto.getSerialNo() + "的代扣交易,请核实！", e);
			throw new Exception("存在相同商户业务编号为" + reqDataDto.getSerialNo() + "的代扣交易,请核实！");
		}

		/**
		 * *****************************插入交易表****************************
		 */
		// 付款人信息
		String custName = reqDataDto.getCustName();
		MemberDto payerInfo = ms.queryMemberById(custId);
		
		if (!Cryptos.aesDecrypt(payerInfo.getCustName()).equals(custName)) {
			logger.error("请求报文中客户名称" + custName + "与客户号" + custId + "的客户名称"
					+ Cryptos.aesDecrypt(payerInfo.getCustName()) + "不符！");
			throw new Exception("请求报文中客户名称" + custName + "与客户号" + custId + "的客户名称不符！");
		}

		// 收款人信息
		MemberDto payeeInfo = ms.queryInvestInfo(mid);
		
		/**
         * 根据mId获取机构码
         */
        String orgNo = ms.findOrgNo(mid);
		
		// 交易信息
		// 生成交易订单编号
		String tradeNo = SequenceUtils.getTrasaction(reqDto.getMid(), "01");

		TransactionDto transDto = new TransactionDto();
		transDto.setTradeNo(tradeNo);
		transDto.setbNo(SequenceUtils.getTrasactionBNo());
		transDto.setTradeType(TabsConstant.TRANSACTION_TRADETYPE_WITHHOLD.val());
		transDto.setMid(reqDto.getMid());
		transDto.setMSerialNo(reqDataDto.getSerialNo());
		transDto.setExternLoanNo(reqDataDto.getLoanNo());
		transDto.setPayer(custId);
		transDto.setPayerName(payerInfo.getCustName());
		transDto.setPayerBankCardNo(bindCDDto.getBankCardNo());
		transDto.setPayee(payeeInfo.getCustId());
		transDto.setPayeeName(payeeInfo.getCustName());
		transDto.setAmount(reqDataDto.getAmount());
		transDto.setStatus(TabsConstant.TRANSACTION_STATUS_DEAL.val());
		transDto.setFailReason("");
		transDto.setDesc(DateUtils.getDate() + " 代扣客户号：" + transDto.getPayer() + "姓名：" + transDto.getPayerName()
				+ " 金额：" + transDto.getAmount());
		transDto.setDigest(transDto.buildDigest());
		transDto.setOrgNo(orgNo);
		
		// 插入交易表
		try {
			ts.insertTransaction(transDto);
		} catch (Exception e) {
			logger.error("插入交易表失败" + transDto.toString(), e);
			throw new Exception("新增交易失败！");
		}

		/**
		 * *****************************插入支付表****************************
		 */
		// 支付信息
		String orderNo = SequenceUtils.getPaymentOrder(reqDto.getMid(), "01");
		PaymentDto paymentDto = new PaymentDto();
		paymentDto.setOrderNo(orderNo);
		paymentDto.setOrderType(TabsConstant.PAYMENT_ORDERTYPE_WITHHOLD.val());
		paymentDto.setTradeNo(tradeNo);
		paymentDto.setPayer(custId);
		paymentDto.setPayBank(bindCDDto.getBankName());
		paymentDto.setPayAccount(payerBankCardNo);
		paymentDto.setPayee(payeeInfo.getCustId());
		paymentDto.setCollBank("");
		paymentDto.setCollAccount("");
		paymentDto.setAmount(reqDataDto.getAmount());
		paymentDto.setStatus(TabsConstant.PAYMENT_ORDER_STATUS_DEAL.val());
		paymentDto.setChannel(TabsConstant.PAYMENT_ORDER_CHANNEL_UNION.val());
		paymentDto.setDigest(paymentDto.buildDigest());
		paymentDto.setMid(mid);
		paymentDto.setOrgNo(orgNo);

		// 插入支付表
		try {
			ps.createOrder(paymentDto);
		} catch (Exception e) {
			logger.error("插入支付表失败" + paymentDto.toString(), e);
			throw new Exception("新增支付失败！");
		}

		/**
		 * *****************************调用集成层****************************
		 */
		WithHoldInterface withHoldInterface = (WithHoldInterface) ParseSpring.context.getBean("withHoldInterfaceImpl");
		// 将状态置为初始值（处理中）
		String status = paymentDto.getStatus();
		try {
			withHoldInterface.withHolding(orderNo, bindCDDto.getSignNo(), reqDto,orgNo);
		} catch (Exception e) {
			logger.error("支付订单编号为" + orderNo + "在调用集成层时发生异常..." + e.getMessage(), e);
			throw new Exception(e.getMessage());
		} finally {
			resDataDto.setSerialNo(reqDataDto.getSerialNo());
			resDataDto.setTranNo(tradeNo);
			resDataDto.setStatus(status);
		}
		return resDataDto;
	}

	

	@Override
	public void withHoldingTimerTask() {
		List<PaymentDto> list = ps.queryOrdersByStatus(TabsConstant.PAYMENT_ORDER_STATUS_DEAL.val());
		for (int i = 0; i < list.size(); i++) {
			String orderNo = list.get(i).getOrderNo();
			String tradeNo = list.get(i).getTradeNo();
			String orgNo = list.get(i).getOrgNo();
			try {
				withHoldingCallBack(orderNo, tradeNo,orgNo);
			} catch (Exception e) {
				logger.error("执行支付号为[" + orderNo + "]的支付回调失败！", e);
			}
		}
	}

	/**
	 * 此处需要新开启一个事物
	 * 每笔交易都是一个新事物
	 * @param orderNo
	 * @param tradeNo
	 * @throws Exception
	 */
	@Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW, rollbackFor = { RuntimeException.class,
			Exception.class })
	public void withHoldingCallBack(String orderNo, String tradeNo,String orgNo) throws Exception {
		WithholdStatusRspDto resDto = IntermediateSystem.withholdStatusQry(orderNo,orgNo);
		String status = resDto.getStatus();

		/**
		 * 交易成功：000000 交易失败： 重复交易： 同一个订单号，如果前一次状态成功，就返回992403
		 * 同一个订单号，如果前一次状态未知，则返回990014
		 */

		if (status.equals("000000") || status.equals("992403"))
			status = "2";
		if (status.equals("990014"))
			status = "1";
		else
			status = "9";

		if (status.equals(TabsConstant.PAYMENT_ORDER_STATUS_FAIL.val())) {
			TransactionDto traDto = ts.queryTransactionByTradeNo(tradeNo);
			// 删除交易锁
			ls.deleteLock(traDto.getMid(), TabsConstant.LOCK_TYPE_TRANSACTION.val(), traDto.getMSerialNo());
			// 删除支付锁
			ls.deleteLock(traDto.getMid(), TabsConstant.LOCK_TYPE_PAYMENT.val(), orderNo);
		}

		// 更新交易表状态
		TransactionDto TraTmp = ts.queryTransactionByTradeNo(tradeNo);
		TraTmp.setStatus(status);
		String digest = TraTmp.buildDigest();
		String failReason = !status.equals(TabsConstant.TRANSACTION_STATUS_FAIL.val()) ? null : resDto.getResMsg();
		
		ts.updateTransactionByTradeNo(tradeNo, status, digest, failReason, null,null);

		// 更新支付表表状态
		PaymentDto payTmp = ps.queryOrderByOrderNo(orderNo);
		payTmp.setStatus(resDto.getStatus());
		digest = payTmp.buildDigest();
		
		ps.updatePaymentByOrderNo(orderNo, status, digest, failReason,null);
	}

	@Override
	public List<TransactionDto> queryTransactionByCondition(TransactionDto transactionDto) throws Exception {
		/**
		 * 交易信息查询（列表） 一、根据state判断，0：查询所有，1：查询异常 二、查询所有 1、对查询条件进行判断。
		 * 如果都有，amountMin <= amountMax; modifiedMin<=modifiedMax
		 * 2、SQL查询，做摘要比对操作。（在dto中新加入是否被篡改字段） 前端根据该字段，将篡改记录特殊显示
		 * 3、若数据没有篡改，对敏感数据（付款人，收款人）过滤显示。 
		 * 三、查询异常 
		 * （超出预定时间的 状态为处理中：1的数据）
		 * 1、对查询条件进行判断。 如果都有，amountMin <= amountMax; modifiedMin<=modifiedMax
		 * 2、 查询字典表t12中，配置的预定时间
		 * 3、SQL查询（查询条件 + 配置时间），做摘要比对操作。（在dto中新加入是否被篡改字段）
		 * 前端根据该字段，将篡改记录特殊显示 （Cryptos.aesDecrypt解密）
		 * 4、若数据没有篡改，对敏感数据（付款人，收款人）过滤显示。
		 */
		String amountMin = transactionDto.getAmountMin();
		String amountMax = transactionDto.getAmountMax();
		String modifiedMin = transactionDto.getModifiedMin();
		String modifiedMax = transactionDto.getModifiedMax();
		String state = transactionDto.getQryFlag();
		
		if(!StringUtils.isBlank(amountMin) && !StringUtils.isBlank(amountMax)){
			if(Double.parseDouble(amountMin) > Double.parseDouble(amountMax)){
				logger.error("交易金额输入有误！");
				throw new Exception("交易金额输入有误！");
			}
		}
		if(!StringUtils.isBlank(modifiedMin) && !StringUtils.isBlank(modifiedMax)){
			if(Integer.parseInt(modifiedMin) > Integer.parseInt(modifiedMax)){
				logger.error("交易时间输入有误！");
				throw new Exception("交易时间输入有误！");
			}
		}
		List<TransactionDto> list = null;
		if ("0".equals(state)) {
			//查询所有
			list = ts.queryTransactionByCondition(transactionDto);
			for(TransactionDto dto : list){
			    /**
			     * 注：将经过拦截器得到的总页数total值设置到查询结果集中。用于分页
			     */
			    dto.setTotal(transactionDto.getTotal());
				if (!StringUtils.equals(dto.getDigest(), dto.buildDigest())) {
				    logger.info("数据被篡改..." + "数据库摘要：" + dto.getDigest() + ";现摘要:" + dto.buildDigest());
					dto.setValid(false);
					dto.setPayer(SensitiveInfoUtils.cnapsCode(dto.getPayer()));
	                dto.setPayerName(SensitiveInfoUtils.chineseName(Cryptos.aesDecrypt(dto.getPayerName())));
	                dto.setPayee(SensitiveInfoUtils.cnapsCode(dto.getPayee()));
	                dto.setPayeeName(SensitiveInfoUtils.chineseName(Cryptos.aesDecrypt(dto.getPayeeName())));
	                dto.setPayerBankCardNo(SensitiveInfoUtils.bankCard(Cryptos.aesDecrypt(dto.getPayerBankCardNo())));
					dto.setResCode(ReturnCode.FAIL);
					dto.setResMsg("交易订单号为" + dto.getTradeNo() + "数据异常");
					continue;
				}
				dto.setValid(true);
				dto.setPayer(SensitiveInfoUtils.cnapsCode(dto.getPayer()));
				dto.setPayerName(SensitiveInfoUtils.chineseName(Cryptos.aesDecrypt(dto.getPayerName())));
				dto.setPayee(SensitiveInfoUtils.cnapsCode(dto.getPayee()));
				dto.setPayeeName(SensitiveInfoUtils.chineseName(Cryptos.aesDecrypt(dto.getPayeeName())));
				dto.setPayerBankCardNo(SensitiveInfoUtils.bankCard(Cryptos.aesDecrypt(dto.getPayerBankCardNo())));
			}
			
		} else if ("1".equals(state)) {
			//查询异常
			String overDay = ds.findByType("EXCEPTION_OVERTIME");
			if(StringUtils.equals(overDay, null)){
				overDay = "1";
			}
			transactionDto.setDay(overDay);
			list = ts.queryExceptionTransaction(transactionDto);
			for(TransactionDto dto : list){
			    /**
                 * 注：将经过拦截器得到的总页数total值设置到查询结果集中。用于分页
                 */
                dto.setTotal(transactionDto.getTotal());
				if (!StringUtils.equals(dto.getDigest(), dto.buildDigest())) {
				    logger.info("数据被篡改..." + "数据库摘要：" + dto.getDigest() + ";现摘要:" + dto.buildDigest());
					dto.setValid(false);
					dto.setPayer(SensitiveInfoUtils.cnapsCode(dto.getPayer()));
	                dto.setPayerName(SensitiveInfoUtils.chineseName(Cryptos.aesDecrypt(dto.getPayerName())));
	                dto.setPayee(SensitiveInfoUtils.cnapsCode(dto.getPayee()));
	                dto.setPayeeName(SensitiveInfoUtils.chineseName(Cryptos.aesDecrypt(dto.getPayeeName())));
	                dto.setPayerBankCardNo(SensitiveInfoUtils.bankCard(Cryptos.aesDecrypt(dto.getPayerBankCardNo())));
					dto.setResCode(ReturnCode.FAIL);
					dto.setResMsg("交易订单号为" + dto.getTradeNo() + "数据异常");
					continue;
				}
				//Cryptos.aesDecrypt解密
				dto.setValid(true);
				dto.setPayer(SensitiveInfoUtils.cnapsCode(dto.getPayer()));
				dto.setPayerName(SensitiveInfoUtils.chineseName(Cryptos.aesDecrypt(dto.getPayerName())));
				dto.setPayee(SensitiveInfoUtils.cnapsCode(dto.getPayee()));
				dto.setPayeeName(SensitiveInfoUtils.chineseName(Cryptos.aesDecrypt(dto.getPayeeName())));
				dto.setPayerBankCardNo(SensitiveInfoUtils.bankCard(Cryptos.aesDecrypt(dto.getPayerBankCardNo())));
			}
		}
		return list;
	}

	@Transactional(readOnly = false,rollbackFor={RuntimeException.class,Exception.class})
	@Override
	public ContractUnbindResBO releaseSign(ContractUnbindReqBO dto){
		/**
		 * 代扣签约：解约功能
		 * 1、校验传入参数：签约号，4要素信息，都不能为空。
		 * 2、根据签约号，4要素信息和商户号     查询jnf_t3表，
		 * 3、如果查询不到，解约失败。提示：用户提交数据有误。
		 * 3、如果查询到数据，比对摘要。
		 * 4、如果摘要比对错误，解约失败。提示：数据被篡改。请联系管理员。
		 * 5、如果摘要比对正确，将查询到的数据，插入解约表中。
		 * 6、再删除jnf_t3表中的该笔数据。
		 * 预留：后面要跟平台对接，调用平台解绑程序，调用会存在三种情况（成功、失败、异常）
		 * 关注事务！
		 */
		// 获取业务请求主体
		ContractUnbindReqDataBO reqDataDto = dto.getReqData(); 
		
		String custNo = reqDataDto.getCustNo();
		String bankCardNo = reqDataDto.getBankCardNo();
		String custName = reqDataDto.getCustName();
		String idNo = reqDataDto.getIdNo();
		String mobile = reqDataDto.getMobile();
		String mid = dto.getMid();
		
		/**
		 * 防报文重复提交
		 */
		if(!rxs.insertReqXML(dto.getXml())){
			logger.error("插入请求报文表失败：" + dto.getXml());
			return returnError("请求报文重复,请核实！",TabsConstant.SIGNRELEASE_STATUS_FAIL.val());
		}
		
		/**
		 * 校验输入参数合法性，不能为空
		 */
		String[] propertys = { "custNo", "idNo", "bankCardNo", "mobile","custName"};
		String errMsg = ValidatorUtil.validpropertys(reqDataDto, propertys);
		if (!StringUtils.isBlank(errMsg)) {
			logger.error("校验请求参数错误！" + errMsg);
			return returnError(errMsg,TabsConstant.SIGNRELEASE_STATUS_FAIL.val());
		}
		
		try {
			/**
			 * 查询商户是否存在，加密之后查询
			 */
			BindCardDto bindCardDto = bs.querySignInfo(custNo,mid,Cryptos.aesEncrypt(bankCardNo), Cryptos.aesEncrypt(custName), Cryptos.aesEncrypt(idNo), Cryptos.aesEncrypt(mobile));
			if(bindCardDto == null){
				logger.error("解约失败！用户提交数据有误，请核实");
				return returnError("解约失败！用户提交数据有误，请核实",TabsConstant.SIGNRELEASE_STATUS_FAIL.val());
			}
			
			/**
			 * 对比摘要
			 */
			if(!StringUtils.equals(bindCardDto.getDigest(), bindCardDto.buildDigest())){
				logger.error("解约失败！用户信息被篡改，请联系管理员");
				return returnError("解约失败！用户信息被篡改，请联系管理员",TabsConstant.SIGNRELEASE_STATUS_FAIL.val());
			}
			
			/**
             * 根据mId获取机构码,白名单签约用到
             */
            String orgNo = ms.findOrgNo(mid);
			
			/**
			 * 对接中间业务平台的解约 fangzheng
			 */
			CardBinRspDto cardbinObj = ci.query(bankCardNo);
			String bankName = cardbinObj.getBankName();
			String bankCode = cardbinObj.getBankCode();
			
			WhiteListSignRspDto whiteSignDto = null;
			try {
				whiteSignDto = addWhitePer(custName, idNo, custNo, bankCode, bankName, bankCardNo, mobile,orgNo);
			} catch (Exception e) {
			    logger.error("调用解约中间业务平台发生异常");
				//异常情况等同于成功，线下手动处理
				whiteSignDto = new WhiteListSignRspDto();
				whiteSignDto.setResCode(ReturnCode.SUCCESS);
				whiteSignDto.setResMsg("调用解约中间业务平台发生异常");
			}
			if (!StringUtils.equals(ReturnCode.SUCCESS, whiteSignDto.getResCode())) {
				logger.error("调用中间业务平台解约失败");
				return returnError("系统异常，解约失败！",TabsConstant.SIGNRELEASE_STATUS_FAIL.val());
			}
			
			/**
			 * 将查询到的数据插入到解约表中，标记设置为0
			 */
			int insert = bs.insertReleaseSign(TabsConstant.SIGNRELEASE_FLAG_DEAL.val(), custNo);
			if( insert <= 0){
				logger.error("解约失败！绑卡信息插入数据库失败");
				return returnError("系统异常，解约失败！",TabsConstant.SIGNRELEASE_STATUS_FAIL.val());
			}
			
			/**
			 * 删除绑卡表中信息
			 */
			int delete = bs.deleteSignInfo(custNo);
			if( delete <= 0){
				logger.error("解约失败！删除绑卡信息发送异常");
				return returnError("系统异常，解约失败！",TabsConstant.SIGNRELEASE_STATUS_FAIL.val());
			}
			
			/**
			 * 解绑成功
			 */
			return new ContractUnbindResBO(ReturnCode.SUCCESS,TabsConstant.SIGNRELEASE_STATUS_SUCCESS.val(),"解约成功");
			
		} catch (Exception e) {
			logger.error("系统异常，contractUnbinding error ", e);
			return returnError("系统异常，解约失败！",TabsConstant.SIGNRELEASE_STATUS_FAIL.val());
		}
		
	}
	
	/**
	 * 统一的错误返回
	 * @param errMsg
	 * @param status
	 * @return
	 */
	private ContractUnbindResBO returnError(String errMsg,String status) {
		ContractUnbindResBO res = new ContractUnbindResBO(ReturnCode.FAIL, status, errMsg);
		return res;
	}
	
	/**
	 * 调用增加白名单-解约接口
	 * 
	 * @param dto
	 * @return
	 * @throws IOException
	 */
	private WhiteListSignRspDto addWhitePer(String name, String idNo, String custSignNo, String bankCode, String bankName,
			String accountNo, String phoneNo,String orgNo) throws Exception {
		WhiteListSignReqDto dto = new WhiteListSignReqDto();
		dto.setSignFlag(TabsConstant.WHITELIST_SIGN_OUT.val());// 解约标示
		dto.setCustSignNo(custSignNo);// 客户签约号
		dto.setName(name);// 客户姓名
		dto.setBankCode(bankCode);// 开户行行号
		dto.setBankName(bankName);// 开户行名称
		dto.setCardType(TabsConstant.WHITELIST_CARDTYPE_CARD.val());// 卡折标志
		dto.setAccountNo(accountNo);// 持卡人卡号
		dto.setIdType(Global.IDTYPE);// 证件类型
		dto.setIdNo(idNo);// 证件号码
		dto.setPhoneNo(phoneNo);// 联系电话
		dto.setOrgNo(orgNo);
		WhiteListSignRspDto rsp = IntermediateSystem.WhiteListSign(dto);
		return rsp;
	}

}
