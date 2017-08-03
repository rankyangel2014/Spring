package com.jsjn.jnf.panda.open;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.google.common.collect.Lists;
import com.jsjn.jnf.bean.bo.bank.BatchWithHoldReqBO;
import com.jsjn.jnf.bean.bo.bank.BatchWithHoldReqDataBO;
import com.jsjn.jnf.bean.bo.bank.BatchWithHoldResBO;
import com.jsjn.jnf.bean.bo.bank.QuerySignInfoReqBo;
import com.jsjn.jnf.bean.bo.bank.QuerySignInfoResBo;
import com.jsjn.jnf.bean.bo.bank.QueryWithholdReqBo;
import com.jsjn.jnf.bean.bo.bank.QueryWithholdResBo;
import com.jsjn.jnf.bean.bo.bank.RealtimeBalQueryReqBO;
import com.jsjn.jnf.bean.bo.bank.RealtimeBalQueryResBO;
import com.jsjn.jnf.bean.bo.bank.SingleFlowStateQueryReqBO;
import com.jsjn.jnf.bean.bo.bank.SingleFlowStateQueryResBO;
import com.jsjn.jnf.bean.bo.bank.SingleWithHoldReqBO;
import com.jsjn.jnf.bean.bo.bank.SingleWithHoldResBO;
import com.jsjn.jnf.bean.bo.bank.SingleWithHoldResDataBO;
import com.jsjn.jnf.bean.bo.message.ShortMessageDto;
import com.jsjn.jnf.bean.bo.withhold.QueryOrgCardNoReqBo;
import com.jsjn.jnf.bean.bo.withhold.QueryOrgCardNoResBo;
import com.jsjn.jnf.bean.bo.withhold.QueryOrgCardNoResDataBo;
import com.jsjn.jnf.bean.dto.trade.TransactionDto;
import com.jsjn.jnf.bean.linkq.MessageDto;
import com.jsjn.jnf.bussiness.bank.BankBatchWithHoldService;
import com.jsjn.jnf.bussiness.bank.BankQueryOrgCardNoService;
import com.jsjn.jnf.bussiness.bank.BankRealtimeBalQueryService;
import com.jsjn.jnf.bussiness.bank.BankSingleFlowStateQueryService;
import com.jsjn.jnf.bussiness.bank.BankSingleWithHoldService;
import com.jsjn.jnf.bussiness.query.QuerySignStateService;
import com.jsjn.jnf.bussiness.query.QueryWithholdStateService;
import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.common.config.TabsConstant;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.jnf.common.security.Cryptos;
import com.jsjn.jnf.service.assist.LockService;
import com.jsjn.jnf.service.assist.MessageService;
import com.jsjn.jnf.service.assist.utils.SequenceUtils;
import com.jsjn.jnf.service.trade.TransactionService;
import com.jsjn.panda.annotation.PandaMethod;
import com.jsjn.panda.annotation.PandaService;
import com.jsjn.panda.annotation.ServiceType;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 对外提供： 银行接口 panda服务类
 * 
 * @author CodmerYin
 * 
 */
@PandaService(serviceName = "bankPandaService", serviceType = ServiceType.CommonBean)
@Service
public class PandaBankService {

	private static final Logger logger = Logger.getLogger(PandaBankService.class);
	private BankRealtimeBalQueryService realtimeBalQueryService = (BankRealtimeBalQueryService) ParseSpring.context.getBean("bankRealtimeBalQueryServiceImpl");
	private BankSingleFlowStateQueryService singleFlowStateQueryService = (BankSingleFlowStateQueryService) ParseSpring.context.getBean("bankSingleFlowStateQueryServiceImpl");
	private BankSingleWithHoldService singleWithHoldService = (BankSingleWithHoldService) ParseSpring.context.getBean("bankSingleWithHoldServiceImpl");
	private BankBatchWithHoldService batchWithHoldService = (BankBatchWithHoldService) ParseSpring.context.getBean("bankBatchWithHoldServiceImpl");

	private QuerySignStateService querySignInfoService = (QuerySignStateService) ParseSpring.context.getBean("querySignStateServiceImpl");
	private BankQueryOrgCardNoService bankQueryOrgCardNoService = (BankQueryOrgCardNoService) ParseSpring.context.getBean("bankQueryOrgCardNoService");

