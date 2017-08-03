package com.jsjn.jnf.task;

import java.util.List;

import net.sf.json.JSONObject;

import com.google.common.collect.Lists;
import com.jsjn.jnf.bean.bo.message.PushMessageDto;
import com.jsjn.jnf.bean.bo.message.ShortMessageDto;
import com.jsjn.jnf.bean.linkq.MessageDto;
import com.jsjn.jnf.bean.linkq.PaymentMessageDto;
import com.jsjn.jnf.common.config.TabsConstant;
import com.jsjn.jnf.common.linkq.LinkQHandler;
import com.jsjn.jnf.common.utils.Logger;
import com.jsjn.jnf.common.utils.StringUtils;
import com.jsjn.jnf.integration.interfaces.SendMessage;
import com.jsjn.jnf.service.assist.DictService;
import com.jsjn.jnf.service.assist.MessageService;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 发送消息定时任务
 * 
 * @author xiekx
 * 
 * 
 */
public class MessageSenderCallBack {

	private final static Logger logger = Logger.getLogger(MessageSenderCallBack.class);
	/**
	 * 消息服务
	 */
	private static MessageService messageService = (MessageService) ParseSpring.context.getBean("messageServiceImpl");
	/**
	 * 字典表
	 */
	private static DictService dictService = (DictService) ParseSpring.context.getBean("dictServiceImpl");
	/**
	 * 每次查询记录数
	 */
	private static final String batchLimitStr = StringUtils.defaultString(dictService.findByType("BATCHWITHHOLD_LIST_LIMIT"),
			"10");
	private static final Integer batchLimit = Integer.parseInt(batchLimitStr);

	public void execute() {
		List<MessageDto> list = Lists.newArrayList();
		final String LINKQ_USERID = dictService.findByType("LINKQ_USERID");
		final String LINKQ_INSTTUID = dictService.findByType("LINKQ_INSTTUID");
		try {
			/**
			 * 查询待发送消息
			 */
			list = messageService.queryMessageList(batchLimit);
			for (MessageDto messageDto : list) {
				String type = messageDto.getPushType();
				String pushConteng = messageDto.getPushContent();
				boolean flag = false;

				if (StringUtils.equals(type, TabsConstant.MESSAGT_TYPE_PUSHMSG.val())) {
					//调用LINKQ推送消息
					PushMessageDto pushMessage = com.alibaba.fastjson.JSONObject.parseObject(pushConteng,
							PushMessageDto.class);
					pushMessage.set_transCode("ACC102");
					pushMessage.set_userId(LINKQ_USERID);
					pushMessage.set_insttuId(LINKQ_INSTTUID);
					JSONObject res = LinkQHandler.getJsonNoLogin(pushMessage);
					flag = StringUtils.equalsIgnoreCase(res.getString("success"), "true");
					logger.info("代扣消息推送结果:" + com.alibaba.fastjson.JSONObject.toJSONString(res));
				} else if (StringUtils.equals(type, TabsConstant.MESSAGT_TYPE_SHORTMSG.val())) {
					// 发送短信
					SendMessage message = new SendMessage();
					ShortMessageDto shortMessage = com.alibaba.fastjson.JSONObject.parseObject(pushConteng,
							ShortMessageDto.class);
					flag = message.send(shortMessage.getMobile(), shortMessage.getMessage());
					logger.info("代扣短信发送结果:" + flag);
				} else if (StringUtils.equals(type, TabsConstant.MESSAGT_TYPE_PAYMENTMSG.val())) {
					PaymentMessageDto paymentMessageDto = com.alibaba.fastjson.JSONObject.parseObject(pushConteng,
							PaymentMessageDto.class);
					paymentMessageDto.set_transCode("REG004");
					paymentMessageDto.set_userId(LINKQ_USERID);
					paymentMessageDto.set_insttuId(LINKQ_INSTTUID);
					JSONObject res = LinkQHandler.getJsonNoLogin(paymentMessageDto);
					flag = StringUtils.equalsIgnoreCase(res.getString("success"), "true");
					logger.info("转账消息推送结果:" + com.alibaba.fastjson.JSONObject.toJSONString(res));
				}

				//更新状态
				messageDto.setPushState(flag ? TabsConstant.MESSAGT_SEND_SUCCESS.val()
						: TabsConstant.MESSAGT_SEND_FAIL.val());

				//更新消息发送状态
				messageService.updateMessage(messageDto);

			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}

	}
}
