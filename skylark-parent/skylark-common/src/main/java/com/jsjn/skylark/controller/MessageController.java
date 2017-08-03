package com.jsjn.skylark.controller;

import java.io.IOException;
import java.io.InputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONArray;
import com.jsjn.skylark.bean.MessageDto;
import com.jsjn.skylark.common.Constant;

@Controller
@RequestMapping("/skylark/message")
public class MessageController {

	/**
	 * LOG4J
	 */
	private static final Logger LOGERUTIL = Logger
			.getLogger(MessageController.class);

	private static String messages;

	static {
		InputStream is = null;
		try {
			is = Constant.loanFileInputStream("/message/message.json");
			messages = IOUtils.toString(is, "UTF-8");
		} catch (Exception e) {
			LOGERUTIL.error("message.json--> file not found exception !");
		} finally {
			IOUtils.closeQuietly(is);
		}

	}

	/**
	 * 读取message.json消息内容
	 * 
	 * @param message
	 * @param req
	 * @param resp
	 * @throws IOException
	 */
	@RequestMapping("getMessage.do")
	public void getMessage(MessageDto message, HttpServletRequest req,
			HttpServletResponse resp) throws IOException {
		req.setCharacterEncoding("UTF-8");
		resp.setCharacterEncoding("UTF-8");
		resp.getWriter().print(
				JSONArray.parseArray( StringUtils.isBlank(messages) ? "[]" : messages).toJSONString());
		resp.getWriter().flush();
		resp.getWriter().close();
	}

}
