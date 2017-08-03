package com.jsjn.jnf.bussiness.bank.impl;

import java.math.BigDecimal;
import java.util.HashMap;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.jsjn.jnf.bean.bo.bank.RealtimeBalQueryReqBO;
import com.jsjn.jnf.bean.bo.bank.RealtimeBalQueryReqDataBO;
import com.jsjn.jnf.bean.bo.bank.RealtimeBalQueryResBO;
import com.jsjn.jnf.bean.bo.bank.RealtimeBalQueryResDataBO;
import com.jsjn.jnf.bean.bo.bank.SinglePaymentTradeReqBO;
import com.jsjn.jnf.bean.bo.bank.SinglePaymentTradeReqDataBO;
import com.jsjn.jnf.bean.bo.paymentTransaction.PaymentTransactionReqBO;
import com.jsjn.jnf.bean.bo.paymentTransaction.PaymentTransactionReqDataBO;
import com.jsjn.jnf.bean.bo.paymentTransaction.PaymentTransactionResBO;
import com.jsjn.jnf.bean.dto.assist.BizConfigDto;
import com.jsjn.jnf.bean.dto.member.MemberDto;
import com.jsjn.jnf.bean.dto.payment.PaymentDto;
import com.jsjn.jnf.bean.dto.trade.TransactionDto;
import com.jsjn.jnf.bean.dto.withhold.InvestorChannelDto;
import com.jsjn.jnf.bean.dto.withhold.SignInfoDto;
import com.jsjn.jnf.bean.dto.withhold.UserThirdAccountDto;
import com.jsjn.jnf.bean.pojo.integration.SinglePaymentResPojo;
import com.jsjn.jnf.bussiness.bank.BankSinglePaymentTradeService;
import com.jsjn.jnf.bussiness.bank.result.BankSinglePaymentResultHandle;
import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.common.config.TabsConstant;
import com.jsjn.jnf.common.config.TradeCode;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.jnf.common.security.Cryptos;
import com.jsjn.jnf.common.security.VerifyRSASign;
import com.jsjn.jnf.common.utils.DateUtils;
import com.jsjn.jnf.common.utils.Logger;
import com.jsjn.jnf.common.utils.StringUtils;
import com.jsjn.jnf.common.utils.ValidatorUtil;
import com.jsjn.jnf.integration.bank.RealtimeBalQueryInterface;
import com.jsjn.jnf.integration.bank.SinglePaymentTradeInterface;
import com.jsjn.jnf.integration.bank.impl.JsyhRealTimeBalQueryImpl;
import com.jsjn.jnf.integration.bank.impl.JsyhSinglePaymentTradeImpl;
import com.jsjn.jnf.integration.bank.strategy.RealtimeBalQueryStrategy;
import com.jsjn.jnf.integration.bank.strategy.SinglePaymentTradeStrategy;
import com.jsjn.jnf.service.assist.BusinessConfigService;
import com.jsjn.jnf.service.assist.DictService;
import com.jsjn.jnf.service.assist.LockService;
import com.jsjn.jnf.service.assist.ReqXmlService;
import com.jsjn.jnf.service.assist.utils.SequenceUtils;
import com.jsjn.jnf.service.member.MemberService;
import com.jsjn.jnf.service.payment.PaymentService;
import com.jsjn.jnf.service.trade.TransactionService;
import com.jsjn.jnf.service.withhold.InvestorChannelService;
import com.jsjn.jnf.service.withhold.SignInfoService;
import com.jsjn.jnf.service.withhold.UserThirdAccountService;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 单笔支付交易 实现类
 * 
 * @author yincy
 * 
 */
@Service
public class BankSinglePaymentTradeServiceImpl implements BankSinglePaymentTradeService {

	private final static Logger logger = Logger.getLogger(BankSinglePaymentTradeServiceImpl.class);

	//报文防重复
	private ReqXmlService reqXmlService = (ReqXmlService) ParseSpring.context.getBean("reqXmlServiceImpl");

	//商户配置表
	private BusinessConfigService businessConfigService = (BusinessConfigService) ParseSpring.context.getBean("businessConfigServiceImpl");

	//查询系统参数
	private DictService dictService = (DictService) ParseSpring.context.getBean("dictServiceImpl");

	//锁表
	private LockService lockService = (LockService) ParseSpring.context.getBean("lockServiceImpl");

	//交易表
	private TransactionService tranService = (TransactionService) ParseSpring.context.getBean("transactionServiceImpl");

