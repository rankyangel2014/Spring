package com.jsjn.jnf.dao.assist;

import org.apache.ibatis.annotations.Param;

import com.jsjn.jnf.bean.dto.assist.BizConfigDto;
import com.jsjn.jnf.persistence.CrudDao;
import com.jsjn.jnf.persistence.annotation.MyBatisDao;
@MyBatisDao
public interface BizConfigDao extends CrudDao<BizConfigDto>{
	
	/**
	 * 根据mid查询商户接入配置
	 * @param mid
	 * @return
	 */
	public BizConfigDto queryBussinessConfigByMid(String mid);
	
	/**
	 * 保存商户接入配置
	 * @param config
	 * @return
	 */
	public BizConfigDto insertBussinessConfig(BizConfigDto config) ;
	
	/**
	 * 查询pubKey是否存在
	 * @param mid
	 * @param rsaPubKey
	 * @return
	 */
	public BizConfigDto qryByPubKey(@Param(value="mid")String mid,@Param(value="rsaPubKey")String rsaPubKey);

}
