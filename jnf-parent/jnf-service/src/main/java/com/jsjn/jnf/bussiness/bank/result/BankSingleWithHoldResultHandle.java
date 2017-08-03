package com.jsjn.jnf.bussiness.bank.result;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jsjn.jnf.bean.bo.bank.SingleWithHoldResBO;
import com.jsjn.jnf.bean.bo.bank.SingleWithHoldResDataBO;
import com.jsjn.jnf.bean.dto.assist.ChannelDto;
import com.jsjn.jnf.bean.dto.payment.PaymentDto;
import com.jsjn.jnf.bean.dto.trade.TransactionDto;
import com.jsjn.jnf.bean.pojo.integration.SingleWithHoldResPojo;
import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.common.config.TabsConstant;
import com.jsjn.jnf.common.config.TradeCode;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.jnf.common.utils.DateUtils;
import com.jsjn.jnf.common.utils.Logger;
import com.jsjn.jnf.common.utils.StringUtils;
import com.jsjn.jnf.service.assist.ChannelService;
import com.jsjn.jnf.service.assist.LockService;
import com.jsjn.jnf.service.payment.PaymentService;
import com.jsjn.jnf.service.trade.TransactionService;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 单笔代扣 调用集成层得到结果后的处理类
 * 
 * @author yincy
 * 
 */
@Service
public class BankSingleWithHoldResultHandle {

	private final static Logger logger = Logger.getLogger(BankSingleWithHoldResultHandle.class);

	// 锁表T15
	private LockService lockService = (LockService) ParseSpring.context.getBean("lockServiceImpl");

	// 字典表T12
	//private DictService dictService = (DictService) ParseSpring.context.getBean("dictServiceImpl");

	// 交易表T8
	private TransactionService tranService = (TransactionService) ParseSpring.context.getBean("transactionServiceImpl");

	// 支付表T9
	private PaymentService paymentService = (PaymentService) ParseSpring.context.getBean("paymentServiceImpl");
	private final ChannelService channelService = (ChannelService) ParseSpring.context.getBean("channelServiceImpl");

	/**
	 * 代扣结果处理
	 * 
	 * 此处开启新的事务
	 * 
	 * @param resPojo
	 *            集成层返回的代扣结果
	 * @param paymentDto
	 *            支付表信息
	 * @param transDto
	 *            交易表信息
	 * @param investorKey
	 *            投资人账号对应的key
	 * @param reqMid
	 *            商户号
	 * @param reqSerialNo
	 *            业务流水号
	 * @return
	 * 
	 * @throws BussinessException
	 */
	@Transactional(readOnly = false)
	public SingleWithHoldResBO withHoldResultHandle(SingleWithHoldResPojo resPojo, PaymentDto paymentDto,
			TransactionDto transDto, String investorKey, String reqSerialNo) {
		logger.info("处理返回结果 开始");

		// 初始化请求参数
		String returnCode = resPojo.getTradeCode();
		String resMsg = resPojo.getFailReason();

		String tradeNo = transDto.getTradeNo();
		String paymentNo = paymentDto.getOrderNo();
		//		String payeeAccNo = Cryptos.aesDecrypt(paymentDto.getCollAccount());// 投资人收款账号
		//		String paymentCreatedTime = paymentDto.getCreated();// 支付创建时间(苏宁易付宝查询需要用到)
		String bindChannelCode = paymentDto.getChannel();// 渠道编码

		try {
			// 代扣成功
			if (returnCode.equals(TradeCode.TRADE_SUCCESS.getCode())) {
				withHoldSuccess(tradeNo, paymentNo, bindChannelCode);
				return returnSuccess(reqSerialNo, tradeNo, resMsg);
			}

			// 代扣失败
			if (returnCode.equals(TradeCode.TRADE_ERROR.getCode())) {
				withHoldFail(tradeNo, paymentNo, resMsg);
				return returnFail(reqSerialNo, tradeNo, ReturnCode.FAIL_INTEGRETION_WITHHOLD, resMsg);// 集成层扣款失败
			}

			// 代扣处理中
			if (returnCode.equals(TradeCode.TRADE_DEAL.getCode())) {
				logger.info("该笔交易正在处理中，请耐心等待" + resMsg);
				return returnException(ReturnCode.FAIL_TRADE_WAIT, resMsg);
			}

			// 代扣处理中
			//			if (returnCode.equals(TradeCode.TRADE_DEAL.getCode())) {
			//
			//				SingleWithHoldResPojo dealResDto = withHoldDeal(investorKey, payeeAccNo, paymentNo, paymentCreatedTime,
			//						bindChannelCode);
			//
			//				// 60s查询成功
			//				if (dealResDto.getTradeCode().equals(TradeCode.TRADE_SUCCESS.getCode())) {
			//					withHoldSuccess(transDto.getTradeNo(), paymentNo);
			//					return returnSuccess(reqSerialNo, tradeNo);
			//				}
			//
			//				// 60s查询失败
			//				if (dealResDto.getTradeCode().equals(TradeCode.TRADE_ERROR.getCode())) {
			//					withHoldFail(tradeNo, paymentNo, dealResDto.getFailReason());
			//					return returnFail(reqSerialNo, tradeNo, ReturnCode.FAIL_INTEGRETION_WITHHOLD,resPojo.getFailReason());// 集成层扣款失败
			//				}
			//
			//				// 60s查询还是处理中
			//				if (dealResDto.getTradeCode().equals(TradeCode.TRADE_DEAL.getCode())) {
			//					logger.info("该笔交易正在处理中，请耐心等待");
			//					return returnException(ReturnCode.FAIL_TRADE_WAIT, resPojo.getFailReason());
			//				}
			//
			//				// 以上状态都是，则抛异常
			//				throw new BussinessException(ReturnCode.FAIL_RESULTHANDLE_WITHHOLD, "该笔交易结果处理失败，请耐心等待");
			//			}
		} catch (Exception e) {
			logger.error("代扣结果处理失败！");
			return returnException(ReturnCode.FAIL_RESULTHANDLE_WITHHOLD, "该笔代扣结果处理失败，请耐心等待");
		}

		logger.info("处理返回结果 结束");

		return returnException(ReturnCode.FAIL_RESULTHANDLE_WITHHOLD, "该笔代扣结果处理失败，请耐心等待");
	}

