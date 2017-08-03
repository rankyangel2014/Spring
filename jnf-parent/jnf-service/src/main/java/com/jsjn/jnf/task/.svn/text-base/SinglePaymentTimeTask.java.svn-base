package com.jsjn.jnf.task;

import org.springframework.stereotype.Service;

import com.jsjn.jnf.common.utils.Logger;

@Service("singlePaymentTimeTask")
public class SinglePaymentTimeTask {
	private final static Logger logger = Logger.getLogger(SinglePaymentTimeTask.class);

	/**
	 * 代付状态更新定时任务
	 */
	public void updatePaymentStateTimerTask() {
		logger.info("**************** 单笔代付交易状态更新定时任务开始 *******************");

		SinglePaymentCallBack task = new SinglePaymentCallBack();

		task.initUpdateList();

		logger.info("**************** 单笔代付交易状态更新定时任务结束 *******************");

	}
}
