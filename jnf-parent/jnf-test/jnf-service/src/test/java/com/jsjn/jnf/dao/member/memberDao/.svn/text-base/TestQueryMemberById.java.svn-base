package com.jsjn.jnf.dao.member.memberDao;


import org.apache.log4j.Logger;
import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

import com.jsjn.jnf.bean.dto.member.MemberDto;
import com.jsjn.jnf.common.security.Cryptos;
import com.jsjn.jnf.dao.member.MemberDao;
import com.jsjn.jnf.dao.member.realNameFlowDao.TestQueryCode;
import com.jsjn.jnf.service.assist.utils.SequenceUtils;
import com.jsjn.panda.setup.ParseSpring;
/**
 * MemberDao的测试类 
 * 
 * queryMemberById测试思路：
 * 说明：根据custId查询客户信息
 * 预置条件：数据库有1条记录（custId为用户1）
 * 1. 传入的custId为用户1，方法正常执行，返回1条记录
 * 2. 传入的custId为用户2，方法正常执行，无结果返回
 */
public class TestQueryMemberById {
private static final Logger logger = Logger.getLogger(TestQueryCode.class);
	
	private MemberDao dao = (MemberDao) ParseSpring.context.getBean("memberDao");
	
	private static final String mid1 = "9999";
	private static final String custId1 = SequenceUtils.getMemberInfo(mid1);
	
	private static final String custId2 = SequenceUtils.getMemberInfo(mid1);
	

	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		logger.info("开始启动queryInvestInfo测试...");
		logger.info("插入预置数据...");
		MemberDto dto = new MemberDto();
		dto.setCustId(custId1);
		dto.setCustName(Cryptos.aesEncrypt("测试用户"));
		dto.setmId(mid1);
		dto.setCustType("1");
		dto.setMobile(Cryptos.aesEncrypt("15656565656"));
		dto.setState("1");
		dto.setIsReal("0");
		dto.setRemark("测试用户");
		dto.setIdType("1");
		dto.setIdNo(Cryptos.aesEncrypt("610111196303230061"));
		dto.setExtCustId("1234");
		dto.setInsttuId("320581001");
		dto.setDigest(dto.buildDigest());
		
		TestMemberCommon.insertMemberInfo(dto);
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
		logger.info("findOrgNo测试完成！");
		logger.info("删除预置数据...");
		TestMemberCommon.deleteMemberInfoById(custId1);
	}

	/**
	 * MemberDao的测试类 
	 * 1. 传入的custId为用户1，方法正常执行，返回1条记录
	 */
	@Test
	public void queryMemberById1(){
		Assert.assertNotNull(dao.queryMemberById(custId1));
	}
	
	/**
	 * MemberDao的测试类 
	 *2. 传入的custId为用户2，方法正常执行，无结果返回
	 */
	@Test
	public void queryMemberById2(){
		Assert.assertNull(dao.queryMemberById(custId2));
	}

}
