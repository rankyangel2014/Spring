package com.jsjn.skylark.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jsjn.panda.client.Result;
import com.jsjn.skylark.format.AjaxResp;
import com.jsjn.skylark.rmi.SkylarkRMI;
import com.jsjn.skylark.common.utils.ParamCheckUtil;
import com.jsjn.skylark.common.utils.FormatUtil;

@Controller("com.jsjn.skylark.service.ContactController")
public class ContactController {
	
	/**
	 * 方法名和该方法所必须参数名的映射map。
	 */
	private static Map<String, String[]> mapping = new HashMap<String, String[]>();
	static {
		mapping.put("saveContact", new String[]{"companyId", "officeId", "name", "sort", "delFlag", "operType"});
		mapping.put("getContactList", new String[]{"officeId"});
		mapping.put("removeContact", new String[]{"contactId"});
		mapping.put("getContact1", new String[]{"contactId"});
		mapping.put("getContact2", new String[]{"contactId", "name", "telNo"});
	}
	
	@RequestMapping("/skylark/ContactService.do")
	public void exec(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		resp.setContentType("application/json; charset=UTF-8");  
		String method = req.getParameter("method");
		if(method == null || method.equals("")) {
			AjaxResp r = new AjaxResp();
			r.setSuccess(false);
			r.setErrMsg("请求参数不正确。");
			resp.getWriter().println(r.toString());
			resp.getWriter().flush();
			return;
		}
		Map map = FormatUtil.getParamMap(req);
		String result = ParamCheckUtil.ajaxCheck(req, mapping.get(method));
		if(result == null) {
			AjaxResp ar = null;
			try {
				Result r = null;
				//根据method参数，调用对应的方法。
				if(method.equals("saveContact")) {
					String operType = req.getParameter("operType");
					r = SkylarkRMI.contactFacade(method, map, operType);
				} else if(method.equals("getContactList")) {
					r = SkylarkRMI.contactFacade(method, map.get("officeId"), map.get("keywords"));
				} else if(method.equals("removeContact")) {
					r = SkylarkRMI.contactFacade(method, map.get("contactId"));
				} else if(method.equals("getContact1")) {
					r = SkylarkRMI.contactFacade(method, map.get("contactId"));
				} else if(method.equals("getContact2")) {
					r = SkylarkRMI.contactFacade(method, map.get("contactId"), map.get("name"), map.get("telNo"));
				}
				
				
				//最后返回的AjaxResp
				if(r != null) {
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
