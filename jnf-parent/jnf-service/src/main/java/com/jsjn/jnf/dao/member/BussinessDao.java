package com.jsjn.jnf.dao.member;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.jsjn.jnf.bean.dto.assist.ApiRoleCtrlDto;
import com.jsjn.jnf.bean.dto.assist.BizConfigDto;
import com.jsjn.jnf.bean.dto.member.BussinessDto;
import com.jsjn.jnf.bean.dto.member.RoleDto;
import com.jsjn.jnf.persistence.CrudDao;
import com.jsjn.jnf.persistence.annotation.MyBatisDao;
@MyBatisDao
public interface BussinessDao extends CrudDao<BussinessDto> {
	
	/**
	 * 根据条件查询商户信息列表
	 * @param mid 商户号
	 * @param mName 商户名称
	 * @param status 状态
	 * @return
	 */
	public List<BussinessDto> findBussiness(@Param(value="mid")String mid,@Param(value="mName")String mName,
			@Param(value="status")String status);
	
	/**
	 * 根据商户号，查找当前用户权限列表
	 * @param mid
	 * @return
	 */
	public List<String> findBussinessAuth(String mid);
	
	/**
	 * 修改mid商户的权限
	 * @param mids
	 * @return
	 */
	public int insertBussinessAuth(List<ApiRoleCtrlDto> dto);
	
	/**
	 * 删除mid下的所有权限
	 * @param mdi
	 * @return
	 */
	public int deleteBussinessAuth(String mid) throws Exception;
	
	/**
	 * 修改商户接入配置
	 * @param whiteList
	 * @param rsaPubKey
	 * @param aesKey
	 * @return
	 * @throws Exception
	 */
	public int updateBussinessConfig(@Param(value="whiteList")String whiteList, 
			@Param(value="rsaPubKey")String rsaPubKey, 
			@Param(value="aesKey")String aesKey,
			@Param(value="digest")String digest,
			@Param(value="mid")String mid);
	
	/**
	 * 修改操作，检查组织机构代码证是否被修改
	 * @param mid
	 * @param busLcnsNo
	 * @return
	 */
	public BussinessDto regNoIsRegiset(@Param(value="mid")String mid,@Param(value="busLcnsNo")String busLcnsNo);
	
	/**
	 * 根据主键查询商户信息
	 * @param mid
	 * @return
	 */
	public BussinessDto qryBusnessByMid(@Param(value="mid")String mid);
	
	/**
	 * 根据mid查询权限设置表
	 * @param mid
	 * @return
	 */
	public BizConfigDto qryBussinessConfigByMid(@Param(value="mid")String mid);
	
	public List<RoleDto> qryApiRole(@Param(value="mid")String mid);
	
	public List<RoleDto> qryPerowRole();
	
	public int amendBizConfig(BizConfigDto bizConfigDto);
	
	public int createBizConfig(BizConfigDto bizConfigDto);
	
}
