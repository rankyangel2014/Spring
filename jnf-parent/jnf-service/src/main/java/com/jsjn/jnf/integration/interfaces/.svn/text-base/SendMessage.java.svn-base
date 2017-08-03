package com.jsjn.jnf.integration.interfaces;

import java.util.ArrayList;

import com.jsjn.jnf.common.utils.Logger;
import com.jsjn.jnf.common.utils.StringUtils;
import com.jsjn.jnf.dao.assist.DictDao;
import com.jsjn.panda.setup.ParseSpring;
import com.jsjn.sms.SmsUtil;
import com.jsjn.sms.msg.SmsRequest;
import com.jsjn.sms.msg.SmsResponse;

/**
 * 发送短信
 * 
 * @author xiekx
 * 
 */
public class SendMessage {

	/**
	 * 日志对象
	 */
	private final static Logger logger = Logger.getLogger(SendMessage.class);

	/**
	 * 数据库对象
	 */
	private static DictDao dao = (DictDao) ParseSpring.context.getBean("dictDao");

	private static int TIME_OUT = 0;

	// 初始化参数
	static {
		SmsUtil.setSMSHostInfo(dao.findByType("SMS_IP_ADDRESS"), Integer.parseInt(dao.findByType("SMS_IP_PORT")));

		TIME_OUT = StringUtils.toInteger(dao.findByType("INTER_SYS_TIME_OUT"));
	}

	/**
	 * 默认构造函数
	 */
	public SendMessage() {
	}

	/**
	 * 发送短信
	 * 
	 * @param message
	 *            发送短信内容
	 * @return
	 */
	public boolean send(String tel, String message) {
		logger.info("手机号码：" + tel);
		logger.info("短信发送内容为：" + message);

		// 此处设置短信平台的IP地址信息
		// 业务团队，可以在配置文件中配置这两个参数，在业务环境启动时，只需调用
		// setSMSHostInfo一次，后续发送短消息，就可以不用再次调用setSMSHostInfo
		SmsRequest sms = new SmsRequest();
		// 短信来源
		sms.setChannel("Z");
		// 机构码
		sms.setBranchno("990000001");
		// 操作员
		sms.setTellerno("jnf");
		// 短信内别
		sms.setSmstype("01");
		// 设置是否重试
		sms.setIsretry(0);
		// 超时时间
		sms.setSmsSendTimeout(TIME_OUT * 1000);
		// 手机号码【将短信发往这些手机号码】
		ArrayList<String> phoneList = new ArrayList<String>();
		phoneList.add(tel);
		sms.setTotsmsnum(phoneList);
		// 短信内容，这个短信内容的模板，需要去找【zhangqingzhao】，注册
		sms.setContent(message);
		SmsResponse res = null;
		try {
			// 调用功能函数，发送短信
			res = SmsUtil.send(sms);
			// 此处打印出相应码，如果为 “000000”,说明短消息发送成功
			// ，否则res.getErrmsg()获取到错误信息
			logger.info("返回码为:" + res.getRespcode());
			logger.info("响应消息为：" + res.getErrmsg());
		} catch (Exception e) {
			logger.error(e);
			return false;
		}
		return StringUtils.equals(res.getRespcode(), "000000");
	}
}
