package com.jsjn.jnf.withhold.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jsjn.jnf.bean.dto.withhold.PubInsttuDto;
import com.jsjn.jnf.common.config.Global;
import com.jsjn.panda.client.PandaClient;
import com.jsjn.panda.client.Result;
import com.jsjn.panda.msg.MsgContext;

@Controller
@RequestMapping("/TreeController.do")
public class TreeController {

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
	@RequestMapping(params = "method=getOrgList")
	public String getOrgList(HttpServletRequest req, HttpServletResponse resp,
			PubInsttuDto dto) throws Exception {
		dto.setInsttuLev("10");
		dto.setInsttuTy("02,93");
		dto.setInsttuAttr("0");
		Result rsp = PandaClient.invoke2(new MsgContext(),
				Global.SERVICE_PANDA_ID, "getOrgList", dto);
		JSONArray ja = JSONArray.parseArray(rsp.getResult());
		req.setCharacterEncoding("UTF-8");
		resp.setCharacterEncoding("UTF-8");
		JSONObject json = new JSONObject();
		json.put("success", true);
		json.put("errMsg", "交易执行成功！");
		json.put("total", ja.size());
		json.put("root", ja);
		resp.getWriter().write(json.toString());
		resp.getWriter().flush();
		resp.getWriter().close();
		return null;
	}

}
