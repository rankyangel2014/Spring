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
 * selectByToken测试思路
 * 说明：根据token查询第一次用户填写信息
 * 预置条件：数据表中存在1条记录（token=token1）
 * 1. 传入的token=token1，方法正常执行，返回记录1的相关数据
 * 3. 传入的token=token2，返回结果为空
 * 
 */
public class TestSelectByToken {
	
	private RealNameFlowDao dao = (RealNameFlowDao) ParseSpring.context.getBean("realNameFlowDao");
	
	private static final Logger logger = Logger.getLogger(TestSelectByToken.class);
	private static final int id = SequenceUtils.getRealNameFlow();
	private static final String token1 = IdGen.uuid();
	private static final String token2 = IdGen.uuid();
	private static final String code = TestMemberFlowCommon.buildCode(Global.CODELENGTH);
	
	private static RealNameFlowDto insertDto = null;
	
	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		logger.info("开始启动selectByToken测试...");
		logger.info("插入预置数据...");
		insertDto = new RealNameFlowDto();
		insertDto.setId(id);
		insertDto.setmId("9999");
		insertDto.setBussinessId("111111111111111111111");
		insertDto.setCustId(SequenceUtils.getMemberInfo("9999"));
		insertDto.setCustName(Cryptos.aesEncrypt("张三"));
		insertDto.setIdNo(Cryptos.aesEncrypt("511702198504283656"));
		insertDto.setBankCardNo(Cryptos.aesEncrypt("6214850212331638"));
		insertDto.setMobile(Cryptos.aesEncrypt("15656565656"));
		insertDto.setValidateCode(code);
		insertDto.setState("1");
		insertDto.setToken(token1);
		insertDto.setBankName("招商银行");
		insertDto.setBankCode("0308");
		TestMemberFlowCommon.insertMemberFlow(insertDto);
		
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
		logger.info("selectByToken测试完成！");
		logger.info("删除预置数据...");
		TestMemberFlowCommon.deleteMemberFlowById(id);
	}
	
	/**
	 * RealNameFlowDao的测试类 
	 * 1. 传入的token=token1，方法正常执行，返回记录1的相关数据
	 */
	@Test
	public void selectByToken1(){
		RealNameFlowDto retDto = dao.selectByToken(token1);
		
		
		Assert.assertEquals(insertDto.getCustId(),      retDto.getCustId());
		Assert.assertEquals(insertDto.getCustName(),    retDto.getCustName());
		Assert.assertEquals(insertDto.getIdNo(),       	retDto.getIdNo());
		Assert.assertEquals(insertDto.getBankCardNo(),  retDto.getBankCardNo());
		Assert.assertEquals(insertDto.getMobile(),      retDto.getMobile());
		Assert.assertEquals(insertDto.getBankName(),    retDto.getBankName());
		Assert.assertEquals(insertDto.getBankCode(),    retDto.getBankCode());
		
		
	}
	
	/**
	 * RealNameFlowDao的测试类 
	 * 2. 传入的token=token2，方法正常执行，返回记录2的相关数据
	 */
	@Test
	public void selectByToken2(){
		RealNameFlowDto retDto = dao.selectByToken(token2);
		Assert.assertNull(retDto);
		
	}
	

}