	private QueryWithholdStateService queryWithholdingService = (QueryWithholdStateService) ParseSpring.context.getBean("queryWithholdStateServiceImpl");
	private MessageService messageService = (MessageService) ParseSpring.context.getBean("messageServiceImpl");
	private TransactionService transactionService = (TransactionService) ParseSpring.context.getBean("transactionServiceImpl");
	// 锁表
	private LockService lockService = (LockService) ParseSpring.context.getBean("lockServiceImpl");

	/**
	 * 账号实时余额查询
	 * 
	 * @param req
	 * @return
	 */
	@PandaMethod(mName = "bankRealtimeBalanceQuery", dscrpt = "账号实时余额查询", RegID = "bankRealtimeBalanceQuery")
	public RealtimeBalQueryResBO realtimeBalanceQuery(RealtimeBalQueryReqBO dto) {
		return realtimeBalQueryService.realtimeBalQuery(dto);
	}

	/**
	 * 单笔支付交易
	 * 
	 * @throws Exception
	 */
	//	@PandaMethod(mName = "bankSinglePaymentTrade", dscrpt = "单笔支付交易", RegID = "bankSinglePaymentTrade")
	//	public SinglePaymentTradeResBO singlePaymentTrade(SinglePaymentTradeReqBO dto) {
	//		SinglePaymentTradeResBO resDto = new SinglePaymentTradeResBO();
	//		try {
	//			resDto = singlePaymentTradeService.singlePaymentTrade(dto);
	//		} catch (BussinessException e) {
	//			resDto.setResCode(e.getErrorCode());
	//			resDto.setResMsg(e.getMessage());
	//		}
	//		return resDto;
	//	}

	/**
	 * 单笔支付流水状态查询
	 */
	@PandaMethod(mName = "bankSingleFlowStateQuery", dscrpt = "单笔支付流水状态查询", RegID = "bankSingleFlowStateQuery")
	public SingleFlowStateQueryResBO singleFlowStateQuery(SingleFlowStateQueryReqBO dto) {
		SingleFlowStateQueryResBO resDto = new SingleFlowStateQueryResBO();
		try {
			resDto = singleFlowStateQueryService.singleFlowStateQuery(dto);
		} catch (BussinessException e) {
			resDto.setResCode(e.getErrorCode());
			resDto.setResMsg(e.getMessage());
		}
		return resDto;
	}

	/**
	 * 单笔代扣
	 * 
	 * @param req
	 * @return
	 */
	@PandaMethod(mName = "singleWithHold", dscrpt = "单笔代扣", RegID = "singleWithHold")
	public SingleWithHoldResBO singleWithHold(SingleWithHoldReqBO dto) {

		SingleWithHoldResBO resDto = new SingleWithHoldResBO();
		try {
			resDto = singleWithHoldService.singleWithHold(dto, true);
			addMessage(resDto, dto);//新增短信报文
		} catch (BussinessException e) {
			resDto.setResCode(e.getErrorCode());
			resDto.setResMsg(e.getMessage());
		}
		return resDto;
	}

	/**
	 * 单笔代扣(仅用于批量代扣定时任务发起的单笔代扣)
	 * 
	 * @param req
	 * @return
	 * @throws Exception
	 */
	public SingleWithHoldResBO singleWithHoldInTask(SingleWithHoldReqBO dto) throws Exception {
		return singleWithHoldService.singleWithHold(dto, false);
	}

	/**
	 * 查询签约状态
	 * 
	 * @param dto
	 * @return
	 * @throws BussinessException
	 */
	@PandaMethod(mName = "querySignState", dscrpt = "查询签约状态", RegID = "querySignState")
	public QuerySignInfoResBo querySignInfo(QuerySignInfoReqBo dto) {
		QuerySignInfoResBo resBo = new QuerySignInfoResBo();
		try {
			resBo = querySignInfoService.querySignState(dto);
		} catch (BussinessException e) {
			resBo.setResCode(e.getErrorCode());
			resBo.setResMsg(e.getMessage());
		}
		return resBo;
	}

	/**
	 * 查询代扣状态
	 * 
	 * @param queryWithholdReqBo
	 * @return
	 */
	@PandaMethod(mName = "queryWithholdState", dscrpt = "查询代扣状态", RegID = "queryWithholdState")
	public QueryWithholdResBo queryWithholding(QueryWithholdReqBo queryWithholdReqBo) {
		QueryWithholdResBo bo = new QueryWithholdResBo();
		try {
			bo = queryWithholdingService.queryWithholdState(queryWithholdReqBo);
		} catch (BussinessException e) {
			bo.setResCode(e.getErrorCode());
			bo.setResMsg(e.getMessage());
		}
		return bo;
	}

