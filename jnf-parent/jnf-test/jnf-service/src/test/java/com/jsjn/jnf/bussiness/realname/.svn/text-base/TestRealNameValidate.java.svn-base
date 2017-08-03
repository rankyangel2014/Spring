package com.jsjn.jnf.bussiness.realname;


import java.util.Date;

import org.apache.log4j.Logger;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Test;

import com.jsjn.panda.setup.ParseSpring;
import com.jsjn.jnf.bean.bo.realname.RealNameReqBO;
import com.jsjn.jnf.bean.bo.realname.RealNameResBO;
import com.jsjn.jnf.bean.bo.realname.RealNameReqDataBO;
import com.jsjn.jnf.bussiness.realname.RealNameSerivce;
import com.jsjn.jnf.common.GenReqXML;
import com.jsjn.jnf.common.InitTestMemberInfo;
import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.common.security.Cryptos;
import com.jsjn.jnf.common.utils.DateUtils;
import com.jsjn.jnf.dao.member.RealNameFlowDao;
import com.jsjn.jnf.dao.member.memberDao.TestMemberCommon;
import com.jsjn.jnf.dao.member.realNameFlowDao.TestMemberFlowCommon;

/**
 * TestRealNameServiceImpl的测试类 测试的方法：validate 测试思路：
 * 1. 同一报文多次发送，rspCode返回码为999999，rspMsg返回为“请求报文重复,请核实！”
 * 2. custName或idNo或bankCardNo或mobile不存在时，rspCode返回码为999999，rspMsg返回为“custName 姓名不能为空或custName 用户名输入不正确”
 * 3. custName或idNo或bankCardNo或mobile存在，但是为""时，rspCode返回码为999999，rspMsg返回为“custName 姓名不能为空或custName 用户名输入不正确”
 * 4. 银行卡格式不合法，rspCode返回码为999999，rspMsg返回为“bankCardNo 银行卡格式不合法”
 * 5. 根据mId, custName, idNo, bankCardNo查询签约协议列表isBindCard，returnError返回该银行卡已经被绑定！
 * 6. 根据银行卡号无法找到对应的银行，rspCode返回码为999999，rspMsg返回为“未能查询到该卡所对应的银行！”
 * 7. bankCardNo为信用卡卡号，rspCode返回码为999999，rspMsg返回为“不支持信用卡！”
 * 8. bankCardNo不在支持银行范围内，rspCode返回码为999999，rspMsg返回为“返回暂不支持该银行！”
 * 9. 身份证和姓名不符，rspCode返回码为999999，rspMsg返回为“用户身份证和姓名核实错误”
 * 10. 身份证和姓名相符，银行卡和手机号不符合四要素验证，rspCode返回码为999999，rspMsg返回为“用户身份证和姓名核实错误”，同时流水表状态为9
 * 11. 发短信失败，rspCode返回码为999999，rspMsg返回为“绑定失败，用户信息输入验证失败！”，同时流水表状态为9
 * 12. 如果已经是会员（同一个人，不同手机号，银行卡号注册），rspCode返回码为000000，rspMsg返回为“实名认证验证成功”，同时会员表中手机变为更新后的号码
 * 13. 所有参数都检查正常，rspCode返回码为000000，rspMsg返回为“实名认证四要素验证成功”，返回token；检查流水表的状态字段应该为1
 *
 */

public class TestRealNameValidate {
	
	private static Logger logger = Logger.getLogger(TestRealNameValidate.class);

	private RealNameSerivce realnameService = (RealNameSerivce) ParseSpring.context.getBean("realNameServiceImpl");
	private RealNameFlowDao realNameFlowDao = (RealNameFlowDao) ParseSpring.context.getBean("realNameFlowDao");
    
    private String custName = "测试借款人";
	private String idNo = "610111196409290097";
	private String bankCardNo = "9558800200135073266";
	private String mobile = "15655555555";
    
    
    private RealNameReqBO req = new RealNameReqBO();
	private RealNameReqDataBO reqData = new RealNameReqDataBO();
	
