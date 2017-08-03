package com.jsjn.skylark.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 测试多个viewReslover 需要配置web.xml中的unfilteredURIs (.*code\.do)|(.*index\.do)|
 * 
 * @author Ghost
 * 
 */
@Controller
public class TestController {

	@RequestMapping(value = "/skylark/index.do")
	public String index(HttpServletRequest req, HttpServletResponse resp,
			String fileId) throws IOException {
		// jsp viewReslover
		return "index";
	}

	@RequestMapping(value = "/skylark/code.do")
	public String code(HttpServletRequest req, HttpServletResponse resp,
			String fileId) throws IOException {
		// html viewReslover
		return "code";
	}

}
