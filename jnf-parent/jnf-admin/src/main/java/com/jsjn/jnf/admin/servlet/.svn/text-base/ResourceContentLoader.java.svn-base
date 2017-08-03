package com.jsjn.jnf.admin.servlet;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Calendar;
import java.util.List;
import java.util.zip.GZIPOutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.panda.client.PandaClient2;
import com.jsjn.panda.client.Result;

@Service
public class ResourceContentLoader {
	public static final String CONTENT_ENCODING = "Content-Encoding";
	private static final Logger LOGERUTIL = LoggerFactory.getLogger(
			ResourceContentLoader.class);
	protected String[] pathPrefixes;
	protected boolean serveStatic;
	protected boolean serveStaticBrowserCache;
	protected final Calendar lastModifiedCal = Calendar.getInstance();

	protected final String encoding = System.getProperty("file.encoding");

	public ResourceContentLoader() {
	}

	public ResourceContentLoader(String[] pathPrefixes, boolean serveStatic,
			boolean serveStaticBrowserCache) {
		this.pathPrefixes = pathPrefixes;
		this.serveStatic = serveStatic;
		this.serveStaticBrowserCache = serveStaticBrowserCache;
	}

	public void mergeStaticResource(String path,
			HttpServletRequest request, HttpServletResponse response)
			throws IOException {

		process( path, request, response);
	}

    protected void process(String path, HttpServletRequest request, HttpServletResponse response) throws IOException {
        Calendar cal = Calendar.getInstance();
        long ifModifiedSince = 0L;
        try {
            ifModifiedSince = request.getDateHeader("If-Modified-Since");
        } catch (Exception e) {
            LOGERUTIL.warn("Invalid If-Modified-Since header value: '" + request.getHeader("If-Modified-Since") + "', ignoring");
        }
        long lastModifiedMillis = this.lastModifiedCal.getTimeInMillis();
        long now = cal.getTimeInMillis();
        cal.add(Calendar.DATE, 1);
        long expires = cal.getTimeInMillis();
        // 判读是否缓存及缓存时效性
        if ((ifModifiedSince > 0L) && (ifModifiedSince <= lastModifiedMillis)) {
            response.setDateHeader("Expires", expires);
            response.setStatus(304);
            return;
        }
        LOGERUTIL.info("client cache invalid,access server now !");
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
        InputStream is = null;
        /**
         * 获取前端JS的类型 包括 汇总科目、末级科目、下拉菜单项等
         */
        String type = request.getParameter("type");
        if (type != null && AccountType.GGXH.name.equals(type)) {
            is = getDropDownListExt(request);
        }
        if (is != null) {
            try {
                copy(is, response);
            } finally {
                is.close();
            }
        } else {
            response.sendError(404);
        }
        return;
    }

	public void closeInputStreams(List<InputStream> ips) {
		for (InputStream is : ips)
			try {
				is.close();
			} catch (IOException e) {
				LOGERUTIL.error(e.getMessage(), e);
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
		if (name.endsWith(".png")) {
			return "image/png";
		}
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

	/**
	 * 获取系统公共下拉菜单选项
	 * 
	 * @param userInfo
	 * @param request
	 * @return
	 */
    protected InputStream getDropDownListExt(HttpServletRequest request) {
		
		Result result = null;

		try {
		    result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "findAllMenuCode");
		    String jsonStr = result.getResult();
	        JSONArray jsonArray = JSONArray.parseArray(jsonStr);
	        String str = new StringBuffer("var ").append(AccountType.GGXH.store)
	                .append(" = ").append(jsonArray.toString()).toString();
	        InputStream is = new ByteArrayInputStream(str.getBytes());
	        return is;
        }catch (Exception e) {
            LOGERUTIL.error("Panda远程调用findBussiness接口失败！,",e);
        }
		return null;
	}

}