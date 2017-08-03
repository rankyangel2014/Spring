/**
 * 
 */
package com.jsjn.jnf.dao.assist;

import java.util.List;

import com.jsjn.jnf.bean.dto.assist.DictDto;
import com.jsjn.jnf.persistence.CrudDao;
import com.jsjn.jnf.persistence.annotation.MyBatisDao;

/**
 * @author ZSMJ
 *
 */
@MyBatisDao
public interface DictDao extends CrudDao<DictDto>{
	/**
	 * 按照type查找系统参数配置
	 * @param type
	 * @return
	 */
	public List<DictDto> findByTypes(DictDto dto);
	/**
	 * 按照type查找系统参数配置
	 * @param type
	 * @return
	 */
	public String findByType(String type);
	
	/**
	 * 查询系统所有配置参数
	 * @return
	 */
	public List<DictDto> qryDictInfo(DictDto dictDto);
	
	/**
	 * 新增系统配置参数
	 * @param dto
	 * @return
	 */
	public int addDictInfo(DictDto dto);
	
	/**
	 * 修改系统配置参数
	 * @param dto
	 * @return
	 */
	public int updateDictInfo(DictDto dto);
	
}
