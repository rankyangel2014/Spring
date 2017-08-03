package com.jsjn.jnf.dao.member.realNameFlowDao;


import org.apache.log4j.Logger;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import com.jsjn.jnf.bean.dto.member.RealNameFlowDto;
import com.jsjn.jnf.common.security.Cryptos;
import com.jsjn.jnf.common.utils.IdGen;
import com.jsjn.jnf.dao.member.RealNameFlowDao;
import com.jsjn.jnf.service.assist.utils.SequenceUtils;
import com.jsjn.panda.setup.ParseSpring;
/**
 * RealNameFlowDao的测试类 
 * 
 * updateSendState测试思路
 * 说明：根据token和state为1修改state为2
 * 预置条件：流水表中存在2条记录（state=1,token=token1;state=3,token=token2）
 * 1. 修改token=token1的记录，方法正常执行，检查表记录字段更新正确，该记录的状态由1变为2
 * 2. 修改token=token2的记录，方法正常执行，检查表记录字段更新正确，该记录的状态未变化
 * 3. 传入的token为19位，无记录更新
 * 
 */
public class TestUpdateSendState {
	
	private RealNameFlowDao dao = (RealNameFlowDao) ParseSpring.context.getBean("realNameFlowDao");
	
	private static final Logger logger = Logger.getLogger(TestUpdateSendState.class);
	
	private static final int id1 = SequenceUtils.getRealNameFlow();
	private static final int id2 = SequenceUtils.getRealNameFlow();
	
	private static final String token1 = IdGen.uuid();
	private static final String state1 = "1";
	
	private static final String token2 = IdGen.uuid();
	private static final String state2 = "3";
	
	private static final String token3 = "1111111111111111111";
	
	private static RealNameFlowDto insertDto = null;
	
	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		logger.info("开始启动updateSendState测试...");
		logger.info("插入预置数据...");
		insertDto = new RealNameFlowDto();
		insertDto.setId(id1);
		insertDto.setmId("9999");
		insertDto.setBussinessId("1111111111111111111");
		insertDto.setCustId(SequenceUtils.getMemberInfo("9999"));
		insertDto.setCustName(Cryptos.aesEncrypt("张三"));
		insertDto.setIdNo(Cryptos.aesEncrypt("511702198504283656"));
		insertDto.setBankCardNo(Cryptos.aesEncrypt("6214850212331638"));
		insertDto.setMobile(Cryptos.aesEncrypt("15656565656"));
		insertDto.setState(state1);
		insertDto.setToken(token1);
		insertDto.setBankName("招商银行");
		insertDto.setBankCode("0308");
		TestMemberFlowCommon.insertMemberFlow(insertDto);
		
		insertDto.setId(id2);
		insertDto.setState(state2);
		insertDto.setToken(token2);
		TestMemberFlowCommon.insertMemberFlow(insertDto);
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
		logger.info("updateSendState测试完成！");
		logger.info("删除预置数据...");
		TestMemberFlowCommon.deleteMemberFlowById(id1);
		TestMemberFlowCommon.deleteMemberFlowById(id2);
	}
	
	@Before
	public void setUp() throws Exception {
	}

	@After
	public void tearDown() throws Exception {
	}
	
	/**
	 * RealNameFlowDao的测试类 
	 * 1. 修改token=token1的记录，方法正常执行，检查表记录字段更新正确，该记录的状态由1变为2
	 */
	@Test
	public void updateSendState1(){
		dao.updateSendState(token1);
		Assert.assertEquals("2", TestMemberFlowCommon.queryMemberFlowById(id1).getState());
	}
	
	/**
	 * RealNameFlowDao的测试类 
	 * 2. 修改token=token2的记录，方法正常执行，检查表记录字段更新正确，该记录的状态未变化
	 */
	@Test
	public void updateSendState2(){
		Assert.assertEquals(0, dao.updateSendState(token1));
		Assert.assertEquals(state2, TestMemberFlowCommon.queryMemberFlowById(id2).getState());
	}
	
	/**
	 * RealNameFlowDao的测试类 
	 * 3. 传入的token为19位，无记录更新
	 */
	@Test
	public void updateSendState3(){
		Assert.assertEquals(0, dao.updateSendState(token3));
	}
}
