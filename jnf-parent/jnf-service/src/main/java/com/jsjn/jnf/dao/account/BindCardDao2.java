package com.jsjn.jnf.dao.account;


import java.util.Map;
import com.jsjn.jnf.bean.dto.account.BindCardDto2;
import com.jsjn.jnf.persistence.CrudDao;
import com.jsjn.jnf.persistence.annotation.MyBatisDao;

/**
 * TODO for test
 */
@MyBatisDao
public interface BindCardDao2 extends CrudDao<BindCardDto2> {
	
	/**
	 * 获取custId
	 * @param map
	 * @return
	 */
	public String getCustId(Map<String,String> map);
	
	/**
	 * 查询绑卡信息
	 * @param custId
	 * @param mid
	 * @param bankCardNo
	 * @return
	 */
	public BindCardDto2 queryCardInfo(Map<String,String> map);
}
