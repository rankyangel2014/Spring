package com.jsjn.jnf.panda.open2;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.jsjn.jnf.bean.bo.orgBusiness.OrgBusinessReqBO;
import com.jsjn.jnf.bean.bo.orgBusiness.OrgBusinessResBO;
import com.jsjn.jnf.bussiness.query.QueryOrgBusinessService;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.panda.annotation.PandaMethod;
import com.jsjn.panda.annotation.PandaService;
import com.jsjn.panda.annotation.ServiceType;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 机构支持业务查询
 * 
 * @author xiekx
 * 
 */
@PandaService(serviceName = "pandaOrgBusinessTypeQryService", serviceType = ServiceType.CommonBean)
@Service
public class PandaOrgBusinessTypeQryService {

	private static final Logger logger = Logger.getLogger(PandaOrgBusinessTypeQryService.class);
	private QueryOrgBusinessService queryOrgBusinessSerivce = (QueryOrgBusinessService) ParseSpring.context.getBean("queryOrgBusinessServiceImpl");

	/**
	 * 机构支持业务查询
	 * 
	 * @param dto
	 * @return
	 */
	@PandaMethod(mName = "orgBusinessTypeQry", dscrpt = "机构支持业务查询", RegID = "orgBusinessTypeQry")
	public OrgBusinessResBO orgBusinessTypeQry(OrgBusinessReqBO dto) {
		logger.info("调用panda服务【机构支持业务查询】，请求：" + JSONObject.toJSONString(dto));
		OrgBusinessResBO resDto = new OrgBusinessResBO();
		try {
			resDto = queryOrgBusinessSerivce.orgBusinessQuery(dto);
		} catch (BussinessException e) {
			resDto.setResCode(e.getErrorCode());
			resDto.setResMsg(e.getMessage());
		}
		logger.info("调用panda服务【机构支持业务查询】，响应：" + JSONObject.toJSONString(resDto));
		return resDto;
	}

}
