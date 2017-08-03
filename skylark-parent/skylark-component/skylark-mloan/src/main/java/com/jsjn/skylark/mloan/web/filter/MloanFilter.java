package com.jsjn.skylark.mloan.web.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


import com.jsjn.skylark.session.SessionContext;

public class MloanFilter implements Filter {

	/**
	 * Servlet Filter implementation class Filter1
	 */
	
	/**
	 * Default constructor.
	 */
	public MloanFilter() {
	}

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
	}

	/**
	 * skylark会过滤/mlsp/*.do的url地址
	 * 
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");

		HttpServletRequest req = (HttpServletRequest) request;
		HttpSession session = req.getSession(true);
		SessionContext.setSession(session);
		chain.doFilter(request, response);
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		
	}
	
}
