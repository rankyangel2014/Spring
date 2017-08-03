package com.jsjn.jnf.panda.common;

import java.util.List;




import com.jsjn.jnf.bean.dto.assist.MenuDto;
import com.jsjn.jnf.service.assist.MenuService;
import com.jsjn.panda.annotation.PandaMethod;
import com.jsjn.panda.annotation.PandaService;
import com.jsjn.panda.annotation.ServiceType;
import com.jsjn.panda.setup.ParseSpring;

@PandaService(serviceName = "pandaMenuService", serviceType = ServiceType.CommonBean)
public class PandaMenuService {
	
	private MenuService menuService=(MenuService)ParseSpring.context.getBean("menuServiceImpl");
	
	@PandaMethod(mName = "findAllMenuCode", dscrpt = "获取系统参数", RegID = "findAllMenuCode")
	public List<MenuDto> findAllMenuCode(){
		return menuService.findAllMenuCode();
	}
	
	@PandaMethod(mName = "addMenu", dscrpt = "新增系统参数", RegID = "addMenu")
	public int addMenu(MenuDto dto){
	    return menuService.addMenu(dto);
	}
	
	@PandaMethod(mName = "updateMenu", dscrpt = "修改系统参数", RegID = "updateMenu")
	public int updateMenu(MenuDto dto){
	    return menuService.updateMenu(dto);
	}
	
	@PandaMethod(mName = "delMenu", dscrpt = "删除系统参数", RegID = "delMenu")
	public int delMenu(MenuDto dto){
	    return menuService.delMenu(dto);
	}
	
	@PandaMethod(mName = "findAllMenuByCode", dscrpt = "根据条件查询参数", RegID = "findAllMenuByCode")
	public List<MenuDto> findAllMenuByCode(MenuDto dto){
	    return menuService.findAllMenuByCode(dto);
	}

}
