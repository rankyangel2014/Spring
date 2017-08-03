package com.jsjn.jnf.bussiness.trade;

import static org.junit.Assert.*;

import java.math.BigDecimal;
import java.util.Date;


import org.apache.log4j.Logger;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import com.jsjn.jnf.bean.bo.trade.WithHoldReqBO;
import com.jsjn.jnf.bean.bo.trade.WithHoldReqDataBO;
import com.jsjn.jnf.bean.bo.trade.WithHoldResBO;
import com.jsjn.jnf.bean.dto.account.BindCardDto;
import com.jsjn.jnf.bean.dto.member.MemberDto;
import com.jsjn.jnf.bean.dto.payment.PaymentDto;
import com.jsjn.jnf.bean.dto.trade.TransactionDto;
import com.jsjn.jnf.bussiness.trade.TradeService;
import com.jsjn.jnf.common.GenReqXML;
import com.jsjn.jnf.common.InitTestMemberInfo;
import com.jsjn.jnf.common.TestSequenceUtils;
import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.common.config.TabsConstant;
import com.jsjn.jnf.common.security.Cryptos;
import com.jsjn.jnf.common.utils.DateUtils;
import com.jsjn.jnf.common.utils.IdGen;
import com.jsjn.jnf.dao.account.bindCard.TestBindCardCommon;
import com.jsjn.jnf.dao.assist.TestLockCommon;
import com.jsjn.jnf.dao.member.memberDao.TestMemberCommon;
import com.jsjn.jnf.dao.payment.TestPaymentCommon;
import com.jsjn.jnf.dao.trade.TestTradeCommon;
import com.jsjn.jnf.service.assist.utils.SequenceUtils;
import com.jsjn.panda.setup.ParseSpring;

public class TestWithHolding {

	/**
	 * TransactionServiceImpl的测试类 测试的方法：
	 *  withHolding 测试思路： 
	 * 1. 相同的报文多次发送，响应码为999999，响应信息为请求报文重复,请核实！
	 * 2. 业务请求中不包含serialNo(loanNo,cardSignNo,custNo,custName,bankName,bankCardNo,amount),抛出Exception异常 
	 * 3. 业务请求中包含serialNo(loanNo,cardSignNo,custNo,custName,bankName,bankCardNo,amount),但格式不正确(包括"",非日期字符串,null), 抛出Exception异常 
	 * 4. 二次验签失败,抛出Exception异常 ，数据全部回滚
	 * 5. 用户未绑卡,抛出Exception异常 ，数据全部回滚
	 * 6. 用户绑卡信息被篡改(MD5校验失败),抛出Exception异常 ，数据全部回滚
	 * 7. 交易锁表JNF_T10中存在相同交易记录,抛出Exception异常 ，数据全部回滚
	 * 8. 根据会员号查询会员不存在,抛出Exception异常，数据全部回滚
	 * 9. 会员信息被篡改(MD5校验失败),抛出Exception异常 ，数据全部回滚
	 * 10. 根据会员号查询到会员名称和请求中不一致,抛出Exception异常 ，数据全部回滚
	 * 11. 根据商户编号查询到投资人为空,抛出Exception异常 ，数据全部回滚
	 * 12. 商户信息被篡改(MD5校验失败),抛出Exception异常 ，数据全部回滚
	 * 13. 插入交易表失败,抛出Exception异常 ，数据全部回滚
	 * 14. 插入支付表失败,抛出Exception异常 ，数据全部回滚
	 * 15. 支付锁表JNF_T10中存在相同交易记录,抛出Exception异常，数据全部回滚
	 * 16. 调用商户接口反查二次握手发生异常，数据全部回滚
	 * 17. 调用商户接口反查二次握手数据不匹配，数据全部回滚
	 * 18. 调用中间业务平台银联代扣代扣失败,数据不回滚，同时，检查T8、T9、T10表中关键字段正确
	 * 
	 */
	
	private static Logger logger = Logger.getLogger(TestWithHolding.class);
	
	private TradeService transService = (TradeService) ParseSpring.context.getBean("tradeServiceImpl");
	
