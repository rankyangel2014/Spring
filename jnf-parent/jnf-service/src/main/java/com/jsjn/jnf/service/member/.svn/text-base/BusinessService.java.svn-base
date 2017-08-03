package com.jsjn.jnf.service.member;


import java.util.List;


import java.util.Map;

import com.jsjn.jnf.bean.dto.assist.BizConfigDto;
import com.jsjn.jnf.bean.dto.member.BussinessDto;
/**
 * 商户api接口
 * @author qiangl
 *
 */
public interface BusinessService {
	/**
	 * 检验商户是否开户
	 * @param mid 商户号
	 * @return
	 * @throws Exception
	 */
	public Boolean isOpen(String mid) throws Exception;
	/**
	 * 根据商户号查询商户信息 
	 * @param mid
	 * @return
	 * @throws Exception
	 */
	public BussinessDto queryBusinessById(String mid) throws Exception;
	/**
	 * 添加商户信息
	 * @param dto
	 * @return
	 * @throws Exception
	 */
	public BussinessDto saveBusinessInfo(BussinessDto dto) throws Exception;
	
	/**
	 * 根据条件查询商户信息列表
	 * @param mid 商户号
	 * @param mName 商户名称
	 * @param status 状态
	 * @return
	 * @throws Exception 
	 */
	public List<BussinessDto> findBussiness(String mid,String mName,String status) throws Exception;
	
	/**
	 * 修改商户信息
	 * @param dto
	 * @return
	 * @throws Exception 
	 */
	public BussinessDto updateBussinessInfo(BussinessDto dto) throws Exception;
	
	/**
	 * 根据商户号，查找当前用户权限列表
	 * @param mid
	 * @return
	 * @throws Exception 
	 */
	public List<String> findBussinessAuth(String mid) throws Exception;
	
	/**
	 * 修改mid商户的权限
	 * @param mids
	 * @return
	 * @throws Exception 
	 */
	public boolean updateBussinessAuth(String roles[],String mid) throws Exception;
	
	public int deleteBussinessAuth(String mid) throws Exception;
	
	public Map<String, Object> qryBusnessAll(String mid) throws Exception;
	
	public Map<String, Object> amendBusness(BussinessDto bussinessDto,BizConfigDto bizConfigDto,String role[]) throws Exception;
	
	public Map<String, Object> qryRoleAll()throws Exception;
	
	public Map<String, Object> createBusness(BussinessDto bussinessDto,BizConfigDto bizConfigDto,String role[]) throws Exception;
	
}
