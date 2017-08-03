/**
 * 
 */
package com.jsjn.jnf.service.assist.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.jsjn.jnf.dao.assist.MenuDao;
import com.jsjn.jnf.bean.dto.assist.MenuDto;
import com.jsjn.jnf.service.assist.MenuService;
import com.jsjn.jnf.service.base.CrudService;

/**
 * @author majian
 * 
 */
@Service
@Transactional(readOnly = true)
public class MenuServiceImpl extends CrudService<MenuDao, MenuDto> implements
		MenuService {

	private MenuDao dao = (MenuDao) getBean("menuDao");
	
	@Override
	protected MenuDao getCrudDao() {
		return dao;
	}

	@Override
	public List<MenuDto> findByMenuCode(String menuCode) {
		//TODO 这里要包装成cache，定时刷新，不用每次都获取数据 majian 以后考虑
		return dao.findByMenuCode(menuCode);
	}
	
	public boolean inKey(String menuCode,String key){
		List<MenuDto> list = findByMenuCode(menuCode);
		for (int i=0;i<list.size();i++){
			if (list.get(i).getMenuKey().equals(key)){
				return true;
			}
		}
		return false;
	}
	public boolean inValue(String menuCode,String value){
		List<MenuDto> list = findByMenuCode(menuCode);
		for (int i=0;i<list.size();i++){
			if (list.get(i).getMenuValue().equals(value)){
				return true;
			}
		}
		return false;
	}

	@Override
	public List<MenuDto> findAllMenuCode() {
		return dao.findAllMenuCode();
	}

    @Override
    public int addMenu(MenuDto dto) {
        return dao.addMenu(dto);
    }

    @Override
    public int updateMenu(MenuDto dto) {
        return dao.updateMenu(dto);
    }

    @Override
    public int delMenu(MenuDto dto) {
        return dao.delMenu(dto);
    }

    @Override
    public List<MenuDto> findAllMenuByCode(MenuDto inDto) {
        List<MenuDto> list = dao.findAllMenuByCode(inDto);
        for(MenuDto dto : list){
            /**
             * 注：将经过拦截器得到的总页数total值设置到查询结果集中。用于分页
             */
            dto.setTotal(inDto.getTotal());
        }
        return list;
    }
	
}