	/**
	 * 返回成功
	 * 
	 * @param reqSerialNo
	 *            业务流水号
	 * @param tradeNo
	 *            交易订单号
	 * @return
	 */
	public SingleWithHoldResBO returnSuccess(String reqSerialNo, String tradeNo, String successMsg) {
		SingleWithHoldResBO resDto = new SingleWithHoldResBO();
		SingleWithHoldResDataBO resDataDto = new SingleWithHoldResDataBO();
		resDataDto.setStatus(TradeCode.TRADE_SUCCESS.getCode());
		resDataDto.setSerialNo(reqSerialNo);
		resDataDto.setTranNo(tradeNo);
		resDto.setResMsg(successMsg);
		resDto.setResCode(ReturnCode.SUCCESS);
		resDto.setResData(resDataDto);
		return resDto;
	}

	/**
	 * 返回失败
	 * 
	 * @param reqSerialNo
	 *            业务流水号
	 * @param tradeNo
	 *            交易订单号
	 * @param failCode
	 *            失败Code
	 * @param retMsg
	 *            集成层返回信息
	 * @return
	 */
	public SingleWithHoldResBO returnFail(String reqSerialNo, String tradeNo, String failCode, String failMsg) {
		SingleWithHoldResBO resDto = new SingleWithHoldResBO();
		SingleWithHoldResDataBO resDataDto = new SingleWithHoldResDataBO();

		resDataDto.setStatus(TradeCode.TRADE_ERROR.getCode());
		resDataDto.setSerialNo(reqSerialNo);
		resDataDto.setTranNo(tradeNo);
		resDto.setResMsg(failMsg);
		resDto.setResCode(ReturnCode.FAIL);
		resDto.setResData(resDataDto);
		return resDto;
	}

	/**
	 * 返回异常情况导致的失败
	 * 
	 * @param reqSerialNo
	 *            业务流水号
	 * @param tradeNo
	 *            交易订单号
	 * @param failCode
	 *            失败Code
	 * @return
	 */
	public SingleWithHoldResBO returnException(String failCode, String exceptionMsg) {
		SingleWithHoldResBO resDto = new SingleWithHoldResBO();
		resDto.setResMsg(exceptionMsg);
		resDto.setResCode(failCode);
		return resDto;
	}

