package com.jsjn.jnf.service.withhold.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.jsjn.jnf.dao.withhold.WithholdDao;
import com.jsjn.jnf.service.withhold.QueryOrgCardNoService;
import com.jsjn.panda.setup.ParseSpring;

@Service("queryOrgCardNoService")
public class QueryOrgCardNoServiceImpl implements QueryOrgCardNoService {
	private WithholdDao withholdDao = (WithholdDao) ParseSpring.context.getBean("withholdDao");

	@Override
	public List<String> queryInsttuCardNo(String orgNo) {
		// TODO Auto-generated method stub
		return withholdDao.queryInsttuCardNo(orgNo);
	}

}
