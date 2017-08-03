package com.jsjn.jnf.withhold.withhold;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONObject;
import com.jsjn.jnf.bean.dto.withhold.SignTempInfoDto;
import com.jsjn.jnf.bean.dto.workflow.WorkflowDto;
import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.panda.client.PandaClient2;
import com.jsjn.jnf.withhold.controller.BaseController;
import com.jsjn.panda.client.Result;

@Controller
@RequestMapping(value = "/jnf/workflow.do")
public class WorkflowServiceController extends BaseController {

	private final static Logger logger = Logger.getLogger(SignTempInfoDto.class);

	/**
	 * 代扣签约新增审批
	 * 
	 * @param stid
	 * @param req
	 * @param resp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=goApprove")
	public void goApprove(SignTempInfoDto stid, HttpServletRequest req, HttpServletResponse resp) throws Exception {
		logger.info("[调用开始] " + "method:goApprove" + "==>Parameters:" + JSONObject.toJSONString(stid));
		Result result = null;
		stid.setInsttuId(getUserDto(req).getId().getInsttuId());
		stid.setInsttuName(getUserDto(req).getInsttuCnm());
		WorkflowDto inDto = new WorkflowDto();
		inDto.setUserId(getUserDto(req).getId().getUserId());
		inDto.setCustNo(getUserDto(req).getId().getUserId());
		inDto.setInsttuId(getUserDto(req).getId().getInsttuId());
		inDto.setInsttuTy(getUserDto(req).getId().getInsttuTy());
		JSONObject json = new JSONObject();
		try {
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "addApprove", stid, inDto);
			JSONObject jsonResult = JSONObject.parseObject(result.getResult());
			String resCode = jsonResult.getString("rspCode");
			String rspMsg = jsonResult.getString("rspMsg");
			if (StringUtils.equals(Global.RES_SUCCESS, resCode)) {
				json.put("success", true);
				json.put("errMsg", "代扣签约新增审批成功！");
			} else {
				json.put("success", false);
				json.put("errMsg", "代扣签约新增审批失败，" + rspMsg);
			}
			logger.info("[调用结束] " + "method:goApprove" + "==>result:" + jsonResult.toJSONString());
		} catch (Exception e) {
			logger.error("Panda远程调用goApprove接口失败！,", e);
			json.put("errMsg", "代扣签约新增审批异常，" + e.getMessage());
			json.put("success", false);
		}
		writeRespToPage(json, req, resp);

	}

	/**
	 * 代扣签约提交审批
	 * 
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=submitApprove")
	public void submitApprove(WorkflowDto inDto, HttpServletRequest req, HttpServletResponse resp) throws Exception {

		logger.info("[调用开始] " + "method:submitApprove" + "==>Parameters:" + JSONObject.toJSONString(inDto));

		Result result = null;
		JSONObject json = new JSONObject();
		try {
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "submitApprove", inDto);
			JSONObject jsonResult = JSONObject.parseObject(result.getResult());
			String resCode = jsonResult.getString("rspCode");
			String rspMsg = jsonResult.getString("rspMsg");
			if (StringUtils.equals(Global.RES_SUCCESS, resCode)) {
				json.put("success", true);
				json.put("errMsg", "代扣签约审批提交成功！");
			} else {
				json.put("success", false);
				json.put("errMsg", "代扣签约审批提交失败，" + rspMsg);
			}
			logger.info("[调用结束] " + "method:submitApprove" + "==>result:" + jsonResult);
		} catch (Exception e) {
			logger.error("Panda远程调用submitApprove接口失败！,", e);
			json.put("errMsg", "代扣签约提交审批异常，" + e.getMessage());
			json.put("success", false);
		}
		writeRespToPage(json, req, resp);
	}
}
