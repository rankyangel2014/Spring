/**
 * 
 */
package com.jsjn.jnf.service.payment.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.jsjn.jnf.bean.dto.payment.PaymentDto;
import com.jsjn.jnf.bean.dto.trade.TransactionDto;
import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.common.config.TabsConstant;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.jnf.common.utils.SensitiveInfoUtils;
import com.jsjn.jnf.common.utils.StringUtils;
import com.jsjn.jnf.common.utils.ValidatorUtil;
import com.jsjn.jnf.dao.payment.PaymentDao;
import com.jsjn.jnf.service.assist.DictService;
import com.jsjn.jnf.service.assist.LockService;
import com.jsjn.jnf.service.base.CrudService;
import com.jsjn.jnf.service.payment.PaymentService;
import com.jsjn.jnf.service.trade.TransactionService;
import com.jsjn.panda.setup.ParseSpring;

/**
 * @author ZSMJ 支付表
 */
@Service
@Transactional(readOnly = true)
public class PaymentServiceImpl extends CrudService<PaymentDao, PaymentDto> implements PaymentService {

	private DictService ds = (DictService) ParseSpring.context.getBean("dictServiceImpl");
	private LockService ls = (LockService) ParseSpring.context.getBean("lockServiceImpl");
	private TransactionService ts = (TransactionService) ParseSpring.context.getBean("transactionServiceImpl");

	@Override
	public PaymentDao getCrudDao() {
		return (PaymentDao) ParseSpring.context.getBean("paymentDao");
	}

	@Transactional(readOnly = false)
	@Override
	public int createOrder(PaymentDto dto) throws Exception {
		// 关键字段校验
		String[] propertys = { "orderNo", "orderType", "tradeNo", "payer", "payBank", "payAccount", "payee", /*
																											 * "amount"
																											 * ,
																											 */
		"status", "channel", "digest" };
		String errMsg = ValidatorUtil.validpropertys(dto, propertys);
		if (!StringUtils.isBlank(errMsg)) {
			logger.error("参数输入有误" + errMsg);
			throw new Exception(errMsg);
		}

		return getCrudDao().insert(dto);
	}

	@Override
	public PaymentDto queryOrderByOrderNo(String orderNo) throws BussinessException {
		PaymentDto retDto = getCrudDao().getPaymentInfoByOrderNo(orderNo);
		if (retDto == null) {
			logger.error("未找到支付编号为" + orderNo + "的支付订单信息");
			throw new BussinessException(ReturnCode.FAIL, "未找到支付编号为" + orderNo + "的支付订单信息");
		}

		if (!StringUtils.equals(retDto.getDigest(), retDto.buildDigest())) {
			logger.info("解签失败..." + "数据库摘要：" + retDto.getDigest() + ";现摘要:" + retDto.buildDigest());
			throw new BussinessException(ReturnCode.FAIL, "支付订单号为" + orderNo + "数据异常");
		}
		return retDto;
	}

	/**
	 * 支付表更新
	 */
	@Transactional(readOnly = false)
	@Override
	public int updatePaymentByOrderNo(String orderNo, String state, String digest, String failReason, String modified) {
		return getCrudDao().updatePayment(orderNo, state, digest, failReason, modified);
	}

	@Transactional(readOnly = false)
	@Override
	public int updatePaymentFeeByOrderNo(String orderNo, Double fee) {
		return getCrudDao().updatePaymentFee(orderNo, fee);
	}

	@Override
	public List<PaymentDto> queryOrdersByStatus(String status) {
		return getCrudDao().getOrdersByStatus(status);
	}

