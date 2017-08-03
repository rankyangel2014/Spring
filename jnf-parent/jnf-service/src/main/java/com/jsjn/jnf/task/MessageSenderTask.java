package com.jsjn.jnf.task;

import org.springframework.stereotype.Component;

import com.jsjn.jnf.common.utils.Logger;

@Component
public class MessageSenderTask {
	private final static Logger logger = Logger.getLogger(MessageSenderTask.class);

	public void execute() {
		logger.info("**************** 消息发送定时任务开始 *******************");
		MessageSenderCallBack task = new MessageSenderCallBack();
		task.execute();
		logger.info("**************** 消息发送定时任务结束 *******************");

	}
}
