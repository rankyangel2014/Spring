/**
 * 
 */
package com.jsjn.jnf.dao.assist;

import com.jsjn.jnf.bean.dto.assist.LockDto;
import com.jsjn.jnf.persistence.CrudDao;
import com.jsjn.jnf.persistence.annotation.MyBatisDao;

/**
 * @author ZSMJ
 *
 */
@MyBatisDao
public interface LockDao extends CrudDao<LockDto>{
}
