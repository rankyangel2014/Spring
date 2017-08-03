package com.jsjn.jnf.bussiness.query.impl;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.jsjn.jnf.bean.bo.bank.QueryWithholdDataResBo;
import com.jsjn.jnf.bean.bo.bank.QueryWithholdReqBo;
import com.jsjn.jnf.bean.bo.bank.QueryWithholdResBo;
import com.jsjn.jnf.bean.dto.trade.TransactionDto;
import com.jsjn.jnf.bussiness.query.QueryWithholdStateService;
import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.jnf.common.utils.Logger;
import com.jsjn.jnf.common.utils.StringUtils;
import com.jsjn.jnf.common.utils.ValidatorUtil;
import com.jsjn.jnf.service.trade.TransactionService;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 查询代扣状态业务层
 * 
 * @author yanhaibo
 * 
 * 
 */
@Service
public class QueryWithholdStateServiceImpl implements QueryWithholdStateService {

	private final static Logger logger = Logger
			.getLogger(QueryWithholdStateServiceImpl.class);

	/*
	 * private WithholdStateService withholdStateService =
	 * (WithholdStateService)
	 * ParseSpring.context.getBean("withholdStateServiceImpl");
	 */

	private TransactionService transactionService = (TransactionService) ParseSpring.context
			.getBean("transactionServiceImpl");

	@Override
	public QueryWithholdResBo queryWithholdState(QueryWithholdReqBo dto)
			throws BussinessException {
		logger.info("==========================QueryWithholdServiceImpl queryWithholding start");
		QueryWithholdResBo queryWithholdResBo = new QueryWithholdResBo();
		String errMsg = ValidatorUtil.validObj(dto.getReqData());
		if (!StringUtils.isBlank(errMsg)) {
			logger.error("校验查询代扣状态请求参数错误" + errMsg);
			throw new BussinessException(ReturnCode.FAIL, errMsg);
		}
		String tra = dto.getReqData().getTranNo();
		String ser = dto.getReqData().getSerialNo();
		TransactionDto transactionDto = new TransactionDto();
		transactionDto.setTradeNo(tra);
		transactionDto.setMSerialNo(ser);
		transactionDto.setMid(dto.getMid());
		logger.info("===================查询代扣状态开始====");
		// 根据条件查询签约代扣信息
		Map<String, Object> m= transactionService.queryWithHoldStateInfo(transactionDto);
		QueryWithholdDataResBo queryWithholdDataResBo = new QueryWithholdDataResBo();
		queryWithholdDataResBo.setStatus(String.valueOf(m.get("STATUS")));
		queryWithholdDataResBo
				.setFailReason(String.valueOf(m.get("FAILREASON")));
		queryWithholdDataResBo.setTranNo(String.valueOf(m.get("TRADENO")));
		queryWithholdResBo.setResData(queryWithholdDataResBo);
		return queryWithholdResBo;
	}
	
	public static void main(String[] args) throws BussinessException {
		TransactionService transactionService = (TransactionService) ParseSpring.context
				.getBean("transactionServiceImpl");
		TransactionDto transactionDto = new TransactionDto();
		transactionDto.setMSerialNo("JNF0015");
		transactionDto.setTradeNo("T10010116090700000196");
		System.out.println( transactionService.queryWithHoldStateInfo(transactionDto));
	}


}
