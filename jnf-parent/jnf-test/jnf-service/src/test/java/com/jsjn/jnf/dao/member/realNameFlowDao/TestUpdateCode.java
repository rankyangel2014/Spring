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
import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.common.security.Cryptos;
import com.jsjn.jnf.common.utils.IdGen;
import com.jsjn.jnf.dao.member.RealNameFlowDao;
import com.jsjn.jnf.service.assist.utils.SequenceUtils;
import com.jsjn.panda.setup.ParseSpring;
/**
 * RealNameFlowDao的测试类 
 * 
 * updateCode测试思路
 * 说明：根据token和C10 = '0'，更新validateCode
 * 预置条件：数据表中存在3条记录（token=token1，state=0；token=token2，state=1；token=token3，state=0）
 * 1. 传入token=token1，validateCode=验证码1，方法正常执行，检查表记录1的字段validateCode为验证码1
 * 2. 传入token=token2，validateCode=验证码2，无记录更新
 * 3. 传入token=token3，validateCode=验证码3，验证码为7位，出现异常
 * 
 */
public class TestUpdateCode {
	
	@Rule
    public ExpectedException thrown = ExpectedException.none();
	
	
	private RealNameFlowDao dao = (RealNameFlowDao) ParseSpring.context.getBean("realNameFlowDao");
	
	private static final Logger logger = Logger.getLogger(TestUpdateCode.class);
	private static final int id1 = SequenceUtils.getRealNameFlow();
	private static final int id2 = SequenceUtils.getRealNameFlow();
	private static final int id3 = SequenceUtils.getRealNameFlow();
	
	private static final String token1 = IdGen.uuid();
	private static final String state1 = "0";
	
	private static final String token2 = IdGen.uuid();
	private static final String state2 = "1";
	
	private static final String token3 = IdGen.uuid();
	private static final String state3 = "0";
	
	private static final String code1 = TestMemberFlowCommon.buildCode(Global.CODELENGTH);
	private static final String code2 = TestMemberFlowCommon.buildCode(Global.CODELENGTH);
	private static final String code3 = "1111111";
	
	private static RealNameFlowDto insertDto = null;
	
	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		logger.info("开始启动updateCode测试...");
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
		
		insertDto.setId(id3);
		insertDto.setState(state3);
		insertDto.setToken(token3);
		TestMemberFlowCommon.insertMemberFlow(insertDto);
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
		logger.info("updateCode测试完成！");
		logger.info("删除预置数据...");
		TestMemberFlowCommon.deleteMemberFlowById(id1);
		TestMemberFlowCommon.deleteMemberFlowById(id2);
		TestMemberFlowCommon.deleteMemberFlowById(id3);
	}
	
	@Before
	public void setUp() throws Exception {
	}

	@After
	public void tearDown() throws Exception {
	}
	
	/**
	 * RealNameFlowDao的测试类 
	 * 1. 传入token=token1，validateCode=验证码1，方法正常执行，检查表记录1的字段validateCode为验证码1
	 */
	@Test
	public void updateCode1(){
		dao.updateCode(code1, token1);
		Assert.assertEquals(code1, TestMemberFlowCommon.queryMemberFlowById(id1).getValidateCode());
	}
	
	/**
	 * RealNameFlowDao的测试类 
	 * 2. 传入token=token2，validateCode=验证码2，无记录更新
	 */
	@Test
	public void updateCode2(){
		Assert.assertEquals(dao.updateCode(code2, token2), 0);
	}
	
	/**
	 * RealNameFlowDao的测试类 
	 * 3. 传入token=token3，validateCode=验证码3，验证码为7位，出现异常
	 */
	@Test
	public void updateCode3(){
		thrown.expect(UncategorizedSQLException.class);
		thrown.expectMessage("value too large for column \"AS_JNF\".\"JNF_T14\".\"C9\"");
		
		dao.updateCode(code3, token3);
	}

}
