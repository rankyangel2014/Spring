package com.jsjn.jnf.dao.trade;


import java.math.BigDecimal;
import java.util.Date;
import java.util.List;


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


public class TestQryTransBySta {
/**
 *
 * queryTransactionByTradeStatus测试思路:
 * 说明:通过交易状态C13查询交易表数据
 * 预置条件,数据库有4条记录(1:支付处理中2条(不同商户)、2:交易成功、9交易失败各1条)
 * 1. status为1,查询到2条记录,数据正确
 * 2. status为2、9,查询到1条记录,数据正确
 * 3. status为其他字符串,查询不到数据
 * 4. status为null或者空字符串,查询不到数据
 * 
 */
	private TransactionDao dao = (TransactionDao) ParseSpring.context.getBean("transactionDao");
	
	
	private static final Logger logger = Logger.getLogger(TestQryTransBySta.class);
	
	private static final String mid1 = "9999";
	private static final String mid2 = "9998";
	
	private static final String tradeNo1 = SequenceUtils.getTrasaction(mid1, "01");
	private static final String tradeNo2 = SequenceUtils.getTrasaction(mid2, "01");
	private static final String tradeNo3 = SequenceUtils.getTrasaction(mid1, "01");
	private static final String tradeNo4 = SequenceUtils.getTrasaction(mid1, "01");
	
	private static void insertTrade(String tradeNo,String mid,String status){
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
		dto.setStatus(status);
		dto.setDesc("测试");
		dto.setCreated(new Date());
		dto.setModified(new Date());
		dto.setDigest(dto.buildDigest());
		
		TestTradeCommon.insertTrade(dto);
	}
	
	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		logger.info("开始启动queryTransactionByTradeStatus测试...");
		logger.info("插入预置数据...");
		TestTradeCommon.deleteAllTrade();
		insertTrade(tradeNo1,mid1,TabsConstant.TRANSACTION_STATUS_DEAL.val());
		insertTrade(tradeNo2,mid2,TabsConstant.TRANSACTION_STATUS_DEAL.val());
		insertTrade(tradeNo3,mid1,TabsConstant.TRANSACTION_STATUS_FAIL.val());
		insertTrade(tradeNo4,mid2,TabsConstant.TRANSACTION_STATUS_SUCC.val());
		
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
		logger.info("queryTransactionByTradeStatus测试完成！");
		logger.info("删除预置数据...");
		TestTradeCommon.deleteAllTrade();
	}

	/**
	 * queryTransactionByTradeStatus测试思路:
	 * 1. status为1,查询到2条记录,数据正确
	 */
	@Test
	public void queryTransactionByTradeStatus1() {
		List<TransactionDto> list = dao.queryTransactionByTradeStatus(TabsConstant.TRANSACTION_STATUS_DEAL.val());
		Assert.assertEquals(2, list.size());
	}
	
	/**
	 * queryTransactionByTradeStatus测试思路:
	 * 2. status为2、9,查询到1条记录,数据正确
	 */
	@Test
	public void queryTransactionByTradeStatus2() {
		List<TransactionDto> list1 = dao.queryTransactionByTradeStatus(TabsConstant.TRANSACTION_STATUS_SUCC.val());
		Assert.assertEquals(1, list1.size());
		Assert.assertEquals(TabsConstant.TRANSACTION_STATUS_SUCC.val(), list1.get(0).getStatus());
		Assert.assertEquals(tradeNo4, list1.get(0).getTradeNo());
		
		List<TransactionDto> list2 = dao.queryTransactionByTradeStatus(TabsConstant.TRANSACTION_STATUS_FAIL.val());
		Assert.assertEquals(1, list2.size());
		Assert.assertEquals(TabsConstant.TRANSACTION_STATUS_FAIL.val(), list2.get(0).getStatus());
		Assert.assertEquals(tradeNo3, list2.get(0).getTradeNo());
	}
	
	/**
	 * queryTransactionByTradeStatus测试思路:
	 * 3. status为其他字符串,查询不到数据
	 */
	@Test
	public void queryTransactionByTradeStatus3() {
		Assert.assertEquals(0, dao.queryTransactionByTradeStatus("10").size());
	}
	
	/**
	 * queryTransactionByTradeStatus测试思路:
	 * 4. status为null或者空字符串,查询不到数据
	 */
	@Test
	public void queryTransactionByTradeStatus4() {
		Assert.assertEquals(0, dao.queryTransactionByTradeStatus("").size());
		Assert.assertEquals(0, dao.queryTransactionByTradeStatus(null).size());
	}

}
