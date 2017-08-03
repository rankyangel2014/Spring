package com.jsjn.skylark.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Calendar;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.GZIPOutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jsjn.skylark.bean.ParamDto;
import com.jsjn.skylark.common.Constant;

@Service
public class ResourceContentLoader {

	public static final String CONTENT_ENCODING = "Content-Encoding";
	private static final Logger LOGGER = Logger
			.getLogger(ResourceContentLoader.class);
	protected String[] pathPrefixes;
	protected boolean serveStatic;
	protected boolean serveStaticBrowserCache;
	protected final Calendar lastModifiedCal = Calendar.getInstance();

	protected final String encoding = System.getProperty("file.encoding");

	public String[] getPathPrefixes() {
		return pathPrefixes;
	}

	public void setPathPrefixes(String[] pathPrefixes) {
		this.pathPrefixes = pathPrefixes;
	}

	public boolean isServeStatic() {
		return serveStatic;
	}

	public void setServeStatic(boolean serveStatic) {
		this.serveStatic = serveStatic;
	}

	public boolean isServeStaticBrowserCache() {
		return serveStaticBrowserCache;
	}

	public void setServeStaticBrowserCache(boolean serveStaticBrowserCache) {
		this.serveStaticBrowserCache = serveStaticBrowserCache;
	}

	@Autowired
	private ParamService service;

	public ResourceContentLoader() {
	}

	public ResourceContentLoader(String[] pathPrefixes, boolean serveStatic,
			boolean serveStaticBrowserCache) {
		this.pathPrefixes = pathPrefixes;
		this.serveStatic = serveStatic;
		this.serveStaticBrowserCache = serveStaticBrowserCache;
	}

	public void mergeStaticResource(String path, HttpServletRequest request,
			HttpServletResponse response) throws IOException {

		process(path, request, response);
	}

	protected void process(String path, HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		Calendar cal = Calendar.getInstance();
		long ifModifiedSince = 0L;
		try {
			ifModifiedSince = request.getDateHeader("If-Modified-Since");
		} catch (Exception e) {
			LOGGER.warn("Invalid If-Modified-Since header value: '"
					+ request.getHeader("If-Modified-Since") + "', ignoring");
		}
		long lastModifiedMillis = this.lastModifiedCal.getTimeInMillis();
		long now = cal.getTimeInMillis();
		cal.add(Calendar.HOUR, 12);
		long expires = cal.getTimeInMillis();
		// 判读是否缓存及缓存时效性
		if ((ifModifiedSince > 0L) && (ifModifiedSince <= lastModifiedMillis)) {
			LOGGER.info("access clinet cache data ...");
			response.setDateHeader("Expires", expires);
			response.setStatus(304);
			return;
		}
		LOGGER.info("client cache invalid,access server now !");
		// 修改乱码
		if (path != null) {
			String contentType = getContentType(path);
			contentType += ";charset=" + encoding + ";pageEncoding=" + encoding;
			response.setContentType(contentType);
		}
		response.setCharacterEncoding(encoding);
		/**
		 * 是否设置了浏览器缓存
		 */
		if (this.serveStaticBrowserCache) {
			response.setDateHeader("Date", now);
			response.setDateHeader("Expires", expires);
			response.setDateHeader("Retry-After", expires);
			response.setHeader("Cache-Control", "public");
			response.setDateHeader("Last-Modified", lastModifiedMillis);
		} else {
			response.setHeader("Cache-Control", "no-cache");
			response.setHeader("Pragma", "no-cache");
			response.setHeader("Expires", "-1");
		}

		ParamDto outDto = service.loadParamData();
		write(outDto, response);

		return;
	}

	public void closeInputStreams(List<InputStream> ips) {
		for (InputStream is : ips)
			try {
				is.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
	}

	protected byte[] compressData(byte[] data) throws IOException {
		ByteArrayOutputStream compressed = new ByteArrayOutputStream();
		GZIPOutputStream gzout = new GZIPOutputStream(compressed);
		gzout.write(data);
		gzout.flush();
		gzout.close();
		return compressed.toByteArray();
	}

	protected String getContentType(String name) {
		if (name.endsWith(".js"))
			return "application/javascript";
		if (name.endsWith(".css"))
			return "text/css";
		if (name.endsWith(".html"))
			return "text/html";
		if (name.endsWith(".txt"))
			return "text/plain";
		if (name.endsWith(".gif"))
			return "image/gif";
		if ((name.endsWith(".jpg")) || (name.endsWith(".jpeg")))
			return "image/jpeg";
		if (name.endsWith(".png"))
			return "image/png";
		if (name.indexOf("param.do") > -1)
			return "application/json";
		return null;
	}

	protected void copy(InputStream input, HttpServletResponse response)
			throws IOException {
		OutputStream output = response.getOutputStream();
		ByteArrayOutputStream o = new ByteArrayOutputStream();
		byte[] buffer = new byte[4096];
		int n;
		while (-1 != (n = input.read(buffer))) {
			o.write(buffer, 0, n);
		}
		byte[] compressedData = compressData(o.toByteArray());
		response.setHeader("Content-Encoding", "gzip");
		response.setContentLength(compressedData.length);
		output.write(compressedData);
		output.flush();
	}

	protected void write(ParamDto outDto, HttpServletResponse response)
			throws IOException {
		List<ParamDto> list = new ArrayList<ParamDto>();
		if (outDto != null && outDto.getRecList() != null) {
			list = outDto.getRecList();
		}
		Map<String, List<Map<String, String>>> params = new HashMap<String, List<Map<String, String>>>();
		if (list != null && list.size() > 0) {
			for (ParamDto pubParamDTO : list) {
				String paraNo = pubParamDTO.getParaNo();
				List<Map<String, String>> datas = params.get(paraNo);
				if (datas == null) {
					datas = new ArrayList<Map<String, String>>();
				}
				Map<String, String> map = new HashMap<String, String>();
				map.put("paramKey", pubParamDTO.getParamKey());
				map.put("paramValue", pubParamDTO.getParamValue());
				map.put("shortDesc", pubParamDTO.getShortDesc());
				datas.add(map);
				params.put(paraNo, datas);
			}
		}
		boolean flag = false;
		if (StringUtils.isNotBlank(outDto.get_rspCode())) {
			if (Constant.RESPONSE_OK.equalsIgnoreCase(outDto.get_rspCode())) {
				flag = true;
			} else if (Constant.RESPONSE_NO_DATA_FOUND.equalsIgnoreCase(outDto
					.get_rspCode())) {
				flag = true;
			}
		}
		JSONObject json = new JSONObject();
		json.put("success", flag); // 处理结果标记
		json.put("rspMsg", outDto.get_rspMsg()); // 响应信息
		json.put("errMsg", outDto.get_rspMsg()); // 响应信息
		json.put("data", JSONObject.fromObject(params)); // 响应对象
		response.getWriter().print(json);
		response.getWriter().flush();
		response.getWriter().close();
	}

	protected void copy(List<InputStream> inputs, HttpServletResponse response)
			throws IOException {
		OutputStream output = response.getOutputStream();
		ByteArrayOutputStream o = new ByteArrayOutputStream();
		for (InputStream is : inputs) {
			byte[] buffer = new byte[4096];
			int n;
			while (-1 != (n = is.read(buffer))) {
				o.write(buffer, 0, n);
			}
		}
		byte[] compressedData = compressData(o.toByteArray());
		response.setHeader("Content-Encoding", "gzip");
		response.setContentLength(compressedData.length);
		output.write(compressedData);
		output.flush();
	}
}
