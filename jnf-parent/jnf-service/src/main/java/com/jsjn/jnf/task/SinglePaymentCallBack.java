package com.jsjn.jnf.task;

import java.util.HashMap;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSONObject;
import com.google.common.collect.Lists;
import com.jsjn.jnf.bean.bo.bank.SingleFlowStateQueryReqBO;
import com.jsjn.jnf.bean.bo.bank.SingleFlowStateQueryReqDataBO;
import com.jsjn.jnf.bean.bo.bank.SingleFlowStateQueryResBO;
import com.jsjn.jnf.bean.bo.bank.SingleFlowStateQueryResDataBO;
import com.jsjn.jnf.bean.dto.trade.TransactionDto;
import com.jsjn.jnf.bean.linkq.MessageDto;
import com.jsjn.jnf.bean.linkq.PaymentMessageDto;
import com.jsjn.jnf.bussiness.bank.result.BankSinglePaymentResultHandle;
import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.common.config.TabsConstant;
import com.jsjn.jnf.common.config.TradeCode;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.jnf.common.utils.JSONUtil;
import com.jsjn.jnf.common.utils.Logger;
import com.jsjn.jnf.integration.bank.impl.JsyhSingleFlowStateQueryImpl;
import com.jsjn.jnf.integration.bank.strategy.SingleFlowStateQueryStrategy;
import com.jsjn.jnf.service.assist.MessageService;
import com.jsjn.jnf.service.assist.utils.SequenceUtils;
import com.jsjn.jnf.service.payment.PaymentService;
import com.jsjn.jnf.service.trade.TransactionService;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 定时任务
 * 
 * @author xiekx
 * 
 */
public class SinglePaymentCallBack {

	private final static Logger logger = Logger.getLogger(SinglePaymentCallBack.class);

	// 支付表T9
	private PaymentService paymentService = (PaymentService) ParseSpring.context.getBean("paymentServiceImpl");
	//交易表T8
	private TransactionService transactionService = (TransactionService) ParseSpring.context.getBean("transactionServiceImpl");
	// 调用集成层得到结果后的处理类
	private BankSinglePaymentResultHandle resultHandle = (BankSinglePaymentResultHandle) ParseSpring.context.getBean("bankSinglePaymentResultHandle");
	/**
	 * 消息发送service
	 */
	private MessageService messageService = (MessageService) ParseSpring.context.getBean("messageServiceImpl");

	/**
	 * 初始化查询List
	 */
	public void initUpdateList() {
		String orderType = TabsConstant.PAYMENT_ORDERTYPE_TRANSFER.val();//支付类型
		List<HashMap<String, String>> list = paymentService.queryOrderListByStatus(TabsConstant.PAYMENT_ORDER_STATUS_DEAL.val(),
				orderType);

		logger.error(JSONUtil.toJSONString(list));
		for (int i = 0; i < list.size(); i++) {

			String orderNo = list.get(i).get("ORDERNO");
			String tradeNo = list.get(i).get("TRADENO");
			String loanNo = list.get(i).get("LOANNO");
			String tranDt = list.get(i).get("TRANDT");//新增交易日期
			try {
				if (StringUtils.isNotBlank(loanNo)) {//放款合同号
					singlePaymentStateUpdate(orderNo, tradeNo, loanNo, tranDt);
				}
			} catch (Exception e) {
				logger.error("执行支付号为[" + orderNo + "]的支付回调失败！", e);
			}
		}

	}

	/**
	 * 代付状态查询
	 * 
	 * 此处需要新开启一个事物 每笔交易都是一个新事务
	 * 
	 * @param paymentNo
	 * @param tradeNo
	 * @param loanNo
	 * @throws BussinessException
	 */
	@Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW, rollbackFor = { RuntimeException.class,
			BussinessException.class })
	public void singlePaymentStateUpdate(String paymentNo, String tradeNo, String loanNo, String tranDt)
			throws BussinessException {

		SingleFlowStateQueryReqBO pojo = new SingleFlowStateQueryReqBO();
		SingleFlowStateQueryReqDataBO reqData = new SingleFlowStateQueryReqDataBO();
		reqData.setTranNo(paymentNo);
		reqData.setTranDt(tranDt);
		pojo.setReqData(reqData);

		JsyhSingleFlowStateQueryImpl impl = new JsyhSingleFlowStateQueryImpl();
		SingleFlowStateQueryStrategy strategy = new SingleFlowStateQueryStrategy(impl);
		SingleFlowStateQueryResBO resPojo = strategy.query(pojo);

		TransactionDto tranDto = null;
		try {
			tranDto = transactionService.queryTransactionByTradeNo(tradeNo);
		} catch (BussinessException e) {
			logger.error("根据交易编号查询交易信息失败，" + tradeNo, e);
		}

		String mid = tranDto.getMid();//商户号
		String resCode = resPojo.getResCode();//返回码 0000 表示成功
		SingleFlowStateQueryResDataBO resData = resPojo.getResData();
		String staus = resData.getStatus();
		String failReason = resData.getFailReason();//代扣失败原因
		List<MessageDto> messageList = null;//消息列表

		if (StringUtils.equals(resCode, TradeCode.TRADE_SUCCESS.getCode())) {//交易成功

			//代付结果成功或者失败都推送消息 9:成功   ， 6：失败
			if (StringUtils.equals(staus, "9") || StringUtils.equals(staus, "6")) {
				PaymentMessageDto pushMessage = new PaymentMessageDto();
				pushMessage.setOperate("JNCRM");
				pushMessage.setLoanNo(loanNo);
				pushMessage.setChargeCode(StringUtils.equals(staus, "9") ? ReturnCode.SUCCESS : ReturnCode.FAIL);
				pushMessage.setChargeMsg(StringUtils.equals(staus, "6") ? failReason : StringUtils.EMPTY);

				String pushId = SequenceUtils.getPushSeq(mid);
				MessageDto pushMessageDto = new MessageDto();
				pushMessageDto.setPushId(pushId);
				pushMessageDto.setMid(mid);
				pushMessageDto.setPushType(TabsConstant.MESSAGT_TYPE_PAYMENTMSG.val());
				pushMessageDto.setPushContent(JSONObject.toJSONString(pushMessage));
				pushMessageDto.setPushState(TabsConstant.MESSAGT_SEND_WAITING.val());
				messageList = Lists.newArrayList(pushMessageDto);

				if (StringUtils.equals(staus, "9")) {// 代付成功
					resultHandle.paymentSuccess(tradeNo, paymentNo);
				} else if (StringUtils.equals(staus, "6")) {// 代付失败
					resultHandle.paymentFail(tradeNo, paymentNo, failReason);
				}
			}

		}
		//批量插入消息
		messageService.insertMessage(messageList);
	}
}
