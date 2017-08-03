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
import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.common.utils.DateUtils;
import com.jsjn.jnf.dao.member.RealNameFlowDao;
import com.jsjn.jnf.dao.member.realNameFlowDao.TestMemberFlowCommon;

/**
 *
 * * TestRealNameServiceImpl测试类 测试的方法：submit 测试思路：
 * 预置数据：一条已通过四要素验证的信息
 * 1. 同一报文多次发送，rspCode返回码为999999，rspMsg返回为“请求报文重复,请核实！”
 * 2. name或idNo或bankCardNo或mobile或code或token不存在时，能够能够抛出异常 
 * 3. name或idNo或bankCardNo或mobile或code或token存在，但是为""时，能够能够抛出异常
 * 4. 根据token通过selectByToken获取流水对象RealNameFlowDto，该对象为空，返回token值无效
 * 5. 相同的token重复提交，updateSendState出错，返回“用户重复提交”
 * 6. token插入时间，距离现在超过5分钟isOverTime，返回token有效时间为5分钟，已超时；需要检查流水表中该记录的状态值，应该置为1
 * 7. 发送的四要素信息custName，idNo，bankCardNo，mobile与第一次发送的不一致，返回两次发送数据不一致！需要检查流水表中该记录的状态值，应该置为1
 * 8. 其他信息都正确，code填写错误，校验验证码submit错误，返回验证码错误！需要检查流水表中该记录的状态值，应该置为1
 * //TODO 目前无法实现
 * 9. 添加白名单addWhitePer失败，返回添加白名单失败！需要检查流水表中该记录的状态值，应该置为1
 * //TODO 目前无法实现
 * 10. 添加签约记录signAgree失败，返回系统异常，签约失败！检查流水表记录的状态值（更新flow表状态改为1）
 * 11. 所有参数都检查正常，rspCode返回码为000000，rspMsg返回为“实名认证短信验证成功”，返回 cardSignNo返回custId；检查流水表中该记录的状态应为3
 * 12. 签约失败后，再次发起验证请求，支持
 * 
 */

public class TestRealNameSubmit {
	
	private static Logger logger = Logger.getLogger(TestRealNameSubmit.class);

	private RealNameSerivce realnameService = (RealNameSerivce) ParseSpring.context.getBean("realNameServiceImpl");
	private RealNameFlowDao realNameFlowDao = (RealNameFlowDao) ParseSpring.context.getBean("realNameFlowDao");
	
	private String token = "";
	private String code = "";
	
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
		logger.info("开始执行测试方法...");
		logger.info("进行预置实名认证4要素数据...");
		RealNameReqBO req = new RealNameReqBO();
		RealNameResBO res = new RealNameResBO();
		RealNameReqDataBO reqData = new RealNameReqDataBO();
		
		req.setMid("9999");
		req.setService("realNameAuthBy4Element");
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
		res = realnameService.validate(req);
		
		this.token = res.getResData().getToken();
		this.code = realNameFlowDao.queryCode(this.token);
		