	private static final String mid 	= "9999";
	private static final String custId	= SequenceUtils.getMemberAccount(mid);
	private static final String aid		= SequenceUtils.getSignAgree(mid);
	
	
	private String custName 	= "代扣测试用户";
	private String idNo 		= "140602199106019015";
	private String mobile 		= "15656565656";
	private String bankCardNo 	= "9558800200135073266";
	private String bankName		= "工商银行";
	private String serialNo 	= "1234";
	
	private WithHoldReqBO req = new WithHoldReqBO();
	private WithHoldResBO res = new WithHoldResBO();
	private WithHoldReqDataBO reqData = new WithHoldReqDataBO();
	
	
	/***
	 * 初始化借款人信息
	 */
	public void insertMemberInfo(){
		MemberDto dto = new MemberDto();
		dto.setCustId(custId);
		dto.setCustName(Cryptos.aesEncrypt(custName));
		dto.setmId(mid);
		dto.setCustType("2");
		dto.setMobile(Cryptos.aesEncrypt(mobile));
		dto.setState("1");
		dto.setIsReal("0");
		dto.setRemark(custName);
		dto.setIdType("1");
		dto.setIdNo(Cryptos.aesEncrypt(idNo));
		dto.setExtCustId("1234");
		dto.setDigest(dto.buildDigest());
		
		TestMemberCommon.insertMemberInfo(dto);
	}
	
	/**
	 * 初始化借款人绑卡信息
	 */
	public void insertBindCardInfo(){
		BindCardDto dto = new BindCardDto();
		dto.setAid(aid);
		dto.setCustId(custId);
		dto.setMId(mid);
		dto.setType(TabsConstant.BIND_CARD_TYPE_PAY.val());
		dto.setBankName(bankName);
		dto.setBankCardNo(Cryptos.aesEncrypt(bankCardNo));
		dto.setState("1");
		dto.setMobile(Cryptos.aesEncrypt(mobile));
		dto.setDigest(dto.buildDigest());	
		dto.setCustName(Cryptos.aesEncrypt(custName));
		dto.setIdNo(Cryptos.aesEncrypt(idNo));
		dto.setSignNo("AAAAAAAA");
		
		TestBindCardCommon.insertBindCard(dto);
	}
	
	public void setCommonParam(){
		req = new WithHoldReqBO();
		res = new WithHoldResBO();
		reqData = new WithHoldReqDataBO();
		
		req.setMid(mid);
		req.setService("withHolding");
		req.setAppkey(InitTestMemberInfo.getAppkey(mid	));
		req.setCharset("UTF-8");
		req.setSignType("RSA");
		req.setTimeStamp(DateUtils.formatDate(new Date(), "yyyy-MM-dd HH:mm:ss:SSS"));
		
		reqData.setSerialNo(serialNo);
		reqData.setLoanNo("11111");
		reqData.setCardSignNo(aid);
		reqData.setCustNo(custId);
		reqData.setCustName(custName);
		reqData.setBankName(bankName);
		reqData.setBankCardNo(bankCardNo);
		reqData.setAmount(new BigDecimal("100.00"));
		req.setReqData(reqData);
		req.setXml(GenReqXML.genWithHoldXML(req));
	}
	
	/**
	 * 插入交易表
	 * @param tradeNo
	 */
	private static void insertTrade(String tradeNo){
		TransactionDto dto = new TransactionDto();
		dto.setTradeNo(tradeNo);
		dto.setbNo(SequenceUtils.getTrasactionBNo());
		dto.setTradeType(TabsConstant.TRANSACTION_TRADETYPE_WITHHOLD.val());
		dto.setMid(mid);
		dto.setMSerialNo(IdGen.uuid());
		dto.setExternLoanNo("1234");
		dto.setPayer(SequenceUtils.getMemberInfo(mid));
		dto.setPayerName(Cryptos.aesEncrypt("张三"));
		dto.setPayerBankCardNo(Cryptos.aesEncrypt("6228480402564890018 "));
		dto.setPayee(SequenceUtils.getMemberInfo(mid));
		dto.setPayeeName(Cryptos.aesEncrypt("投资人"));
		dto.setAmount(new BigDecimal("100.00"));
		dto.setStatus(TabsConstant.TRANSACTION_STATUS_DEAL.val());
		dto.setDesc("测试");
		dto.setDigest(dto.buildDigest());
		
		TestTradeCommon.insertTrade(dto);
	}
	
