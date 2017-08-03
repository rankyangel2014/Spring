package com.jsjn.jnf.panda.withhold;


import java.util.List;

import com.jsjn.jnf.bean.bo.withhold.LoanInfoQryReqBO;
import com.jsjn.jnf.bean.bo.withhold.LoanInfoQryResDataBO;
import com.jsjn.jnf.service.withhold.LoanInfoService;
import com.jsjn.panda.annotation.PandaMethod;
import com.jsjn.panda.annotation.PandaService;
import com.jsjn.panda.annotation.ServiceType;
import com.jsjn.panda.setup.ParseSpring;

@PandaService(serviceName = "PandaLoanInfoService", serviceType = ServiceType.CommonBean)
public class PandaLoanInfoService {

	private LoanInfoService loanInfoService = (LoanInfoService)ParseSpring.context
			.getBean("loanInfoService");

	/**
	 * 查询贷款信息
	 * 
	 */
	@PandaMethod(RegID = "findContNoByCondition")
	public List<LoanInfoQryResDataBO> findContNoByCondition(LoanInfoQryReqBO  loanInfoQryBO){
		return loanInfoService.findContNoByCondition(loanInfoQryBO);
	}
	
//	public static void main(String[] args) {
//		PandaLoanInfoService a = new PandaLoanInfoService();
//		LoanInfoQryReqBO b = new LoanInfoQryReqBO();
//		List<LoanInfoQryResDataBO>  c = a.findContNoByCondition(b);
//		System.out.println(c.size());
//	}
	
	
}
