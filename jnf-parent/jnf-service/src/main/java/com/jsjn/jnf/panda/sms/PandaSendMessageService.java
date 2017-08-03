package com.jsjn.jnf.panda.sms;

import net.sf.json.JSONObject;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.jsjn.jnf.bean.dto.sms.ShortMessageDto;
import com.jsjn.jnf.dao.assist.DictDao;
import com.jsjn.jnf.integration.interfaces.SendMessage;
import com.jsjn.jnf.service.assist.DictService;
import com.jsjn.panda.annotation.PandaMethod;
import com.jsjn.panda.annotation.PandaService;
import com.jsjn.panda.annotation.ServiceType;
import com.jsjn.panda.setup.ParseSpring;

@PandaService(serviceName = "pandaSendMessageService", serviceType = ServiceType.CommonBean)
public class PandaSendMessageService {

	/**
	 * 日志对象
	 */
	private final static Logger logger = LoggerFactory
			.getLogger(PandaSendMessageService.class);
	private static DictDao dictDao = (DictDao) ParseSpring.context
			.getBean("dictDao");

	/**
	 * 发送短信
	 * 
	 * @param shortMessageDto
	 * @return true/false
	 * @throws Exception
	 */
	@PandaMethod(mName = "sendSms", dscrpt = "发送短信", RegID = "sendSms")
	public Boolean sendSms(ShortMessageDto shortMessageDto) throws Exception {
		String tmplateType = shortMessageDto.getMsgTmpType();
		String template = dictDao.findByType(tmplateType);
		logger.info("=================发送短信=================");
		SendMessage sendMessage = new SendMessage();
		String message = shortMessageDto.getMessage();
		JSONObject messageJson = JSONObject.fromObject(message);
		String smsMessage = StringUtils.replaceEach(
				template,
				new String[] { "{INSTTUNAME}", "{CUSTNAME}", "{CARDNO}",
						"{CONTNO}" },
				new String[] { messageJson.getString("INSTTUNAME"),
						messageJson.getString("CUSTNAME"),
						messageJson.getString("CARDNO"),
						messageJson.getString("CONTNO") });
		logger.info("=================短信内容：" + smsMessage + "=================");
		Boolean result = sendMessage.send(shortMessageDto.getTelNo(),
				smsMessage);
		logger.info("=================发送结果：" + result + "=================");
		return result;
	}
}
