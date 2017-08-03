package com.jsjn.jnf.dao.assist;

import java.util.List;

import com.jsjn.jnf.bean.dto.assist.FeeConfigDto;
import com.jsjn.jnf.persistence.CrudDao;
import com.jsjn.jnf.persistence.annotation.MyBatisDao;
@MyBatisDao
public interface FeeConfigDao extends CrudDao<FeeConfigDto>{
	
	/**
	 * 查询计费参数配置
	 * @param mid
	 * @param rsaPubKey
	 * @return
	 */
	public List<FeeConfigDto> qryFeeConfig(FeeConfigDto dto);
	
	/**
	 * 新增计费参数配置
	 * @param dto
	 * @return
	 */
	public int addFeeConfig(FeeConfigDto dto);
	
	/**
	 * 修改计费参数配置
	 * @param dto
	 * @return
	 */
	public int updateFeeConfig(FeeConfigDto dto);
	
	/**
	 * 删除计费参数配置
	 * @param id
	 * @return
	 */
	public int delFeeConfig(String id);

}
