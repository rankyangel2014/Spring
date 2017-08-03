package com.jsjn.jnf.dao.trade;


import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.springframework.dao.DataIntegrityViolationException;

import com.jsjn.jnf.bean.dto.trade.TransactionDto;
import com.jsjn.jnf.common.config.TabsConstant;
import com.jsjn.jnf.common.security.Cryptos;
import com.jsjn.jnf.common.utils.IdGen;
import com.jsjn.jnf.service.assist.utils.SequenceUtils;
import com.jsjn.panda.setup.ParseSpring;

public class TestTradeFlowQry {
/**
 * tradeFlowQuery测试思路:
 * 说明:通过mid,startDt和endDt组合查询数据
 * 预置条件,数据库有3条记录(日期1<日期2<日期3):
 * (1).mid为商户1,C16为日期1;
 * (2).mid为商户1,C16为日期2;
 * (3).mid为商户2,C16为日期3;
 * 1. startDt格式不正确(非日期格式),抛出异常
 * 2. endDt格式不正确(非日期格式),抛出异常
 * 3. mid为null或空字符串,查询不到数据
 * 4. startDt为null或者空字符串,查询不到数据
 * 5. endDt为null或者空字符串,查询不到数据
 * 6. mid为商户1,startDt为日期1,endDt为日期1进行查询,仅能查询到记录(1)
 * 7. mid为商户1,startDt为日期3,endDt为日期3进行查询,无记录
 * 8. mid为商户1,startDt为日期1,endDt为日期3,能查到记录(1)(2)
 * 9. mid为商户2,startDt为日期1,endDt为日期1进行查询,无记录
 * 
 */
	private static final Logger logger = Logger.getLogger(TestQryTransByTrade.class);
	
	private TransactionDao dao = (TransactionDao) ParseSpring.context.getBean("transactionDao");
	
	@Rule
    public ExpectedException thrown = ExpectedException.none();
	
	private static final String mid1 = "9999";
	private static final String mid2 = "9998";
	
	private static final String date1 = "20150110";
	private static final String date2 = "20150111";
	private static final String date3 = "20150112";
	
	
	private static final String tradeNo1 = SequenceUtils.getTrasaction(mid1, "01");
	private static final String tradeNo2 = SequenceUtils.getTrasaction(mid1, "01");
	private static final String tradeNo3 = SequenceUtils.getTrasaction(mid2, "01");
	
	
	private static void insertTrade(String tradeNo,String mid,Date created){
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
		dto.setCreated(created);
		dto.setDigest(dto.buildDigest());
		
		TestTradeCommon.insertTrade(dto);
	}
	
	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		logger.info("开始启动tradeFlowQuery测试...");
		logger.info("插入预置数据...");
		insertTrade(tradeNo1,mid1,new SimpleDateFormat("yyyyMMdd").parse(date1));
		insertTrade(tradeNo2,mid1,new SimpleDateFormat("yyyyMMdd").parse(date2));
		insertTrade(tradeNo3,mid2,new SimpleDateFormat("yyyyMMdd").parse(date3));
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
		logger.info("tradeFlowQuery测试完成！");
		logger.info("删除预置数据...");
		TestTradeCommon.deleteAllTrade();
	}


	/**
	 * tradeFlowQuery测试思路:
	 * 1. startDt格式不正确(非日期格式),抛出异常
	 */
	@Test
	public void tradeFlowQuery1() {
		thrown.expect(DataIntegrityViolationException.class);
		thrown.expectMessage("not a valid month");
		dao.tradeFlowQuery(mid1, "20133131", date3);
	}
	
	/**
	 * tradeFlowQuery测试思路:
	 * 2. endDt格式不正确(非日期格式),抛出异常
	 */
	@Test
	public void tradeFlowQuery2() {
		thrown.expect(DataIntegrityViolationException.class);
		thrown.expectMessage("not a valid month");
		dao.tradeFlowQuery(mid1, date1, "20133131");
	}
	
	/**
	 * tradeFlowQuery测试思路:
	 * 3. mid为null或空字符串,查询不到数据
	 */
	@Test
	public void tradeFlowQuery3() {
		Assert.assertEquals(0, dao.tradeFlowQuery(null, date1, date2).size());
		Assert.assertEquals(0, dao.tradeFlowQuery("", date1, date2).size());
	}
	
	/**
	 * tradeFlowQuery测试思路:
	 * 4. startDt为null或者空字符串,查询不到数据
	 */
	@Test
	public void tradeFlowQuery4() {
		Assert.assertEquals(0, dao.tradeFlowQuery(mid1, null, date2).size());
		Assert.assertEquals(0, dao.tradeFlowQuery(mid1, "", date2).size());
	}
	
	/**
	 * tradeFlowQuery测试思路:
	 * 5. endDt为null或者空字符串,查询不到数据
	 */
	@Test
	public void tradeFlowQuery5() {
		Assert.assertEquals(0, dao.tradeFlowQuery(mid1, date1, null).size());
		Assert.assertEquals(0, dao.tradeFlowQuery(mid1, date1, "").size());
	}
	
	/**
	 * tradeFlowQuery测试思路:
	 * 6. mid为商户1,startDt为日期1,endDt为日期1进行查询,仅能查询到记录(1)
	 */
	@Test
	public void tradeFlowQuery6() {
		List<TransactionDto> list = dao.tradeFlowQuery(mid1, date1, date1);
		Assert.assertEquals(1, list.size());
		Assert.assertEquals(tradeNo1, list.get(0).getTradeNo());
	}
	
	/**
	 * tradeFlowQuery测试思路:
	 * 7. mid为商户1,startDt为日期3,endDt为日期3进行查询,无记录
	 */
	@Test
	public void tradeFlowQuery7() {
		Assert.assertEquals(0, dao.tradeFlowQuery(mid1, date3, date3).size());
	}
	
	/**
	 * tradeFlowQuery测试思路:
	 * 8. mid为商户1,startDt为日期1,endDt为日期3,能查到记录(1)(2)
	 */
	@Test
	public void tradeFlowQuery8() {
		Assert.assertEquals(2, dao.tradeFlowQuery(mid1, date1, date3).size());
	}
	
	/**
	 * tradeFlowQuery测试思路:
	 * 9. mid为商户2,startDt为日期1,endDt为日期1进行查询,无记录
	 */
	@Test
	public void tradeFlowQuery9() {
		Assert.assertEquals(0, dao.tradeFlowQuery(mid2, date1, date1).size());
	}

}
