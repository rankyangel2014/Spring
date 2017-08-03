package com.jsjn.skylark.common.utils;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.httpclient.HttpStatus;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.cookie.Cookie;
import org.apache.http.impl.client.AbstractHttpClient;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicHeader;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;

import com.jsjn.skylark.ex.HttpRomteAccessException;

public class HttpClientUtil {

	private static final Logger LOGGER = Logger.getLogger(HttpClientUtil.class);

	public static HttpResult doPost(String url, Map<String, String[]> map,
			String charset, String cookie) throws HttpRomteAccessException,
			UnsupportedEncodingException {
		HttpResult httpResult = new HttpResult();
		HttpClient httpClient = null;
		HttpPost httpPost = null;
		String result = null;
		httpClient = new DefaultHttpClient();
		httpPost = new HttpPost(url);
		// 设置cookie
		httpPost.addHeader(new BasicHeader("Cookie", cookie));
		// 设置参数
		List<NameValuePair> list = new ArrayList<NameValuePair>();
		Iterator<Entry<String, String[]>> iterator = map.entrySet().iterator();
		while (iterator.hasNext()) {
			Entry<String, String[]> elem = (Entry<String, String[]>) iterator
					.next();
			for (int i = 0; i < elem.getValue().length; i++) {
				list.add(new BasicNameValuePair(elem.getKey(),
						elem.getValue()[i]));
//				LOGGER.debug("param key:  " + elem.getKey()
//						+ "  param value:  " + elem.getValue()[i]);
			}
		}
		try {
			if (list.size() > 0) {
				UrlEncodedFormEntity entity = new UrlEncodedFormEntity(list,
						charset);
				httpPost.setEntity(entity);
			}
			HttpResponse response = httpClient.execute(httpPost);

			List<Cookie> cookies = ((AbstractHttpClient) httpClient)
					.getCookieStore().getCookies();
			httpResult.setCookies(cookies);
			if (response != null
					&& response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
				HttpEntity resEntity = response.getEntity();
				if (resEntity != null) {
					result = EntityUtils.toString(resEntity, charset);
					httpResult.setContent(result);
				} else {
					throw new HttpRomteAccessException("请求响应不存在或丢失");
				}
			} else {
				LOGGER.error(response != null ? response.getStatusLine()
						.getStatusCode() : "未知异常");
				throw new HttpRomteAccessException("服务器请求响应异常");
			}

		} catch (UnsupportedEncodingException e) {
			throw new HttpRomteAccessException("接口访问异常");
		} catch (ClientProtocolException e) {
			throw new HttpRomteAccessException("接口访问异常");
		} catch (IOException e) {
			throw new HttpRomteAccessException("接口访问异常");
		}
		return httpResult;
	}

}
