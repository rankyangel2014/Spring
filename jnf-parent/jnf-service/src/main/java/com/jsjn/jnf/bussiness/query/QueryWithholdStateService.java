package com.jsjn.jnf.bussiness.query;

import com.jsjn.jnf.bean.bo.bank.QueryWithholdReqBo;
import com.jsjn.jnf.bean.bo.bank.QueryWithholdResBo;
import com.jsjn.jnf.common.exception.BussinessException;

public interface QueryWithholdStateService {

	/**
	 * 代扣状态查询
	 * @param dto
	 * @return
	 */
	public QueryWithholdResBo queryWithholdState(QueryWithholdReqBo dto) throws BussinessException;
}