	//支付表
	private PaymentService paymentService = (PaymentService) ParseSpring.context.getBean("paymentServiceImpl");

	// 签约信息表T22
	private SignInfoService signInfoService = (SignInfoService) ParseSpring.context.getBean("signInfoServiceImpl");

	// 投资人渠道关系表T24
	private InvestorChannelService investorChannelService = (InvestorChannelService) ParseSpring.context.getBean("investorChannelService");
	// 调用集成层得到结果后的处理类
	private BankSinglePaymentResultHandle resultHandle = (BankSinglePaymentResultHandle) ParseSpring.context.getBean("bankSinglePaymentResultHandle");
	// 用户表T2
	private MemberService memberService = (MemberService) ParseSpring.context.getBean("memberServiceImpl");
	// 用户绑卡表T21
	private UserThirdAccountService userThirdAccountService = (UserThirdAccountService) ParseSpring.context.getBean("userThirdAccountServiceImpl");

	/**
	 * 单笔支付交易
	 * 
	 * 1）商户报文防重复。插入报文表，防止一次报文多次发送（防直接调用SERVICE层） 备注：表：JNF_T15 2）校验请求字段是否合法
	 * 3）校验是否属于转账的交易时间 4）二次验签确认交易 5）校验【付款账户】【收款账户】信息
	 * 规则：a）根据[商户号|账户名称|账户]校验【付款账户】【收款账户】是否登记。 6）插入交易表，支付表 a）锁表（交易表）
	 * b）根据【商户流水号】创建订单，插入交易表，返回【订单信息】
	 * c）创建相应【支付订单】，返回【支付订单】信息。其中【支付订单编号】作为查询银行流水的凭证 7）二次握手反查代扣数据
	 * 8）根据条件决定策略类，调用对应银行接口，返回结果 规则：目前只支持【江苏银行对外支付】接口
	 * 备注：此处需要开启新的事务，无论交易结果如何，不执行回滚操作。
	 * 
	 * @throws Exception
	 */
	@Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW, rollbackFor = { RuntimeException.class,
			BussinessException.class })
	public PaymentTransactionResBO singlePaymentTrade(PaymentTransactionReqBO reqBo) throws BussinessException {

		/**
		 * 获取请求数据
		 */
		PaymentTransactionReqDataBO reqDataBo = reqBo.getReqData();

		/**
		 * 获取请求商户编号
		 */
		String reqMid = reqBo.getMid();
		/**
		 * 获取请求xml报文
		 */
		String reqXml = reqBo.getXml();

		//***********************公共校验开始*************************************

		/**
		 * 校验请求字段是否合法
		 */
		verifyReqFieldIsValid(reqDataBo);

		/**
		 * 校验是否属于转账的交易时间
		 */
		verifySinglePayWorkingTime();

		/**
		 * 商户报文防重复
		 */
		preventXmlRepeat(reqXml);

		/**
		 * 二次验签
		 */
		verifySinglePaySign(reqMid, reqXml);

		//***********************默认值初始化*************************************

		String curCode = reqDataBo.getCurCode();//交易币种
		//交易币种默认为 '01':人民币
		if (StringUtils.isBlank(curCode)) {
			curCode = "01";
			reqDataBo.setCurCode("01");
		}

		String urgencyFlag = reqDataBo.getUrgencyFlag();//加急标识
		//加急标识默认为 '0':普通
		if (StringUtils.isBlank(urgencyFlag)) {
			urgencyFlag = "0";
			reqDataBo.setUrgencyFlag("0");
		}

		String channelId = "CH13";//转账渠道ID
		String serialNo = reqDataBo.getSerialNo();//商户流水号
		String aid = reqDataBo.getAid();//签约协议号
		String orgNo = reqDataBo.getOrgNo();//机构号
		String loanNo = reqDataBo.getLoanNo();//贷款合同号
		BigDecimal amount = reqDataBo.getAmount();//交易金额

		String payeeAccountNo = reqDataBo.getPayeeAccountNo();//收款账号
		String payeeAccountName = reqDataBo.getPayeeAccountName();//收款账号名称
		String payeeBankNo = reqDataBo.getPayeeBankNo();//收款账号银行编码
		String payeeBankName = reqDataBo.getPayeeBankName();//收款账号银行编码

		/**
		 * 从投资人渠道关系表中查询渠道为【江苏银行代付】（CH13）的账户信息
		 */
		//***********************放款（投资人）信息 *************************************
		/**
		 * 根据协议号查询签约信息
		 */
		SignInfoDto signInfoDto = signInfoService.querySignInfoByAid(aid, reqMid);
		String payeeUserId = signInfoDto.getPayeeUserId();// 放款人用户ID 投资人
		String userThirdAccountId = signInfoDto.getPayerBindAccId();//第三方用户编号
		String signLoanNo = signInfoDto.getLoanNo();//签约借据号

		/**
		 * 根据机构号查询对应投资人信息
		 */
		MemberDto memberDto = memberService.queryMemberByInsttuId(orgNo, reqMid);
		String custId = memberDto.getCustId();//投资人ID

		// 根据 【投资人客户号】查询对应的投资人账户详细信息
		InvestorChannelDto investorDto = investorChannelService.queryInverstor(channelId, payeeUserId);
		if (null == investorDto) {
			logger.error("江苏银行代付账户未登记，请维护【投资人与渠道关系】：" + orgNo);
			throw new BussinessException(ReturnCode.FAIL, "江苏银行代付账户未登记，请维护【投资人与渠道关系】：" + orgNo);
		}
		String payerAccountNo = investorDto.getTransCardNo();//投资人转账账号
		String payerAccountName = investorDto.getTransCardName();//投资人转账账户名称

		//***********************收款（借款人）信息 *************************************

		// 根据账户号查询对应借款人账户信息
		UserThirdAccountDto custAcctDto = userThirdAccountService.queryUserThirdAcctByAccNo(userThirdAccountId, reqMid);
		String quertPayerId = custAcctDto.getCustId();// 付款人id
		// String queryPayerName = Cryptos.aesDecrypt(custAcctDto.getCustName());
		// String queryPayerCardNo = Cryptos.aesDecrypt(custAcctDto.getBindAccNo());

		//***********************校验信息 *************************************
		// 校验【投资人机构】和【签约机构】是否匹配
		if (!StringUtils.equalsIgnoreCase(custId, payeeUserId)) {
			logger.error("该笔签约不属于当前机构");
			throw new BussinessException(ReturnCode.FAIL_VALIDATE, "该笔签约不属于当前机构");
		}

		//校验【借据号】和【签约借据号】是否匹配
		if (!StringUtils.equalsIgnoreCase(signLoanNo, loanNo)) {
			logger.error("贷款和签约借据号不匹配");
			throw new BussinessException(ReturnCode.FAIL_VALIDATE, "贷款和签约借据号不匹配");
		}

		// 校验【借款人名称】和【签约用户名称】是否匹配
		//		if (!StringUtils.equalsIgnoreCase(payeeAccountName, queryPayerName)) {
		//			logger.error("借款人名称和签约用户名称不匹配");
		//			throw new BussinessException(ReturnCode.FAIL_VALIDATE, "借款人名称和签约用户名称不匹配");
		//		}
		// 校验【借款人银行卡号】和【签约银行卡号】是否匹配
		//		if (!StringUtils.equalsIgnoreCase(payeeAccountNo, queryPayerCardNo)) {
		//			logger.error("借款人银行卡号和签约银行卡号不匹配");
		//			throw new BussinessException(ReturnCode.FAIL_VALIDATE, "借款人银行卡号和签约银行卡号不匹配");
		//		}

		/**
		 * 检查放款人账户余额
		 */
		//verifyUseBalance(payerAccountNo, amount, curCode);

		logger.info("该笔转账的交易信息列表：");
		logger.info("签约协议号：" + aid);
		logger.info("投资人名称：" + payerAccountName);
		logger.info("投资人账户：" + payerAccountNo);
		logger.info("收款人名称：" + payeeAccountName);
		logger.info("收款人账户：" + payeeAccountNo);
		logger.info("收款账号开户行编码：" + payeeBankNo);
		logger.info("收款账号开户行名称：" + payeeBankName);

		logger.info("判断该笔交易是否已经存在 开始");
		TransactionDto transDto = tranService.queryTransactionByMSerialNo(reqMid, serialNo);

		logger.info("判断该笔交易是否已经存在 结束");
		/**
		 ***************************** 插入交易表*******************************
		 */
		logger.info("交易表锁表 开始：");
		//交易表 锁表
		try {
			lockService.insertLock(reqMid, TabsConstant.LOCK_TYPE_PAYMENT.val(), serialNo);
		} catch (Exception e) {
			logger.error("存在相同商户业务编号为" + serialNo + "的转账交易,请核实！");
			throw new BussinessException(ReturnCode.FAIL, "存在相同商户业务编号为" + serialNo + "的转账交易,请核实！");
		}
		logger.info("交易表锁表 结束：");
		/**
		 * 插入或者更新交易表
		 */
		logger.info("插入或者更新交易表 开始：");

		String tradeType = TabsConstant.TRANSACTION_TRADETYPE_TRANSFER.val();//交易类型
		String tradeNo = SequenceUtils.getTrasaction(reqMid, "0" + tradeType);//交易订单编号
		String bNo = SequenceUtils.getTrasactionBNo();//交易批次号
		String status = TabsConstant.TRANSACTION_STATUS_DEAL.val();//交易状态
		if (transDto.getStatus() != null && transDto.getStatus().equals(TabsConstant.TRANSACTION_STATUS_FAIL.val())) {
			// 更新交易表状态为处理中
			transDto.setStatus(TabsConstant.TRANSACTION_STATUS_DEAL.val());
			tranService.updateTransactionByTradeNo(transDto.getTradeNo(),
					TabsConstant.TRANSACTION_STATUS_DEAL.val(),
					transDto.buildDigest(),
					null,
					null,
					DateUtils.getDate("yyyyMMddHHmmss"));
		} else {
			String dateStr = DateUtils.getDate("yyyyMMddHHmmss");
			transDto.setTradeType(tradeType);
			transDto.setTradeNo(tradeNo);
			transDto.setbNo(bNo);
			transDto.setMid(reqMid);
			transDto.setMSerialNo(serialNo);
			transDto.setExternLoanNo(loanNo);
			transDto.setPayer(payeeUserId);
			transDto.setPayerName(Cryptos.aesEncrypt(payerAccountName));//加密
			transDto.setPayerBankCardNo(Cryptos.aesEncrypt(payerAccountNo));//加密
			transDto.setPayee(quertPayerId);
			transDto.setPayeeName(Cryptos.aesEncrypt(payeeAccountName));//加密
			transDto.setAmount(amount);
			transDto.setStatus(status);
			transDto.setOrgNo(orgNo);
			transDto.setDesc("转账  " + DateUtils.getDate() + "  客户号：" + payeeUserId + " 交易金额：" + amount);
			transDto.setDigest(transDto.buildDigest());
			transDto.setCreated(dateStr);
			transDto.setModified(dateStr);
			// 插入交易表
			try {
				tranService.insertTransaction(transDto);
				logger.info("插入交易表成功！");
			} catch (Exception e) {
				logger.error("插入交易表失败" + transDto.toString(), e);
				throw new BussinessException(ReturnCode.FAIL, "新增交易失败！");
			}
		}

		logger.info("插入或者更新交易表 结束");

		/**
		 * 插入支付表
		 */
		logger.info("插入支付表 开始：");
		String orderType = TabsConstant.PAYMENT_ORDERTYPE_TRANSFER.val();//支付类型
		String orderNo = SequenceUtils.getPaymentOrder(reqMid, "0" + orderType);//支付订单编号
		String orderSatus = TabsConstant.PAYMENT_ORDER_STATUS_DEAL.val();//支付状态

		PaymentDto paymentDto = new PaymentDto();
		paymentDto.setOrderNo(orderNo);
		paymentDto.setOrderType(orderType);
		paymentDto.setTradeNo(tradeNo);
		paymentDto.setPayer(payeeUserId);
		paymentDto.setPayBank("江苏银行");
		paymentDto.setPayAccount(Cryptos.aesEncrypt(payerAccountNo));
		paymentDto.setPayee(quertPayerId);
		paymentDto.setCollBank(payeeAccountNo);
		paymentDto.setCollAccount(Cryptos.aesEncrypt(payeeAccountNo));
		paymentDto.setAmount(amount);
		paymentDto.setStatus(orderSatus);
		paymentDto.setChannel(channelId);
		paymentDto.setDigest(paymentDto.buildDigest());
		paymentDto.setMid(reqMid);
		paymentDto.setOrgNo(orgNo);
		paymentDto.setLoanNo(loanNo);//转账业务新增借据号

		// 插入支付表
		try {
			paymentService.createOrder(paymentDto);
			logger.info("插入支付表成功！");
		} catch (Exception e) {
			logger.error("插入支付表失败" + paymentDto.toString(), e);
			throw new BussinessException(ReturnCode.FAIL, "新增支付失败！");
		}
		logger.info("插入支付表 结束!");

		/**
		 * TODO： 是否跨行：本行他行？ **************************** 调用银行接口，发生转账交易
		 * ****************************
		 */

		//***********************初始化集成层参数 *************************************
		SinglePaymentTradeReqDataBO reqData = new SinglePaymentTradeReqDataBO();
		reqData.setSerialNo(serialNo);
		reqData.setAmount(amount);
		/**
		 * 付款账号信息
		 */
		reqData.setPayorAccountNo(payerAccountNo);
		reqData.setPayorAccountName(payerAccountName);
		//		reqData.setPayorAccountName("封腺痛一征蒂拭悟所");
		//		reqData.setPayorAccountNo("60340188000068642");

		/**
		 * 收款账号信息
		 */
		reqData.setPayeeAccountNo(payeeAccountNo);
		reqData.setPayeeAccountName(payeeAccountName);
		reqData.setPayeeBankNo(payeeBankNo);
		reqData.setPayeeBankName(payeeBankName);
		//		reqData.setPayeeAccountNo("70560188000150035");
		//		reqData.setPayeeAccountName("疆酥枷得商么友线公司");
		//		reqData.setPayeeBankNo("");
		//		reqData.setPayeeBankName("");

		reqData.setCurCode(curCode);
		reqData.setUrgencyFlag(urgencyFlag);
		reqData.setPurpose("江苏银行转账");
		SinglePaymentTradeReqBO reqDto = new SinglePaymentTradeReqBO();
		reqDto.setReqData(reqData);

		/**
		 * 二次握手:调用业务接口，确认交易 TODO 暂不实现
		 */
		//confirmSinglePay(reqMid, serialNo, orderNo, reqData.secCheckString());

		SinglePaymentTradeInterface impl = new JsyhSinglePaymentTradeImpl();
		SinglePaymentTradeStrategy strategy = new SinglePaymentTradeStrategy(impl);

		HashMap<String, String> map = new HashMap<String, String>();
		map.put("bankflag", "0");//本行他行标识
		map.put("serialNo", serialNo);
		map.put("orderNo", orderNo);
		map.put("tradeNo", tradeNo);
		map.put("postscript", "JNFPAYMENT");//附言 用作对账格式文本

		//调用集成层
		logger.info("调用集成层进行交易 开始");
		SinglePaymentResPojo resPojo = strategy.trade(reqDto, map);
		logger.info("调用集成层进行交易 结束");

		/**
		 * **************************** 处理返回结果 ****************************
		 */
		return resultHandle.paymentResultHandle(resPojo, paymentDto, transDto, serialNo);
	}

	/**
	 * 二次握手：调用业务提供接口，确认交易
	 * 
	 * @throws Exception
	 */
	public void confirmSinglePay(String reqMid, String reqSerialNo, String orderNo, String origData)
			throws BussinessException {
		//		SinglePaymentSecCheckResDataBO secCheckResDto = null;
		//		try {
		//			secCheckResDto = SinglePaySecCheck.getSinglePayData(reqMid, reqSerialNo);
		//		} catch (Exception e) {
		//			logger.error("调用商户提供反查代扣数据出错", e);
		//			throw new BussinessException(ReturnCode.FAIL_SECONED_CONFIRM_INTERFACE, "调用商户提供反查代扣数据出错");
		//		}
		//
		//		// 比较数据
		//		String currData = secCheckResDto.secCheckString();
		//		if (!origData.equals(currData)) {
		//			logger.error("该笔支付存在风险！支付订单编号为" + orderNo + "的交易经二次握手检查数据不一致，原：[" + origData + "] 现[ " + currData + "]");
		//			throw new BussinessException(ReturnCode.FAIL_SECONED_CONFIRM_INVALIDATE, "该笔支付存在风险！该笔交易经二次握手检查数据不一致！");
		//		}
		//
		//		logger.info("二次握手确认成功！");
	}

	/**
	 * 防止报文重复
	 * 
	 * @throws Exception
	 */
	public void preventXmlRepeat(String reqXml) throws BussinessException {
		if (!reqXmlService.insertReqXML(reqXml)) {
			logger.error("插入请求报文表失败" + reqXml);
			throw new BussinessException(ReturnCode.FAIL_REPEAT_SUBMIT, "请求报文重复,请核实！");
		}
		logger.info("插入请求报文成功！");
	}

	/**
	 * 验证字段是否合法
	 * 
	 * @param reqDataBo
	 * @throws Exception
	 */
	public void verifyReqFieldIsValid(PaymentTransactionReqDataBO reqDataBo) throws BussinessException {

		String[] propertys = { "serialNo", "orgNo", "loanNo", "aid", "amount", "payeeAccountNo", "payeeAccountName",
				"payeeBankNo", "payeeBankName" };

		String errMsg = ValidatorUtil.validpropertys(reqDataBo, propertys);
		if (!StringUtils.isBlank(errMsg)) {
			logger.error("执行【放款业务】操作请求参数不合法！" + errMsg);
			throw new BussinessException(ReturnCode.FAIL_VALIDATE, errMsg);
		}
		logger.info("请求字段合法！");
	}

	/**
	 * 二次验签
	 * 
	 * @param reqMid
	 * @param reqXml
	 * @throws Exception
	 */
	public void verifySinglePaySign(String reqMid, String reqXml) throws BussinessException {
		BizConfigDto config = new BizConfigDto();
		config.setMid(reqMid);
		String publicKey = businessConfigService.queryBussinessConfig(config).getRsaPubKey();
		if (!VerifyRSASign.verifySign(reqXml, publicKey)) {
			logger.error("验签失败，请求拒绝！！");
			throw new BussinessException(ReturnCode.FAIL_INVALID_SECONED_SIGN, "二次验签失败，本次交易存在风险！");
		}

		logger.info("二次验签成功");
	}

	/**
	 * 是否属于转账时间
	 */
	public void verifySinglePayWorkingTime() throws BussinessException {
		//		String noWorkingStartTime = dictService.findByType("NO_PAYMENT_START_TIME");
		//		String noWorkingEndTime = dictService.findByType("NO_PAYMENT_END_TIME");
		//
		//		if (StringUtils.isBlank(noWorkingStartTime)) {
		//			noWorkingStartTime = "09:00";
		//		}
		//		if (StringUtils.isBlank(noWorkingEndTime)) {
		//			noWorkingEndTime = "17:00";
		//		}
		//		logger.info("系统非工作时间 " + noWorkingStartTime + "~" + noWorkingEndTime);
		//
		//		if (TimeUtils.timeInRange(noWorkingStartTime, noWorkingEndTime, true)) {
		//			logger.error("系统非工作时间" + noWorkingStartTime + "~" + noWorkingEndTime + "请于工作时间访问，请求拒绝！！");
		//			throw new BussinessException(ReturnCode.FAIL_PAYMENT_DEAL_TIME, "非转账时间。");
		//		}
	}

	/**
	 * 校验余额
	 * 
	 * @param payerAccountNo
	 *            付款卡号
	 * @param amount
	 *            金额
	 * @param curCode
	 *            币种
	 * @throws BussinessException
	 */
	public void verifyUseBalance(String payerAccountNo, BigDecimal amount, String curCode) throws BussinessException {
		RealtimeBalQueryReqBO reqbo = new RealtimeBalQueryReqBO();
		RealtimeBalQueryReqDataBO reqdatabo = new RealtimeBalQueryReqDataBO();
		reqdatabo.setAccountNo(payerAccountNo);//付款方账号
		reqdatabo.setCurCode(curCode);//币种
		reqbo.setReqData(reqdatabo);
		RealtimeBalQueryInterface impl = new JsyhRealTimeBalQueryImpl();
		RealtimeBalQueryStrategy strategy = new RealtimeBalQueryStrategy(impl);
		RealtimeBalQueryResBO resbo = strategy.query(reqbo);
		String resCode = resbo.getResCode();
		String resMsg = resbo.getResMsg();
		if (!StringUtils.equals(resCode, TradeCode.TRADE_SUCCESS.getCode())) {
			logger.error("余额查询交易失败!" + resMsg);
			throw new BussinessException(ReturnCode.FAIL, "余额查询交易失败！" + resMsg);
		} else {
			RealtimeBalQueryResDataBO resData = resbo.getResData();
			String useBalance = resData.getUseBalance();
			if (amount.compareTo(new BigDecimal(useBalance)) == 1) {
				logger.error("余额不足！");
				throw new BussinessException(ReturnCode.PAYMENT_BALANCE_IS_NOT_ENOUGH, "余额不足！");
			}
		}
	}
}
