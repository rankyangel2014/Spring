package com.jsjn.jnf.task;

import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.Executors;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;

import com.alibaba.fastjson.JSONObject;
import com.google.common.collect.Lists;
import com.google.common.util.concurrent.FutureCallback;
import com.google.common.util.concurrent.Futures;
import com.google.common.util.concurrent.ListenableFuture;
import com.google.common.util.concurrent.ListeningExecutorService;
import com.google.common.util.concurrent.MoreExecutors;
import com.google.common.util.concurrent.RateLimiter;
import com.jsjn.jnf.bean.bo.bank.SingleWithHoldReqBO;
import com.jsjn.jnf.bean.bo.bank.SingleWithHoldReqDataBO;
import com.jsjn.jnf.bean.bo.bank.SingleWithHoldResBO;
import com.jsjn.jnf.bean.bo.bank.SingleWithHoldResDataBO;
import com.jsjn.jnf.bean.bo.message.PushMessageDto;
import com.jsjn.jnf.bean.bo.message.ShortMessageDto;
import com.jsjn.jnf.bean.dto.trade.TransactionDto;
import com.jsjn.jnf.bean.dto.withhold.BatchWithholdDto;
import com.jsjn.jnf.bean.linkq.MessageDto;
import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.common.config.TabsConstant;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.jnf.common.security.Cryptos;
import com.jsjn.jnf.common.utils.DateUtils;
import com.jsjn.jnf.common.utils.Logger;
import com.jsjn.jnf.panda.open.PandaBankService;
import com.jsjn.jnf.service.assist.DictService;
import com.jsjn.jnf.service.assist.MessageService;
import com.jsjn.jnf.service.assist.utils.SequenceUtils;
import com.jsjn.jnf.service.trade.TransactionService;
import com.jsjn.jnf.service.withhold.BatchWithholdService;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 批量代扣定时任务
 * 
 * @author xiekx
 * 
 * 
 */
public class BatchWithHoldCallBack {

	/**
	 * 日志对象
	 */
	private final static Logger logger = Logger.getLogger(BatchWithHoldCallBack.class);
	/**
	 * 字典表
	 */
	private DictService dictService = (DictService) ParseSpring.context.getBean("dictServiceImpl");

	/**
	 * 批量代扣service
	 */
	private BatchWithholdService batchWithHoldService = (BatchWithholdService) ParseSpring.context.getBean("batchWithholdServiceImpl");
	/**
	 * 单笔代扣service
	 */
	private PandaBankService service = (PandaBankService) ParseSpring.context.getBean("pandaBankService");
	/**
	 * 消息发送service
	 */
	private MessageService messageService = (MessageService) ParseSpring.context.getBean("messageServiceImpl");

	/**
	 * 返回可监听的异步任务线程池
	 */
	private final ListeningExecutorService executorService = MoreExecutors.listeningDecorator(Executors.newFixedThreadPool(Integer.parseInt(dictService.findByType("THREAD_POOL_SIZE"))));

	/**
	 * 查询交易订单表
	 */
	private TransactionService transactionService = (TransactionService) ParseSpring.context.getBean("transactionServiceImpl");

