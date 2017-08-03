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
 * findCust测试思路:
 * 说明:通过mId和idNo查询用户是否存在，返回C1(custId)
 * 预置条件：数据库有1条记录(mID=商户1,IdNo=证件1)
 * 1. 传入的mId为商户1，idNo为证件1正常，方法正常执行，返回1条记录
 * 2. 传入的mId为商户2，idNo为证件2，方法正常执行，无结果返回
 * 3. 传入的mId为商户2，idNo为证件1，方法正常执行，无结果返回
 * 
 */
public class TestFindCustId {
	
	private static final Logger logger = Logger.getLogger(TestQueryCode.class);
	
	private MemberDao dao = (MemberDao) ParseSpring.context.getBean("memberDao");
	
	private static final String mid1 = "9999";
	private static final String idNo1 = "412826196207025241";
	
	private static final String mid2 = "9998";
	private static final String idNo2 = "610111196303230061";
	
	private static final String custId = SequenceUtils.getMemberInfo(mid1);

	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		logger.info("开始启动findCustId测试...");
		logger.info("插入预置数据...");
		MemberDto dto = new MemberDto();
		dto.setCustId(custId);
		dto.setCustName(Cryptos.aesEncrypt("测试用户"));
		dto.setmId(mid1);
		dto.setCustType("2");
		dto.setMobile(Cryptos.aesEncrypt("15656565656"));
		dto.setState("1");
		dto.setIsReal("0");
		dto.setRemark("测试用户");
		dto.setIdType("1");
		dto.setIdNo(Cryptos.aesEncrypt(idNo1));
		dto.setExtCustId("1234");
		dto.setInsttuId("320581001");
		dto.setDigest(dto.buildDigest());
		
		TestMemberCommon.insertMemberInfo(dto);
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
		logger.info("findCustId测试完成！");
		logger.info("删除预置数据...");
		TestMemberCommon.deleteMemberInfoById(custId);
	}
	
	/**
	 * MemberDao的测试类 
	 * 1. 传入的mId为商户1，idNo为证件1正常，方法正常执行，返回1条记录
	 */
	@Test
	public void findCust1(){
		Assert.assertNotNull(dao.findCust(mid1,Cryptos.aesEncrypt(idNo1)));
	}
	
	/**
	 * MemberDao的测试类 
	 * 2. 传入的mId为商户2，idNo为证件2，方法正常执行，无结果返回
	 */
	@Test
	public void findCust2(){
		Assert.assertNull(dao.findCust(mid2,Cryptos.aesEncrypt(idNo2)));
	}
	
	/**
	 * MemberDao的测试类 
	 * 3. 传入的mId为商户2，idNo为证件1，方法正常执行，无结果返回
	 */
	@Test
	public void findCust3(){
		Assert.assertNull(dao.findCust(mid2,Cryptos.aesEncrypt(idNo1)));
	}


}
