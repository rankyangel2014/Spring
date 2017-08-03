package com.jsjn.jnf.service.statement.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.jsjn.jnf.bean.dto.statement.StatementDTO;
import com.jsjn.jnf.dao.statement.StatementDao;
import com.jsjn.jnf.service.statement.StatementService;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 对账单持久层实现类
 * 
 * @author yincy
 *
 */
@Service
public class StatementServiceImpl implements StatementService {

	/**
	 * JNF_T30
	 */
	private StatementDao statementDao = (StatementDao) ParseSpring.context.getBean("statementDao");

	/**
	 * 批量插入
	 */
	@Override
	public int batchInsert(List<StatementDTO> list) throws Exception {
		return statementDao.batchInsert(list);
	}
}
