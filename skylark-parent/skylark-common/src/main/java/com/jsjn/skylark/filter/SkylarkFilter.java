package com.jsjn.skylark.filter;

import java.io.IOException;
import java.util.Set;
import java.util.StringTokenizer;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import com.jsjn.skylark.combination.Combination;
import com.jsjn.skylark.listener.StartupListener;
import com.jsjn.skylark.session.SessionContext;

/**
 * Servlet Filter implementation class KYFilter
 */
public class SkylarkFilter implements Filter {

	private String unfilteredURIs;
	/**
	 * Default constructor.
	 */
	public SkylarkFilter() {

	}

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {

		Set<String> set = StartupListener.combs.keySet();
		for (String appName : set) {
			Filter f = StartupListener.combs.get(appName).getFilter();
			if (f != null) {
				f.destroy();
			}
		}
	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		// place your code here
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");

		HttpServletRequest req = (HttpServletRequest) request;
		HttpSession session = req.getSession(true);
		SessionContext.setSession(session);

		String uri = req.getRequestURI();// /skylark/appName/xxx
		uri = uri.replaceAll("//", "/");
		boolean accessApp = false;
		String[] s = uri.split("/");
		if (s.length >= 3) {
			String appName = s[2];
			Combination comb = StartupListener.combs.get(appName);
			if (comb != null) {
				accessApp = true;
				String unUri = comb.getUnfilteredURIs();
				if (unUri != null && !"".equals(unUri) && uri.matches(unUri)) {
					// 不检查是否登录
				} else {
					if (SessionContext.getAttribute(SessionContext.USER_INFO) == null) {
						JSONObject r = new JSONObject();
						r.put("success", "false");
						r.put("errMsg", "没有会话信息，请先登录。");
						response.getWriter().println(r.toString());
						response.getWriter().flush();
						return;
					}
				}

				Filter f = StartupListener.combs.get(appName).getFilter();
				if (f != null) {
					f.doFilter(request, response, chain);
				} else {
					chain.doFilter(request, response);
				}
			} 
		}

		if (accessApp == false) {
			// 不是访问某个应用的controller. 使用web.xml中的参数。
			if (!uri.matches(unfilteredURIs)) {
				if (SessionContext.getAttribute(SessionContext.USER_INFO) == null) {
					JSONObject r = new JSONObject();
					r.put("success", "false");
					r.put("errMsg", "没有会话信息，请先登录。");
					response.getWriter().println(r.toString());
					response.getWriter().flush();
					return;
				} else {
					chain.doFilter(request, response);
				}
			} else {
				chain.doFilter(request, response);
			}
		}
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {

		unfilteredURIs = jointString(fConfig.getServletContext()
				.getInitParameter("unfilteredURIs"));

		Set<String> set = StartupListener.combs.keySet();
		for (String appName : set) {
			Filter f = StartupListener.combs.get(appName).getFilter();
			if (f != null) {
				f.init(fConfig);
			}
		}
	}

	private String jointString(String str) {
		StringBuffer buf = new StringBuffer();
		for (StringTokenizer st = new StringTokenizer(str != null ? str : "",
				"\n", false); st.hasMoreTokens(); buf.append(st.nextToken()
				.trim()))
			;
		return buf.toString();
	}
}
