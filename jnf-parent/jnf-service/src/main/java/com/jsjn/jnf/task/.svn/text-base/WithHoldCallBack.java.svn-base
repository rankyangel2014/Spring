package com.jsjn.jnf.task;

import java.util.HashMap;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSONObject;
import com.google.common.collect.Lists;
import com.jsjn.jnf.bean.bo.message.PushMessageDto;
import com.jsjn.jnf.bean.bo.message.ShortMessageDto;
import com.jsjn.jnf.bean.dto.trade.TransactionDto;
import com.jsjn.jnf.bean.linkq.MessageDto;
import com.jsjn.jnf.bean.pojo.integration.SingleWithHoldQueryPojo;
import com.jsjn.jnf.bean.pojo.integration.SingleWithHoldResPojo;
import com.jsjn.jnf.bussiness.bank.result.BankSingleWithHoldResultHandle;
import com.jsjn.jnf.common.config.TabsConstant;
import com.jsjn.jnf.common.config.TradeCode;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.jnf.common.security.Cryptos;
import com.jsjn.jnf.common.utils.DateUtils;
import com.jsjn.jnf.common.utils.Logger;
import com.jsjn.jnf.integration.bank.strategy.SingleWithHoldQueryStrategy;
import com.jsjn.jnf.service.assist.MessageService;
import com.jsjn.jnf.service.assist.utils.SequenceUtils;
import com.jsjn.jnf.service.payment.PaymentService;
import com.jsjn.jnf.service.trade.TransactionService;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 定时任务
 * 
 * @author yincy
 * 
 */
public class WithHoldCallBack {

	private final static Logger logger = Logger.getLogger(WithHoldCallBack.class);

	// 支付表T9
	private PaymentService paymentService = (PaymentService) ParseSpring.context.getBean("paymentServiceImpl");
	//交易表T8
	private TransactionService transactionService = (TransactionService) ParseSpring.context.getBean("transactionServiceImpl");
	// 调用集成层得到结果后的处理类
	private BankSingleWithHoldResultHandle resultHandle = (BankSingleWithHoldResultHandle) ParseSpring.context.getBean("bankSingleWithHoldResultHandle");
	/**
	 * 消息发送service
	 */
	private MessageService messageService = (MessageService) ParseSpring.context.getBean("messageServiceImpl");

	/**
	 * 初始化查询List
	 */
	public void initUpdateList() {
		String orderType = TabsConstant.PAYMENT_ORDERTYPE_WITHHOLD.val();//代扣类型
		List<HashMap<String, String>> list = paymentService.queryOrderListByStatus(TabsConstant.PAYMENT_ORDER_STATUS_DEAL.val(),
				orderType);

		for (int i = 0; i < list.size(); i++) {

			String orderNo = list.get(i).get("ORDERNO");
			String tradeNo = list.get(i).get("TRADENO");
			String investorKey = list.get(i).get("SPIDKEY");
			String investorAccount = list.get(i).get("BINDACCNO");
			String tradeTime = list.get(i).get("TRADETIME");
			String channelCode = list.get(i).get("CHANNELCODE");
			//String isBatch = list.get(i).get("ISBATCH");

			try {
				withHoldStateUpdate(investorKey, investorAccount, orderNo, tradeTime, channelCode, tradeNo);
			} catch (Exception e) {
				logger.error("执行支付号为[" + orderNo + "]的支付回调失败！", e);
			}
		}

	}