	/**
	 * 批量插入代扣信息
	 * 
	 * @param dto
	 * @return
	 */
	@PandaMethod(mName = "batchWithHold", dscrpt = "批量插入代扣信息", RegID = "batchWithHold")
	public BatchWithHoldResBO batchWithHold(BatchWithHoldReqBO dto) {
		BatchWithHoldResBO resDto = new BatchWithHoldResBO();
		try {
			resDto = batchWithHoldService.batchWithhold(dto);
		} catch (BussinessException e) {
			try {
				BatchWithHoldReqDataBO reqData = dto.getReqData();
				String mid = dto.getMid();//商户号
				String batchNo = reqData.getBatchNo();//批次号
				/**
				 * 文件处理异常后删除锁
				 */
				lockService.deleteLock(mid, TabsConstant.LOCK_TYPE_BATCHWITHHOLD.val(), batchNo);
			} catch (BussinessException e1) {
				logger.error("批量代扣清除锁表失败", e1);
			} finally {
				resDto.setResCode(e.getErrorCode());
				resDto.setResMsg(e.getMessage());
			}
		}
		return resDto;
	}

	/**
	 * 查询机构提现卡号
	 * 
	 * @param dto
	 * @return
	 */
	@PandaMethod(mName = "queryInsttuCardNo", dscrpt = "查询机构提现卡号", RegID = "queryInsttuCardNo")
	public QueryOrgCardNoResBo queryOrgCardNo(QueryOrgCardNoReqBo dto) {
		QueryOrgCardNoResBo queryOrgCardNoResBo = new QueryOrgCardNoResBo();
		QueryOrgCardNoResDataBo resDto = new QueryOrgCardNoResDataBo();
		try {
			return bankQueryOrgCardNoService.queryInsttuCardNo(dto);
		} catch (BussinessException e) {
			queryOrgCardNoResBo.setResCode(e.getErrorCode());
			queryOrgCardNoResBo.setResMsg(e.getMessage());
			resDto.setBankCardNo("");
			queryOrgCardNoResBo.setResData(resDto);
		}
		return queryOrgCardNoResBo;
	}

	/**
	 * 新增短信报文（单笔代扣成功后新增短消息报文）
	 * 
	 * @param resDto
	 * @param dto
	 * @throws BussinessException
	 */
	public void addMessage(SingleWithHoldResBO resDto, SingleWithHoldReqBO dto) throws BussinessException {

		String resCode = resDto.getResCode();//单笔代扣返回码
		String mid = dto.getMid();//商户号

		SingleWithHoldResDataBO resData = resDto.getResData();

		if (null != resData) {

			/**
			 * 交易订单号
			 */
			String tradeNo = resData.getTranNo();

			/**
			 * 交易信息
			 */
			TransactionDto tranDto = transactionService.queryTransactionByTradeNo(tradeNo);
			if (StringUtils.isNotBlank(resCode)) {

				//消息列表
				List<MessageDto> list = Lists.newArrayList();

				//代扣成功后新增短信
				if (StringUtils.equals(resCode, ReturnCode.SUCCESS)) {
					/**
					 * 新增短消息内容
					 */
					ShortMessageDto shortMessage = new ShortMessageDto();
					String message = tranDto.getMessage();
					String mobile = Cryptos.aesDecrypt(tranDto.getMobile());
					shortMessage.setMessage(message);//短信内容
					shortMessage.setMobile(mobile);//客户手机号

					/**
					 * 新增短信对象
					 */
					MessageDto shortMessageDto = new MessageDto();
					String id = SequenceUtils.getPushSeq(mid);
					shortMessageDto.setPushId(id);
					shortMessageDto.setMid(mid);
					shortMessageDto.setPushType(TabsConstant.MESSAGT_TYPE_SHORTMSG.val());
					shortMessageDto.setPushContent(JSONObject.toJSONString(shortMessage));
					shortMessageDto.setPushState(TabsConstant.MESSAGT_SEND_WAITING.val());
					list.add(shortMessageDto);
				}
				try {
					//新增短信报文
					messageService.insertMessage(list);
				} catch (Exception e) {
					logger.error("单笔代扣短信报文新增失败", e);
				}
			}
		}

	}
}
