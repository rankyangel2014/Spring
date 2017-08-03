/**
 * 
 */
package com.jsjn.jnf.common.utils;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.InetSocketAddress;
import java.net.Proxy;
import java.net.URL;
import java.net.URLConnection;
import java.util.HashMap;
import java.util.Map;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author ZSMJ
 * 
 */
public class HttpUtils {
	private final static Logger logger = Logger.getLogger(HttpUtils.class);

	/**
	 * 获取客户端IP
	 * 
	 * @param request
	 * @return
	 */
	public static String getRemoteHost(HttpServletRequest request) {
		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		return ip.equals("0:0:0:0:0:0:0:1") ? "127.0.0.1" : ip;
	}

	/**
	 * 获取request请求param集合 MAP对象存储
	 */
	@SuppressWarnings("unchecked")
	public static Map<String, String> getRequestMap(HttpServletRequest request) {
		Map<String, String[]> map = request.getParameterMap();
		Map<String, String> returnMap = new HashMap<String, String>();

		for (Map.Entry<String, String[]> entry : map.entrySet()) {
			returnMap.put(entry.getKey(), entry.getValue()[0]);
		}

		return returnMap;
	}

	/**
	 * 获取POST请求数据
	 * 
	 * @param request
	 * @return
	 */
	public static String getRequestData(HttpServletRequest request) {
		String inputLine = null;
		// 接收到的数据
		StringBuffer recieveData = new StringBuffer();
		BufferedReader in = null;
		try {
			in = new BufferedReader(new InputStreamReader(
					request.getInputStream(), "UTF-8"));
			while ((inputLine = in.readLine()) != null) {
				recieveData.append(inputLine);
			}
		} catch (IOException e) {
			logger.error("获取http请求数据失败");
		} finally {
			try {
				if (null != in) {
					in.close();
				}
			} catch (IOException e) {

			}
		}
		return recieveData.toString();
	}

	/**
	 * 输出XML格式响应报文
	 * 
	 * @param xml
	 * @param resp
	 */
	public static void writeRespToPage(String xml, HttpServletResponse resp) {
		try {
			resp.setCharacterEncoding("UTF-8");
			resp.setContentType("text/xml");
			resp.getWriter().print(xml);
			resp.getWriter().flush();
			resp.getWriter().close();
		} catch (IOException e) {
			logger.error("输出响应数据发生错误！");
			e.printStackTrace();
		}
	}

	/**
	 * 向指定 URL 发送POST方法的请求 可指定格式
	 * 
	 * @param url
	 *            发送请求的 URL
	 * @param param
	 *            请求参数，XML报文
	 * @param contentType
	 *            指定资源的格式 如：text/xml，text/json等
	 *            默认为表单提交：application/x-www-form-urlencoded
	 * @param rspEncode
	 *            response 编码格式，默认utf-8
	 * @return 所代表远程资源的响应结果
	 * @throws Exception 
	 */
	public static String sendPostWithType(String url, String param, String contentType, String rspEncode) throws Exception{
		PrintWriter out = null;
		BufferedReader in = null;
		String result = "";
		try {

			URL realUrl = new URL(url);
			// 打开和URL之间的连接
			URLConnection conn = realUrl.openConnection();
			// 设置通用的请求属性
			conn.setRequestProperty("accept", "*/*");
			conn.setRequestProperty("connection", "Keep-Alive");
			conn.setRequestProperty("Content-Type",
					contentType != null ? contentType
							: "application/x-www-form-urlencoded;charset=utf-8");

			// 发送POST请求必须设置如下两行
			conn.setDoOutput(true);
			conn.setDoInput(true);
			// 获取URLConnection对象对应的输出流
			out = new PrintWriter(conn.getOutputStream());
			// 发送请求报文
			out.print(new String(param.getBytes("UTF-8")));
			// flush输出流的缓冲
			out.flush();
			// 定义BufferedReader输入流来读取URL的响应
			in = new BufferedReader(new InputStreamReader(
					conn.getInputStream(), rspEncode != null ? rspEncode
							: "utf-8"));
			String line;
			while ((line = in.readLine()) != null) {
				result += line;
			}
		} catch (Exception e) {
			logger.error("发送Http Post请求异常：" , e);
			throw new Exception("发送Http Post请求异常！");
		}
		// 使用finally块来关闭输出流、输入流
		finally {
			try {
				if (out != null) {
					out.close();
				}
				if (in != null) {
					in.close();
				}
			} catch (IOException ex) {
				logger.error("发送Http Post请求异常：" , ex);
			}
		}
		return result;
	}

	/**
	 * 向指定 URL 发送POST方法的请求 仅支持xml格式报文
	 * 
	 * @param url
	 *            发送请求的 URL
	 * @param param
	 *            请求参数，XML报文
	 * @return 所代表远程资源的响应结果
	 */
	public static String sendPost(String url, String xml) {
		PrintWriter out = null;
		BufferedReader in = null;
		String result = "";
		try {

			URL realUrl = new URL(url);
			// 打开和URL之间的连接
			URLConnection conn = realUrl.openConnection();
			// 设置通用的请求属性
			conn.setRequestProperty("accept", "*/*");
			conn.setRequestProperty("connection", "Keep-Alive");
			conn.setRequestProperty("Content-Type", "text/xml");
			// 发送POST请求必须设置如下两行
			conn.setDoOutput(true);
			conn.setDoInput(true);
			// 获取URLConnection对象对应的输出流
			out = new PrintWriter(conn.getOutputStream());
			// 发送请求XML报文
			out.print(new String(xml.getBytes("UTF-8")));
			// flush输出流的缓冲
			out.flush();
			// 定义BufferedReader输入流来读取URL的响应
			in = new BufferedReader(
					new InputStreamReader(conn.getInputStream()));
			String line;
			while ((line = in.readLine()) != null) {
				result += line;
			}
		} catch (Exception e) {
			logger.error("发送Http Post请求异常：" + e);
		}
		// 使用finally块来关闭输出流、输入流
		finally {
			try {
				if (out != null) {
					out.close();
				}
				if (in != null) {
					in.close();
				}
			} catch (IOException ex) {
				logger.error("发送Http Post请求异常：" + ex);
			}
		}
		return result;
	}

