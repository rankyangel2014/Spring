package com.jsjn.jnf.task;

import org.springframework.stereotype.Component;

import com.jsjn.jnf.common.utils.Logger;

@Component
public class BatchWithholdTimeTask {
	private final static Logger logger = Logger.getLogger(BatchWithholdTimeTask.class);

	//5秒执行一次
	public void execute() {
		logger.info("**************** 批量代扣定时任务开始 *******************");
		BatchWithHoldCallBack task = new BatchWithHoldCallBack();
		task.execute();
		logger.info("**************** 批量代扣定时任务结束 *******************");
	}
}
