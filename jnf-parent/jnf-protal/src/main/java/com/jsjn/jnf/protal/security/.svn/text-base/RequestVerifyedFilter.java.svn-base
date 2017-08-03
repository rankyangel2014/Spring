/**
 * 
 */
package com.jsjn.jnf.protal.security;

import java.io.IOException;
import java.util.Collections;
import java.util.Hashtable;
import java.util.LinkedList;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.jsjn.jnf.bean.bo.base.ErrorOpenResBO;
import com.jsjn.jnf.common.mapper.JaxbMapper;
import com.jsjn.jnf.common.utils.HttpUtils;
import com.jsjn.log4p.pandaclient.Log4pPandaClient;

/**
 * portal层请求安全过滤器
 * @author ZSMJ
 * 
 */
public class RequestVerifyedFilter implements Filter {
	
	private final static Logger logger = Logger.getLogger(RequestVerifyedFilter.class);

	/***
	 * IP/SESSION 维度流量控制计数器
	 * 采用线程安全的HashTable
	 */
	public static Hashtable<String, List<String>> table = new Hashtable<String, List<String>>();

	/**
	 * SYS 维度流量控制计数器
	 * 构造线程安全的List
	 */
	public static List<String> list = Collections.synchronizedList(new LinkedList<String>());

	/**
	 * OpenAPI入口地址
	 */
	private String openAPIURL = "";
	
	
	//清除cache缓存URL
	private String clearCacheURL = "/jnf-protal/test/clearCache";
	
	/**
	 * 最近一次更新系统配置时间戳
	 */
	private long lastRefreshStamp = 0l;

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		
		//订阅Panda服务
		try {
			Log4pPandaClient.subscribe();
		} catch (Exception e) {
			e.printStackTrace();
		}
		/**
		 * 获取web.xml配置参数
		 */
		openAPIURL = filterConfig.getInitParameter("openAPIURI");
	}
	
	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		
		if(!SysConfigBean.getSysConfig()){
			logger.error("获取系统参数异常，采用默认参数配置！");
		}
		
		long currTimeStamp = System.currentTimeMillis();
		if(currTimeStamp - lastRefreshStamp > SysConfigBean.REFRESH_CONFIG_SEC * 1000
				|| lastRefreshStamp == 0 ){
			//1、清空全局table、list
			table.clear();
			list.clear();
			
			lastRefreshStamp = currTimeStamp;
		}
		
		//对于非POST请求，直接返回错误信息
		HttpServletRequest httpReq = (HttpServletRequest)request;
		if(!httpReq.getMethod().equals("POST")){
			returnError((HttpServletResponse)response);
			return;
		}
		
		String requestURI = httpRequest.getRequestURI();
		if(!openAPIURL.equals(requestURI) && !requestURI.equals(clearCacheURL)){
			returnError((HttpServletResponse)response);
			return;
		}
		
		chain.doFilter(request, response);
		
	}
	

	@Override
	public void destroy() {}
	
	private void returnError(HttpServletResponse rsp) {
		ErrorOpenResBO  dto = new ErrorOpenResBO();
		dto.setResMsg("请求非法！");
		HttpUtils.writeRespToPage(JaxbMapper.toXml(dto,false), rsp);
	}
}
