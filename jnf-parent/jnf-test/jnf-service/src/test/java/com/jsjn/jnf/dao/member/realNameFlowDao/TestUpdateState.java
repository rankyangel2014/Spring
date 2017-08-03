package com.jsjn.jnf.dao.member.realNameFlowDao;


import org.apache.log4j.Logger;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.springframework.jdbc.UncategorizedSQLException;

import com.jsjn.jnf.bean.dto.member.RealNameFlowDto;
import com.jsjn.jnf.common.security.Cryptos;
import com.jsjn.jnf.common.utils.IdGen;
import com.jsjn.jnf.dao.member.RealNameFlowDao;
import com.jsjn.jnf.service.assist.utils.SequenceUtils;
import com.jsjn.panda.setup.ParseSpring;
/**
 * RealNameFlowDao的测试类 
 * 
 * updateState测试思路
 * 说明：根据token和modified字段，修改state状态值
 * 预置条件：流水表中存在2条记录（记录的状态为：0=发起验证请求，token=token1，0=发起验证请求，token=token2）
 * 1. 修改token=token1的记录，state修改为1，方法正常执行，检查标记字段更新正确
 * 2. 修改token=token2的记录，state修改为为2位，出现异常
 * 3. 传入token为19位，无记录更新
 * 
 */
public class TestUpdateState {
	
	@Rule
	public ExpectedException thrown = ExpectedException.none();
	
	private RealNameFlowDao dao = (RealNameFlowDao) ParseSpring.context.getBean("realNameFlowDao");
	
	private static final Logger logger = Logger.getLogger(TestUpdateState.class);
	private static final int id1 = SequenceUtils.getRealNameFlow();
	private static final int id2 = SequenceUtils.getRealNameFlow();
	
	private static final String token1 = IdGen.uuid();
	private static final String state1 = "0";
	
	private static final String token2 = IdGen.uuid();
	private static final String state2 = "0";
	
	private static final String token3 = "1111111111111111111";
	
	private static RealNameFlowDto insertDto = null;
	
	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		logger.info("开始启动updateState测试...");
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
		logger.info("updateState测试完成！");
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
	 * 1. 修改token=token1的记录，state修改为1，方法正常执行，检查标记字段更新正确
	 */
	@Test
	public void updateState1(){
		dao.updateState(token1, "1");
		Assert.assertEquals("1", TestMemberFlowCommon.queryMemberFlowById(id1).getState());
	}
	
	/**
	 * RealNameFlowDao的测试类
	 * 2. 修改token=token2的记录，state修改为为2位，出现异常
	 */
	@Test
	public void updateState2(){
		thrown.expect(UncategorizedSQLException.class);
		thrown.expectMessage("value too large for column \"AS_JNF\".\"JNF_T14\".\"C10\"");
		
		dao.updateState(token2, "10");
	}
	
	/**
	 * RealNameFlowDao的测试类
	 * 3. 传入token为19位，无记录更新
	 */
	@Test
	public void updateState3(){
		Assert.assertEquals(0, dao.updateState(token3, "2"));
	}

}