	/**
	 * 向指定 URL 发送POST方法的请求
	 * 
	 * @param url
	 *            发送请求的 URL
	 * @param param
	 *            请求参数，XML报文
	 * @return 所代表远程资源的响应结果
	 */
	public static String sendPostViaProxy(String url, String xml, String host,
			String port) {
		PrintWriter out = null;
		BufferedReader in = null;
		String result = "";
		try {

			Proxy proxy = new Proxy(Proxy.Type.HTTP, new InetSocketAddress(
					host, Integer.parseInt(port)));

			URL realUrl = new URL(url);
			// 打开和URL之间的连接
			URLConnection conn = realUrl.openConnection(proxy);
			// 设置通用的请求属性
			conn.setRequestProperty("accept", "*/*");
			conn.setRequestProperty("connection", "Keep-Alive");
			conn.setRequestProperty("Content-Type", "text/xml");
			// 发送POST请求必须设置如下两行
			conn.setDoOutput(true);
			conn.setDoInput(true);
			// 获取URLConnection对象对应的输出流
			out = new PrintWriter(conn.getOutputStream());
			// 发送请求XML报文
			out.print(new String(xml.getBytes("UTF-8")));
			// flush输出流的缓冲
			out.flush();
			// 定义BufferedReader输入流来读取URL的响应
			in = new BufferedReader(
					new InputStreamReader(conn.getInputStream()));
			String line;
			while ((line = in.readLine()) != null) {
				result += line;
			}
		} catch (Exception e) {
			logger.error("发送Http Post请求异常：" + e);
		}
		// 使用finally块来关闭输出流、输入流
		finally {
			try {
				if (out != null) {
					out.close();
				}
				if (in != null) {
					in.close();
				}
			} catch (IOException ex) {
				logger.error("发送Http Post请求异常：" + ex);
			}
		}
		return result;
	}

	public static String sendPostHttps(String url, String xml)
			throws IOException {
		OutputStream out = null;
		System.setProperty("https.protocols", "TLSv1");
		String reqData = "";
		try {

			// 同位体验证信任决策源//同位体验证可信任的证书来源
			TrustManager[] tm = { new MyX509TrustManager() };

			// 初始化安全套接字
			SSLContext sslContext = SSLContext.getInstance("SSL");
			// 初始化SSL环境。第二个参数是告诉JSSE使用的可信任证书的来源，设置为null是从javax.net.ssl.trustStore中获得证书。
			// 第三个参数是JSSE生成的随机数，这个参数将影响系统的安全性，设置为null是个好选择，可以保证JSSE的安全性。
			sslContext.init(null, tm, null);

			// 根据上面配置的SSL上下文来产生SSLSocketFactory,与通常的产生方法不同
			SSLSocketFactory factory = sslContext.getSocketFactory();

			URL realUrl = new URL(url);
			// 打开和URL之间的连接
			HttpsURLConnection conn = (HttpsURLConnection) realUrl
					.openConnection();
			// 创建安全的连接套接字
			conn.setSSLSocketFactory(factory);
			// 发送POST请求必须设置如下两行,使用 URL 连接进行输出、入
			conn.setDoOutput(true);
			conn.setDoInput(true);
			conn.setRequestProperty("Content-Type","application/x-www-form-urlencoded;charset=utf-8");
			// 设置URL连接的超时时限
			conn.setReadTimeout(120000);

			// 获取URLConnection对象对应的输出流
			out = conn.getOutputStream();
			// 发送请求参数
			out.write(xml.getBytes("UTF-8"));
			// flush 输出流的缓冲
			out.flush();

			// 得到服务端返回
			InputStream is = conn.getInputStream();
			if (is != null) {
				ByteArrayOutputStream bos = new ByteArrayOutputStream();
				byte[] receiveBuffer = new byte[2048];// 缓冲区长度
				int readBytesSize = is.read(receiveBuffer);// 读取数据长度，InputStream要读取的数据长度一定要小于等于缓冲区中的字节数

				while (readBytesSize != -1) {// 判断流是否位于文件末尾而没有可用的字节
					bos.write(receiveBuffer, 0, readBytesSize);// 从receiveBuffer内存处的0偏移开始写，写与readBytesSize长度相等的字节
					readBytesSize = is.read(receiveBuffer);
				}
				reqData = new String(bos.toByteArray(), "UTF-8");// 编码后的tr2报文
			}

		} catch (Exception e) {
			logger.error("发送Https Post请求异常：" + e);
		}
		// 使用finally块来关闭输出流、输入流
		finally {
			if (out != null) {
				out.close();
			}
			// if (in != null){in.close();}
		}
		return reqData;
	}

}
