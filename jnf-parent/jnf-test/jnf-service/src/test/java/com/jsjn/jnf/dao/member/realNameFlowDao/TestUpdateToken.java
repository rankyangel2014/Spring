package com.jsjn.jnf.dao.member.realNameFlowDao;



import org.apache.log4j.Logger;
import org.junit.AfterClass;
import org.junit.Assert;
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
 * updateToken测试思路
 * 说明：根据flowId更新流水表，更新token,modified,custId3个字段
 * 预置条件：流水表中存在2条记录，记录1的flowId（id）为流水1，记录2的flowId（id）为流水2
 * 1. 修改flowId为流水1的记录，传入正常的token，custId更新记录成功，数据表中的记录与传入的值一致
 * 2. 修改flowId为流水2的记录，传入的token（51位），custId（14位）字段超长，方法返回异常
 * 3. 传入的flowId为流水3，无数据更新
 */
public class TestUpdateToken {
	
	@Rule
    public ExpectedException thrown = ExpectedException.none();
	
	private RealNameFlowDao dao = (RealNameFlowDao) ParseSpring.context.getBean("realNameFlowDao");
	
	
	private static final Logger logger = Logger.getLogger(TestUpdateToken.class);
	
	private static final int id1 = SequenceUtils.getRealNameFlow();
	private static final int id2 = SequenceUtils.getRealNameFlow();
	private static final int id3 = SequenceUtils.getRealNameFlow();
	
	private static final String token1 = IdGen.uuid();
	private static final String custId1 = SequenceUtils.getMemberInfo("9999");
	
	private static final String token2 = "111111111111111111111111111111111111111111111111111";
	private static final String custId2 = "11111111111111";
	
	private static RealNameFlowDto insertDto = null;
	
	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		logger.info("开始启动updateToken测试...");
		logger.info("插入预置数据...");
		insertDto = new RealNameFlowDto();
		insertDto.setId(id1);
		insertDto.setmId("9999");
		insertDto.setCustName(Cryptos.aesEncrypt("张三"));
		insertDto.setIdNo(Cryptos.aesEncrypt("511702198504283656"));
		insertDto.setBankCardNo(Cryptos.aesEncrypt("6214850212331638"));
		insertDto.setMobile(Cryptos.aesEncrypt("15656565656"));
		TestMemberFlowCommon.insertMemberFlow(insertDto);
		
		insertDto.setId(id2);
		TestMemberFlowCommon.insertMemberFlow(insertDto);
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
		logger.info("updateToken测试完成！");
		logger.info("删除预置数据...");
		TestMemberFlowCommon.deleteMemberFlowById(id1);
		TestMemberFlowCommon.deleteMemberFlowById(id2);
	}
	
	/**
	 * RealNameFlowDao的测试类
	 * 1. 修改flowId为流水1的记录，传入正常的token，custId更新记录成功，数据表中的记录与传入的值一致
	 */
	@Test
	public void updateToken1(){
		dao.updateToken(token1, id1+"", custId1);
		
		RealNameFlowDto dto = TestMemberFlowCommon.queryMemberFlowById(id1);
		Assert.assertEquals(token1, dto.getToken());
		Assert.assertEquals(custId1, dto.getCustId());
	}
	
	/**
	 * RealNameFlowDao的测试类
	 * 2. 修改flowId为流水2的记录，传入的token（51位），custId（14位）字段超长，方法返回异常
	 */
	@Test
	public void updateToken2(){
		thrown.expect(UncategorizedSQLException.class);
		thrown.expectMessage("value too large for column \"AS_JNF\".\"JNF_T14\".\"C16\"");
		
		dao.updateToken(token2, id2+"", custId2);
	}
	
	/**
	 * RealNameFlowDao的测试类
	 * 3. 传入的flowId为流水3，无数据更新
	 */
	@Test
	public void updateToken3(){
		Assert.assertEquals(0, dao.updateToken(token1, id3+"", custId1));
	}
	
}
