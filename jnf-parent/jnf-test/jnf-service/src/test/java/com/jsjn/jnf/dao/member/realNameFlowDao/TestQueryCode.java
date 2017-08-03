package com.jsjn.jnf.dao.member.realNameFlowDao;


import org.apache.log4j.Logger;
import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

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
 * queryCode测试思路
 * 说明：根据token查询用户输入验证码
 * 预置条件：数据表中存在1条记录（token=token1）
 * 1. 传入的token=token1，方法正常执行，返回该记录的code
 * 2. 传入的token=token2，方法返回异常，不返回结果
 * 
 */
public class TestQueryCode {
	
	
	private RealNameFlowDao dao = (RealNameFlowDao) ParseSpring.context.getBean("realNameFlowDao");
	
	
	private static final Logger logger = Logger.getLogger(TestQueryCode.class);
	
	private static final int id = SequenceUtils.getRealNameFlow();
	private static final String token = IdGen.uuid();
	private static final String token2 = IdGen.uuid();
	private static final String code = TestMemberFlowCommon.buildCode(Global.CODELENGTH);
	
	
	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		logger.info("开始启动queryCode测试...");
		logger.info("插入预置数据...");
		RealNameFlowDto dto = new RealNameFlowDto();
		dto.setId(id);
		dto.setmId("9999");
		dto.setBussinessId("111111111111111111111");
		dto.setCustId(SequenceUtils.getMemberInfo("9999"));
		dto.setCustName(Cryptos.aesEncrypt("张三"));
		dto.setIdNo(Cryptos.aesEncrypt("511702198504283656"));
		dto.setBankCardNo(Cryptos.aesEncrypt("6214850212331638"));
		dto.setMobile(Cryptos.aesEncrypt("15656565656"));
		dto.setValidateCode(code);
		dto.setState("1");
		dto.setException("失败");
		dto.setIp("1287.0.0.1");
		dto.setPushFlag("1");
		dto.setToken(token);
		dto.setBankName("招商银行");
		dto.setBankCode("0308");
		TestMemberFlowCommon.insertMemberFlow(dto);
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
		logger.info("queryCode测试完成！");
		logger.info("删除预置数据...");
		TestMemberFlowCommon.deleteMemberFlowById(id);
	}
	
	/**
	 * RealNameFlowDao的测试类 
	 * 1. 传入的token=token1，方法正常执行，返回该记录的code
	 */
	@Test
	public void queryCode1() {
		Assert.assertEquals(dao.queryCode(token), code);
	}
	
	/**
	 * RealNameFlowDao的测试类 
	 * 传入的token=token2，方法返回异常，不返回结果
	 */
	@Test
	public void queryCode2(){
		Assert.assertNull(dao.queryCode(token2));
	}
	
}
