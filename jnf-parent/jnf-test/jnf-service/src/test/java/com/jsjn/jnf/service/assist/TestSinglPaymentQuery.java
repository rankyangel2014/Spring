package com.jsjn.jnf.service.assist;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Matchers;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.api.support.membermodification.MemberModifier;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import org.springframework.test.util.ReflectionTestUtils;
import static org.mockito.Mockito.*;

import com.jsjn.jnf.bean.bo.trade.SinglPayStatusDataBO;
import com.jsjn.jnf.bean.bo.trade.SinglPayStatusReqBO;
import com.jsjn.jnf.bean.bo.trade.SinglPayStatusResBO;
import com.jsjn.jnf.bean.dto.trade.TransactionDto;
import com.jsjn.jnf.bussiness.trade.TradeService;
import com.jsjn.jnf.common.utils.AopTargetUtils;
import com.jsjn.jnf.dao.trade.TransactionDao;
import com.jsjn.jnf.service.trade.TransactionService;
import com.jsjn.panda.setup.ParseSpring;

public class TestSinglPaymentQuery {

	/**
	 * TransactionServiceImpl的测试类 
	 * 测试的方法：
	 * 
	 * updateTransactionByTradeNo 测试思路：
	 * 1. 业务请求中不包含tranNo,返回失败的resDto(ResCode为999999,
	 *    错误消息ResMsg为"", ResData为null)
	 * 2. 更新表失败,抛出Exception异常
	 * 3. 更新表成功,返回成功的resDto(ResCode为000000,
	 *    错误消息ResMsg为"更新交易表成功！", ResData为null)
	 *    
	 * queryTransactionByTradeNo 测试思路：
	 * 1. 根据tranNo查询不到记录,返回失败的resDto(ResCode为001403,
	 *    错误消息ResMsg为"该支付订单号不存在！",ResData为null)
	 * 2. 根据tranNo能查询到记录,MD5校验失败,返回失败的resDto(ResCode为999999,
	 *    错误消息ResMsg为"该笔交易数据异常",ResData为null)
	 * 3. 所有检查正常，返回成功的resDto(ResCode为000000,
	 *    错误消息ResMsg为"查询支付状态成功",ResData的tranNo和状态正确)
	 */
	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
	}

	@Before
	public void setUp() throws Exception {
	}

	@After
	public void tearDown() throws Exception {
	}
	
	@Test
	/**
	 * 业务请求中tranNo为"",返回失败的resDto(ResCode为999999,
	 *    错误消息ResMsg为"", ResData为null)
	 */
	public void testSinglePaymentQueryCase1() {
		TradeService transServiceImpl = (TradeService) ParseSpring.context.getBean("tradeServiceImpl");
		SinglPayStatusReqBO dto = new SinglPayStatusReqBO();
		SinglPayStatusDataBO reqDataDto = new SinglPayStatusDataBO();
		reqDataDto.setTranNo("");
		dto.setReqData(reqDataDto);
		SinglPayStatusResBO resDto = transServiceImpl.singlePaymentQuery(dto);
		assertEquals(resDto.getResCode(), "999999");
		assertEquals(resDto.getResMsg(), "tranNo 交易订单编号不能为空");
		assertEquals(resDto.getResData().getTranNo(), null);
		assertEquals(resDto.getResData().getStatus(), null);
		assertEquals(resDto.getResData().getFailReason(), null);	
		
	}
	

	@Test
	/**
	 * 业务请求中tranNo为null,返回失败的resDto(ResCode为999999,
	 *    错误消息ResMsg为"", ResData为null)
	 */
	public void testSinglePaymentQueryCase2() {
		TradeService transServiceImpl = (TradeService) ParseSpring.context.getBean("tradeServiceImpl");
		SinglPayStatusReqBO dto = new SinglPayStatusReqBO();
		SinglPayStatusDataBO reqDataDto = new SinglPayStatusDataBO();
		dto.setReqData(reqDataDto);
		SinglPayStatusResBO resDto = transServiceImpl.singlePaymentQuery(dto);
		assertEquals(resDto.getResCode(), "999999");
		assertEquals(resDto.getResMsg(), "tranNo 交易订单编号不能为空");
		assertEquals(resDto.getResData().getTranNo(), null);
		assertEquals(resDto.getResData().getStatus(), null);
		assertEquals(resDto.getResData().getFailReason(), null);
			
	}
	
	
	@Test
	/**
	 * 根据mid和tranNo查询不到记录(mid不正确),返回失败的resDto(ResCode为001403,
	 *    错误消息ResMsg为"该支付订单号不存在！",ResData为null)
	 */
	public void testSinglePaymentQueryCase3() throws Exception {
		TradeService transServiceImpl = (TradeService) ParseSpring.context.getBean("tradeServiceImpl");
		String tranNo = "111111111111111111111";
		String mid = "1233";
		SinglPayStatusReqBO dto = new SinglPayStatusReqBO();
		SinglPayStatusDataBO reqDataDto = new SinglPayStatusDataBO();
		dto.setMid(mid);
		reqDataDto.setTranNo(tranNo);
		dto.setReqData(reqDataDto);
//		TransactionDao spy = mock(TransactionDao.class);
//		TransactionDto transDto = new TransactionDto();
//		transDto.setMid("1233");
//		Mockito.when(spy.queryTransactionByTradeNo(Mockito.anyString(), Mockito.anyString())).thenReturn(transDto);
//	
//        ReflectionTestUtils.setField(AopTargetUtils.getTarget(transServiceImpl), "transDao", spy);

        SinglPayStatusResBO resDto = transServiceImpl.singlePaymentQuery(dto);
		assertEquals(resDto.getResCode(), "001403");
		assertEquals(resDto.getResMsg(), "该支付订单号不存在！");
		assertEquals(resDto.getResData().getTranNo(), null);
		assertEquals(resDto.getResData().getStatus(), null);
		assertEquals(resDto.getResData().getFailReason(), null);
	}
	
	@Test
	/**
	 * 根据mid和tranNo查询不到记录(tranNo不正确),返回失败的resDto(ResCode为001403,
	 *    错误消息ResMsg为"该支付订单号不存在！",ResData为null)
	 */
	public void testSinglePaymentQueryCase4() {
		TradeService transServiceImpl = (TradeService) ParseSpring.context.getBean("tradeServiceImpl");
		String tranNo = "111111111111111111111";
		String mid = "1233";
		SinglPayStatusReqBO dto = new SinglPayStatusReqBO();
		SinglPayStatusDataBO reqDataDto = new SinglPayStatusDataBO();
		dto.setMid(mid);
		reqDataDto.setTranNo(tranNo);
		dto.setReqData(reqDataDto);
		SinglPayStatusResBO resDto = transServiceImpl.singlePaymentQuery(dto);
		assertEquals(resDto.getResCode(), "001403");
		assertEquals(resDto.getResMsg(), "该支付订单号不存在！");
		assertEquals(resDto.getResData().getTranNo(), null);
		assertEquals(resDto.getResData().getStatus(), null);
		assertEquals(resDto.getResData().getFailReason(), null);
	}

}