	/**
	 * 定时任务入口
	 */
	public void execute() {

		/**
		 * 每次查询记录数
		 */
		String batchLimitStr = StringUtils.defaultString(dictService.findByType("BATCHWITHHOLD_LIST_LIMIT"), "10");
		Integer batchLimit = Integer.parseInt(batchLimitStr);
		/**
		 * 每秒提交任务数
		 */
		String rateLimitStr = StringUtils.defaultString(dictService.findByType("PEER_SECOND_LIMIT"), "5.0");
		Double rateLimit = Double.parseDouble(rateLimitStr);

		//查询jnf_91批量代扣信息表中的所有信息，逐笔发送单笔代扣
		List<BatchWithholdDto> list = batchWithHoldService.queryBatchWithhold(batchLimit);
		RateLimiter limiter = RateLimiter.create(rateLimit); // 每秒不超过rateLimit个任务被提交

		for (final BatchWithholdDto batchWithholdDto : list) {
			limiter.acquire(); // 请求RateLimiter, 超过permits会被阻塞

			final String mid = batchWithholdDto.getMid();//商户号
			final String serialNo = batchWithholdDto.getSerialNo();//业务编号
			final List<MessageDto> messageList = Lists.newArrayList();//消息列表
			ListenableFuture<SingleWithHoldResBO> listenableFuture = executorService.submit(new Callable<SingleWithHoldResBO>() {

				/**
				 * 异步任务执行函数
				 */
				public SingleWithHoldResBO call() throws Exception {

					/**
					 * 单笔代扣请求数据
					 */
					SingleWithHoldReqDataBO reqData = new SingleWithHoldReqDataBO();
					BeanUtils.copyProperties(batchWithholdDto, reqData);//复制属性值
					/**
					 * 单笔代扣请求对象
					 */
					SingleWithHoldReqBO reqDto = new SingleWithHoldReqBO();
					reqDto.setReqData(reqData);
					reqDto.setMid(mid);

					/**
					 * 执行单笔代扣
					 */
					return service.singleWithHoldInTask(reqDto);
				}
			});

			/**
			 * 给异步任务增加回调函数
			 */

			Futures.addCallback(listenableFuture, new FutureCallback<SingleWithHoldResBO>() {
				/**
				 * 调用代扣成功返回结果回调函数
				 * 
				 * @param resBo
				 */
				@Override
				public void onSuccess(SingleWithHoldResBO resBo) {
					logger.info("批量代扣结果:" + JSONObject.toJSONString(resBo));

					String resCode = resBo.getResCode();//返回码
					String resMsg = resBo.getResMsg();//错误信息
					TransactionDto tranDto = null;
					try {
						/*
						 * 查询交易信息
						 */
						tranDto = transactionService.queryTransactionByMSerialNo(mid, serialNo);
					} catch (BussinessException e) {
						logger.error("批量代扣定时任务-->查询交易信息失败", e);
					} finally {

						addMessages();
						setInvalid();
					}
					/*
					 * 批量代扣成功时增加短信报文
					 */
					if (StringUtils.equals(ReturnCode.SUCCESS, resCode)) {
						if (null != tranDto) {
							/*
							 * 新增短消息
							 */
							//String payerBankCardNo = Cryptos.aesDecrypt(tranDto.getPayerBankCardNo());
							String message = tranDto.getMessage();
							//String content = messageTpl.replace("{payerAccount}", payerBankCardNo);
							String mobile = Cryptos.aesDecrypt(tranDto.getMobile());
							MessageDto shortMessageDto = createShortMessage(mobile, message);
							if (null != shortMessageDto) {
								messageList.add(shortMessageDto);
							}
						}

					}

					/*
					 * 批量代扣成功或者失败时都新增推送消息
					 */
					if (!StringUtils.equals(ReturnCode.FAIL_TRADE_WAIT, resCode)) {

						/*
						 * 返回结果
						 */
						SingleWithHoldResDataBO resData = resBo.getResData();

						/*
						 * 交易订单号
						 */
						String tradeNo = resData.getTranNo();
						/*
						 * 新增推送消息对象
						 */

						String payStatus = StringUtils.equals(ReturnCode.SUCCESS, resCode)
								|| StringUtils.equals(ReturnCode.SUCCESSED, resCode) ? TabsConstant.WITHHOLD_PAY_SUCCESS.val()
								: TabsConstant.WITHHOLD_PAY_FAIL.val();
						/*
						 * 1,代扣成功时消息返回"代扣成功" 2,代扣失败时消息返回"交易表中的failReason"
						 */
						String resMessage = StringUtils.equals(ReturnCode.SUCCESS, resCode)
								|| StringUtils.equals(ReturnCode.SUCCESSED, resCode) ? resMsg : tranDto.getFailReason();
						MessageDto pushMessageDto = createPushMessage(tradeNo, payStatus, resMessage);
						if (null != pushMessageDto) {
							messageList.add(pushMessageDto);
						}
					}
				}

				/**
				 * 调用代扣抛出异常后的回调函数
				 */
				@Override
				public void onFailure(Throwable t) {
					String errMsg = t.getMessage();
					logger.error("批量代扣定时任务-->代扣失败，抛出异常！" + errMsg, t);

					/*
					 * 根据tradeNo查询交易信息
					 */
					TransactionDto tranDto = null;
					try {
						tranDto = transactionService.queryTransactionByMSerialNo(mid, serialNo);
						/*
						 * 代扣异常后发送新增推送消息对象
						 */
						String tradeNo = tranDto.getTradeNo();//支付订单号
						MessageDto pushMessageDto = createPushMessage(tradeNo,
								TabsConstant.WITHHOLD_PAY_FAIL.val(),
								errMsg);
						messageList.add(pushMessageDto);
					} catch (BussinessException e) {
						logger.error("批量代扣定时任务-->查询交易信息失败", e);
					} finally {

						setInvalid();
						addMessages();
					}

				}

				/**
				 * 代扣结束后更新为失效状态，不会再次发送代扣请求
				 */
				private void setInvalid() {
					try {
						batchWithholdDto.setIsValid("N");
						//只要支付中心有返回结果更新批量代扣为无效
						batchWithHoldService.updateWithhold(batchWithholdDto);
					} catch (BussinessException e) {
						logger.error("批量代扣定时任务-->代扣数据更新为无效失败！", e);
					}
				}

				/**
				 * 批量插入消息
				 */
				private void addMessages() {
					try {
						messageService.insertMessage(messageList);
					} catch (BussinessException e) {
						logger.error("批量代扣定时任务-->批量插入消息失败！", e);
					}
				}

				/**
				 * 新增短信消息
				 * 
				 * @param mobile
				 *            手机号码
				 * @param message
				 *            短信内容
				 * @return
				 */
				private MessageDto createShortMessage(String mobile, String message) {

					if (StringUtils.isNotBlank(mobile) && StringUtils.isNotBlank(message)) {

						/*
						 * 新增短消息内容
						 */
						ShortMessageDto shortMessage = new ShortMessageDto();
						shortMessage.setMessage(message);//短信内容
						shortMessage.setMobile(mobile);//客户手机号

						/*
						 * 新增短消息对象
						 */
						MessageDto shortMessageDto = new MessageDto();
						String id = SequenceUtils.getPushSeq(mid);
						shortMessageDto.setPushId(id);
						shortMessageDto.setMid(mid);
						shortMessageDto.setPushType(TabsConstant.MESSAGT_TYPE_SHORTMSG.val());
						shortMessageDto.setPushContent(JSONObject.toJSONString(shortMessage));
						shortMessageDto.setPushState(TabsConstant.MESSAGT_SEND_WAITING.val());
						return shortMessageDto;
					} else {
						logger.error("创建短信失败：手机号或者短信内容为空！");
						return null;
					}
				}

				/**
				 * 新增短信消息
				 * 
				 * @param tradeNo
				 *            金农付交易订单号
				 * @param payStatus
				 *            代扣状态
				 * @param resMsg
				 *            失败原因
				 * @return
				 */
				private MessageDto createPushMessage(String tradeNo, String payStatus, String resMsg) {
					/*
					 * 新增推送消息对象
					 */
					PushMessageDto pushMessage = new PushMessageDto();
					String pushId = SequenceUtils.getPushSeq(mid);
					pushMessage.setSerialNo(serialNo);//业务编号
					pushMessage.setTranNo(StringUtils.isNotBlank(tradeNo) ? tradeNo : "");
					pushMessage.setDealTime(DateUtils.getDate("yyyyMMddHHmmss"));
					//设置代扣结果
					pushMessage.setPayStatus(payStatus);
					//新增失败原因
					pushMessage.setResMsg(resMsg);

					MessageDto pushMessageDto = new MessageDto();
					pushMessageDto.setPushId(pushId);
					pushMessageDto.setMid(mid);
					pushMessageDto.setPushType(TabsConstant.MESSAGT_TYPE_PUSHMSG.val());
					pushMessageDto.setPushContent(JSONObject.toJSONString(pushMessage));
					pushMessageDto.setPushState(TabsConstant.MESSAGT_SEND_WAITING.val());
					return pushMessageDto;
				}

			},
					executorService);
		}
	}
}