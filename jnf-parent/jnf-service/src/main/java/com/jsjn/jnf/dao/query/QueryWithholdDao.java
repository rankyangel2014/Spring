package com.jsjn.jnf.dao.query;

import java.util.List;
import java.util.Map;

import com.jsjn.jnf.persistence.annotation.MyBatisDao;


@MyBatisDao
public interface QueryWithholdDao {

	/**
	 * 查询代扣信息状态
	 * @param map
	 * @return
	 */
	public List<Map<String, Object> > queryWithHolds(Map<String, Object> map);
	
}
