package com.jsjn.jnf.panda.open2;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.google.common.collect.Lists;
import com.jsjn.jnf.bean.bo.paymentTransaction.PaymentTransactionReqBO;
import com.jsjn.jnf.bean.bo.paymentTransaction.PaymentTransactionResBO;
import com.jsjn.jnf.bean.linkq.MessageDto;
import com.jsjn.jnf.bean.linkq.PaymentMessageDto;
import com.jsjn.jnf.bussiness.bank.BankSinglePaymentTradeService;
import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.common.config.TabsConstant;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.jnf.service.assist.MessageService;
import com.jsjn.jnf.service.assist.utils.SequenceUtils;
import com.jsjn.panda.annotation.PandaMethod;
import com.jsjn.panda.annotation.PandaService;
import com.jsjn.panda.annotation.ServiceType;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 银行代付
 * 
 * @author xiekx
 * 
 */
@PandaService(serviceName = "pandaPaymentTransactionService", serviceType = ServiceType.CommonBean)
@Service
public class PandaPaymentTransactionService {

	private static final Logger logger = Logger.getLogger(PandaPaymentTransactionService.class);
	private BankSinglePaymentTradeService singlePaymentTradeService = (BankSinglePaymentTradeService) ParseSpring.context.getBean("bankSinglePaymentTradeServiceImpl");
	private MessageService messageService = (MessageService) ParseSpring.context.getBean("messageServiceImpl");

	/**
	 * 银行代付
	 * 
	 * @param dto
	 * @return
	 */
	@PandaMethod(mName = "paymentTransaction", dscrpt = "银行代付", RegID = "paymentTransaction")
	public PaymentTransactionResBO paymentTransaction(PaymentTransactionReqBO reqBo) {
		logger.info("调用panda服务【银行代付】，请求：" + JSONObject.toJSONString(reqBo));
		PaymentTransactionResBO resDto = new PaymentTransactionResBO();

		try {
			resDto = singlePaymentTradeService.singlePaymentTrade(reqBo);
			addMessage(resDto, reqBo);
		} catch (BussinessException e) {
			resDto.setResCode(e.getErrorCode());
			resDto.setResMsg(e.getMessage());
		}
		logger.info("调用panda服务【银行代付】，响应：" + JSONObject.toJSONString(resDto));
		return resDto;
	}

	/**
	 * 新增付款推送报文
	 * 
	 * @param resDto
	 * @param dto
	 */
	public void addMessage(PaymentTransactionResBO resDto, PaymentTransactionReqBO dto) {

		String resCode = resDto.getResCode();// 返回码
		String resMsg = resDto.getResMsg();// 返回信息
		String mid = dto.getMid();//商户号

		if (StringUtils.isNotBlank(resCode)) {

			//消息列表
			List<MessageDto> list = null;

			//代付结果成功或者失败都推送消息
			if (StringUtils.equals(resCode, ReturnCode.SUCCESS) || StringUtils.equals(resCode, ReturnCode.FAIL)) {
				PaymentMessageDto pushMessage = new PaymentMessageDto();
				pushMessage.setOperate("JNCRM");
				pushMessage.setLoanNo(dto.getReqData().getLoanNo());
				pushMessage.setChargeCode(resCode);
				pushMessage.setChargeMsg(resMsg);

				String pushId = SequenceUtils.getPushSeq(mid);
				MessageDto pushMessageDto = new MessageDto();
				pushMessageDto.setPushId(pushId);
				pushMessageDto.setMid(mid);
				pushMessageDto.setPushType(TabsConstant.MESSAGT_TYPE_PUSHMSG.val());
				pushMessageDto.setPushContent(JSONObject.toJSONString(pushMessage));
				pushMessageDto.setPushState(TabsConstant.MESSAGT_SEND_WAITING.val());
				list = Lists.newArrayList(pushMessageDto);
			}
			try {
				//新增短信报文
				messageService.insertMessage(list);
			} catch (Exception e) {
				logger.error("单笔代付消息报文新增失败", e);
			}
		}

	}
}
