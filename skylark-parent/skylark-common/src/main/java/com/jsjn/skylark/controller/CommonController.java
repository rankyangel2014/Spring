package com.jsjn.skylark.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jsjn.skylark.common.ip.IPLocation;
import com.jsjn.skylark.common.ip.IPSeeker;
import com.jsjn.skylark.common.utils.IPUtil;
import com.jsjn.skylark.service.ResourceContentLoader;

@Controller
public class CommonController extends AbstractBaseController {
	
	
	@Autowired
	ResourceContentLoader loder;

	private static final IPSeeker ip = new IPSeeker("/ip/qqwry.dat");

	@RequestMapping(value = "/{modId}/js/param.do")
	public void loadParams(HttpServletRequest req, HttpServletResponse resp,
			@PathVariable String modId) throws IOException {
		String requestpath = req.getServletPath();
		loder.setServeStaticBrowserCache(true);
		loder.mergeStaticResource(requestpath, req, resp);
	}

	@RequestMapping("/{modId}/router/queryIP.do")
	public void queryIP(HttpServletRequest req, HttpServletResponse resp,
			@PathVariable String modId) throws Exception {
		// 指定纯真数据库的文件名，所在文件夹
		String ipStr = IPUtil.getIpAddr(req);
		IPLocation ipLocation = ip.getIPLocation(ipStr);
		JSONObject json = new JSONObject();
		json.put("Isp", ipLocation.getCountry() + " " + ipLocation.getArea());
		json.put("Ip", ipStr);
		JSONObject rsp = new JSONObject();
		rsp.put("success", true); // 处理结果标记
		rsp.put("data", json); // 响应对象
		writeRespToPage(rsp, req, resp);
	}

	
}
