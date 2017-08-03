/**
 * 
 */
package com.jsjn.jnf.service.assist;

import java.util.List;

import com.jsjn.jnf.bean.dto.assist.MenuDto;

/**
 * @author majian
 *
 */
public interface MenuService {
	
	/**
	 * 根据menuCode来查找系统参数
	 * @param menuCode
	 * @return
	 */
	public List<MenuDto> findByMenuCode(String menuCode);
	/**
	 * 检查当前key是否包含在menu的key中
	 * @param menuCode 
	 * @param key
	 * @return
	 */
	public boolean inKey(String menuCode,String key);
	
	/**
	 * 检查当前value是否包含在menu的value中
	 * @param menuCode
	 * @param value
	 * @return
	 */
	public boolean inValue(String menuCode,String value);
	
	/**
	 * 获取系统所有参数
	 * @return
	 */
	public List<MenuDto> findAllMenuCode();
	
	/**
	 * 根据条件获取系统所有参数
	 * @return
	 */
	public List<MenuDto> findAllMenuByCode(MenuDto dto);
	
	/**
	 * 添加系统参数
	 * @param dto
	 * @return
	 */
	public int addMenu(MenuDto dto);
	
	/**
	 * 修改系统参数
	 * @param dto
	 * @return
	 */
	public int updateMenu(MenuDto dto);
	
	/**
	 * 删除当前系统参数
	 * @param id
	 * @return
	 */
	public int delMenu(MenuDto dto);
}
