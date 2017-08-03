/**
 * 
 */
package com.jsjn.jnf.panda.common;

import java.util.List;

import com.jsjn.jnf.bean.dto.assist.ApiRoleCtrlDto;
import com.jsjn.jnf.service.assist.ApiRoleCtrlService;
import com.jsjn.panda.annotation.PandaMethod;
import com.jsjn.panda.annotation.PandaService;
import com.jsjn.panda.annotation.ServiceType;
import com.jsjn.panda.setup.ParseSpring;

/**
 * @author ZSMJ
 *
 */
@PandaService(serviceName = "pandaApiRoleCtrlService", serviceType = ServiceType.CommonBean)
public class PandaApiRoleCtrlService {
	
	private ApiRoleCtrlService apiroleCtrlService=(ApiRoleCtrlService)ParseSpring.context.getBean("apiRoleCtrlServiceImpl");
	
	@PandaMethod(mName = "validateRoleCtrl", dscrpt = "校验商户权限", RegID = "validateRoleCtrl")
	public boolean validateRoleCtrl(ApiRoleCtrlDto apiRoleCtrl) {
		String mid = apiRoleCtrl.getMid();
		String permission = apiRoleCtrl.getApiRole().getPermission();
		return apiroleCtrlService.validateRoleCtrl(mid, permission);
	}
	
	@PandaMethod(mName = "findPlatRoles", dscrpt = "查询系统所有权限", RegID = "findPlatRoles")
	public List<ApiRoleCtrlDto> findPlatRoles() {
		return apiroleCtrlService.findPlatRoles();
	}
}