	/**
	 * 插入交易表
	 * @param tradeNo
	 */
	private static void insertPayment(String orderNo){
		PaymentDto dto = new PaymentDto();
		dto.setOrderNo(orderNo);
		dto.setOrderType(TabsConstant.PAYMENT_ORDERTYPE_WITHHOLD.val());
		dto.setTradeNo("1234");
		dto.setPayer("111");
		dto.setPayBank("BANK");
		dto.setPayAccount("1111111111111111");
		dto.setPayee("111");
		dto.setCollBank("BANK");
		dto.setCollAccount("11111111111111111");
		dto.setAmount(new BigDecimal(100.00));
		dto.setStatus("1");
		dto.setChannel(TabsConstant.PAYMENT_ORDER_CHANNEL_UNION.val());
		dto.setDigest(dto.buildDigest());
		
		TestPaymentCommon.insertTrade(dto);
	}
	
	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		logger.info("开始启动getSinglPayResData测试...");
		logger.info("开始预置测试商户信息数据...");
		InitTestMemberInfo.initBusinessMember("9999");
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
		logger.info("getSinglPayResData测试完成...");
		logger.info("删除预置测试商户数据...");
		InitTestMemberInfo.deleteAllMember("9999");
	}

	@Before
	public void setUp() throws Exception {
		logger.info("预置本次测试数据...");
		insertMemberInfo();
		insertBindCardInfo();
		
		TestTradeCommon.deleteAllTrade();
		TestPaymentCommon.deleteAllPayment();
		TestLockCommon.deleteAllLock();
		
		//设置公共报文
		setCommonParam();
	}
	

	@After
	public void tearDown() throws Exception {
		logger.info("删除本次测试数据...");
		TestMemberCommon.deleteMemberInfoById(custId);
		TestBindCardCommon.deleteBindCardInfoById(aid);
		
		TestTradeCommon.deleteAllTrade();
		TestPaymentCommon.deleteAllPayment();
		TestLockCommon.deleteAllLock();
	}

	/**
	 * withHolding1的测试类 测试的方法：
	 * 1. 相同的报文多次发送，响应码为999999，响应信息为请求报文重复,请核实！
	 */
	@Test
	public void withHolding1(){
		res = transService.withHolding(req);
		res = transService.withHolding(req);
		
		assertEquals(ReturnCode.FAIL, res.getResCode());
		assertEquals("请求报文重复,请核实！", res.getResMsg());
		assertEquals("" , res.getResData().getTranNo());
		assertEquals("" , res.getResData().getStatus());
		assertEquals("" , res.getResData().getSerialNo());
	}
	
	
	/**
	 * withHolding1的测试类 测试的方法：
	 * 2. 业务请求中不包含serialNo(loanNo,cardSignNo,custNo,custName,bankName,bankCardNo,amount),响应码为999999，响应信息为对应校验信息
	 */
	@Test
	public void withHolding2(){
		reqData.setLoanNo(null);
		req.setXml(GenReqXML.genWithHoldXML(req));
		
		res = transService.withHolding(req);
		
		assertEquals(ReturnCode.FAIL, res.getResCode());
		assertEquals("loanNo 贷款合同号不能为空", res.getResMsg());
		assertEquals("" , res.getResData().getTranNo());
		assertEquals("" , res.getResData().getStatus());
		assertEquals("" , res.getResData().getSerialNo());
	}
	
	/**
	 * withHolding1的测试类 测试的方法：
	 * 3. 业务请求中包含serialNo(loanNo,cardSignNo,custNo,custName,bankName,bankCardNo,amount),但格式不正确(包括"",非日期字符串), 响应码为999999，响应信息为对应校验信息
	 */
	@Test
	public void withHolding3() throws Exception{
		reqData.setLoanNo("");
		req.setXml(GenReqXML.genWithHoldXML(req));
		
		res = transService.withHolding(req);
		
		assertEquals(ReturnCode.FAIL, res.getResCode());
		assertEquals("loanNo 贷款合同号不能为空", res.getResMsg());
		assertEquals("" , res.getResData().getTranNo());
		assertEquals("" , res.getResData().getStatus());
		assertEquals("" , res.getResData().getSerialNo());
	}
	
	/**
	 * withHolding1的测试类 测试的方法：
	 * 4. 二次验签失败,响应码为999999，响应信息[验签失败，请求拒绝！]
	 */
	@Test
	public void withHolding4(){
		req.setXml(GenReqXML.genWithHoldXML(req, "12345"));
		res = transService.withHolding(req);
		
		assertEquals(ReturnCode.FAIL, res.getResCode());
		assertEquals("验签失败，请求拒绝！", res.getResMsg());
		assertEquals("" , res.getResData().getTranNo());
		assertEquals("" , res.getResData().getStatus());
		assertEquals("" , res.getResData().getSerialNo());
	}
	
	/**
	 * withHolding1的测试类 测试的方法：
	 * 5. 用户未绑卡,响应码为999999，响应信息[该客户未绑卡]
	 */
	@Test
	public void withHolding5(){
		TestBindCardCommon.deleteBindCardInfoById(aid);
		res = transService.withHolding(req);
		
		assertEquals(ReturnCode.FAIL, res.getResCode());
		assertEquals("该客户未绑卡", res.getResMsg());
		assertEquals("" , res.getResData().getTranNo());
		assertEquals("" , res.getResData().getStatus());
		assertEquals("" , res.getResData().getSerialNo());
	}
	
	/**
	 * withHolding1的测试类 测试的方法：
	 * 6. 用户绑卡信息被篡改(MD5校验失败),响应码为999999，响应信息[客户绑卡数据异常]
	 */
	@Test
	public void withHolding6(){
		TestBindCardCommon.updateBindCardDigest(aid,"0000");
		res = transService.withHolding(req);
		
		assertEquals(ReturnCode.FAIL, res.getResCode());
		assertEquals("客户绑卡数据异常", res.getResMsg());
		assertEquals("" , res.getResData().getTranNo());
		assertEquals("" , res.getResData().getStatus());
		assertEquals("" , res.getResData().getSerialNo());
	}
	
	/**
	 * withHolding1的测试类 测试的方法：
	 * 7. 交易锁表JNF_T10中存在相同交易记录,响应码为999999，响应信息[存在相同商户业务编号为serialNo的代扣交易,请核实]
	 */
	@Test
	public void withHolding7(){
		TestLockCommon.insertLock(mid, TabsConstant.LOCK_TYPE_TRANSACTION.val(), serialNo);
		res = transService.withHolding(req);
		
		assertEquals(ReturnCode.FAIL, res.getResCode());
		assertEquals("存在相同商户业务编号为"+serialNo+"的代扣交易,请核实！", res.getResMsg());
		assertEquals("" , res.getResData().getTranNo());
		assertEquals("" , res.getResData().getStatus());
		assertEquals("" , res.getResData().getSerialNo());
	}
	
	/**
	 * withHolding1的测试类 测试的方法：
	 * 8. 根据会员号查询会员不存在,响应码为999999，响应信息[客户号为custId的客户不存在],数据全部回滚
	 */
	@Test
	public void withHolding8(){
		TestMemberCommon.deleteMemberInfoById(custId);
		res = transService.withHolding(req);
		
		assertEquals(ReturnCode.FAIL, res.getResCode());
		assertEquals("客户号为"+custId+"的客户不存在", res.getResMsg());
		assertEquals("" , res.getResData().getTranNo());
		assertEquals("" , res.getResData().getStatus());
		assertEquals("" , res.getResData().getSerialNo());
		
		assertEquals(0 , TestLockCommon.existLock(mid, TabsConstant.LOCK_TYPE_TRANSACTION.val(), serialNo));
	}
	
	/**
	 * withHolding1的测试类 测试的方法：
	 * 9. 会员信息被篡改(MD5校验失败),响应码为999999，响应信息[客户数据异常],数据全部回滚
	 */
	@Test
	public void withHolding9(){
		TestMemberCommon.updateMemeberDigest(custId,"1235");
		res = transService.withHolding(req);
		
		assertEquals(ReturnCode.FAIL, res.getResCode());
		assertEquals("客户数据异常", res.getResMsg());
		assertEquals("" , res.getResData().getTranNo());
		assertEquals("" , res.getResData().getStatus());
		assertEquals("" , res.getResData().getSerialNo());
		
		assertEquals(0 , TestLockCommon.existLock(mid, TabsConstant.LOCK_TYPE_TRANSACTION.val(), serialNo));
	}
	
	/**
	 * withHolding1的测试类 测试的方法：
	 * 10. 根据会员号查询到会员名称和请求中不一致,响应码为999999，响应信息[请求报文中客户名称custName与客户号custId的客户名称不符！],数据全部回滚
	 */
	@Test
	public void withHolding10(){
		reqData.setCustName("王五");
		req.setXml(GenReqXML.genWithHoldXML(req));
		res = transService.withHolding(req);
		
		assertEquals(ReturnCode.FAIL, res.getResCode());
		assertEquals("请求报文中客户名称"+reqData.getCustName()+"与客户号"+custId+"的客户名称不符！", res.getResMsg());
		assertEquals("" , res.getResData().getTranNo());
		assertEquals("" , res.getResData().getStatus());
		assertEquals("" , res.getResData().getSerialNo());
		
		assertEquals(0 , TestLockCommon.existLock(mid, TabsConstant.LOCK_TYPE_TRANSACTION.val(), serialNo));
	}
	
	/**
	 * withHolding1的测试类 测试的方法：
	 * 11. 根据商户编号查询到投资人为空,响应码为999999，响应信息[商户号为mid无投资人],数据全部回滚
	 */
	@Test
	public void withHolding11(){
		InitTestMemberInfo.deleteInvestMember();
		res = transService.withHolding(req);
		
		assertEquals(ReturnCode.FAIL, res.getResCode());
		assertEquals("商户号为"+mid+"无投资人", res.getResMsg());
		assertEquals("" , res.getResData().getTranNo());
		assertEquals("" , res.getResData().getStatus());
		assertEquals("" , res.getResData().getSerialNo());
		
		assertEquals(0 , TestLockCommon.existLock(mid, TabsConstant.LOCK_TYPE_TRANSACTION.val(), serialNo));
		InitTestMemberInfo.insertInvestMember(mid);
	}
	
	/**
	 * withHolding1的测试类 测试的方法：
	 * 12. 商户信息被篡改(MD5校验失败),响应码为999999，响应信息[投资人信息异常],数据全部回滚
	 */
	@Test
	public void withHolding12(){
		InitTestMemberInfo.updateInvestDigest("1234");
		res = transService.withHolding(req);
		
		assertEquals(ReturnCode.FAIL, res.getResCode());
		assertEquals("投资人信息异常", res.getResMsg());
		assertEquals("" , res.getResData().getTranNo());
		assertEquals("" , res.getResData().getStatus());
		assertEquals("" , res.getResData().getSerialNo());
		
		assertEquals(0 , TestLockCommon.existLock(mid, TabsConstant.LOCK_TYPE_TRANSACTION.val(), serialNo));
	}
	
	/**
	 * withHolding1的测试类 测试的方法：
	 * 13. 插入交易表失败,响应码为999999，响应信息[新增交易失败！],数据全部回滚
	 */
	@Test
	public void withHolding13(){
		
		insertTrade(TestSequenceUtils.getNextTradeNo(mid, "01"));
		res = transService.withHolding(req);
		
		assertEquals(ReturnCode.FAIL, res.getResCode());
		assertEquals("新增交易失败！", res.getResMsg());
		assertEquals("" , res.getResData().getTranNo());
		assertEquals("" , res.getResData().getStatus());
		assertEquals("" , res.getResData().getSerialNo());
		
		assertEquals(0 , TestLockCommon.existLock(mid, TabsConstant.LOCK_TYPE_TRANSACTION.val(), serialNo));
	}
	
	/**
	 * withHolding1的测试类 测试的方法：
	 * 14. 插入支付表失败,响应码为999999，响应信息[新增支付失败！],数据全部回滚
	 */
	@Test
	public void withHolding14(){
		
		insertPayment(TestSequenceUtils.getNextPaymentNo(mid, "01"));
		res = transService.withHolding(req);
		
		assertEquals(ReturnCode.FAIL, res.getResCode());
		assertEquals("新增支付失败！", res.getResMsg());
		assertEquals("" , res.getResData().getTranNo());
		assertEquals("" , res.getResData().getStatus());
		assertEquals("" , res.getResData().getSerialNo());
		
		assertEquals(0 , TestLockCommon.existLock(mid, TabsConstant.LOCK_TYPE_TRANSACTION.val(), serialNo));
	}
	
	/**
	 * withHolding1的测试类 测试的方法：
	 * 15. 支付锁表JNF_T10中存在相同交易记录,响应码为999999，响应信息[存在相同的支付编号为orderNo的代扣交易,请核实！],数据全部回滚
	 */
	@Test
	public void withHolding15(){
		String orderNo = TestSequenceUtils.getNextTradeNo(mid, "01");
		TestLockCommon.insertLock(mid, TabsConstant.LOCK_TYPE_PAYMENT.val(), orderNo);
		res = transService.withHolding(req);
		
		assertEquals(ReturnCode.FAIL, res.getResCode());
		assertEquals("存在相同的支付编号为"+orderNo+"的代扣交易,请核实！", res.getResMsg());
		assertEquals("" , res.getResData().getTranNo());
		assertEquals("" , res.getResData().getStatus());
		assertEquals("" , res.getResData().getSerialNo());
		
		assertEquals(0 , TestLockCommon.existLock(mid, TabsConstant.LOCK_TYPE_TRANSACTION.val(), serialNo));
	}
	
	/**
	 * withHolding1的测试类 测试的方法：
	 * 16. 调用商户接口反查二次握手发生异常，响应码为999999，响应信息[调用商户提供反查代扣数据出错],数据全部回滚
	 */
	@Test
	public void withHolding16(){
		
		
		res = transService.withHolding(req);
		
		assertEquals(ReturnCode.FAIL, res.getResCode());
		assertEquals("调用商户提供反查代扣数据出错", res.getResMsg());
		assertEquals("" , res.getResData().getTranNo());
		assertEquals("" , res.getResData().getStatus());
		assertEquals("" , res.getResData().getSerialNo());
		
		assertEquals(0 , TestLockCommon.existLock(mid, TabsConstant.LOCK_TYPE_TRANSACTION.val(), serialNo));
	}
	
	/**
	 * withHolding1的测试类 测试的方法：
	 * 17. 调用商户接口反查二次握手数据不匹配，响应码为999999，响应信息[该笔支付存在风险！该笔交易经二次握手检查数据不一致！],数据全部回滚
	 */
	@Test
	public void withHolding17(){
		
		res = transService.withHolding(req);
		
		assertEquals(ReturnCode.FAIL, res.getResCode());
		assertEquals("该笔支付存在风险！该笔交易经二次握手检查数据不一致！", res.getResMsg());
		assertEquals("" , res.getResData().getTranNo());
		assertEquals("" , res.getResData().getStatus());
		assertEquals("" , res.getResData().getSerialNo());
		
		assertEquals(0 , TestLockCommon.existLock(mid, TabsConstant.LOCK_TYPE_TRANSACTION.val(), serialNo));
	}
	
	/**
	 * withHolding1的测试类 测试的方法：
	 * 18. 调用中间业务平台银联代扣代扣失败,数据不回滚
	 */
	@Test
	public void withHolding18(){
		
		res = transService.withHolding(req);
		
		assertEquals(ReturnCode.SUCCESS, res.getResCode());
		assertEquals("业务编号为" + serialNo + "代扣成功！", res.getResMsg());
		assertNotSame("" , res.getResData().getTranNo());
		assertEquals(TabsConstant.TRANSACTION_STATUS_DEAL.val(), res.getResData().getStatus());
		assertEquals(serialNo , res.getResData().getSerialNo());
		
		assertEquals(1 , TestLockCommon.existLock(mid, TabsConstant.LOCK_TYPE_TRANSACTION.val(), serialNo));
	}


}
