/**
 * 
 */
package com.jsjn.jnf.service.assist;

import java.util.List;

import com.jsjn.jnf.bean.dto.assist.DictDto;

/**
 * @author ZSMJ
 *
 */
public interface DictService {
	
	/**
	 * 根据types来查找系统参数
	 * @param types
	 * @return
	 */
	public List<DictDto> getSysConfigByTypes(DictDto dto);
	
	/**
	 * 根据type查询单个参数
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
