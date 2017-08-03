package com.jsjn.jnf.bussiness.bank;

import com.jsjn.jnf.bean.bo.withhold.QueryOrgCardNoReqBo;
import com.jsjn.jnf.bean.bo.withhold.QueryOrgCardNoResBo;
import com.jsjn.jnf.common.exception.BussinessException;

public interface BankQueryOrgCardNoService {
	public QueryOrgCardNoResBo queryInsttuCardNo(QueryOrgCardNoReqBo dto) throws BussinessException;
}
