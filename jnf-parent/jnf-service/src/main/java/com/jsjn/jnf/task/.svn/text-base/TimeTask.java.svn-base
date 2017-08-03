package com.jsjn.jnf.task;

import org.springframework.stereotype.Service;

import com.jsjn.jnf.common.utils.Logger;

@Service("timeTask")
public class TimeTask {
	private final static Logger logger = Logger.getLogger(TimeTask.class);
	
	/**
	 * 代扣状态更新定时任务
	 */
	public void updateWithHoldStateTimerTask() {
		logger.info("**************** 定时任务开始 *******************");
		
		WithHoldCallBack task = new WithHoldCallBack();

		task.initUpdateList();
		
		logger.info("**************** 定时任务结束 *******************");

	}
}
