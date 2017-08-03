/**
 * 
 */
package com.jsjn.jnf.dao.assist;

import java.util.List;
import com.jsjn.jnf.bean.dto.assist.MenuDto;
import com.jsjn.jnf.persistence.CrudDao;
import com.jsjn.jnf.persistence.annotation.MyBatisDao;

/**
 * @author majian
 *
 */
@MyBatisDao
public interface MenuDao extends CrudDao<MenuDto>{
	/**
	 * 按照code查找系统参数配置
	 * @param code
	 * @return
	 */
	public List<MenuDto> findByMenuCode(String code);
	
	/**
	 * 获取系统所有参数
	 * @return
	 */
	public List<MenuDto> findAllMenuCode();
	
	/**
	 * 根据条件获取所有参数
	 * @param inDto
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
