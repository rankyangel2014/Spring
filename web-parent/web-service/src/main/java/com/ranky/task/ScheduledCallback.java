package com.ranky.task;

import java.util.Objects;
import java.util.concurrent.Executors;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.google.common.util.concurrent.FutureCallback;
import com.google.common.util.concurrent.Futures;
import com.google.common.util.concurrent.ListenableFuture;
import com.google.common.util.concurrent.ListeningExecutorService;
import com.google.common.util.concurrent.MoreExecutors;
import com.google.common.util.concurrent.RateLimiter;
import com.ranky.bean.FilmDto;
import com.ranky.service.FilmService;

/**
 * 定时任务
 * 
 * @author xiekx
 * 
 * 
 */
@Component
public class ScheduledCallback {
	@Autowired
	private FilmService filmService;
	/**
	 * 返回可监听的异步任务线程池
	 */
	private final ListeningExecutorService executorService = MoreExecutors
			.listeningDecorator(Executors.newFixedThreadPool(10));

	/**
	 * 定时任务入口
	 */
	@Scheduled(cron = "0/5 * * * * ?")
	public void execute() {

		//查询jnf_91批量代扣信息表中的所有信息，逐笔发送单笔代扣
		RateLimiter limiter = RateLimiter.create(0.1); // 每秒不超过rateLimit个任务被提交

		limiter.acquire(); // 请求RateLimiter, 超过permits会被阻塞

		ListenableFuture<FilmDto> listenableFuture = executorService.submit(new ScheduledTask(StringUtils.EMPTY));

		/**
		 * 给异步任务增加回调函数
		 */
		Futures.addCallback(listenableFuture, new FutureCallback<FilmDto>() {
			/**
			 * 成功返回结果回调函数
			 * 
			 * @param resBo
			 */
			@Override
			public void onSuccess(FilmDto filmDto) {

				if (Objects.nonNull(filmDto)) {
					filmService.saveFilm(filmDto);
				} else {
					System.err.println("result is null ");
				}
			}

			/**
			 * 抛出异常后的回调函数
			 */
			@Override
			public void onFailure(Throwable t) {
				System.out.println(t.getMessage());
			}

		}, executorService);
	}
}
