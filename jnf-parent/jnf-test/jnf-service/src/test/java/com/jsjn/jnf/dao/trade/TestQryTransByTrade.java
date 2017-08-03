package com.jsjn.jnf.dao.trade;

import java.math.BigDecimal;
import java.util.Date;


import org.apache.log4j.Logger;
import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

import com.jsjn.jnf.bean.dto.trade.TransactionDto;
import com.jsjn.jnf.common.config.TabsConstant;
import com.jsjn.jnf.common.security.Cryptos;
import com.jsjn.jnf.common.utils.IdGen;
import com.jsjn.jnf.service.assist.utils.SequenceUtils;
import com.jsjn.panda.setup.ParseSpring;


public class TestQryTransByTrade {
/**
 * queryTransactionByTradeNo测试思路:
 * 说明:通过mid和tranNo组合查询数据
 * 预置条件,数据库有3条记录:
 * (1).mid(C4)为商户1,tranNo(C1)为交易号2;
 * (2).mid(C4)为商户2,tranNo(C1)为交易号2
 * 1. mid为商户1,tranNo为交易号1进行查询,仅能查询到记录(1)
 * 2. mid为商户2,tranNo为交易号1进行查询,查询不到数据
 * 3. mid为null或空字符串,tranNo为交易号2进行查询,查询不到数据
 * 4. mid为商户1,tranNo为null或空字符串,查询不到记录
 * 
 */
	private TransactionDao dao = (TransactionDao) ParseSpring.context.getBean("transactionDao");
	
	
	private static final Logger logger = Logger.getLogger(TestQryTransByTrade.class);
	
	private static final String mid1 = "9999";
	private static final String payerName1= "还款人1";
	private static final String tradeNo1 = SequenceUtils.getTrasaction(mid1, "01");
	
	private static final String mid2 = "9998";
	private static final String payerName2= "还款人2";
	private static final String tradeNo2 = SequenceUtils.getTrasaction(mid2, "01");
	
	private static void insertTrade(String tradeNo,String mid,String payerName){
		TransactionDto dto = new TransactionDto();
		dto.setTradeNo(tradeNo);
		dto.setbNo(SequenceUtils.getTrasactionBNo());
		dto.setTradeType(TabsConstant.TRANSACTION_TRADETYPE_WITHHOLD.val());
		dto.setMid(mid);
		dto.setMSerialNo(IdGen.uuid());
		dto.setExternLoanNo("1234");
		dto.setPayer(SequenceUtils.getMemberInfo(mid));
		dto.setPayerName(Cryptos.aesEncrypt(payerName));
		dto.setPayerBankCardNo(Cryptos.aesEncrypt("6228480402564890018 "));
		dto.setPayee(SequenceUtils.getMemberInfo(mid));
		dto.setPayeeName(Cryptos.aesEncrypt("投资人"));
		dto.setAmount(new BigDecimal("100.00"));
		dto.setStatus(TabsConstant.TRANSACTION_STATUS_SUCC.val());
		dto.setDesc("测试");
		dto.setCreated(new Date());
		dto.setModified(new Date());
		dto.setDigest(dto.buildDigest());
		
		TestTradeCommon.insertTrade(dto);
	}
	
	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		logger.info("开始启动queryTransactionByTradeNo测试...");
		logger.info("插入预置数据...");
		insertTrade(tradeNo1,mid1,payerName1);
		insertTrade(tradeNo2,mid2,payerName2);
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
		logger.info("queryTransactionByTradeNo测试完成！");
		logger.info("删除预置数据...");
		TestTradeCommon.deleteAllTrade();
	}

	/**
	 * queryTransactionByTradeNo测试思路:
	 * 1. mid为商户1,tranNo为交易号1进行查询,仅能查询到记录(1)
	 */
	@Test
	public void queryTransactionByTradeNo1() {
		Assert.assertEquals(Cryptos.aesEncrypt(payerName1), dao.queryTransactionByTradeNo(mid1, tradeNo1).getPayerName());
	}
	
	/**
	 * queryTransactionByTradeNo测试思路:
	 * 2. mid为商户2,tranNo为交易号1进行查询,查询不到数据
	 */
	@Test
	public void queryTransactionByTradeNo2() {
		Assert.assertNull(dao.queryTransactionByTradeNo(mid2, tradeNo1));
	}
	
	/**
	 * queryTransactionByTradeNo测试思路:
	 * 3. mid为null或空字符串,tranNo为交易号1进行查询,可以查到交易号为1的数据
	 */
	@Test
	public void queryTransactionByTradeNo3() {
		Assert.assertEquals(Cryptos.aesEncrypt(payerName1), dao.queryTransactionByTradeNo("", tradeNo1).getPayerName());
	}
	
	/**
	 * queryTransactionByTradeNo测试思路:
	 * 4. mid为商户1,tranNo为null或空字符串,查询不到记录
	 */
	@Test
	public void queryTransactionByTradeNo4() {
		Assert.assertNull(dao.queryTransactionByTradeNo(mid1, null));
		Assert.assertNull(dao.queryTransactionByTradeNo(mid1, ""));
	}
	
}