	private RealNameResBO res = new RealNameResBO();
	
	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		logger.info("开始启动validate测试...");
		logger.info("开始预置测试商户信息数据...");
		InitTestMemberInfo.initBusinessMember("9999");
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
		logger.info("validate测试完成...");
		logger.info("删除预置测试商户数据...");
		InitTestMemberInfo.deleteAllMember("9999");
	}
	
	@Before
	public void tearUp() throws Exception {
		setCommontParam();
	}
	
	@After
	public void tearDown() throws Exception {
		InitTestMemberInfo.deleteLoanMember("9999");
	}
	
	/**
	 * 公共请求参数
	 * @return
	 */
	public RealNameReqBO setCommontParam(){
		req = new RealNameReqBO();
		reqData = new RealNameReqDataBO();
		
		req.setMid("9999");
		req.setService("realNameAuthByMessage");
		req.setAppkey(InitTestMemberInfo.getAppkey("9999"));
		req.setCharset("UTF-8");
		req.setSignType("RSA");
		req.setTimeStamp(DateUtils.formatDate(new Date(), "yyyy-MM-dd HH:mm:ss:SSS"));
		
		reqData.setCustName(this.custName);
		reqData.setIdNo(this.idNo);
		reqData.setBankCardNo(this.bankCardNo);
		reqData.setMobile(this.mobile);
		req.setReqData(reqData);
		req.setXml(GenReqXML.genRealNameXML(req));
		
		return req;
	}
	
	
	/**
	 * TestRealNameServiceImpl测试类
	 * 1. 同一报文多次发送，rspCode返回码为999999，rspMsg返回为“请求报文重复,请核实！”
	 */
	@Test
	public void validate1(){
		res = realnameService.validate(req);
		res = realnameService.validate(req);
		
		Assert.assertEquals(ReturnCode.FAIL, res.getResCode());
		Assert.assertEquals("请求报文重复,请核实！", res.getResMsg());
	}

	/**
	 * TestRealNameServiceImpl测试类
	 * 2. custName或idNo或bankCardNo或mobile不存在时，rspCode返回码为999999，rspMsg返回为“custName 姓名不能为空或custName 用户名输入不正确”
	 */
	@Test
	public void validate2(){
		reqData.setCustName(null);
		req.setXml(GenReqXML.genRealNameXML(req));
		
		res = realnameService.validate(req);
		
		Assert.assertEquals(ReturnCode.FAIL, res.getResCode());
		Assert.assertTrue(res.getResMsg().equals("custName 姓名不能为空") || res.getResMsg().equals("custName 用户名输入不正确"));
		
	}
	
	/**
	 * TestRealNameServiceImpl测试类
	 * 3. custName或idNo或bankCardNo或mobile存在，但是为""时，rspCode返回码为999999，rspMsg返回为“custName 姓名不能为空或custName 用户名输入不正确”
	 */
	@Test
	public void validate3(){
		reqData.setCustName("");
		req.setXml(GenReqXML.genRealNameXML(req));
		
		res = realnameService.validate(req);
		
		Assert.assertEquals(ReturnCode.FAIL, res.getResCode());
		Assert.assertTrue(res.getResMsg().equals("custName 姓名不能为空") || res.getResMsg().equals("custName 用户名输入不正确"));
		
	}
	
	/**
	 * TestRealNameServiceImpl测试类
	 * 4. 银行卡格式不合法，rspCode返回码为999999，rspMsg返回为“bankCardNo 银行卡格式不合法”
	 */
	@Test
	public void validate4(){
		reqData.setBankCardNo("62257687158071931");
		req.setXml(GenReqXML.genRealNameXML(req));
		
		res = realnameService.validate(req);
		
		Assert.assertEquals(ReturnCode.FAIL, res.getResCode());
		Assert.assertEquals("bankCardNo 银行卡号输入错误", res.getResMsg());
	}
	
	
	/**
	 * TestRealNameServiceImpl测试类
	 * 5. 根据mId, custName, idNo, bankCardNo查询签约协议列表isBindCard，returnError返回该银行卡已经被绑定！
	 */
	@Test
	public void validate5(){
		//四要素认证
		res =realnameService.validate(req);
		//短信认证
		req.getReqData().setToken(res.getResData().getToken());
		req.getReqData().setCode(realNameFlowDao.queryCode(res.getResData().getToken()));
		
		req.setService("realNameAuthByMessage");
		req.setXml(GenReqXML.genRealNameXML(req));
		realnameService.submit(req);
		
		//四要素认证
		setCommontParam();
		res = realnameService.validate(req);
		
		Assert.assertEquals(ReturnCode.FAIL, res.getResCode());
		Assert.assertEquals("该银行卡已经被绑定！", res.getResMsg());
	}
	
	
	/**
	 * TestRealNameServiceImpl测试类
	 * 6. 根据银行卡号无法找到对应的银行，rspCode返回码为999999，rspMsg返回为“未能查询到该卡所对应的银行！”
	 */
	@Test
	public void validate6(){
		reqData.setBankCardNo("1111111111111111111118");
		req.setXml(GenReqXML.genRealNameXML(req));
		
		res = realnameService.validate(req);
		
		Assert.assertEquals(ReturnCode.FAIL, res.getResCode());
		Assert.assertEquals("未能查询到该卡所对应的银行！", res.getResMsg());
		
	}
	
	
	/**
	 * TestRealNameServiceImpl测试类
	 * 7. bankCardNo为信用卡卡号，rspCode返回码为999999，rspMsg返回为“不支持信用卡！”
	 */
	@Test
	public void validate7(){
		reqData.setBankCardNo("5254980012170051");
		req.setXml(GenReqXML.genRealNameXML(req));
		
		res = realnameService.validate(req);
		
		Assert.assertEquals(ReturnCode.FAIL, res.getResCode());
		Assert.assertEquals("不支持信用卡！", res.getResMsg());
	}
	
	/**
	 * TestRealNameServiceImpl测试类
	 * 8. bankCardNo不在支持银行范围内，rspCode返回码为999999，rspMsg返回为“返回暂不支持该银行！”
	 */
	@Test
	public void validate8(){
		//华夏银行
		reqData.setBankCardNo("6226301620263381");
		req.setXml(GenReqXML.genRealNameXML(req));
		
		res = realnameService.validate(req);
		
		Assert.assertEquals(ReturnCode.FAIL, res.getResCode());
		Assert.assertEquals("暂不支持该银行！", res.getResMsg());
	}
	
	
	/**
	 * TestRealNameServiceImpl测试类
	 * 9. 用户未注册会员，身份证和姓名不符，rspCode返回码为999999，rspMsg返回为“用户身份证和姓名核实错误”
	 */
	@Test
	public void validate9(){
		reqData.setCustName("测试");
		reqData.setIdNo("511702197701193532");
		req.setXml(GenReqXML.genRealNameXML(req));
		
		res = realnameService.validate(req);
		
		Assert.assertEquals(ReturnCode.FAIL, res.getResCode());
		Assert.assertEquals("用户身份证和姓名核实错误", res.getResMsg());
	}
	
	/**
	 * TestRealNameServiceImpl测试类
	 * 10. 身份证和姓名相符，银行卡和手机号不符合四要素验证，rspCode返回码为999999，rspMsg返回为“绑定失败，用户信息输入验证失败！”，同时流水表状态为9
	 */
	@Ignore
	public void validate10(){
		reqData.setCustName("测试四");
		reqData.setIdNo("522635198908262178");
		reqData.setBankCardNo("6225768715807193");
		reqData.setMobile("13776661001");
		req.setReqData(reqData);
		req.setXml(GenReqXML.genRealNameXML(req));
		
		res = realnameService.validate(req);
		
		Assert.assertEquals(ReturnCode.FAIL, res.getResCode());
		Assert.assertEquals("绑定失败，用户信息输入验证失败！", res.getResMsg());
		Assert.assertEquals("9", TestMemberFlowCommon.queryMemberFlowByMid("9999").getState());
	}
	
	
	/**
	 * TestRealNameServiceImpl测试类
	 * 11. 发短信失败，rspCode返回码为999999，rspMsg返回为“绑定失败，用户信息输入验证失败！”，同时流水表状态为9
	 */
	@Ignore
	public void validate11(){
		res = realnameService.validate(req);
		
		Assert.assertEquals(ReturnCode.FAIL, res.getResCode());
		Assert.assertEquals("绑定失败，用户信息输入验证失败！", res.getResMsg());
		Assert.assertEquals("9", TestMemberFlowCommon.queryMemberFlowByMid("9999").getState());
	}
	
	/**
	 * TestRealNameServiceImpl测试类
	 * 12. 如果已经是会员（同一个人，不同手机号，银行卡号注册），rspCode返回码为000000，rspMsg返回为“实名认证验证成功”，同时会员表中手机变为更新后的
	 */
	@Test
	public void validate12(){
		res = realnameService.validate(req);
		
		reqData.setMobile("15655555556");
		req.setXml(GenReqXML.genRealNameXML(req));
		
		res = realnameService.validate(req);
		
		Assert.assertEquals(ReturnCode.SUCCESS, res.getResCode());
		Assert.assertEquals("实名认证验证成功", res.getResMsg());
		Assert.assertEquals(Cryptos.aesEncrypt("15655555556"), 
				TestMemberCommon.queryMemberInfoByIdNo("9999", Cryptos.aesEncrypt(reqData.getIdNo())).getMobile());
	}
	
	
	/**
	 * TestRealNameServiceImpl测试类
	 * 13. 所有参数都检查正常，rspCode返回码为000000，rspMsg返回为“实名认证四要素验证成功”，返回token,检查流水表的状态字段应该为1
	 */
	@Test
	public void validate13() {
		res = realnameService.validate(req);
		
		Assert.assertEquals(ReturnCode.SUCCESS, res.getResCode());
		Assert.assertEquals("实名认证验证成功", res.getResMsg());
		Assert.assertNotNull(res.getResData().getToken());
		Assert.assertEquals("1", TestMemberFlowCommon.queryMemberFlowByMid("9999").getState());
		
	}
	
	
}
