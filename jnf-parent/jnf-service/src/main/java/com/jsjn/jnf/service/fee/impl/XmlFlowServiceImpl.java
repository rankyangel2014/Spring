/**
 * 
 */
package com.jsjn.jnf.service.fee.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.jsjn.jnf.bean.bo.fee.XmlFlowDataBO;
import com.jsjn.jnf.common.security.Cryptos;
import com.jsjn.jnf.dao.fee.XmlFlowDao;
import com.jsjn.jnf.service.base.CrudService;
import com.jsjn.jnf.service.fee.XmlFlowService;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 读取报文
 * @author ZSMJ
 *
 */
@Service
public class XmlFlowServiceImpl extends CrudService<XmlFlowDao, XmlFlowDataBO> implements XmlFlowService{
	
	@Override
	protected XmlFlowDao getCrudDao() {
		return (XmlFlowDao)ParseSpring.context.getBean("xmlFlowDao");
	}

    @Override
    public List<XmlFlowDataBO> qryXmlFlow(XmlFlowDataBO dto) {
        if(!"".equals(dto.getCustName())){
            dto.setCustName(Cryptos.aesEncrypt(dto.getCustName()));
        }
        List<XmlFlowDataBO> lists = getCrudDao().qryXmlFlow(dto);
        if(lists.size() != 0){
            for(XmlFlowDataBO tbo : lists ){
                /**
                 * 注：将经过拦截器得到的总页数total值设置到查询结果集中。用于分页
                 */
                tbo.setTotal(dto.getTotal());
                tbo.setReqTime(tbo.getReqTime().substring(0, 10));
                tbo.setResTime(tbo.getResTime().substring(0, 10));
                tbo.setCustName(Cryptos.aesDecrypt(tbo.getCustName()));
            }
        }
        return lists;
    }
    
}
