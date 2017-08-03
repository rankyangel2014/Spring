package com.jsjn.skylark.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jsjn.panda.client.Result;
import com.jsjn.skylark.format.AjaxResp;
import com.jsjn.skylark.rmi.SkylarkRMI;
import com.jsjn.skylark.common.utils.ParamCheckUtil;
import com.jsjn.skylark.common.utils.FormatUtil;

@Controller("com.jsjn.skylark.service.OfficeController")
public class OfficeController {

	private Logger logger = Logger.getLogger("skylark");

	/**
	 * 方法名和该方法所必须参数名的映射map。
	 */
	private static Map<String, String[]> mapping = new HashMap<String, String[]>();
	static {
		mapping.put("saveOffice", new String[] { "parentId", "name", "sort",
				"type", "useable", "orgno" });
		mapping.put("updateOffice", new String[] { "id", "parentId", "name",
				"sort", "type", "useable", "orgno" });
		mapping.put("findOfficeListByOrgno", new String[] { "orgno" });
		mapping.put("findOfficeById", new String[] { "officeId" });
		mapping.put("removeOffice", new String[] { "officeId" });
		mapping.put("getAllContact", new String[] { "orgno", "insttuName" });
	}

	@RequestMapping("/skylark/OfficeService.do")
	public void exec(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		resp.setContentType("application/json; charset=UTF-8");
		String method = req.getParameter("method");
		if (method == null || method.equals("")) {
			AjaxResp r = new AjaxResp();
			r.setSuccess(false);
			r.setErrMsg("请求参数不正确。");
			resp.getWriter().println(r.toString());
			resp.getWriter().flush();
			return;
		}
		Map map = FormatUtil.getParamMap(req);
		String result = ParamCheckUtil.ajaxCheck(req, mapping.get(method));
		if (result == null) {
			AjaxResp ar = null;
			try {
				Result r = null;
				// 根据method参数，调用对应的方法。
				if (method.equals("saveOffice")) {
					r = SkylarkRMI.officeFacade(method, map);
				} else if (method.equals("updateOffice")) {
					r = SkylarkRMI.officeFacade(method, map);
				} else if (method.equals("findOfficeListByOrgno")) {
					String orgno = req.getParameter("orgno");
					r = SkylarkRMI.officeFacade(method, orgno);
				} else if (method.equals("findOfficeById")) {
					Long officeId = Long.valueOf(req.getParameter("officeId"));
					r = SkylarkRMI.officeFacade(method, officeId);
				} else if (method.equals("removeOffice")) {
					Long officeId = Long.valueOf(req.getParameter("officeId"));
					r = SkylarkRMI.officeFacade(method, officeId);
				} else if (method.equals("getAllContact")) {
					String orgno = req.getParameter("orgno");
					String keywords = req.getParameter("keywords");
					String insttuName = req.getParameter("insttuName");
					r = SkylarkRMI.officeFacade(method, orgno, keywords,
							insttuName);
				}

				// 最后返回的AjaxResp
				if (r != null) {
					ar = FormatUtil.result2Ajax(r);
				} else {
					ar = new AjaxResp();
					ar.setSuccess(false);
					ar.setErrMsg("请求参数不正确。");
				}
			} catch (Exception e) {
				e.printStackTrace();
				ar = new AjaxResp(e);
			}
			resp.getWriter().println(ar.toString());
			resp.getWriter().flush();
		} else {
			resp.getWriter().println(result);
			resp.getWriter().flush();
		}
	}
}
