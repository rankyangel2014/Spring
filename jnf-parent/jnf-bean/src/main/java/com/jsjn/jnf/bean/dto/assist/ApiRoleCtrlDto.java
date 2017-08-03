package com.jsjn.jnf.bean.dto.assist;

import com.jsjn.jnf.bean.dto.base.BaseDTO;

/**
 * API权限控制类
 * @author lilong
 *
 */
public class ApiRoleCtrlDto extends BaseDTO<ApiRoleCtrlDto>{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * 商户编号
	 */
	private String mid;
	
	/**
	 * 权限编号
	 */
	private Long perid;
	
	private ApiRoleDto apiRole;

	public String getMid() {
		return mid;
	}

	public void setMid(String mid) {
		this.mid = mid;
	}

	public Long getPerid() {
		return perid;
	}

	public void setPerid(Long perid) {
		this.perid = perid;
	}

	public ApiRoleDto getApiRole() {
		return apiRole;
	}

	public void setApiRole(ApiRoleDto apiRole) {
		this.apiRole = apiRole;
	}
	
	
	
}