	@Override
	public List<PaymentDto> findPaymentInfoByCondition(PaymentDto paymentDto) throws Exception {
		/**
		 * 支付信息查询 1、对查询条件进行判断。 如果都有，amountMin <= amountMax;
		 * modifiedMin<=modifiedMax 2、SQL查询，将结果做摘要比对。（在dto中新加入是否被篡改字段）
		 * 3、对敏感数据（付款人，付款账号，收款人，收款账号）过滤显示。 4、分页实现
		 */
		String amountMin = paymentDto.getAmountMin();
		String amountMax = paymentDto.getAmountMax();
		String modifiedMin = paymentDto.getModifiedMin();
		String modifiedMax = paymentDto.getModifiedMax();

		if (!StringUtils.isBlank(amountMin) && !StringUtils.isBlank(amountMax)) {
			if (Double.parseDouble(amountMin) > Double.parseDouble(amountMax)) {
				logger.error("支付金额输入有误！");
				throw new Exception("支付金额输入有误！");
			}
		}
		if (!StringUtils.isBlank(modifiedMin) && !StringUtils.isBlank(modifiedMax)) {
			if (Integer.parseInt(modifiedMin) > Integer.parseInt(modifiedMax)) {
				logger.error("支付时间输入有误！");
				throw new Exception("支付时间输入有误！");
			}
		}

		List<PaymentDto> list = getCrudDao().findPaymentInfoByCondition(paymentDto);
		for (PaymentDto dto : list) {
			/**
			 * 注：将经过拦截器得到的总页数total值设置到查询结果集中。用于分页
			 */
			dto.setTotal(paymentDto.getTotal());
			if (!StringUtils.equals(dto.getDigest(), dto.buildDigest())) {
				logger.info("摘要比对异常..." + "数据库摘要：" + dto.getDigest() + ";现摘要:" + dto.buildDigest());
				dto.setValid(false);
				dto.setPayer(SensitiveInfoUtils.cnapsCode(dto.getPayer()));
				dto.setPayAccount(SensitiveInfoUtils.bankCard(dto.getPayAccount()));
				dto.setPayee(SensitiveInfoUtils.cnapsCode(dto.getPayee()));
				dto.setCollAccount(SensitiveInfoUtils.bankCard(dto.getCollAccount()));
				dto.setResCode(ReturnCode.FAIL);
				dto.setResMsg("支付订单号为" + dto.getOrderNo() + "数据异常");
				continue;
			}
			dto.setValid(true);
			dto.setPayer(SensitiveInfoUtils.cnapsCode(dto.getPayer()));
			dto.setPayAccount(SensitiveInfoUtils.bankCard(dto.getPayAccount()));
			dto.setPayee(SensitiveInfoUtils.cnapsCode(dto.getPayee()));
			dto.setCollAccount(SensitiveInfoUtils.bankCard(dto.getCollAccount()));
		}
		return list;
	}

	/**
	 * 异常支付信息查询
	 */
	@Override
	public List<PaymentDto> findExceptionPaymentInfo(PaymentDto paymentDto) throws Exception {
		String amountMin = paymentDto.getAmountMin();
		String amountMax = paymentDto.getAmountMax();
		String modifiedMin = paymentDto.getModifiedMin();
		String modifiedMax = paymentDto.getModifiedMax();

		if (!StringUtils.isBlank(amountMin) && !StringUtils.isBlank(amountMax)) {
			if (Double.parseDouble(amountMin) > Double.parseDouble(amountMax)) {
				logger.error("支付金额输入有误！");
				throw new Exception("支付金额输入有误！");
			}
		}
		if (!StringUtils.isBlank(modifiedMin) && !StringUtils.isBlank(modifiedMax)) {
			if (Integer.parseInt(modifiedMin) > Integer.parseInt(modifiedMax)) {
				logger.error("支付时间输入有误！");
				throw new Exception("支付时间输入有误！");
			}
		}
		// 查询过期天数
		String overDay = ds.findByType("EXCEPTION_OVERTIME");
		if (StringUtils.equals(overDay, null)) {
			overDay = "1";
		}
		paymentDto.setDay(overDay);//
		List<PaymentDto> list = getCrudDao().findExceptionPaymentInfo(paymentDto);
		for (PaymentDto dto : list) {

			/**
			 * 注：将经过拦截器得到的总页数total值设置到查询结果集中。用于分页
			 */
			dto.setTotal(paymentDto.getTotal());

			if (!StringUtils.equals(dto.getDigest(), dto.buildDigest())) {
				logger.info("摘要比对异常..." + "数据库摘要：" + dto.getDigest() + ";现摘要:" + dto.buildDigest());
				dto.setValid(false);
				dto.setPayer(SensitiveInfoUtils.cnapsCode(dto.getPayer()));
				dto.setPayAccount(SensitiveInfoUtils.bankCard(dto.getPayAccount()));
				dto.setPayee(SensitiveInfoUtils.cnapsCode(dto.getPayee()));
				dto.setCollAccount(SensitiveInfoUtils.bankCard(dto.getCollAccount()));
				dto.setResCode(ReturnCode.FAIL);
				dto.setResMsg("支付订单号为" + dto.getOrderNo() + "数据异常");
				continue;
			}
			dto.setValid(true);
			dto.setPayer(SensitiveInfoUtils.cnapsCode(dto.getPayer()));
			dto.setPayAccount(SensitiveInfoUtils.bankCard(dto.getPayAccount()));
			dto.setPayee(SensitiveInfoUtils.cnapsCode(dto.getPayee()));
			dto.setCollAccount(SensitiveInfoUtils.bankCard(dto.getCollAccount()));
		}
		return list;
	}

