package com.jsjn.jnf.service.assist.impl;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jsjn.jnf.bean.dto.assist.InterfaceXmlDto;
import com.jsjn.jnf.common.utils.StringUtils;
import com.jsjn.jnf.common.utils.ValidatorUtil;
import com.jsjn.jnf.dao.assist.InterfaceXmlDao;
import com.jsjn.jnf.service.assist.InterfaceXmlService;
import com.jsjn.jnf.service.base.CrudService;
import com.jsjn.panda.setup.ParseSpring;

@Service
@Transactional(readOnly = true)
public class InterfaceXmlServiceImpl extends CrudService<InterfaceXmlDao,InterfaceXmlDto> implements InterfaceXmlService{
    
    private final static Logger logger = Logger.getLogger(InterfaceXmlServiceImpl.class);
    
    @Override
    public boolean insertXml(InterfaceXmlDto dto) throws Exception {
        //校验dto相关数据
        String[] propertys = {"id","method","inputXml"}; 
        String errMsg=ValidatorUtil.validpropertys(dto, propertys);
        
        if (!StringUtils.isBlank(errMsg)) {
            logger.error("输入参数不合法！" + errMsg);
            throw new Exception("输入参数不合法！"+errMsg);
        }
        
        int count = getCrudDao().insert(dto);
        if(count > 0){
            return true;
        }
        
        return false;
    }

    @Override
    public boolean updateXml(InterfaceXmlDto dto) throws Exception{
        int count = getCrudDao().update(dto);
        if(count > 0){
            return true;
        }
        return false;
    }

    @Override
    protected InterfaceXmlDao getCrudDao() {
        return (InterfaceXmlDao)ParseSpring.context.getBean("interfaceXmlDao");
    }
    
}
