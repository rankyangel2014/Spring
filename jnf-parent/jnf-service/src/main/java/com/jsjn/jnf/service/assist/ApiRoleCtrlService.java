package com.jsjn.jnf.service.assist;

import java.util.List;

import com.jsjn.jnf.bean.dto.assist.ApiRoleCtrlDto;

public interface ApiRoleCtrlService {
	
	/**
	 * 校验商户是否有API权限
	 * @param mid
	 * 				商户号
	 * @param permission	
	 * 				API服务名称
	 * @return
	 */
	public boolean validateRoleCtrl(String mid , String permission);
	
	/**
	 * 查询平台所有权限
	 * @return
	 */
	public List<ApiRoleCtrlDto> findPlatRoles();
}
