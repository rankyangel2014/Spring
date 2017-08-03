package com.jsjn.jnf.service.trade.impl;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.jnf.common.security.Cryptos;
import com.jsjn.jnf.common.utils.StringUtils;
import com.jsjn.jnf.common.utils.ValidatorUtil;
import com.jsjn.jnf.dao.trade.TransactionDao;
import com.jsjn.jnf.bean.dto.trade.TransactionDto;
import com.jsjn.jnf.service.base.CrudService;
import com.jsjn.jnf.service.trade.TransactionService;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 交易SERVICE实现
 * 
 * @author ZSMJ
 * 
 */
@Service
@Transactional(readOnly = true)
public class TransactionServiceImpl extends CrudService<TransactionDao, TransactionDto> implements TransactionService {
	
	private TransactionDao dao = (TransactionDao) ParseSpring.context.getBean("transactionDao");

	@Override
	public TransactionDto queryTransactionByTradeNo(String mid,String tradeNo) throws BussinessException{
		TransactionDto retDto =  dao.queryTransactionByTradeNo(mid, tradeNo);
		if (retDto == null) {
			logger.info("根据交易编号" + tradeNo + "未找到对应信息！");
			throw new BussinessException(ReturnCode.RESPONSE_NO_DATA_FOUND, "该支付订单号不存在！");
		}

		// 增加MD5校验，防止数据被篡改
		if (!StringUtils.equals(retDto.getDigest(), retDto.buildDigest())) {
		    logger.info(retDto.toString());
			logger.info("数据异常..." + "数据库摘要：" + retDto.getDigest() + ";现摘要:" + retDto.buildDigest());
			throw new BussinessException(ReturnCode.FAIL, "该笔交易数据异常");
		}
		return retDto;
	}
	
	
	@Override
	public TransactionDto queryTransactionByTradeNo(String tradeNo) throws BussinessException{
		return queryTransactionByTradeNo(null,tradeNo);
	}
	
	
	public List<TransactionDto> tradeFlowQuery(String mid, String startDt, String endDt) throws BussinessException {
		List<TransactionDto> list =  dao.tradeFlowQuery(mid, startDt, endDt);
		//判断是否有数据
		if (list.size() == 0) {
		    logger.error("查询日期" + startDt + "~" + endDt + "无交易流水！");
			throw new BussinessException(ReturnCode.RESPONSE_NO_DATA_FOUND, "查询日期" + startDt + "~" + endDt + "无交易流水！");
		}
		
		//判断数据是否被修改
		for(int i = 0 ; i < list.size() ; i++){
			TransactionDto dto = list.get(i);
			if (!StringUtils.equals(dto.getDigest(), dto.buildDigest())) {
			    logger.info("数据异常..." + "数据库摘要：" + dto.getDigest() + ";现摘要:" + dto.buildDigest());
				throw new BussinessException(ReturnCode.FAIL, "存在数据异常交易");
			}
			/**
			 * 姓名脱敏，金额格式化：#0.00
			 */
			dto.setPayeeName(Cryptos.aesDecrypt(dto.getPayeeName()));
			dto.setPayerName(Cryptos.aesDecrypt(dto.getPayerName()));
			DecimalFormat df = new DecimalFormat("0.00");
			String money = df.format(dto.getAmount());
			dto.setAmount(new BigDecimal(money));
		}
		
		return list;
		
	}
	
	@Override
	@Transactional(readOnly = false)
	public int updateTransactionByTradeNo(String tradeNo, String state, String digest, String failReason, String exception, String modified) throws BussinessException {
		if (StringUtils.isBlank(tradeNo)) {
		    logger.error("输入参数非法");
		    throw new BussinessException(ReturnCode.FAIL,"参数非法");
		}
		
		return dao.updateTrans(tradeNo, state, digest, failReason, exception, modified);
	}
	
	@Transactional(readOnly = false)
	@Override
	public int insertTransaction(TransactionDto dto) throws Exception {
		// 关键字段校验
		String[] propertys = { "tradeNo", "bNo", "tradeType", "mid", "mSerialNo", "externLoanNo", "payer", "payerName",
				"payee", "payeeName",  "amount", "status", "desc", "digest" };
		String errMsg = ValidatorUtil.validpropertys(dto, propertys);
		if (!StringUtils.isBlank(errMsg)) {
		    logger.error("新增交易参数错误！" + errMsg);
			throw new Exception("新增交易参数错误！");
		}

		return dao.insert(dto);
	}

	@Override
	public List<TransactionDto> queryTransactionByCondition(TransactionDto transactionDto) {
		return dao.queryTransactionByCondition(transactionDto);
	}

	@Override
	public List<TransactionDto> queryExceptionTransaction(TransactionDto transactionDto) {
		return dao.queryExceptionTransaction(transactionDto);
	}

	@Override
	public int dealException(String tradeNo, String exception, String state, String digest) {
		return dao.dealException(tradeNo, exception, state, digest);
	}
	@Override
	protected TransactionDao getCrudDao() {
		return dao;
	}


	/* (non-Javadoc)
	 * @see com.jsjn.jnf.service.trade.TransactionService#queryWithHoldStateInfo(com.jsjn.jnf.bean.dto.trade.TransactionDto)
	 */
	/**
	 * 查询代扣状态
	 */
	@Override
	public Map<String, Object> queryWithHoldStateInfo(TransactionDto dto) throws BussinessException {
		Map<String, Object> m;
		try {
			m = dao.queryWithHolds(dto);
		} catch (Exception e) {
			throw new BussinessException(ReturnCode.FAIL, "查询代扣交易状态异常");
		}
		if (m == null || m.size() < 1)
			throw new BussinessException(ReturnCode.FAIL, "未能查询到代扣交易数据");
		return m;
	}

	/**
	 * 根据mSerialNo查询交易信息
	 * @param mSerialNo
	 * @return
	 * @throws BussinessException
	 */
	@Override
	public TransactionDto queryTransactionByMSerialNo(String mid,String mSerialNo) throws BussinessException {
		TransactionDto retDto =  dao.queryTransactionByMSerialNo(mid,mSerialNo);
		if (retDto == null) {
			return new TransactionDto();
		}
		
		// 增加MD5校验，防止数据被篡改
		if (!StringUtils.equals(retDto.getDigest(), retDto.buildDigest())) {
		    logger.info(retDto.toString());
			logger.info("数据异常..." + "数据库摘要：" + retDto.getDigest() + ";现摘要:" + retDto.buildDigest());
			throw new BussinessException(ReturnCode.FAIL, "该笔交易数据异常");
		}
		return retDto;
	}
	
	public static void main(String[] args) throws BussinessException {
		TransactionServiceImpl impl = new TransactionServiceImpl();
		
		TransactionDto dto = impl.queryTransactionByMSerialNo("1002", "JNF0022");
		System.out.println(dto.getDesc());
	}

}
