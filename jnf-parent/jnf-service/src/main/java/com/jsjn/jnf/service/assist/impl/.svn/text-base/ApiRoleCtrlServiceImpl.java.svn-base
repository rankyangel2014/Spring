/**
 * 
 */
package com.jsjn.jnf.service.assist.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jsjn.jnf.bean.dto.assist.ApiRoleCtrlDto;
import com.jsjn.jnf.dao.assist.ApiRoleCtrlDao;
import com.jsjn.jnf.service.assist.ApiRoleCtrlService;
import com.jsjn.jnf.service.base.CrudService;
import com.jsjn.panda.setup.ParseSpring;

/**
 * @author ZSMJ
 *
 */
@Service
@Transactional(readOnly = true)
public class ApiRoleCtrlServiceImpl extends CrudService<ApiRoleCtrlDao, ApiRoleCtrlDto>implements ApiRoleCtrlService{
	
	private final static Logger logger = Logger.getLogger(ApiRoleCtrlServiceImpl.class);
	private  ApiRoleCtrlDao dao = (ApiRoleCtrlDao) ParseSpring.context.getBean("apiRoleCtrlDao");
	@Override
	public boolean validateRoleCtrl(String mid, String permission) {
		//对接口做一次转换
		permission = "com.jsjn.jnf.open." + permission;
		boolean permitFlag = false;
		int count = 0;
		try{
			count = dao.validateRoleCtrl(mid, permission);
			if(count == 1)
				permitFlag = true;
		}catch(Exception e){
			logger.error("查询商户权限出错" , e);
		}
		return permitFlag;
	}

	@Override
	protected ApiRoleCtrlDao getCrudDao() {
		return dao;
	}

	@Override
	public List<ApiRoleCtrlDto> findPlatRoles() {
		/**
		 * 查询系统所有权限
		 */
		try {
			List<ApiRoleCtrlDto> list = dao.findPlatRoles();
			if(list.size()>0){
				return list;
			}
		} catch (Exception e) {
			logger.error("查询商户权限出错" , e);
		}
		return null;
	}
}
