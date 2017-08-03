package com.jsjn.jnf.common.utils;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.http.HttpEntity;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.ParseException;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.conn.params.ConnRoutePNames;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.params.CoreConnectionPNames;
import org.apache.http.util.EntityUtils;

import com.jsjn.jnf.common.utils.HttpsClient;
import com.jsjn.jnf.common.utils.Logger;

/**
 * httpClient工具类
 * 
 * 支持get，post请求
 * 支持http，https请求
 * 支持proxy 及需登录认证proxy
 * 
 * @author yincy
 *
 */
public class HttpClientUtils {

	private final static Logger logger = Logger.getLogger(HttpClientUtils.class);


	/**
	 * get(不加代理)
	 * 
	 * @param url
	 *            请求url 参数直接加在？后面
	 * @return
	 */
	public static String httpGet(String url) {
		return sendRequest("GET", url, new HashMap<String, String>(), new HashMap<String, String>());
	}

	/**
	 * get(加代理)
	 * 
	 * @param url
	 *            请求url 参数直接加在？后面
	 * @param proxyHost
	 *            代理服务器host
	 * @param proxyPort
	 *            代理服务器port
	 * @return
	 */
	public static String httpGetWithProxy(String url, String proxyHost, String proxyPort) {
		HashMap<String, String> settings = new HashMap<String, String>();
		settings.put("isProxy", "Y");
		settings.put("proxyHost", proxyHost);
		settings.put("proxyPort", proxyPort);
		return sendRequest("GET", url, new HashMap<String, String>(), settings);
	}
	
	/**
	 * get https(不加代理)
	 * 
	 * @param url
	 *            请求url 参数直接加在？后面
	 * @return
	 */
	public static String httpsGet(String url) {
		HashMap<String, String> settings = new HashMap<String, String>();
		settings.put("isHttps", "Y");
		return sendRequest("GET", url, new HashMap<String, String>(), settings);
	}

	/**
	 * get https(加代理)
	 * 
	 * @param url
	 *            请求url 参数直接加在？后面
	 * @param proxyHost
	 *            代理服务器host
	 * @param proxyPort
	 *            代理服务器port
	 * @return
	 */
	public static String httpsGetWithProxy(String url, String proxyHost, String proxyPort) {
		HashMap<String, String> settings = new HashMap<String, String>();
		settings.put("isHttps", "Y");
		return sendRequest("GET", url, new HashMap<String, String>(), settings);
	}

	/**
	 * post(不加代理)
	 * 
	 * @param url
	 *            请求url
	 * @param params
	 *            请求参数MAP
	 * @return
	 */
	public static String httpPost(String url, Map<String, String> params) {
		HashMap<String, String> settings = new HashMap<String, String>();
		return sendRequest("POST", url, params, settings);
	}

	/**
	 * post(加代理)
	 * 
	 * @param url
	 *            请求url
	 * @param params
	 *            请求参数MAP
	 * @param proxyHost
	 *            代理服务器host
	 * @param proxyPort
	 *            代理服务器port
	 * @return
	 */
	public static String httpPostWithProxy(String url, Map<String, String> params, String proxyHost, String proxyPort) {
		HashMap<String, String> settings = new HashMap<String, String>();
		settings.put("isProxy", "Y");
		settings.put("proxyHost", proxyHost);
		settings.put("proxyPort", proxyPort);

		return sendRequest("POST", url, params, settings);
	}
	
	/**
	 * post https(不加代理)
	 * 
	 * @param url
	 *            请求url
	 * @param params
	 *            请求参数MAP
	 * @return
	 */
	public static String httpsPost(String url, Map<String, String> params) {
		HashMap<String, String> settings = new HashMap<String, String>();
		settings.put("isHttps", "Y");

		return sendRequest("POST", url, params, settings);
	}

