package com.jsjn.jnf.dao.member.realNameFlowDao;


import org.apache.log4j.Logger;
import org.springframework.dao.DuplicateKeyException;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.springframework.jdbc.UncategorizedSQLException;

import com.jsjn.jnf.bean.dto.member.RealNameFlowDto;
import com.jsjn.jnf.common.security.Cryptos;
import com.jsjn.jnf.dao.member.RealNameFlowDao;
import com.jsjn.jnf.service.assist.utils.SequenceUtils;
import com.jsjn.panda.setup.ParseSpring;
/**
 * RealNameFlowDao的测试类 
 * insertFlow测试思路
 * 说明:在流水表中插入流水记录
 * 预置条件：无
 * 1. 必填字段为空（id,mId,custName,idNo,bankCardNo,mobile）,插入数据不成功，方法返回异常
 * 2. 各字段填写正确，方法正常执行；检查表中记录插入的数据与传入的值一致
 * 3. 插入重复的记录（id和idNo与另外一条记录重复），方法返回异常
 * 4. 传入参数的位数超长（mId为5位，custName为33位，idNo为19位，bankCardNo为33位，mobile为12位），方法返回异常
 * 
 */
public class TestInsertFlow {
	
	@Rule
    public ExpectedException thrown = ExpectedException.none();
	
	private int id;	//流水ID
	
	private RealNameFlowDao dao = (RealNameFlowDao) ParseSpring.context.getBean("realNameFlowDao");
	
	
	
	private static final Logger logger = Logger.getLogger(TestInsertFlow.class);
	
	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		logger.info("开始启动insertFlow测试...");
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
		logger.info("insertFlow测试完成！");
	}
	
	@After
	public void tearDown() throws Exception {
		TestMemberFlowCommon.deleteMemberFlowById(this.id);
	}
	
	/**
	 * RealNameFlowDao的测试类 
	 * 1. 必填字段为空（id,mId,custName,idNo,bankCardNo,mobile）,插入数据不成功，方法返回异常
	 */
	@Test(expected = IllegalArgumentException.class)
	public void InsertFlow1() {
		RealNameFlowDto dto = new RealNameFlowDto();
		dao.insert(dto);
	}
	
	/**
	 * RealNameFlowDao的测试类 
	 * 2. 各字段填写正确，方法正常执行；检查表中记录插入的数据与传入的值一致
	 */
	@Test
	public void InsertFlow2() {
		
		int id            = SequenceUtils.getRealNameFlow();
		this.id 		  = id;
		String mid        = "9999";
		String custName   = Cryptos.aesEncrypt("张三");
		String idNo       = Cryptos.aesEncrypt("511702198504283656");
		String bankCardNo = Cryptos.aesEncrypt("6214850212331638");
		String mobile     = Cryptos.aesEncrypt("15656565656");
		String state      = "1";
		String bankName   = "招商银行";
		String bankCode   = "0308";
		
		insertFlow(id, mid, custName, idNo, bankCardNo, mobile, state, bankName, bankCode);
		
		RealNameFlowDto dto = TestMemberFlowCommon.queryMemberFlowById(id);

		Assert.assertEquals(id, 		dto.getId());
		Assert.assertEquals(mid, 		dto.getmId());
		Assert.assertEquals(custName, 	dto.getCustName());
		Assert.assertEquals(idNo, 		dto.getIdNo());
		Assert.assertEquals(bankCardNo, dto.getBankCardNo());
		Assert.assertEquals(mobile, 	dto.getMobile());
		Assert.assertEquals(state, 		dto.getState());
		Assert.assertEquals(bankName, 	dto.getBankName());
		Assert.assertEquals(bankCode, 	dto.getBankCode());
		
	}
	
	/**
	 * RealNameFlowDao的测试类 
	 * 3. 插入重复的记录（id和idNo与另外一条记录重复），方法返回异常
	 */
	@Test
	public void InsertFlow3() {
		thrown.expect(DuplicateKeyException.class);
		thrown.expectMessage("unique constraint (AS_JNF.SYS_C00254012) violated");
		
		int id            = SequenceUtils.getRealNameFlow();
		this.id           = id;
		String mid        = "9999";
		String custName   = Cryptos.aesEncrypt("张三");
		String idNo       = Cryptos.aesEncrypt("511702198504283656");
		String bankCardNo = Cryptos.aesEncrypt("6214850212331638");
		String mobile     = Cryptos.aesEncrypt("15656565656");
		String state      = "1";
		String bankName   = "招商银行";
		String bankCode   = "0308";

		insertFlow(id, mid, custName, idNo, bankCardNo, mobile, state, bankName, bankCode);
		insertFlow(id, mid, custName, idNo, bankCardNo, mobile, state, bankName, bankCode);
		
	}
	
	/**
	 * RealNameFlowDao的测试类 
	 * 4. 传入参数的位数超长（mId为5位，custName为33位，idNo为19位，bankCardNo为33位，mobile为12位），方法返回异常
	 */
	@Test
	public void InsertFlow4() {
		
		thrown.expect(UncategorizedSQLException.class);
		thrown.expectMessage("value too large for column \"AS_JNF\".\"JNF_T14\".\"C2\"");
		
		int id            = SequenceUtils.getRealNameFlow();
		String mid        = "99999";
		String custName   = "111111111111111111111111111111111";
		String idNo       = "1111111111111111111";
		String bankCardNo = "111111111111111111111111111111111";
		String mobile     = "111111111111";
		String state      = "1";
		String bankName   = "招商银行";
		String bankCode   = "0308";

		insertFlow(id, mid, custName, idNo, bankCardNo, mobile, state, bankName, bankCode);
		
	}
	
	
	/**
	 * 插入一条记录（测试DAO）
	 * @param id
	 * @param mid
	 * @param custName
	 * @param idNo
	 * @param bankCardNo
	 * @param mobile
	 * @param state
	 * @param bankName
	 * @param bankCode
	 */
	public void insertFlow(int id,String mid,String custName,String idNo,String bankCardNo,String mobile,String state,String bankName,String bankCode){
		RealNameFlowDto insertDto = new RealNameFlowDto();
		insertDto.setId(id);
		insertDto.setmId(mid);
		insertDto.setCustName(custName);
		insertDto.setIdNo(idNo);
		insertDto.setBankCardNo(bankCardNo);
		insertDto.setMobile(mobile);
		insertDto.setState(state);
		insertDto.setBankName(bankName);
		insertDto.setBankCode(bankCode);

		dao.insertFlow(insertDto);
	}
	
}
