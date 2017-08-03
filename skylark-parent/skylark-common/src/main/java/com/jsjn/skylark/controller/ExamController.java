package com.jsjn.skylark.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONArray;
import com.jsjn.pubsys.workflow.po.LoiWfexamideareg;
import com.jsjn.skylark.format.AjaxResp;
import com.jsjn.skylark.rmi.SkylarkWSUtil;
import com.jsjn.skylark.common.utils.ParamCheckUtil;
import com.jsjn.skylark.common.utils.FormatUtil;

@Controller("com.jsjn.skylark.service.ExamController")
@RequestMapping("/skylark/ExamService.do")
public class ExamController {

	/**分组查询。按类型分组，返回类型名称，个人、岗位、历史数量。
	 */
	@RequestMapping(params = "method=queryGroup")
	public void queryGroup(HttpServletRequest request, HttpServletResponse resp) throws IOException {
		resp.setContentType("application/json; charset=UTF-8");  
		JSONObject req = new JSONObject();
		req.put("orgNo", request.getParameter("orgNo"));
		req.put("userId", request.getParameter("userId"));
		req.put("stationId", request.getParameter("stationId"));
		req.put("orgType", request.getParameter("orgType"));
		/*app端 待阅待办改造 2016-05-27 start*/
		req.put("zwrq", request.getParameter("zwrq"));
		/*app端 待阅待办改造 2016-05-27 end*/
		String result = SkylarkWSUtil.sqlCommand(SkylarkWSUtil.SqlQueryExamGroup, req.toString());
		resp.getWriter().println(result);
		resp.getWriter().flush();
	}
	
	/**针对某一具体类型的审批和分类，分页查询审批的标题、时间、内容。
	 */
	@RequestMapping(params = "method=queryList")
	public void queryList(HttpServletRequest request, HttpServletResponse resp) throws IOException {
		resp.setContentType("application/json; charset=UTF-8");  
		JSONObject req = new JSONObject();
		req.put("start", request.getParameter("start"));
		req.put("pageLimit", request.getParameter("pageLimit"));
		req.put("userId", request.getParameter("userId"));
		req.put("stationId", request.getParameter("stationId"));
		req.put("pendType", request.getParameter("pendType"));
		req.put("operType", request.getParameter("operType"));
		String result = SkylarkWSUtil.sqlCommand(SkylarkWSUtil.SqlQueryExamList, req.toString());
		resp.getWriter().println(result);
		resp.getWriter().flush();
	}
	
	/**代办认领接口
	 */
	@RequestMapping(params = "method=ideal")
	public void ideal(HttpServletRequest request, HttpServletResponse resp) throws IOException { 
		resp.setContentType("application/json; charset=UTF-8");  
		String userId = request.getParameter("userId");
		String taskinstanceid = request.getParameter("taskinstanceid");
		if(userId == null || taskinstanceid == null) {
			JSONObject r = new JSONObject();
			r.put("success", "false");
			r.put("errMsg", "缺少必要的参数");
			resp.getWriter().println(r.toString());
			resp.getWriter().flush();
			return;
		}
		String result = SkylarkWSUtil.ideal(userId, taskinstanceid);
		resp.getWriter().println(result);
		resp.getWriter().flush();
	}
	
	@RequestMapping(params = "method=getApprHistory")
	public void getApprHistory(HttpServletRequest req,	HttpServletResponse resp) throws IOException {
		resp.setContentType("application/json; charset=UTF-8");  
		Map map = FormatUtil.getParamMap(req);
		String method = map.get("method").toString();
		String result = ParamCheckUtil.ajaxCheck(req, "orgNo", "userId", "param", "flowType");
		if(result == null) {
			AjaxResp ar = new AjaxResp();
			List<LoiWfexamideareg> list = SkylarkWSUtil.getApprHistory(map);
			JSONArray array = new JSONArray();
			for(LoiWfexamideareg l : list) {
				array.add(l);
			}
			ar.setSuccess(true);
			ar.setRspMsg("查询审批历史成功");
			ar.setTotal(String.valueOf(list.size()));
			ar.setRoot(array);
			resp.getWriter().println(ar.toString());
			resp.getWriter().flush();
		} else {
			resp.getWriter().println(result);
			resp.getWriter().flush();
		}
	}
}
