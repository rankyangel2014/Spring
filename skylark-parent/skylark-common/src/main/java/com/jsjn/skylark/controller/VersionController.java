package com.jsjn.skylark.controller;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
//import java.net.HttpURLConnection;
//import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipOutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONObject;
import com.jsjn.skylark.combination.Combination;
import com.jsjn.skylark.combination.dep.AppComp;
import com.jsjn.skylark.listener.StartupListener;
import com.jsjn.skylark.properties.SkylarkProperties;
import com.jsjn.skylark.common.utils.ZipUtil;

@Controller("com.jsjn.skylark.service.VersionController")
@RequestMapping("/skylark/VersionService.do")
public class VersionController {

	Logger logger = Logger.getLogger("skylark");

	private static Map<String, String> versionMap = new HashMap<String, String>();

	@RequestMapping(params = "method=getVersionInfo")
	public void getVersionInfo(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		resp.setContentType("application/json; charset=UTF-8");
		logger.info("VersionService.getVersionInfo()");
		String sysId = req.getParameter("sysId");
		if (StartupListener.combs.get(sysId) == null) {
			resp.getWriter().println("未发现 " + sysId + " 模块内容。");
			resp.getWriter().flush();
			return;
		}

		if (versionMap.get(sysId) == null) {

			JSONObject j = new JSONObject();

			JSONObject apk = new JSONObject();
			apk.put("version",
					SkylarkProperties.get("android_" + sysId + "_apk_version"));
			apk.put("url",
					SkylarkProperties.get("android_" + sysId + "_apk_url"));

			
			HttpSession session = req.getSession();
			String baseDir = session.getServletContext().getRealPath("/");
			String apkPath = apk.getString("url").substring(
					apk.getString("url").indexOf("_update") + 7);
			File file = new File(baseDir + "_update" + apkPath);

			apk.put("size", file.length());

			JSONObject html = new JSONObject();

			
			List<AppComp> appComps = StartupListener.combs.get(sysId)
					.getAppComp();
			if (appComps != null && appComps.size() > 0) {
				for (AppComp comp : appComps) {
					if (comp == null) {
						continue;
					}
					if (!html.containsKey(comp.getDisplayName())) {
						JSONObject compJson = JSONObject.parseObject(
								comp.toString()).getJSONObject(
								comp.getDisplayName());

						String s = comp.getUrl().substring(
								comp.getUrl().indexOf("_update") + 7);
						file = new File(baseDir + "_update" + s);

						compJson.put("size", file.length());
						html.put(comp.getDisplayName(), compJson);
					} else {
						// 有重复组件，报错并停止
						String msg = "有重复的 app 组件: " + comp.getDisplayName();
						logger.error(msg);
						throw new RuntimeException(msg);
					}
				}
			}
			// }

			j.put("apk", apk);
			j.put("html", html);

			versionMap.put(sysId, j.toJSONString());
		}
		resp.getWriter().println(versionMap.get(sysId));
		resp.getWriter().flush();
	}

	@RequestMapping(params = "method=update")
	public void update(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		String sysId = req.getParameter("sysId");

		Combination comb = StartupListener.combs.get(sysId);

		if (comb == null) {
			resp.getWriter().println("未发现 " + sysId + " 模块相关内容。");
			resp.getWriter().flush();
			return;
		}

		HttpSession session = req.getSession();
		String baseDir = session.getServletContext().getRealPath("/");

		OutputStream out = resp.getOutputStream();
		byte[] bytes;

		// 产线环境，直接根据配置下载zip包。
		resp.setContentType("application/zip;charset=UTF-8");
		ByteArrayOutputStream bos = new ByteArrayOutputStream(1024);
		ZipOutputStream zos = new ZipOutputStream(bos);

		List<File> srcFiles = new ArrayList<File>();

		File temp = new File(baseDir + "www" + File.separator + sysId);
		if (temp.exists() && temp.listFiles() != null) {
			for (File f : temp.listFiles()) {
				srcFiles.add(f);
			}
		} else {
			logger.error(sysId + " 路径下没有可下载内容。");
			return;
		}


		ZipUtil.ZipFiles(zos, "", srcFiles.toArray(new File[srcFiles.size()]));
		zos.flush();
		zos.close();
		bytes = bos.toByteArray();
		resp.addHeader("Content-Disposition", "attachment;filename=update.zip");
		resp.addHeader("Content-Length", "" + bytes.length);
		out.write(bytes);

		out.flush();
		out.close();
	}

}