		setCommontParam();
	}
	
	@After
	public void tearDown() throws Exception {
		logger.info("测试方法执行完成...");
		logger.info("删除预置实名认证4要素数据...");
		InitTestMemberInfo.deleteLoanMember("9999");
	}
	
	/**
	 * 公共请求参数
	 * @return
	 */
	public RealNameReqBO setCommontParam(){
		req = new RealNameReqBO();
		res = new RealNameResBO();
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
		reqData.setToken(this.token);
		reqData.setCode(this.code);
		req.setReqData(reqData);
		req.setXml(GenReqXML.genRealNameXML(req));
		
		return req;
	}
	
	
	/**
	 * TestRealNameServiceImpl测试类
	 * 1. 同一报文多次发送，rspCode返回码为999999，rspMsg返回为“请求报文重复,请核实！”
	 */
	@Test
	public void submit1() {
		res = realnameService.submit(req);
		res = realnameService.submit(req);
		
		Assert.assertEquals(ReturnCode.FAIL, res.getResCode());
		Assert.assertEquals("请求报文重复,请核实！", res.getResMsg());
	}

	/**
	 * TestRealNameServiceImpl测试类
	 *2. name或idNo或bankCardNo或mobile或code或token不存在时，rspCode返回码为999999，rspMsg返回为“custName 用户名输入不正确”
	 */
	@Test
	public void submit2(){
		reqData.setCustName(null);
		req.setXml(GenReqXML.genRealNameXML(req));
		
		res = realnameService.submit(req);
		
		Assert.assertEquals(ReturnCode.FAIL, res.getResCode());
		Assert.assertTrue(res.getResMsg().equals("custName 姓名不能为空") || res.getResMsg().equals("custName 用户名输入不正确"));
	}
	
	/**
	 * TestRealNameServiceImpl测试类
	 * 3. custName或idNo或bankCardNo或mobile存在，但是为""时，rspCode返回码为999999，rspMsg返回为“custName 用户名输入不正确”
	 */
	@Test
	public void submit3(){
		reqData.setCustName("");
		req.setXml(GenReqXML.genRealNameXML(req));
		
		res = realnameService.submit(req);
		
		Assert.assertEquals(ReturnCode.FAIL, res.getResCode());
		Assert.assertTrue(res.getResMsg().equals("custName 姓名不能为空") || res.getResMsg().equals("custName 用户名输入不正确"));
	}
	
	
	/**
	 * TestRealNameServiceImpl测试类
	 * 4. 根据token通过selectByToken获取流水对象RealNameFlowDto，该对象为空，返回token值无效
	 */
	@Test
	public void submit4(){
		reqData.setToken("1234");
		req.setXml(GenReqXML.genRealNameXML(req));
		
		res = realnameService.submit(req);
		
		Assert.assertEquals(ReturnCode.FAIL, res.getResCode());
		Assert.assertEquals("token值无效", res.getResMsg());
	}
	
	/**
	 * TestRealNameServiceImpl测试类
	 * 5. 相同的token重复提交，updateSendState出错，返回“用户重复提交”
	 */
	@Test
	public void submit5(){
		res = realnameService.submit(req);
		
		setCommontParam();
		res = realnameService.submit(req);
		
		Assert.assertEquals(ReturnCode.FAIL, res.getResCode());
		Assert.assertEquals("请不要重复提交", res.getResMsg());
	}
	
	/**
	 * TestRealNameServiceImpl测试类
	 * 6. token插入时间，距离现在超过5分钟isOverTime，返回token有效时间为5分钟，已超时；需要检查流水表中该记录的状态值，应该置为1
	 */
	@Ignore
	public void submit6() throws Exception{
		Thread.sleep(Global.OVERTIME * 60 * 1000 + 1000);
		
		res = realnameService.submit(req);
		
		Assert.assertEquals(ReturnCode.FAIL, res.getResCode());
		Assert.assertEquals("token有效时间为5分钟，已超时", res.getResMsg());
	}
	
	/**
	 * TestRealNameServiceImpl测试类
	 * 7. 发送的四要素信息custName，idNo，bankCardNo，mobile与第一次发送的不一致，返回两次发送数据不一致！需要检查流水表中该记录的状态值，应该置为1
	 */
	@Test
	public void submit7(){
		reqData.setCustName("张三");
		req.setXml(GenReqXML.genRealNameXML(req));
		
		res = realnameService.submit(req);
		
		Assert.assertEquals(ReturnCode.FAIL, res.getResCode());
		Assert.assertEquals("两次发送数据不一致！", res.getResMsg());
		Assert.assertEquals("1", TestMemberFlowCommon.queryMemberFlowByMid("9999").getState());
	}
	
	/**
	 * TestRealNameServiceImpl测试类
	 * 8. 其他信息都正确，code填写错误，校验验证码submit错误，返回验证码错误！需要检查流水表中该记录的状态值，应该置为1
	 */
	@Test
	public void submit8(){
		reqData.setCode("1234");
		req.setXml(GenReqXML.genRealNameXML(req));
		
		res = realnameService.submit(req);
		
		Assert.assertEquals(ReturnCode.FAIL, res.getResCode());
		Assert.assertEquals("验证码错误！", res.getResMsg());
		Assert.assertEquals("1", TestMemberFlowCommon.queryMemberFlowByMid("9999").getState());
	}
	
	/**
	 * TestRealNameServiceImpl测试类
	 * 9. 添加白名单addWhitePer失败，返回添加白名单失败！需要检查流水表中该记录的状态值，应该置为1
	 */
	@Test
	public void submit9(){}
	
	/**
	 * TestRealNameServiceImpl测试类
	 * 10. 添加签约记录signAgree失败，返回系统异常，签约失败！检查流水表记录的状态值（更新flow表状态改为1）
	 */
	@Test
	public void submit10(){}
	
	
	/**
	 * TestRealNameServiceImpl测试类
	 * 11. 所有参数都检查正常，rspCode返回码为000000，rspMsg返回为“实名认证短信验证成功”，返回 cardSignNo,返回custId；检查流水表中该记录的状态应为3
	 */
	@Test
	public void submit11(){
		res = realnameService.submit(req);
		
		Assert.assertEquals(ReturnCode.SUCCESS, res.getResCode());
		Assert.assertEquals("实名认证短信验证成功", res.getResMsg());
		Assert.assertNotNull(res.getResData().getAid());
		Assert.assertNotNull(res.getResData().getCustId());
		Assert.assertEquals("3", TestMemberFlowCommon.queryMemberFlowByMid("9999").getState());
	}
	
	/**
	 * TestRealNameServiceImpl测试类
	 * 12. 签约失败后，再次发起验证请求，支持
	 */
	@Test
	public void submit12(){
		//设置签约失败参数
		reqData.setCustName("其它");
		req.setXml(GenReqXML.genRealNameXML(req));
		
		res = realnameService.submit(req);
		
		//设置正确的签约参数
		setCommontParam();
		res = realnameService.submit(req);
		
		Assert.assertEquals(ReturnCode.SUCCESS, res.getResCode());
		Assert.assertEquals("实名认证短信验证成功", res.getResMsg());
		Assert.assertNotNull(res.getResData().getAid());
		Assert.assertNotNull(res.getResData().getCustId());
		Assert.assertEquals("3", TestMemberFlowCommon.queryMemberFlowByMid("9999").getState());
	}
	
	
}