	@Override
	@Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW, rollbackFor = { RuntimeException.class,
			Exception.class })
	public boolean dealException(String orderNo, String exception, String state) throws Exception {
		/**
		 * 交易异常信息处理 1、对数据做非空校验。 2、根据orderNo，查询数据信息Dto。
		 * 3、生成摘要，和数据库中摘要比较。若不相等，提示数据被篡改。
		 * 4、若相同，执行SQL,操作表jnf_t8(是否还有其他关联表),和王敏沟通。
		 * 
		 */
		if (StringUtils.isBlank(orderNo)) {
			logger.error("支付订单编号不能为空！");
			throw new Exception("交易订单编号不能为空！");
		}
		if (StringUtils.isBlank(exception)) {
			logger.error("异常原因不能为空！");
			throw new Exception("异常原因不能为空！");
		}
		if (StringUtils.isBlank(state)) {
			logger.error("支付处理状态不能为空！");
			throw new Exception("支付处理状态不能为空！");
		}
		if (exception.length() > 1000) {
			logger.error("异常信息输入长度不能超过1000！");
			throw new Exception("异常信息输入长度不能超过1000！");
		}

		PaymentDto dto = queryOrderByOrderNo(orderNo);

		if (state.equals(TabsConstant.PAYMENT_ORDER_STATUS_FAIL.val())) {
			TransactionDto traDto = ts.queryTransactionByTradeNo(dto.getTradeNo());
			// 删除交易锁
			ls.deleteLock(traDto.getMid(), TabsConstant.LOCK_TYPE_TRANSACTION.val(), traDto.getMSerialNo());
			// 删除支付锁
			ls.deleteLock(traDto.getMid(), TabsConstant.LOCK_TYPE_PAYMENT.val(), orderNo);
		}

		// 更新支付表
		dto.setStatus(state);
		String digest = dto.buildDigest();
		updatePaymentByOrderNo(orderNo, state, digest, "", null);

		// 更新交易表
		TransactionDto TraTmp = ts.queryTransactionByTradeNo(dto.getTradeNo());
		TraTmp.setStatus(state);
		String digestT = TraTmp.buildDigest();
		int count = ts.dealException(TraTmp.getTradeNo(), exception, state, digestT);
		if (count > 0) {
			return true;
		}
		return false;
	}

	@Override
	public List<PaymentDto> getOrdersByTradeNo(String tradeNo) {
		return getCrudDao().getOrdersByTradeNo(tradeNo);
	}

	/**
	 * 根据订单状态查订单以及该订单的收款人账号信息
	 * 
	 * @param status
	 * @return
	 */
	@Override
	public List<HashMap<String, String>> queryOrderListByStatus(String status, String orderType) {
		return getCrudDao().queryOrderListByStatus(status, orderType);
	}
}
