/**
 * 
 */
package com.jsjn.jnf.dao.assist;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.jsjn.jnf.bean.dto.assist.ApiRoleCtrlDto;
import com.jsjn.jnf.persistence.CrudDao;
import com.jsjn.jnf.persistence.annotation.MyBatisDao;

/**
 * @author ZSMJ
 *
 */
@MyBatisDao
public interface ApiRoleCtrlDao extends CrudDao<ApiRoleCtrlDto>{
	/**
	 * 查询商户是否有此API权限
	 * @param mid
	 * @param permission
	 * @return
	 */
	public int validateRoleCtrl(@Param("mid")String mid , @Param("permission")String permission);
	
	/**
	 * 查询平台所有权限
	 * @return
	 */
	public List<ApiRoleCtrlDto> findPlatRoles();
}
