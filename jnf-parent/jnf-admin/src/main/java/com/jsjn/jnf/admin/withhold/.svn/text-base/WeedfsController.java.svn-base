package com.jsjn.jnf.admin.withhold;

import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.net.URLDecoder;
import java.util.Calendar;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import retrofit.RestAdapter;

import com.devinrsmith.weedfs.WeedFSMasterClient;
import com.devinrsmith.weedfs.data.Lookup;
import com.jsjn.jnf.admin.withhold.util.WeedfsUtil;

@Controller
@RequestMapping("fileServer.do")
public class WeedfsController {
	private final static Logger logger = Logger.getLogger(WeedfsController.class);
	private static final String COMMA = ",";
	private static final String URL_PREFIX = "http://";
	private static final String URL_SPLIT = "/";
	protected final Calendar lastModifiedCal = Calendar.getInstance();
	protected final String encoding = System.getProperty("file.encoding");
	
	/**
	 * 图片下载
	 */
	@RequestMapping(params = "method=getfile")
	public void view(HttpServletRequest req, HttpServletResponse resp) throws Exception {
		String filepath = req.getParameter("filepath");
		Calendar cal = Calendar.getInstance();
		long ifModifiedSince = 0L;
		try {
			ifModifiedSince = req.getDateHeader("If-Modified-Since");
		} catch (Exception e) {
			logger.warn("Invalid If-Modified-Since header value: '"
					+ req.getHeader("If-Modified-Since") + "', ignoring");
		}
		long lastModifiedMillis = this.lastModifiedCal.getTimeInMillis();
		long now = cal.getTimeInMillis();
		cal.add(Calendar.DATE, 7);
		long expires = cal.getTimeInMillis();
		// 判读是否缓存及缓存时效性
		if ((ifModifiedSince > 0L) && (ifModifiedSince <= lastModifiedMillis)) {
			logger.info("access clinet cache data ...");
			resp.setDateHeader("Expires", expires);
			resp.setStatus(304);
			return;
		}
		resp.setContentType("image/jepg;charset=UTF-8");
		resp.setCharacterEncoding(encoding);
		resp.setDateHeader("Date", now);
		resp.setDateHeader("Expires", expires);
		resp.setDateHeader("Retry-After", expires);
		resp.setHeader("Cache-Control", "public");
		resp.setDateHeader("Last-Modified", lastModifiedMillis);
		InputStream reader = null;
		OutputStream out = null;

		try {
			String params = WeedfsUtil.getParamsFromReq(req);
			// 附件的volumeId
			int volumeId = Integer.parseInt(filepath.substring(0,
					filepath.indexOf(COMMA)));
			final RestAdapter mainAdapter = new RestAdapter.Builder()
					.setEndpoint(WeedfsUtil.weedServer.get(0)).build();
			final WeedFSMasterClient master = mainAdapter
					.create(WeedFSMasterClient.class);
			Lookup lookup = master.directoryLookup(volumeId, null);
			String volumeURL = lookup.getLocations().get(0).getPublicUrl();
			String fileUrl = URL_PREFIX + volumeURL + URL_SPLIT + filepath
					+ params;
			URL url = new URL(URLDecoder.decode(fileUrl, "UTF-8"));
			url.openConnection();
			reader = url.openStream();
			WeedfsUtil.copy(reader, resp);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (reader != null) {
				reader.close();
			}
			if (out != null)
				out.close();
		}
		return;

	}
	

}
