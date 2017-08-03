package com.jsjn.jnf.admin.servlet;

import java.io.IOException;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;


/**
 * Servlet implementation class CommonServlet
 */
public class ParamServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public ParamServlet() {
        super();
    }

    /**
     * @see Servlet#init(ServletConfig)
     */
    public void init(ServletConfig config) throws ServletException {

    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String requestpath = request.getServletPath();
        WebApplicationContext wac = WebApplicationContextUtils.getWebApplicationContext(request.getSession().getServletContext());
        // if (userInfo == null) {
        // throw new ServletException("当前没有登录用户或用户session已过期！");
        // }
        ResourceContentLoader loder = wac.getBean(ResourceContentLoader.class);
        loder.serveStaticBrowserCache = false;
        loder.mergeStaticResource(requestpath, request, response);
    }

}
