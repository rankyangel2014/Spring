package com.jsjn.jnf.withhold.util;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.GZIPOutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import retrofit.RestAdapter;

import com.devinrsmith.weedfs.WeedFSMasterClient;
import com.devinrsmith.weedfs.WeedFSVolumeClient;
import com.devinrsmith.weedfs.data.Assignment;
import com.devinrsmith.weedfs.data.Location;
import com.devinrsmith.weedfs.data.Lookup;
import com.devinrsmith.weedfs.data.TypedStream;
import com.jsjn.platform.util.ConfigBean;

public class WeedfsUtil {
	
	public static List<String> weedServer = new ArrayList();
	
	static {
		if ((ConfigBean.WEED_SERVER != null)
				&& (!ConfigBean.WEED_SERVER.isEmpty())) {
			String[] weedGroup = ConfigBean.WEED_SERVER.split(",");
			for (int i = 0; i < weedGroup.length; i++)
				weedServer.add("http://" + weedGroup[i]);
		}
	}
	
	public static String weedProcess(InputStream stream, String contentType,
			String fileName, long length) {
		for (String weedIP : weedServer) {
			try {
				RestAdapter mainAdapter = new RestAdapter.Builder()
						.setEndpoint(weedIP).build();

				WeedFSMasterClient master = (WeedFSMasterClient) mainAdapter
						.create(WeedFSMasterClient.class);

				Map endpointToClient = new HashMap();

				Assignment assignment = master.directoryAssignment(null, null,
						null, null, null);

				if ((assignment != null) && (assignment.getFid() != null)
						&& (assignment.getFid() == "")) {
					continue;
				}
				Integer volume = assignment.getVolume();
				Lookup lookup = master.directoryLookup(volume, null);
				String endpoint = ((Location) lookup.getLocations().get(0))
						.getPublicUrl();
				WeedFSVolumeClient vc = (WeedFSVolumeClient) endpointToClient
						.get(endpoint);
				if (vc == null) {
					vc = (WeedFSVolumeClient) new RestAdapter.Builder()
							.setEndpoint("http://" + endpoint).build()
							.create(WeedFSVolumeClient.class);

					endpointToClient.put(endpoint, vc);
				}

				vc.upload(assignment.getFid(), new TypedStream(contentType,
						stream, fileName, length));
				return "weedfs/" + assignment.getFid();
			} catch (Exception e) {
				System.out.println("发生异常，连接weedmaster"+weedIP+"上传文件的时候："+e.getMessage());
			}
		}

		return null;
	}
	
	/**
	 * 获取参数
	 * @param req
	 * @return
	 */
	public static String getParamsFromReq(HttpServletRequest req) {
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
	
	public static void copy(InputStream input, HttpServletResponse response)
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
//		response.setHeader("Content-Type","image/jped");
		response.setContentLength(compressedData.length);
		output.write(compressedData);
		output.flush();
	}
	
	protected static byte[] compressData(byte[] data) throws IOException {
		ByteArrayOutputStream compressed = new ByteArrayOutputStream();
		GZIPOutputStream gzout = new GZIPOutputStream(compressed);
		gzout.write(data);
		gzout.flush();
		gzout.close();
		return compressed.toByteArray();
	}
	
}
