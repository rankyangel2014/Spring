/**
 * 
 */
package com.jsjn.jnf.service.assist.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.jsjn.jnf.bean.dto.assist.ReqXmlDto;
import com.jsjn.jnf.common.security.Digests;
import com.jsjn.jnf.dao.assist.ReqXmlDao;
import com.jsjn.jnf.service.assist.ReqXmlService;
import com.jsjn.jnf.service.base.CrudService;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 判断是否存在相同请求报文
 * @author ZSMJ
 *
 */
@Service
public class ReqXmlServiceImpl extends CrudService<ReqXmlDao, ReqXmlDto> implements ReqXmlService{
	
	@Override
	protected ReqXmlDao getCrudDao() {
		return (ReqXmlDao)ParseSpring.context.getBean("reqXmlDao");
	}

	/**
	 * 插入报文防重复表。
	 * 新事务，防止被回滚
	 */
	@Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW)
	@Override
	public boolean insertReqXML(String reqXml){
		ReqXmlDto dto = new ReqXmlDto();
		dto.setReqXml(Digests.md5(reqXml));
		boolean flag = true;
		try{
			getCrudDao().insert(dto);
		}catch(Exception e){
			flag = false;
		}
		return flag;
	}

}
