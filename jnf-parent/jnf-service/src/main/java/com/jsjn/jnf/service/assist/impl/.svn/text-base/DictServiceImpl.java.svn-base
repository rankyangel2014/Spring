/**
 * 
 */
package com.jsjn.jnf.service.assist.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.jsjn.jnf.dao.assist.DictDao;
import com.jsjn.jnf.bean.dto.assist.DictDto;
import com.jsjn.jnf.service.assist.DictService;
import com.jsjn.jnf.service.assist.utils.SequenceUtils;
import com.jsjn.jnf.service.base.CrudService;
import com.jsjn.panda.setup.ParseSpring;

/**
 * @author ZSMJ
 * 
 */
@Service
@Transactional(readOnly = true)
public class DictServiceImpl extends CrudService<DictDao, DictDto> implements
		DictService {

	@Override
	protected DictDao getCrudDao() {

		return (DictDao) ParseSpring.context.getBean("dictDao");
	}
	
	public List<DictDto> getSysConfigByTypes(DictDto dto) {
		return getCrudDao().findByTypes(dto);
	}
	
	public String findByType(String type){
		return getCrudDao().findByType(type);
	}

    @Override
    public List<DictDto> qryDictInfo(DictDto dictDto) {
        List<DictDto> list = getCrudDao().qryDictInfo(dictDto);
        for(DictDto dto : list){
            /**
             * 注：将经过拦截器得到的总页数total值设置到查询结果集中。用于分页
             */
            dto.setTotal(dictDto.getTotal());
        }
        return list;
    }

    @Override
    public int addDictInfo(DictDto dto) {
        String id = SequenceUtils.getDict();
        dto.setId(Long.parseLong(id));
        return getCrudDao().addDictInfo(dto);
    }

	@Override
	public int updateDictInfo(DictDto dto) {
		return getCrudDao().updateDictInfo(dto);
	}
    
}
