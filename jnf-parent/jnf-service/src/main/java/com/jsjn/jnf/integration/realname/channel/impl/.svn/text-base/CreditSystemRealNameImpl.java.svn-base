package com.jsjn.jnf.integration.realname.channel.impl;

import java.util.Random;

import org.apache.log4j.Logger;

import com.jsjn.jnf.bean.bo.integration.SocialCreditRspDto;
import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.dao.member.RealNameFlowDao;
import com.jsjn.jnf.integration.interfaces.CreditSystem;
import com.jsjn.jnf.integration.interfaces.SendMessage;
import com.jsjn.jnf.integration.realname.channel.RealNameChannelInterface;
import com.jsjn.jnf.service.assist.DictService;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 元素实名认证针对渠道实现
 * 
 * @author qiangl
 * 
 */
public class CreditSystemRealNameImpl implements RealNameChannelInterface {

	private final static Logger logger = Logger.getLogger(CreditSystemRealNameImpl.class);
	private RealNameFlowDao rn = (RealNameFlowDao) ParseSpring.context.getBean("realNameFlowDao");
	private static DictService service = (DictService) ParseSpring.context.getBean("dictServiceImpl");

	public SocialCreditRspDto validate(String custName, String idNo, String cardNo, String tel, String orgNo, String token,String mid) throws Exception{
	    
	    SocialCreditRspDto scrDto = new SocialCreditRspDto();
	    
		// 1、生成4位数字验证码，并把验证码写入数据库
		String code = buildCode(Global.CODELENGTH);
		int n = rn.updateCode(code, token);
		if (n <= 0) {
			logger.error("更新验证码出错");
			scrDto.setValid(false);
			scrDto.setReturnMsg("绑定失败，请重新发送请求！");
			return scrDto;
		}
		// 2、发4要素认证
		SocialCreditRspDto result = CreditSystem.bankCardValidate(idNo, custName, cardNo, tel, orgNo,mid);
		if (!result.getValid()) {
			logger.error(result.getReturnMsg());
			scrDto.setValid(false);
            scrDto.setReturnMsg(result.getReturnMsg());
            scrDto.setReturnCode(result.getReturnCode());
			return scrDto;
		}
		// 通过之后发送短信
		SendMessage message = new SendMessage();
		// 定义一个消息模板
		String plant = messageTemplet(code, cardNo);
		boolean flag = message.send(tel, plant);
		if(!flag){
			logger.error("发送短信失败");
			scrDto.setValid(false);
            scrDto.setReturnMsg("绑定失败，请重新发送请求！");
			return scrDto;
		}
		scrDto.setValid(true);
        scrDto.setReturnMsg("用户信息校验成功");
		return scrDto;
	}

	public boolean submit(String custName, String idNo, String cardNo, String tel, String code, String token) {
		// 检查验证码是否正确
		String rawCode = rn.queryCode(token);
		if ("".equals(rawCode)) {
			logger.error("查询验证码出错");
			return false;
		}
		if (!code.equals(rawCode)) {
			logger.error("发送验证码错误");
			return false;
		}
		return true;
	}

	/**
	 * 生成验证码
	 * 
	 * @param 长度
	 * @return
	 */
	private String buildCode(int num) {
		String[] str = { "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" };
		Random rand = new Random();// 创建Random类的对象rand
		String code = "";
		int index = 0;
		for (int i = 0; i < num; ++i) {
			index = rand.nextInt(str.length - 1);// 在0到str.length-1生成一个伪随机数赋值给index
			code += str[index];// 将对应索引的数组与code的变量值相连接
		}
		return code;
	}

	/**
	 * 获取短信模板
	 * 
	 * @return "code","cardNo"
	 */
	private String messageTemplet(String code, String cardNo) {
		String message = service.findByType(Global.MESSAGETYPE);
		String lastCardNo = cardNo.substring(cardNo.length() - 4, cardNo.length());
		String str = message.replace("{VALIDATECODE}", code);
		str = str.replace("{BANKCARD}", lastCardNo);
		return str;
	}

}
