package com.ranky.protal.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONArray;
import com.ranky.bean.UserDto;

/**
 * 用户请求处理器 Created by admin on 16/8/6.
 */
@Controller
public class IndexController {
	private static Logger logger = LogManager.getLogger(IndexController.class);

	@RequestMapping(value = "/lightgallery/{tid}", method = RequestMethod.GET)
	public String lightgallery(@PathVariable("tid")String tid) {
		return "lightgallery?tid='3bcc0f32708e495db95df7f5b96fb1df'";
	}

	@RequestMapping(value = "/home", method = RequestMethod.GET)
	public String showHomePage() {
		return "batch";
	}

	@RequestMapping(value = "/batch", method = RequestMethod.POST)
	@ResponseBody
	public String batch(@RequestBody String userList) {
		System.out.println("load user " + JSONArray.parseArray(userList, UserDto.class).get(0).getValue());
		return "index";
	}
}