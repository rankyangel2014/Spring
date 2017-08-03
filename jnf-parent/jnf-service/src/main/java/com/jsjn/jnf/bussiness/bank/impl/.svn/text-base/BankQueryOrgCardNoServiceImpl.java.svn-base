package com.jsjn.jnf.bussiness.bank.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.jsjn.jnf.bean.bo.withhold.QueryOrgCardNoReqBo;
import com.jsjn.jnf.bean.bo.withhold.QueryOrgCardNoResBo;
import com.jsjn.jnf.bean.bo.withhold.QueryOrgCardNoResDataBo;
import com.jsjn.jnf.bussiness.bank.BankQueryOrgCardNoService;
import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.jnf.service.withhold.QueryOrgCardNoService;
import com.jsjn.panda.setup.ParseSpring;

@Service("bankQueryOrgCardNoService")
public class BankQueryOrgCardNoServiceImpl implements BankQueryOrgCardNoService {
	private QueryOrgCardNoService queryOrgCardNoService = (QueryOrgCardNoService) ParseSpring.context.getBean("queryOrgCardNoService");

	@Override
	public QueryOrgCardNoResBo queryInsttuCardNo(QueryOrgCardNoReqBo dto) throws BussinessException {
		List<String> bankCardNo = queryOrgCardNoService.queryInsttuCardNo(dto.getQueryOrgCardNoReqDataBo().getOrgNo());
		QueryOrgCardNoResBo queryOrgCardNoResBo = new QueryOrgCardNoResBo();
		QueryOrgCardNoResDataBo resDto = new QueryOrgCardNoResDataBo();
		if (bankCardNo.isEmpty()) {
			throw new BussinessException(ReturnCode.FAIL, "当前机构未绑定提现银行卡");
		}
		queryOrgCardNoResBo.setResCode(ReturnCode.SUCCESS);
		queryOrgCardNoResBo.setResMsg("查询银行卡号成功");
		resDto.setBankCardNo(bankCardNo.get(0));
		queryOrgCardNoResBo.setResData(resDto);
		return queryOrgCardNoResBo;
	}

}