	/**
	 * 代扣处理中
	 * 
	 * @param investorKey
	 *            投资人收款账号的key
	 * @param investorAccount
	 *            收款账号
	 * @param paymentNo
	 *            支付表编号
	 * @param tradeTime
	 *            支付发生时间
	 * @param queryBindChannelCode
	 *            交易渠道编号
	 * @return
	 * 
	 */
	//	public SingleWithHoldResPojo withHoldDeal(String investorKey, String investorAccount, String paymentNo,
	//			String tradeTime, String queryBindChannelCode) {
	//		SingleWithHoldQueryPojo pojo = new SingleWithHoldQueryPojo();
	//
	//		pojo.setInvestorKey(investorKey);
	//		pojo.setInvestorAccount(investorAccount);
	//		pojo.setTranNo(paymentNo);
	//		pojo.setTradeTime(tradeTime);
	//
	//		// 查询状态最大时间(毫秒)
	//		long queryMaxMillis = StringUtils.toLong(dictService.findByType("WITHHOLD_STATE_QUERY_MAX_TIME")) * 1000;
	//		SingleWithHoldQueryStrategy strategy = null;
	//
	//		// 默认为处理中
	//		SingleWithHoldResPojo resPojo = new SingleWithHoldResPojo(TradeCode.TRADE_DEAL.getCode());
	//
	//		boolean flag = true;
	//		long endTime = System.currentTimeMillis() + queryMaxMillis;
	//
	//		while (flag && endTime > System.currentTimeMillis()) {
	//			try {
	//				logger.info("查询代扣状态");
	//				strategy = new SingleWithHoldQueryStrategy(queryBindChannelCode);
	//				resPojo = strategy.withHoldResultQuery(pojo);
	//
	//				if (resPojo.getTradeCode().equals(TradeCode.TRADE_DEAL.getCode())) {
	//					Thread.sleep(5000);// 若查询返回状态还是处理中，则等待5s重新查询
	//				} else {
	//					flag = false;
	//				}
	//			} catch (Exception e) {
	//				flag = false;
	//			}
	//		}
	//		return resPojo;
	//	}

	/**
	 * 代扣成功 更新交易表和支付表
	 * 
	 * @param tradeNo
	 *            交易表编号
	 * @param paymentNo
	 *            支付表编号
	 * @throws BussinessException
	 * 
	 */
	@Transactional
	public void withHoldSuccess(String tradeNo, String paymentNo, String channelCode) throws BussinessException {
		logger.info("代扣成功后续处理开始");

		// 1.更新交易表状态(成功)
		TransactionDto tranDto = tranService.queryTransactionByTradeNo(tradeNo);
		tranDto.setStatus(TabsConstant.TRANSACTION_STATUS_SUCC.val());
		tranService.updateTransactionByTradeNo(tradeNo,
				TabsConstant.TRANSACTION_STATUS_SUCC.val(),
				tranDto.buildDigest(),
				null,
				null,
				DateUtils.getDate("yyyyMMddHHmmss"));

		// 2.更新支付表表状态(成功)
		PaymentDto payTmp = paymentService.queryOrderByOrderNo(paymentNo);
		payTmp.setStatus(TabsConstant.PAYMENT_ORDER_STATUS_SUCC.val());
		paymentService.updatePaymentByOrderNo(paymentNo,
				TabsConstant.PAYMENT_ORDER_STATUS_SUCC.val(),
				payTmp.buildDigest(),
				null,
				DateUtils.getDate("yyyyMMddHHmmss"));
		// 3.查询渠道对应的费用并更新支付表  add by xiekx
		ChannelDto channelDto = channelService.queryChannelById(channelCode);
		String fee = StringUtils.defaultIfBlank(channelDto.getFee(), "0.00");
		paymentService.updatePaymentFeeByOrderNo(paymentNo, Double.valueOf(fee));
		logger.info("代扣成功后续处理结束");
	}

	/**
	 * 代扣失败 先删除锁表再更新交易表和支付表
	 * 
	 * @param tradeNo
	 *            交易表编号
	 * @param paymentNo
	 *            支付表编号
	 * @param failReason
	 *            失败原因
	 * @throws BussinessException
	 */
	@Transactional
	public void withHoldFail(String tradeNo, String paymentNo, String failReason) throws BussinessException {
		logger.info("代扣失败后续处理开始");

		TransactionDto tranDto = tranService.queryTransactionByTradeNo(tradeNo);
		// 1.删除锁表(交易表)
		lockService.deleteLock(tranDto.getMid(), TabsConstant.LOCK_TYPE_TRANSACTION.val(), tranDto.getMSerialNo());

		// 2.更新交易表状态(失败)
		tranDto.setStatus(TabsConstant.TRANSACTION_STATUS_FAIL.val());
		tranService.updateTransactionByTradeNo(tradeNo,
				TabsConstant.TRANSACTION_STATUS_FAIL.val(),
				tranDto.buildDigest(),
				failReason,
				null,
				DateUtils.getDate("yyyyMMddHHmmss"));

		// 3.更新支付表表状态(失败)
		PaymentDto payTmp = paymentService.queryOrderByOrderNo(paymentNo);
		payTmp.setStatus(TabsConstant.PAYMENT_ORDER_STATUS_FAIL.val());
		paymentService.updatePaymentByOrderNo(paymentNo,
				TabsConstant.PAYMENT_ORDER_STATUS_FAIL.val(),
				payTmp.buildDigest(),
				failReason,
				DateUtils.getDate("yyyyMMddHHmmss"));

		logger.info("代扣失败后续处理结束");
	}
}
