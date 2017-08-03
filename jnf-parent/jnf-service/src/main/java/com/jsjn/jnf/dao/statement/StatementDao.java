package com.jsjn.jnf.dao.statement;

import java.util.List;

import com.jsjn.jnf.bean.dto.statement.StatementDTO;
import com.jsjn.jnf.persistence.CrudDao;
import com.jsjn.jnf.persistence.annotation.MyBatisDao;

/**
 * 对账单DAO
 * 
 * @author yincy
 *
 */
@MyBatisDao
public interface StatementDao extends CrudDao<StatementDTO> {

	/**
	 * 批量插入
	 * 
	 * @param dto
	 * @return
	 */
	public int batchInsert(List<StatementDTO> list);
}