	/**
	 * post https(加代理)
	 * 
	 * @param url
	 *            请求url
	 * @param params
	 *            请求参数MAP
	 * @param proxyHost
	 *            代理服务器host
	 * @param proxyPort
	 *            代理服务器port
	 * @return
	 */
	public static String httpsPostWithProxy(String url, Map<String, String> params, String proxyHost, String proxyPort) {
		HashMap<String, String> settings = new HashMap<String, String>();
		settings.put("isHttps", "Y");
		settings.put("isProxy", "Y");
		settings.put("proxyHost", proxyHost);
		settings.put("proxyPort", proxyPort);

		return sendRequest("POST", url, params, settings);
	}
	

	
	public static String sendRequest(String type, String url, Map<String, String> params,
			Map<String, String> settings) {

		boolean isHttps = settings.get("isHttps") == "Y" ? true : false;
		boolean isProxy = settings.get("isProxy") == "Y" ? true : false;
		boolean isProxyLogin = settings.get("isProxyLogin") == "Y" ? true : false;
		String proxyUsername = settings.get("proxyUsername");
		String proxyPassword = settings.get("proxyPassword");
		String proxyHost = settings.get("proxyHost");
		int proxyPort = settings.get("proxyPort") == null ? 0 : Integer.parseInt(settings.get("proxyPort"));
		String reqCharset = settings.get("reqCharset") == null ? "UTF-8" : settings.get("reqCharset");
		String rspCharset = settings.get("rspCharset") == null ? "UTF-8" : settings.get("rspCharset");

		DefaultHttpClient httpclient;

		/**
		 * 是否使用HTTPS
		 */
		if (isHttps) {
			httpclient = (DefaultHttpClient) HttpsClient.newHttpsClient();
		} else {
			httpclient = new DefaultHttpClient();
		}

		/**
		 * 是否需要代理
		 */
		if (isProxy) {
			// 代理服务器是否需要认证
			if (isProxyLogin) {
				httpclient.getCredentialsProvider().setCredentials(new AuthScope(proxyHost, proxyPort),
						new UsernamePasswordCredentials(proxyUsername, proxyPassword));
			}
			HttpHost proxy = new HttpHost(proxyHost, proxyPort);
			httpclient.getParams().setParameter(ConnRoutePNames.DEFAULT_PROXY, proxy);
		}

		// 读取超时
		httpclient.getParams().setParameter(CoreConnectionPNames.SO_TIMEOUT, 900000000);
		// 请求超时
		httpclient.getParams().setParameter(CoreConnectionPNames.CONNECTION_TIMEOUT, 900000000);
		httpclient.getParams().setParameter(CoreConnectionPNames.MAX_LINE_LENGTH, 0);
		httpclient.getParams().setParameter(CoreConnectionPNames.SOCKET_BUFFER_SIZE, 81920);
		httpclient.getParams().setParameter(CoreConnectionPNames.MAX_HEADER_COUNT, 0);

		String rspBody = null;

		// 获取post对象
		if ("POST".equalsIgnoreCase(type)) {
			HttpPost httppost = getHttpPostWithUrlencoded(url, params, reqCharset);
			rspBody = invoke(httpclient, httppost, rspCharset);
		} else if ("GET".equalsIgnoreCase(type)) {
			HttpGet httpget = new HttpGet(url);
			rspBody = invoke(httpclient, httpget, rspCharset);
		}

		httpclient.getConnectionManager().shutdown();

		return rspBody;
	}

	/**
	 * 执行http请求返回响应
	 * 
	 * @param httpclient
	 * @param httpost
	 * @return
	 */
	private static String invoke(DefaultHttpClient httpclient, HttpUriRequest httpost, String charset) {
		HttpResponse response = null;
		HttpEntity entity = null;
		String body = null;
		try {
			response = httpclient.execute(httpost);
			entity = response.getEntity();
			body = EntityUtils.toString(entity, charset);
		} catch (ParseException e) {
			logger.error("返回报文解析错误！", e);
		} catch (Exception e) {
			logger.error("http请求出错！", e);
		}
		return body;
	}

	/**
	 * 组装post实体。
	 * 
	 * @param url
	 *            服务器地址
	 * @param params
	 *            参数
	 * @param charset
	 *            编码
	 * @return
	 */
	private static HttpPost getHttpPostWithUrlencoded(String url, Map<String, String> params, String charset) {

		HttpPost httpost = new HttpPost(url);
		List<NameValuePair> nvps = new ArrayList<NameValuePair>();

		Set<String> keySet = params.keySet();
		for (String key : keySet) {
			nvps.add(new BasicNameValuePair(key, params.get(key)));
		}

		try {
			httpost.setEntity(new UrlEncodedFormEntity(nvps, charset));
		} catch (UnsupportedEncodingException e) {
			logger.error("字符编码异常！", e);
		}

		return httpost;
	}

}
