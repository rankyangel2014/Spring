package com.jsjn.jnf.service.withhold.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.jsjn.jnf.bean.bo.withhold.LoanInfoQryReqBO;
import com.jsjn.jnf.bean.bo.withhold.LoanInfoQryResDataBO;
import com.jsjn.jnf.service.withhold.LoanInfoService;

@Service("loanInfoService")
public class LoanInfoServiceImpl implements LoanInfoService {

	@Override
	public List<LoanInfoQryResDataBO> findContNoByCondition(
			LoanInfoQryReqBO loanInfoQryBO) {
		
		/**
		 * 此处测试，还未有正式接口
		 */
		List<LoanInfoQryResDataBO> list = new ArrayList<LoanInfoQryResDataBO>();
		LoanInfoQryResDataBO l1 = new LoanInfoQryResDataBO();
		l1.setContNo("123456789");
		l1.setCustName("李小龙");
		l1.setCustType("1");
		l1.setEndDate("28180901");
		l1.setIdNo("511123198012118119");
		l1.setIdType("1");
		l1.setLoanNo("717361513587");
		l1.setOsPrcp("200000");
		l1.setRepayType("等额本金");
		l1.setResPrcp("16782");
		l1.setStartDate("20150101");
		
		LoanInfoQryResDataBO l2 = new LoanInfoQryResDataBO();
		l2.setContNo("987654321");
		l2.setCustName("周星星");
		l2.setCustType("1");
		l2.setEndDate("28180413");
		l2.setIdNo("621024198706118494");
		l2.setIdType("1");
		l2.setLoanNo("735464677876");
		l2.setOsPrcp("400000");
		l2.setRepayType("等额本金");
		l2.setResPrcp("327482");
		l2.setStartDate("20151201");
		
		list.add(l1);
		list.add(l2);
		
		return list;
	}
	
}
