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
 * findOrgNo测试思路：
 * 说明：通过mId和custType查询商户的机构码
 * 预置条件：数据库有3条记录(custType=1，mId=商户1；custType=2，mId=商户2；custType=3，mId=商户3；)
 * 1. 传入的mId为商户1，custType=1，方法正常执行，返回1条记录
 * 2. 传入的mId为商户2，custType=3，方法正常执行，无结果返回
 * 3. 传入的mId为商户4，custType=2，方法正常执行，无结果返回
 * 
 */
public class TestFindOrgNo {
	
	private static final Logger logger = Logger.getLogger(TestQueryCode.class);
	
	private MemberDao dao = (MemberDao) ParseSpring.context.getBean("memberDao");
	
	
	
	private static final String mid1 = "9997";
	private static final String custType1 = "1";
	private static final String custId1 = SequenceUtils.getMemberInfo(mid1);
	
	private static final String mid2 = "9998";
	private static final String custType2 = "2";
	private static final String custId2 = SequenceUtils.getMemberInfo(mid2);
	
	private static final String mid3 = "9999";
	private static final String custType3 = "3";
	private static final String custId3 = SequenceUtils.getMemberInfo(mid3);
	
	private static final String mid4 = "0000";
	

	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		logger.info("开始启动findOrgNo测试...");
		logger.info("插入预置数据...");
		insertMember(custId1,mid1,custType1);
		insertMember(custId2,mid2,custType2);
		insertMember(custId3,mid3,custType3);
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
		logger.info("findOrgNo测试完成！");
		logger.info("删除预置数据...");
		TestMemberCommon.deleteMemberInfoById(custId1);
		TestMemberCommon.deleteMemberInfoById(custId2);
		TestMemberCommon.deleteMemberInfoById(custId3);
	}

	public static void insertMember(String custId,String mid,String custType){
		MemberDto dto = new MemberDto();
		dto.setCustId(custId);
		dto.setCustName(Cryptos.aesEncrypt("测试用户"));
		dto.setmId(mid);
		dto.setCustType(custType);
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
	/**
	 * MemberDao的测试类 
	 * 1. 传入的mId为商户1，custType=1，方法正常执行，返回1条记录
	 */
	@Test
	public void findOrgNo1(){
		Assert.assertNotNull(dao.findOrgNo(mid1, custType1));
	}
	
	/**
	 * MemberDao的测试类 
	 * 2. 传入的mId为商户2，custType=3，方法正常执行，无结果返回
	 */
	@Test
	public void findOrgNo2(){
		Assert.assertNull(dao.findOrgNo(mid2, custType3));
	}
	
	/**
	 * MemberDao的测试类 
	 * 3. 传入的mId为商户4，custType=2，方法正常执行，无结果返回
	 */
	@Test
	public void findOrgNo3(){
		Assert.assertNull(dao.findOrgNo(mid4, custType2));
	}
	

}
