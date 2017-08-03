package com.jsjn.jnf.service.withhold;

import java.util.List;

import com.jsjn.jnf.bean.bo.withhold.LoanInfoQryReqBO;
import com.jsjn.jnf.bean.bo.withhold.LoanInfoQryResDataBO;

public interface LoanInfoService {
	
	public List<LoanInfoQryResDataBO> findContNoByCondition(LoanInfoQryReqBO  loanInfoQryBO);

}