	/**
	 * 代扣状态查询
	 * 
	 * 此处需要新开启一个事物 每笔交易都是一个新事物
	 * 
	 * @param investorKey
	 * @param investorAccount
	 * @param paymentNo
	 * @param tradeTime
	 * @param channelCode
	 * @param tradeNo
	 * @throws Exception
	 */
	@Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW, rollbackFor = { RuntimeException.class,
			BussinessException.class })
	public void withHoldStateUpdate(String investorKey, String investorAccount, String paymentNo, String tradeTime,
			String channelCode, String tradeNo) throws BussinessException {

		SingleWithHoldQueryPojo pojo = new SingleWithHoldQueryPojo();

		pojo.setInvestorKey(investorKey);
		pojo.setInvestorAccount(investorAccount);
		pojo.setTranNo(paymentNo);
		pojo.setTradeTime(tradeTime);

		SingleWithHoldQueryStrategy strategy = new SingleWithHoldQueryStrategy(channelCode);

		SingleWithHoldResPojo resPojo = strategy.withHoldResultQuery(pojo);

		TransactionDto tranDto = null;
		try {
			tranDto = transactionService.queryTransactionByTradeNo(tradeNo);
		} catch (BussinessException e) {
			logger.error("根据商户号和tradeNo查询交易信息失败，" + tradeNo, e);
		}

		String mid = tranDto.getMid();//商户号
		String resCode = resPojo.getTradeCode();
		String resMsg = resPojo.getFailReason();//代扣失败原因
		String serialNo = tranDto.getMSerialNo();
		List<MessageDto> messageList = Lists.newArrayList();//消息列表
		if (resCode.equals(TradeCode.TRADE_SUCCESS.getCode())) {// 代扣成功

			//批量代扣成功插入推送报文
			//单笔代扣也需要推送到外部系统
			//if (StringUtils.equals(TabsConstant.IS_BATCH.val(), isBatch)) {
			PushMessageDto pushMessage = new PushMessageDto();
			String pushId = SequenceUtils.getPushSeq(mid);
			pushMessage.setSerialNo(serialNo);//业务编号
			pushMessage.setTranNo(tradeNo);//支付订单号
			pushMessage.setDealTime(DateUtils.getDate("yyyyMMddHHmmss"));
			pushMessage.setResMsg(StringUtils.EMPTY);//代扣成功时为空字符串
			//设置代扣结果
			pushMessage.setPayStatus(TabsConstant.WITHHOLD_PAY_SUCCESS.val());
			MessageDto pushMessageDto = new MessageDto();
			pushMessageDto.setPushId(pushId);
			pushMessageDto.setMid(mid);
			pushMessageDto.setPushType(TabsConstant.MESSAGT_TYPE_PUSHMSG.val());
			pushMessageDto.setPushContent(JSONObject.toJSONString(pushMessage));
			pushMessageDto.setPushState(TabsConstant.MESSAGT_SEND_WAITING.val());
			messageList.add(pushMessageDto);
			//}

			//单笔代扣和批量代扣成功后都将插入短信报文
			/**
			 * 新增短消息内容
			 */
			ShortMessageDto shortMessage = new ShortMessageDto();

			String message = tranDto.getMessage();
			String mobile = Cryptos.aesDecrypt(tranDto.getMobile());
			shortMessage.setMessage(message);//短信内容
			shortMessage.setMobile(mobile);//客户手机号

			/**
			 * 新增短消息对象
			 */
			MessageDto shortMessageDto = new MessageDto();
			String id = SequenceUtils.getPushSeq(mid);
			shortMessageDto.setPushId(id);
			shortMessageDto.setMid(mid);
			shortMessageDto.setPushType(TabsConstant.MESSAGT_TYPE_SHORTMSG.val());
			shortMessageDto.setPushContent(JSONObject.toJSONString(shortMessage));
			/**
			 * 设置报文状态为待发送
			 */
			shortMessageDto.setPushState(TabsConstant.MESSAGT_SEND_WAITING.val());
			messageList.add(shortMessageDto);
			resultHandle.withHoldSuccess(tradeNo, paymentNo, channelCode);
		} else if (resCode.equals(TradeCode.TRADE_ERROR.getCode())) {// 代扣失败
			//批量代扣失败插入推送报文
			//单笔代扣失败也推送消息
			//if (StringUtils.equals(TabsConstant.IS_BATCH.val(), isBatch)) {
			PushMessageDto pushMessage = new PushMessageDto();
			String pushId = SequenceUtils.getPushSeq(mid);
			pushMessage.setSerialNo(serialNo);//业务编号
			pushMessage.setTranNo(tradeNo);//支付订单号
			pushMessage.setDealTime(DateUtils.getDate("yyyyMMddHHmmss"));
			pushMessage.setResMsg(resMsg);//增加代扣失败原因，成功时为空
			//设置代扣结果
			pushMessage.setPayStatus(TabsConstant.WITHHOLD_PAY_FAIL.val());
			MessageDto pushMessageDto = new MessageDto();
			pushMessageDto.setPushId(pushId);
			pushMessageDto.setMid(mid);
			pushMessageDto.setPushType(TabsConstant.MESSAGT_TYPE_PUSHMSG.val());
			pushMessageDto.setPushContent(JSONObject.toJSONString(pushMessage));
			pushMessageDto.setPushState(TabsConstant.MESSAGT_SEND_WAITING.val());
			messageList.add(pushMessageDto);
			//}

			resultHandle.withHoldFail(tradeNo, paymentNo, resMsg);
		}
		//批量插入消息
		messageService.insertMessage(messageList);
	}
}
