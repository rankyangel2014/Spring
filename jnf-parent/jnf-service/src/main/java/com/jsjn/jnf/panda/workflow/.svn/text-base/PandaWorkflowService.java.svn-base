package com.jsjn.jnf.panda.workflow;

import org.codehaus.xfire.client.XFireProxyFactory;
import org.codehaus.xfire.service.Service;
import org.codehaus.xfire.service.binding.ObjectServiceFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.jsjn.jnf.bean.dto.withhold.PubInsttuDto;
import com.jsjn.jnf.bean.dto.withhold.SignTempInfoDto;
import com.jsjn.jnf.bean.dto.workflow.WorkflowDto;
import com.jsjn.jnf.dao.assist.DictDao;
import com.jsjn.jnf.service.workflow.WorkFlowService;
import com.jsjn.panda.annotation.PandaMethod;
import com.jsjn.panda.annotation.PandaService;
import com.jsjn.panda.annotation.ServiceType;
import com.jsjn.panda.setup.ParseSpring;
import com.jsjn.pubsys.webservice.IService;

@PandaService(serviceName = "pandaWorkflowService", serviceType = ServiceType.CommonBean)
public class PandaWorkflowService {
	/**
	 * 日志库对象
	 */
	private final static Logger logger = LoggerFactory.getLogger(PandaWorkflowService.class);

	/**
	 * 数据库对象
	 */
	private static DictDao dictDao = (DictDao) ParseSpring.context.getBean("dictDao");
	private static WorkFlowService workFlowService = (WorkFlowService) ParseSpring.context.getBean("workFlowService");

	private Service serviceModel = new ObjectServiceFactory().create(IService.class);

	/**
	 * 新增待办
	 * 
	 * @param workflowDto
	 * @return
	 * @throws Exception
	 */
	@PandaMethod(mName = "addApprove", dscrpt = "新增待办", RegID = "addApprove")
	public String addApprove(SignTempInfoDto stid, WorkflowDto workflowDto) throws Exception {
		return workFlowService.addApprove(stid, workflowDto);
	}

	/**
	 * 提交审批
	 * 
	 * @param workflowDto
	 * @return
	 * @throws Exception
	 */
	@PandaMethod(mName = "submitApprove", dscrpt = "提交审批", RegID = "submitApprove")
	public String submitApprove(WorkflowDto workflowDto) throws Exception {
		return workFlowService.submitApprove(workflowDto);
	}

	/**
	 * 获取机构树
	 * 
	 * @param dto
	 *            接收参数
	 * @param req
	 *            请求对象
	 * @param resp
	 *            响应对象
	 * @return 返回结果
	 * @throws Exception
	 */
	@PandaMethod(RegID = "getOrgList")
	public String getOrgList(PubInsttuDto dto) throws Exception {
		String COMMON_WS_URL = dictDao.findByType("COMMON_WS_URL");//公共管理平台WebService地址
		logger.info("公共管理平台webserivice地址：" + COMMON_WS_URL);
		String params = JSONObject.toJSONString(dto, SerializerFeature.WriteNullStringAsEmpty);
		logger.info("==========传入参数：" + params + "==========");
		IService service = (IService) new XFireProxyFactory().create(serviceModel, COMMON_WS_URL);
		String rel = service.getInsttusByParameter(params);
		JSONObject obj = JSONObject.parseObject(rel);
		JSONArray orgList = obj.getJSONArray("insttuResult");
		String result = JSONArray.toJSONString(orgList);
		logger.info("==========返回结果：" + result + "==========");
		return result;
	}
}
