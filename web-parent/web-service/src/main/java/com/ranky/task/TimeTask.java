package com.ranky.task;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

//@Component
public class TimeTask {

	@Scheduled(cron = "0/5 * * * * ?")
	public void execute() {
		System.err.println("*******定时任务开始执行********");
	}
}
