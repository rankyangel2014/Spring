package com.jsjn.jnf.service.withhold.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.jsjn.jnf.bean.dto.withhold.BatchWithholdDto;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.jnf.dao.withhold.WithholdDao;
import com.jsjn.jnf.service.withhold.BatchWithholdService;
import com.jsjn.panda.setup.ParseSpring;

@Service
public class BatchWithholdServiceImpl implements BatchWithholdService {
	private WithholdDao withholdDao = (WithholdDao) ParseSpring.context.getBean("withholdDao");

	public Integer batchInsertWithhold(List<BatchWithholdDto> list) throws BussinessException {
		return withholdDao.batchInsertWithhold(list);
	}

	public List<BatchWithholdDto> queryBatchWithhold(Integer limit) {
		return withholdDao.queryBatchWithhold(limit);
	}

	public Integer updateWithhold(BatchWithholdDto batchWithholdDto) throws BussinessException {
		return withholdDao.updateWithhold(batchWithholdDto);
	}

}
