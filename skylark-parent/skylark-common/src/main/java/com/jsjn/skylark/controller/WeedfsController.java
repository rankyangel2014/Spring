package com.jsjn.skylark.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.net.URLDecoder;
import java.nio.ByteBuffer;
import java.nio.channels.Channels;
import java.nio.channels.ReadableByteChannel;
import java.nio.channels.WritableByteChannel;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.GZIPOutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import retrofit.RestAdapter;

import com.devinrsmith.weedfs.WeedFSMasterClient;
import com.devinrsmith.weedfs.data.Lookup;
import com.jsjn.platform.util.ConfigBean;

@Controller
public class WeedfsController extends AbstractBaseController {

	private final static Logger LOGGER = Logger
			.getLogger(WeedfsController.class);

	private static final String URL_PREFIX = "http://";
	private static final String URL_SPLIT = "/";
	private static final String COMMA = ",";
	private static List<String> weedServer = new ArrayList<String>();

	protected final Calendar lastModifiedCal = Calendar.getInstance();
	protected final String encoding = System.getProperty("file.encoding");

	static {
		if (StringUtils.isNotBlank(ConfigBean.WEED_SERVER)) {
			String[] weeds = ConfigBean.WEED_SERVER.split(",");
			for (String string : weeds) {
				weedServer.add(URL_PREFIX + string);
			}
		}
	}

	@RequestMapping(value = "/weedfs/{filepath}")
	public void view(HttpServletRequest req, HttpServletResponse resp,
			@PathVariable String filepath) throws Exception {
		Calendar cal = Calendar.getInstance();
		long ifModifiedSince = 0L;
		try {
			ifModifiedSince = req.getDateHeader("If-Modified-Since");
		} catch (Exception e) {
			LOGGER.warn("Invalid If-Modified-Since header value: '"
					+ req.getHeader("If-Modified-Since") + "', ignoring");
		}
		long lastModifiedMillis = this.lastModifiedCal.getTimeInMillis();
		long now = cal.getTimeInMillis();
		cal.add(Calendar.DATE, 7);
		long expires = cal.getTimeInMillis();
		// 判读是否缓存及缓存时效性
		if ((ifModifiedSince > 0L) && (ifModifiedSince <= lastModifiedMillis)) {
			LOGGER.info("access clinet cache data ...");
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
			String params = getParamsFromReq(req);
			// 附件的volumeId
			int volumeId = Integer.parseInt(filepath.substring(0,
					filepath.indexOf(COMMA)));
			final RestAdapter mainAdapter = new RestAdapter.Builder()
					.setEndpoint(weedServer.get(0)).build();
			final WeedFSMasterClient master = mainAdapter
					.create(WeedFSMasterClient.class);
			Lookup lookup = master.directoryLookup(volumeId, null);
			String volumeURL = lookup.getLocations().get(0).getPublicUrl();
			String fileUrl = URL_PREFIX + volumeURL + URL_SPLIT + filepath
					+ params;
			URL url = new URL(URLDecoder.decode(fileUrl, "UTF-8"));
			url.openConnection();
			reader = url.openStream();
			copy(reader, resp);
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

	@SuppressWarnings("unchecked")
	protected String getParamsFromReq(HttpServletRequest req) {
		String params = "";
		Map<String, String[]> paramMap = (HashMap<String, String[]>) (req
				.getParameterMap());
		int mark = 0;
		for (Map.Entry<String, String[]> entry : paramMap.entrySet()) {
			if (mark > 0) {
				params += "&";
			} else if (mark == 0) {
				params += "?";
			}
			params += entry.getKey() + "=";
			Object valueObj = entry.getValue();
			if (null == valueObj) {
				params = params + "";
			} else if (valueObj instanceof String[]) {
				String[] values = (String[]) valueObj;
				for (int i = 0; i < values.length; i++) {
					if (i > 0) {
						params += ",";
					}
					params += values[i];
				}
			} else {
				params += valueObj.toString();
			}
			mark++;
		}
		return params;
	}

	protected byte[] compressData(byte[] data) throws IOException {
		ByteArrayOutputStream compressed = new ByteArrayOutputStream();
		GZIPOutputStream gzout = new GZIPOutputStream(compressed);
		gzout.write(data);
		gzout.flush();
		gzout.close();
		return compressed.toByteArray();
	}

	public static void copy(InputStream is, OutputStream os) throws IOException {
		ReadableByteChannel inChannel = Channels.newChannel(is);
		WritableByteChannel outChannel = Channels.newChannel(os);

		ByteBuffer buffer = ByteBuffer.allocate(8192);
		int read;

		while ((read = inChannel.read(buffer)) > 0) {
			buffer.rewind();
			buffer.limit(read);
			while (read > 0) {
				read -= outChannel.write(buffer);
			}

			buffer.clear();
		}
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
}
